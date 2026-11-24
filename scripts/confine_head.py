"""Confinement deterministe des organes crâniens sous l'enveloppe cutanée.

Exécution : blender -b --python scripts/confine_head.py -- male
Chaque sommet situé hors peau est ramené à 2 mm sous la surface la plus proche.
La topologie est conservée ; seul le positionnement des sommets change.
"""
import bpy
import json
import os
import sys
from mathutils import Vector
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-confine.glb'
REPORT = f'{ROOT}/docs/analyses/head-confinement-{sex}.json'
CRANIAL = ('brain', 'skull', 'eye_l', 'eye_r', 'cerebellum', 'brainstem', 'larynx')
MARGIN = 0.002

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


skin = get('skin')
sp = [skin.matrix_world @ v.co for v in skin.data.vertices]
sn = [skin.matrix_world.to_3x3() @ v.normal for v in skin.data.vertices]
tree = KDTree(len(sp))
for i, p in enumerate(sp):
    tree.insert(p, i)
tree.balance()

report = {'sex': sex, 'margin_m': MARGIN, 'meshes': {}}
for name in CRANIAL:
    ob = get(name)
    if not ob:
        continue
    moved = 0
    max_push = 0.0
    inv = ob.matrix_world.inverted()
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        co, i, _d = tree.find(p)
        signed = (p - co).dot(sn[i])
        if signed > -MARGIN:
            push = signed + MARGIN
            v.co = inv @ (p - sn[i] * push)
            moved += 1
            max_push = max(max_push, push)
    report['meshes'][name] = {
        'vertices_moved': moved,
        'max_push_m': round(max_push, 6),
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[confine]', sex, {k: v['vertices_moved'] for k, v in report['meshes'].items()})
