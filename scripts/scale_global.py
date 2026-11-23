"""Applique un facteur d'échelle global unique pour porter la taille à 1,72 m."""
import bpy
import os
import sys

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'female'
root = '/home/tasour/corps-humain/docs/models'
src = f'{root}/corps-{sex}.glb'
tmp = f'{root}/.corps-{sex}-scale.glb'
TARGET = 1.72

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)
skin = next(o for o in bpy.data.objects if o.type == 'MESH'
            and o.name.lower().startswith('skin'))
height = max((skin.matrix_world @ v.co).z for v in skin.data.vertices)
factor = TARGET / height
for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    inverse = ob.matrix_world.inverted()
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        p *= factor
        v.co = inverse @ p
bpy.ops.export_scene.gltf(
    filepath=tmp, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(tmp, src)
print(f'[scale] {sex}: {height:.4f} -> {TARGET} (x{factor:.6f})')
