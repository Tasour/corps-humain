"""Retarget BVH par direction d'os, avec conversion des axes de repos.

Pour chaque os : on prend la direction source (projetée dans le plan frontal)
et on applique à l'os cible la rotation globale qui amène sa direction de repos
sur cette direction. Les os sont traités de la racine vers les extrémités.
"""
import bpy
import numpy as np
from mathutils import Matrix, Vector

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

# ordre hiérarchique (racine d'abord)
order = []
def visit(b):
    order.append(b.name)
    for c in b.children:
        visit(c)
for b in arm.data.bones:
    if b.parent is None:
        visit(b)

for pb in arm.pose.bones:
    pb.rotation_mode = "QUATERNION"

for ki in range(NKEYS):
    f = 1 + ki
    sf = fmin + 5 + (ki / (NKEYS - 1)) * (fmax - fmin - 5)
    scene.frame_set(int(round(sf)))
    bpy.context.view_layer.update()

    for pb in arm.pose.bones:
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)

    for name in order:
        tpb = arm.pose.bones[name]
        src_name = next((s for s, t in MAP.items() if t == name), None)
        if not src_name:
            continue
        spb = src.pose.bones.get(src_name)
        if not spb:
            continue
        sd = spb.tail - spb.head
        sd = Vector((sd.x, 0.0, sd.z))
        if sd.length < 1e-6:
            continue
        sd.normalize()
        rd = tpb.bone.tail_local - tpb.bone.head_local
        rd.normalize()
        q = rd.rotation_difference(sd)
        desired_rot = q @ tpb.bone.matrix_local.to_quaternion()
        local_rest = tpb.bone.matrix_local
        if tpb.parent:
            pm = tpb.parent.matrix
            head = (pm @ (tpb.parent.bone.matrix_local.inverted() @ local_rest)).translation
        else:
            head = local_rest.translation
        M = Matrix.Translation(head) @ desired_rot.to_matrix().to_4x4()
        tpb.matrix = M

    for pb in arm.pose.bones:
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
        pb.keyframe_insert(data_path="location", frame=f, group=pb.name)

if arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"

bpy.data.objects.remove(src, do_unlink=True)
scene.frame_set(1)
print("[retarget-v2] terminé", NKEYS)
