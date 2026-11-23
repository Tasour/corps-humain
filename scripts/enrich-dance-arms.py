"""Donne au mouvement des bras de salsa des coudes et des clavicules.

Le clip d'origine ne bougeait que les upperarm (abduction 50-110°) avec un
coude quasi fixe : les bras paraissaient des bâtons rigides. On ajoute une
flexion de coude et une rotation douce des clavicules, en conservant la
fréquence et la durée de la danse.
"""
import math
import re
from mathutils import Euler


def enrich(bpy):
    action = bpy.data.actions.get('clip_salsa')
    if not action:
        return
    pattern = re.compile(r'pose\.bones\["([^"]+)"\]\.rotation_quaternion')
    groups = {}
    for curve in action.fcurves:
        m = pattern.search(curve.data_path)
        if not m or curve.array_index > 3:
            continue
        groups.setdefault(m.group(1), {})[curve.array_index] = curve

    for bone, curves in groups.items():
        if len(curves) != 4:
            continue
        side = 0 if bone.endswith('.L') else math.pi
        if 'forearm' in bone:
            amplitude, offset = 28, 45
        elif 'clavicle' in bone:
            amplitude, offset = 8, 0
        else:
            continue
        frames = sorted({int(kp.co.x) for c in curves.values() for kp in c.keyframe_points})
        for frame in frames:
            phase = 2 * math.pi * frame / 121 + side
            angle = math.radians(offset + amplitude * math.sin(phase))
            q = Euler((angle, 0, 0), 'XYZ').to_quaternion()
            for index, curve in curves.items():
                kp = next(k for k in curve.keyframe_points if int(k.co.x) == frame)
                kp.co.y = q[index]
                kp.handle_left.y = q[index]
                kp.handle_right.y = q[index]
    print('[arms] salsa enrichie : coudes et clavicules')
