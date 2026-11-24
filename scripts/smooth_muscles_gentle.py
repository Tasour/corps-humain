"""Lissage doux des muscles, sans rotation, avec correction résiduelle.

Exécution : blender -b --python scripts/smooth_muscles_gentle.py -- male
"""
import bpy
import json
import os
import sys
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-gentle.glb'
REPORT = f'{ROOT}/docs/analyses/lissage-doux-muscles-{sex}.json'
MARGIN = 0.002

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def smooth(ob, factor, iterations):
    mod = ob.modifiers.new('doux', 'SMOOTH')
    mod.factor = factor
    mod.iterations = iterations
    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.modifier_apply(modifier=mod.name)


def edge_ratio(ob):
    ls = sorted((ob.data.vertices[e.vertices[0]].co -
                 ob.data.vertices[e.vertices[1]].co).length for e in ob.data.edges)
    med = ls[len(ls) // 2]
    return ls[-1] / med if med else 0.0


skin = get('skin')
sp = [skin.matrix_world @ v.co for v in skin.data.vertices]
sn = [skin.matrix_world.to_3x3() @ v.normal for v in skin.data.vertices]
tree = KDTree(len(sp))
for i, p in enumerate(sp):
    tree.insert(p, i)
tree.balance()

catalog = json.load(open(f'{ROOT}/docs/models/catalog.json'))
report = {'sex': sex, 'meshes': {}}
for entry in catalog:
    if entry['system'] != 'muscles':
        continue
    ob = get(entry['key'])
    if not ob:
        continue
    before = edge_ratio(ob)
    smooth(ob, 0.2, 3)
    inv = ob.matrix_world.inverted()
    pushed = 0
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        co, i, _d = tree.find(p)
        signed = (p - co).dot(sn[i])
        if signed > -MARGIN:
            v.co = inv @ (p - sn[i] * (signed + MARGIN))
            pushed += 1
    smooth(ob, 0.2, 2)
    after = edge_ratio(ob)
    report['meshes'][entry['key']] = {
        'edge_ratio_before': round(before, 3),
        'edge_ratio_after': round(after, 3),
        'vertices_projected': pushed,
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[gentle]', sex, 'pire ratio',
      max(v['edge_ratio_after'] for v in report['meshes'].values()))
