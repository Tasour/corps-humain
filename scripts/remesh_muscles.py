"""Remesh voxelique des muscles pour supprimer les pointes en conservant la forme.

Exécution : blender -b --python scripts/remesh_muscles.py -- male
"""
import bpy
import json
import os
import sys
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-remesh.glb'
REPORT = f'{ROOT}/docs/analyses/remesh-musculaire-{sex}.json'
VOXEL = 0.004
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

cat = json.load(open(f'{ROOT}/docs/models/catalog.json'))
report = {'sex': sex, 'voxel_m': VOXEL, 'meshes': {}}
for entry in cat:
    if entry['system'] != 'muscles':
        continue
    ob = get(entry['key'])
    if not ob:
        continue
    before = len(ob.data.vertices)
    mod = ob.modifiers.new('voxel', 'REMESH')
    mod.mode = 'VOXEL'
    mod.voxel_size = VOXEL
    mod.use_smooth_shade = True
    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.modifier_apply(modifier=mod.name)
    sm = ob.modifiers.new('smooth', 'SMOOTH')
    sm.factor = 0.5
    sm.iterations = 2
    bpy.ops.object.modifier_apply(modifier=sm.name)
    inv = ob.matrix_world.inverted()
    pushed = 0
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        co, i, _d = tree.find(p)
        signed = (p - co).dot(sn[i])
        if signed > -MARGIN:
            v.co = inv @ (p - sn[i] * (signed + MARGIN))
            pushed += 1
    report['meshes'][entry['key']] = {
        'vertices_before': before,
        'vertices_after': len(ob.data.vertices),
        'vertices_projected': pushed,
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[remesh]', sex, 'maillages', len(report['meshes']))
