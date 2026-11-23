"""Déformation spatiale partagée pour rapprocher main et pied des cibles ANSUR II.

Un seul champ W(x) est appliqué à TOUS les maillages : l'alignement entre
couches est préservé par construction. Les régions sont définies par des
prédicats géométriques déterministes, jamais par un seuil visuel.
"""
import json
import os

import bpy
from mathutils import Vector

ROOT = '/home/tasour/corps-humain'


def run(sex):
    report = json.load(open(f'{ROOT}/docs/analyses/validation-metrique-{sex}.json'))
    landmarks = report['landmarks']
    factors = {}
    for seg in ('hand', 'foot'):
        s = report['segments'][seg]
        if s.get('status') != 'proxy' or not s.get('expected_m') or not s.get('measured_m'):
            continue
        factors[seg] = s['expected_m'] / s['measured_m']
    if not factors:
        print('[warp]', sex, 'aucune cible mesurable')
        return

    h = [landmarks['hand_a'], landmarks['hand_b']]
    wrist_x = min(p[0] for p in h)
    f = [landmarks['foot_a'], landmarks['foot_b']]
    heel_y = min(p[1] for p in f)

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=f'{ROOT}/docs/models/corps-{sex}.glb')
    touched = 0
    for ob in bpy.data.objects:
        if ob.type != 'MESH':
            continue
        inv = ob.matrix_world.inverted()
        for v in ob.data.vertices:
            p = ob.matrix_world @ v.co
            q = Vector(p)
            if 'hand' in factors and p.x > wrist_x and p.z > 1.30:
                q.x = wrist_x + (p.x - wrist_x) * factors['hand']
            if 'foot' in factors and p.z < 0.12:
                q.y = heel_y + (p.y - heel_y) * factors['foot']
            if q != p:
                v.co = inv @ q
                touched += 1

    tmp = f'{ROOT}/docs/models/.corps-{sex}-warp.glb'
    bpy.ops.export_scene.gltf(
        filepath=tmp, export_format='GLB', use_selection=False,
        export_cameras=False, export_lights=False, export_animations=False,
        export_materials='EXPORT', export_apply=False)
    os.replace(tmp, f'{ROOT}/docs/models/corps-{sex}.glb')
    print('[warp]', sex, 'facteurs', {k: round(v, 5) for k, v in factors.items()},
          'sommets', touched)


for sex in ('female', 'male'):
    run(sex)
