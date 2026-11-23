"""Aligne les couches internes des bras sur la pose croix de la peau.

Mesures (GLB c91dcb0) : peau ±0,88 m, squelette ±0,82 m, muscles ±0,20 m,
vaisseaux ±0,16/0,23 m. On fait pivoter uniquement les maillages muscles et
vaisseaux des bras autour de l'épaule, avec un angle de 80°, sans toucher à la
peau, au squelette ni aux organes du tronc.
"""
import bpy
import math
import os
import sys

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'female'
root = '/home/tasour/corps-humain/docs/models'
src = os.path.join(root, f'corps-{sex}.glb')
tmp = os.path.join(root, f'.corps-{sex}-aligned.glb')

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=src)

SKIP = {'hand_l', 'hand_r', 'forearm_l', 'forearm_r'}
KEYWORDS = ('hand_muscles', 'forearm_muscles', 'upper_arm_muscles',
            'veins_arm', 'arteries_arm')
PIVOT_X = 0.19
PIVOT_Z = 1.42
ANGLE = math.radians(76.0)

count = 0
for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    base = ob.name.lower().split('.')[0]
    if base in SKIP or not any(k in base for k in KEYWORDS):
        continue
    side = 1 if base.endswith('_l') else -1 if base.endswith('_r') else 0
    if not side:
        continue
    angle = math.radians(70.0) if ('vein' in base or 'arter' in base) else ANGLE
    theta = -angle if side > 0 else angle
    c, s = math.cos(theta), math.sin(theta)
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        if p.z > 1.35:
            continue  # garder l'attache proximale à l'épaule en place
        dx = p.x - side * PIVOT_X
        dz = p.z - PIVOT_Z
        p.x = side * PIVOT_X + dx * c + dz * s
        p.z = PIVOT_Z - dx * s + dz * c
        v.co = ob.matrix_world.inverted() @ p
    count += 1

bpy.ops.export_scene.gltf(
    filepath=tmp, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(tmp, src)
print(f'[align] {sex}: {count} maillages de bras alignés')
