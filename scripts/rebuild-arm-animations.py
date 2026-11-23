"""Reconstruit la mécanique du bras (épaule → coude → main) pour les 6 danses.

Les clips d'origine ne bougeaient que les upperarm. On pilote désormais aussi
clavicule, scapula, avant-bras et main, avec des paramètres distincts par
danse, afin que chaque animation soit reconnaissable et anatomiquement liée.
"""
import math
import re
from mathutils import Euler

PARAMS = {
    'clip_salsa':      dict(elbow=(45, 28), clav=(9, 6), scap=(6, 4), hand=(12, 8), alt=True),
    'clip_marche':     dict(elbow=(25, 20), clav=(4, 3), scap=(3, 2), hand=(6, 5), alt=True),
    'clip_etirement':  dict(elbow=(15, 12), clav=(3, 2), scap=(2, 2), hand=(4, 3), alt=False),
    'clip_tourbillon': dict(elbow=(60, 32), clav=(12, 8), scap=(8, 6), hand=(20, 12), alt=True),
    'clip_course':     dict(elbow=(70, 22), clav=(7, 5), scap=(5, 3), hand=(10, 8), alt=True),
    'clip_equilibre':  dict(elbow=(20, 15), clav=(3, 3), scap=(2, 2), hand=(8, 5), alt=False),
}
BONES = {'clavicle': 'clav', 'scapula': 'scap',
         'forearm': 'elbow', 'hand': 'hand'}
PATH_RE = re.compile(r'pose\.bones\["([^"]+)"\]\.rotation_quaternion')


def ensure_curves(action, bone, frames):
    curves = {}
    for index in range(4):
        path = f'pose.bones["{bone}"].rotation_quaternion'
        curve = next((c for c in action.fcurves
                      if c.data_path == path and c.array_index == index), None)
        if curve is None:
            curve = action.fcurves.new(path, index=index)
        existing = {int(k.co.x) for k in curve.keyframe_points}
        for frame in frames:
            if frame not in existing:
                curve.keyframe_points.insert(frame, 1.0 if index == 3 else 0.0)
        curves[index] = curve
    return curves


def rebuild(bpy):
    for action in bpy.data.actions:
        params = PARAMS.get(action.name)
        if not params:
            continue
        # Repère de frames : celui des upperarm, ou 0..120 si absent.
        reference = None
        for curve in action.fcurves:
            m = PATH_RE.search(curve.data_path)
            if m and 'upperarm' in m.group(1) and curve.array_index == 0:
                reference = sorted({int(k.co.x) for k in curve.keyframe_points})
                break
        frames = reference or list(range(0, 121, 4))
        for family, key in BONES.items():
            offset, amplitude = params[key]
            for side in ('L', 'R'):
                bone = f'{family}.{side}'
                curves = ensure_curves(action, bone, frames)
                side_phase = 0 if side == 'L' else math.pi
                for frame in frames:
                    phase = 2 * math.pi * frame / 121 + side_phase
                    if not params['alt']:
                        phase = 2 * math.pi * frame / 121
                    angle = math.radians(offset + amplitude * math.sin(phase))
                    q = Euler((angle, 0, 0), 'XYZ').to_quaternion()
                    for index, curve in curves.items():
                        kp = next(k for k in curve.keyframe_points
                                  if int(k.co.x) == frame)
                        kp.co.y = q[index]
                        kp.interpolation = 'LINEAR'
                        kp.handle_left.y = q[index]
                        kp.handle_right.y = q[index]
        print('[arms] reconstruites :', action.name)
