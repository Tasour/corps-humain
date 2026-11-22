"""Clamp des amplitudes articulaires après retarget (sécurité anatomique)."""
import bpy
import math
from mathutils import Quaternion

LIMITS = {
    "upperarm": 75, "upperarm_twist": 45, "forearm": 70, "forearm_twist": 45,
    "hand": 45, "thigh": 60, "shin": 70, "foot": 40, "toe": 25,
    "clavicle": 25, "scapula": 25, "spine": 20, "ribcage": 20,
    "head": 35, "jaw": 15, "pelvis": 15, "root": 10,
}
arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene
for pb in arm.pose.bones:
    n = pb.name
    limit = None
    for key, val in LIMITS.items():
        if n.startswith(key):
            limit = val
            break
    if limit is None:
        limit = 30
    maxq = math.radians(limit)
    for f in range(scene.frame_start, scene.frame_end + 1):
        scene.frame_set(f)
        q = pb.rotation_quaternion.copy()
        ang = q.angle
        if ang > maxq:
            axis = q.axis
            pb.rotation_quaternion = Quaternion(axis, maxq)
            pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=n)
scene.frame_set(1)
print("[clamp] amplitudes limitées")
