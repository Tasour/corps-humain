"""Retarget d'un clip BVH CMU vers le rig anatomique (femme ou homme).

Usage dans Blender :
    HUMAIN_SEX='female'
    MOCAP_CLIP='/home/tasour/.cache/corps-sources/mocap-cmu/60_10__salsa-dance__60fps.bvh'
    exec(open('.../retarget-mocap.py').read())
"""
import bpy
import math
import numpy as np
from mathutils import Matrix, Quaternion, Vector

SEX = globals().get("HUMAIN_SEX", "female")
CLIP = globals().get("MOCAP_CLIP",
                     "/home/tasour/.cache/corps-sources/mocap-cmu/"
                     "60_10__salsa-dance__60fps.bvh")
NKEYS = 96

MAP = {
    "lowerback": "spine_lumbar", "upperback": "spine_thoracic",
    "thorax": "ribcage", "lowerneck": "spine_cervical",
    "head": "head",
    "lclavicle": "clavicle.L", "lhumerus": "upperarm.L",
    "lradius": "forearm.L",
    "rclavicle": "clavicle.R", "rhumerus": "upperarm.R",
    "rradius": "forearm.R",
    "lfemur": "thigh.L", "ltibia": "shin.L",
    "rfemur": "thigh.R", "rtibia": "shin.R",
}

arm = bpy.data.objects["Corps Rig"]
before = set(bpy.data.objects)
bpy.ops.import_anim.bvh(filepath=CLIP, target="ARMATURE", global_scale=1.0,
                        use_fps_scale=True, update_scene_fps=False,
                        update_scene_duration=False, use_cyclic=False,
                        rotate_mode="NATIVE")
src = next(o for o in bpy.data.objects if o not in before and o.type == "ARMATURE")
src_action = src.animation_data.action
frame_min, frame_max = src_action.frame_range
print(f"[mocap] {CLIP.split('/')[-1]} -> {frame_min:.0f}-{frame_max:.0f} frames")

scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = NKEYS
scene.render.fps = 24

# Réinitialise l'action du rig
if arm.animation_data and arm.animation_data.action:
    arm.animation_data.action = None

prev_quat = {}
root_origin = None

for ki in range(NKEYS):
    t = ki / (NKEYS - 1)
    sf = frame_min + 5 + t * (frame_max - frame_min - 5)
    scene.frame_set(int(round(sf)))
    bpy.context.view_layer.update()

    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)

    for sname, tname in MAP.items():
        spb = src.pose.bones.get(sname)
        tpb = arm.pose.bones.get(tname)
        if not spb or not tpb:
            continue
        q = spb.rotation_euler.to_quaternion()
        prev = prev_quat.get(tpb.name)
        if prev is not None and q.dot(prev) < 0:
            q = -q
        prev_quat[tpb.name] = q.copy()
        tpb.rotation_quaternion = q

    # Mouvement retargeté sur place : translation de racine neutralisée.
    arm.pose.bones["root"].location = (0.0, 0.0, 0.0)

    f = ki + 1
    for pb in arm.pose.bones:
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
        pb.keyframe_insert(data_path="location", frame=f, group=pb.name)

if arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"

bpy.data.objects.remove(src, do_unlink=True)
scene.frame_set(1)
print(f"[mocap] retarget {SEX} : {NKEYS} clés — READY")
