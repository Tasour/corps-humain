"""Réduction douce des amplitudes du mocap (pas de discontinuité de clamp)."""
import bpy
import math
from mathutils import Quaternion

FACTOR = globals().get("SOFT_FACTOR", 0.85)
MAX_ANGLE = math.radians(100)
arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene

for pb in arm.pose.bones:
    for f in range(scene.frame_start, scene.frame_end + 1):
        scene.frame_set(f)
        q = pb.rotation_quaternion.copy()
        ang = q.angle
        if ang <= 1e-6:
            continue
        new = min(ang * FACTOR, MAX_ANGLE)
        if new < ang:
            pb.rotation_quaternion = Quaternion(q.axis, new)
            pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
scene.frame_set(1)
print("[soft] amplitudes réduites de", round((1 - FACTOR) * 100), "%")
