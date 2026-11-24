"""Classifie les muscles en tubulaires ou plaques par PCA déterministe.

Exécution : blender -b --python scripts/classify_muscles.py -- male
"""
import bpy
import json
import sys
import numpy as np

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=f'{ROOT}/docs/models/corps-{sex}.glb')
cat = json.load(open(f'{ROOT}/docs/models/catalog.json'))
out = {'sex': sex, 'threshold_eigen_ratio': 4.0, 'meshes': {}}
for e in cat:
    if e['system'] != 'muscles':
        continue
    ob = next((o for o in bpy.data.objects if o.type == 'MESH'
               and o.name.lower().split('.')[0] == e['key'].lower()), None)
    if not ob:
        continue
    p = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])
    vals = np.linalg.eigvalsh(np.cov((p - p.mean(axis=0)).T))
    ratio = float(vals[-1] / max(vals[0], 1e-12))
    out['meshes'][e['key']] = {
        'eigenvalues': [round(float(v), 8) for v in vals],
        'ratio': round(ratio, 3),
        'kind': 'tubular' if ratio >= 4.0 else 'plaque',
    }
json.dump(out, open(f'{ROOT}/docs/models/muscle-classification-{sex}.json', 'w'),
          indent=1, ensure_ascii=False)
print('[classif]', sex, 'tubulaires', sum(1 for v in out['meshes'].values() if v['kind'] == 'tubular'),
      'plaques', sum(1 for v in out['meshes'].values() if v['kind'] == 'plaque'))
