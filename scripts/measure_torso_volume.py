"""Mesure déterministe du volume cutané thoracique par coupes horizontales."""
import bpy
import json
import numpy as np

ROOT = '/home/tasour/corps-humain'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=f'{ROOT}/docs/models/corps-male.glb')


def pts(name):
    ob = next((o for o in bpy.data.objects if o.type == 'MESH'
               and o.name.lower().split('.')[0] == name.lower()), None)
    if not ob:
        return np.empty((0, 3))
    return np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])


skin = pts('skin')
bones = np.vstack([pts(n) for n in ('ribs_l', 'ribs_r', 'sternum', 'spine_thoracic')
                   if len(pts(n))])
rows = []
for y in np.arange(0.95, 1.36, 0.02):
    def area(p):
        s = p[np.abs(p[:, 2] - y) <= 0.012]
        if len(s) < 8:
            return None
        return float((s[:, 0].max() - s[:, 0].min()) *
                     (s[:, 1].max() - s[:, 1].min()))
    a_skin, a_bone = area(skin), area(bones)
    rows.append({'y': round(float(y), 3),
                 'skin_area_m2': round(a_skin, 5) if a_skin else None,
                 'bone_area_m2': round(a_bone, 5) if a_bone else None})
valid = [r for r in rows if r['skin_area_m2'] and r['bone_area_m2']]
ratios = [r['skin_area_m2'] / r['bone_area_m2'] for r in valid]
report = {
    'region': 'côtes flottantes, y 0.95–1.35 m',
    'method': 'aire de la boîte englobante x-z par coupe de 24 mm',
    'slices': rows,
    'mean_skin_to_bone_area_ratio': round(float(np.mean(ratios)), 3) if ratios else None,
    'max_ratio': round(float(np.max(ratios)), 3) if ratios else None,
}
with open(f'{ROOT}/docs/analyses/volume-thorax-male.json', 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
print('[thorax] ratio moyen', report['mean_skin_to_bone_area_ratio'],
      'max', report['max_ratio'])
