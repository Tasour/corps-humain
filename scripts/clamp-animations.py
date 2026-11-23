"""Applique les amplitudes articulaires standard aux actions Blender.

Clamp par angle global de rotation locale : on réduit l'angle si nécessaire en
gardant l'axe d'origine. Un clamp par axe Euler tordait les poses (jambes
relevées le long du torse) car les axes locaux du rig ne correspondent pas aux
plans anatomiques.
"""
import json
import math
import re
from mathutils import Quaternion

SPEC = '/home/tasour/corps-humain/docs/models/joint-limits.json'


def base_name(name):
    return name.lower().replace('.l', '').replace('.r', '').replace('_l', '').replace('_r', '')


def clamp_actions(bpy):
    spec = json.load(open(SPEC))['joints']
    pattern = re.compile(r'pose\.bones\["([^"]+)"\]\.rotation_quaternion')
    for action in bpy.data.actions:
        if not action.name.startswith('clip_'):
            continue
        groups = {}
        for curve in action.fcurves:
            m = pattern.search(curve.data_path)
            if not m or curve.array_index > 3:
                continue
            groups.setdefault(m.group(1), {})[curve.array_index] = curve

        for bone, axes_curves in groups.items():
            limit = spec.get(base_name(bone))
            if not limit or len(axes_curves) != 4:
                continue
            max_angle = math.radians(limit['maxAngle'])
            frames = set()
            for curve in axes_curves.values():
                frames.update(int(kp.co.x) for kp in curve.keyframe_points)
            for frame in frames:
                q = Quaternion()
                for index, curve in axes_curves.items():
                    kp = next((k for k in curve.keyframe_points if int(k.co.x) == frame), None)
                    if kp:
                        q[index] = kp.co.y
                if q.magnitude == 0:
                    continue
                q.normalize()
                angle = 2 * math.acos(min(1, abs(q.w)))
                if angle <= max_angle:
                    continue
                q = Quaternion((1, 0, 0, 0)).slerp(q, max_angle / angle)
                for index, curve in axes_curves.items():
                    kp = next(k for k in curve.keyframe_points if int(k.co.x) == frame)
                    kp.co.y = q[index]
                    kp.handle_left.y = q[index]
                    kp.handle_right.y = q[index]
        print('[limits] action bornée :', action.name)
