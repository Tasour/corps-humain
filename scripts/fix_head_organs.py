"""Translation rigide deterministe du groupe crane pour rentrer dans la peau.

Exécution : blender -b --python scripts/fix_head_organs.py -- male
Le même script est paramétré par sexe pour la bascule femme ultérieure.
"""
import bpy
import json
import os
import sys
from mathutils import Vector

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-head.glb'
REPORT = f'{ROOT}/docs/analyses/head-fix-{sex}.json'
CRANIAL = ('brain', 'skull', 'eye_l', 'eye_r', 'cerebellum', 'brainstem')

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def centroid(ob, cutoff=None):
    pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
    if cutoff is not None:
        pts = [p for p in pts if p.z > cutoff]
    n = len(pts)
    return Vector([sum(p[i] for p in pts) / n for i in range(3)])


skin = get('skin')
skin_head = centroid(skin, 1.30)
deltas = {}
for name in CRANIAL:
    ob = get(name)
    if ob:
        deltas[name] = skin_head - centroid(ob)

delta = Vector([sum(d[i] for d in deltas.values()) / len(deltas)
                for i in range(3)])
report = {
    'sex': sex,
    'method': 'translation rigide commune, centroïde du groupe crânien aligné sur la tête cutanée',
    'skin_head_centroid': [round(float(v), 6) for v in skin_head],
    'per_organ_delta': {k: [round(float(v), 6) for v in d] for k, d in deltas.items()},
    'applied_delta': [round(float(v), 6) for v in delta],
    'moved_meshes': list(deltas),
}
for name in CRANIAL:
    ob = get(name)
    if not ob:
        continue
    inv = ob.matrix_world.inverted()
    for v in ob.data.vertices:
        v.co = inv @ (ob.matrix_world @ v.co + delta)

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[head]', sex, 'delta', [round(float(v), 5) for v in delta])
