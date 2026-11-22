"""Retarget BVH par conjugaison des rotations locales entre repères de repos.

L_t = T_rest^-1 * (S_rest * L_s * S_rest^-1) * T_rest
"""
import bpy

arm = bpy.data.objects["Corps Rig"]
CLIP = globals().get("MOCAP_CLIP",
                     "/home/tasour/.cache/corps-sources/mocap-cmu/"
                     "60_10__salsa-dance__60fps.bvh")
NKEYS = 96
MAP = {
    "lowerback": "spine_lumbar", "upperback": "spine_thoracic",
    "thorax": "ribcage", "lowerneck": "spine_cervical", "head": "head",
    "lclavicle": "clavicle.L", "rclavicle": "clavicle.R",
    "lhumerus": "upperarm.L", "rhumerus": "upperarm.R",
    "lradius": "forearm.L", "rradius": "forearm.R",
    "lwrist": "hand.L", "rwrist": "hand.R",
    "lfemur": "thigh.L", "rfemur": "thigh.R",
    "ltibia": "shin.L", "rtibia": "shin.R",
    "lfoot": "foot.L", "rfoot": "foot.R",
}
before = set(bpy.data.objects)
bpy.ops.object.select_all(action="DESELECT")
arm.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.import_anim.bvh(filepath=CLIP, target="ARMATURE", global_scale=1.0,
                        use_fps_scale=True, update_scene_fps=False,
                        update_scene_duration=False, use_cyclic=False,
                        rotate_mode="NATIVE")
src = next(o for o in bpy.data.objects if o not in before and o.type == "ARMATURE")
scene = bpy.context.scene
fmin, fmax = src.animation_data.action.frame_range
scene.frame_start, scene.frame_end = 1, NKEYS
scene.render.fps = 24
if arm.animation_data and arm.animation_data.action:
    arm.animation_data.action = None
for pb in arm.pose.bones:
    pb.rotation_mode = "QUATERNION"

for ki in range(NKEYS):
    f = 1 + ki
    sf = fmin + 5 + (ki / (NKEYS - 1)) * (fmax - fmin - 5)
    scene.frame_set(int(round(sf)))
    for pb in arm.pose.bones:
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)
    for sname, tname in MAP.items():
        spb = src.pose.bones.get(sname)
        tpb = arm.pose.bones.get(tname)
        if not spb or not tpb:
            continue
        Sr = spb.bone.matrix_local.to_quaternion()
        Tr = tpb.bone.matrix_local.to_quaternion()
        Ls = spb.rotation_euler.to_quaternion()
        if Ls.angle > 1e-6:
            Ls = type(Ls)(Ls.axis, Ls.angle * 0.55)
        D = Sr @ Ls @ Sr.inverted()
        tpb.rotation_quaternion = Tr.inverted() @ D @ Tr
    for pb in arm.pose.bones:
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
        pb.keyframe_insert(data_path="location", frame=f, group=pb.name)

if arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"
bpy.data.objects.remove(src, do_unlink=True)
scene.frame_set(1)
print("[retarget-v3] terminé")
