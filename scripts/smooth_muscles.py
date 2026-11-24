"""Lissage déterministe des muscles après confinement.

Exécution : blender -b --python scripts/smooth_muscles.py -- male
Le confinement sommet-par-sommet crée des pointes ; on lisse la géométrie
puis on reprojette uniquement les sommets encore hors peau.
"""
import bpy
import json
import os
import sys
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-smooth.glb'
REPORT = f'{ROOT}/docs/analyses/lissage-musculaire-{sex}.json'
MARGIN = 0.002
CYCLES = ((8, True), (4, True), (2, True))

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def edge_ratio(ob):
    lengths = []
    for e in ob.data.edges:
        a, b = e.vertices
        lengths.append((ob.data.vertices[a].co - ob.data.vertices[b].co).length)
    lengths.sort()
    med = lengths[len(lengths) // 2]
    return lengths[-1] / med if med else 0.0


skin = get('skin')
sp = [skin.matrix_world @ v.co for v in skin.data.vertices]
sn = [skin.matrix_world.to_3x3() @ v.normal for v in skin.data.vertices]
tree = KDTree(len(sp))
for i, p in enumerate(sp):
    tree.insert(p, i)
tree.balance()

catalog = json.load(open(f'{ROOT}/docs/models/catalog.json'))
names = [e['key'] for e in catalog if e['system'] == 'muscles']
report = {'sex': sex, 'margin_m': MARGIN, 'cycles': CYCLES, 'meshes': {}}

for name in names:
    ob = get(name)
    if not ob:
        continue
    before = edge_ratio(ob)
    for iterations, project in CYCLES:
        mod = ob.modifiers.new('lissage', 'SMOOTH')
        mod.factor = 1.0
        mod.iterations = iterations
        bpy.ops.object.select_all(action='DESELECT')
        ob.select_set(True)
        bpy.context.view_layer.objects.active = ob
        bpy.ops.object.modifier_apply(modifier=mod.name)
        if not project:
            continue
        inv = ob.matrix_world.inverted()
        pushed = 0
        for v in ob.data.vertices:
            p = ob.matrix_world @ v.co
            co, i, _d = tree.find(p)
            signed = (p - co).dot(sn[i])
            if signed > -MARGIN:
                v.co = inv @ (p - sn[i] * (signed + MARGIN))
                pushed += 1
    after = edge_ratio(ob)
    report['meshes'][name] = {
        'edge_ratio_before': round(before, 3),
        'edge_ratio_after': round(after, 3),
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
worst = max((v['edge_ratio_after'], k) for k, v in report['meshes'].items())
print('[lissage]', sex, 'pire ratio', round(worst[0], 3), worst[1])
