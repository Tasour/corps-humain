"""Recentre les organes crâniens dans le crâne (mesures c91dcb0)."""
import bpy
import os
import sys

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'female'
root = '/home/tasour/corps-humain/docs/models'
src = os.path.join(root, f'corps-{sex}.glb')
tmp = os.path.join(root, f'.corps-{sex}-head.glb')

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)


def bounds(ob):
    pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
    return ([min(p[i] for p in pts) for i in range(3)],
            [max(p[i] for p in pts) for i in range(3)])


skull = next(o for o in bpy.data.objects if o.name.lower().startswith('skull'))
lo, hi = bounds(skull)
center = [(lo[i] + hi[i]) / 2 for i in range(3)]

count = 0
for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    base = ob.name.lower().split('.')[0]
    if base not in ('brain', 'cerebellum', 'eye_l', 'eye_r', 'brainstem'):
        continue
    o_lo, o_hi = bounds(ob)
    o_center = [(o_lo[i] + o_hi[i]) / 2 for i in range(3)]
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        for i in range(3):
            p[i] = center[i] + (p[i] - o_center[i]) * 0.82
        v.co = ob.matrix_world.inverted() @ p
    count += 1

bpy.ops.export_scene.gltf(
    filepath=tmp, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(tmp, src)
print(f'[head] {sex}: {count} organes crâniens recentrés')
