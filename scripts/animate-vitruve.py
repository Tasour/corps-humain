"""Pose « en croix » + boucle de danse sur l'armature Vitruve.

96 images à 24 fps. La danse est procédurale et bouclée : elle sert de test
de stress des articulations (épaules, coudes, hanches, genoux).
"""
import bpy
import math
import numpy as np
from mathutils import Matrix

arm = bpy.data.objects["Vitruve Rig"]
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 97
scene.render.fps = 24

CROSS = math.radians(76.6)


def global_rot(pb, axis, angle):
    """Rotation exprimée dans l'espace de l'armature, convertie en local."""
    rest = pb.bone.matrix_local.to_3x3()
    R = Matrix.Rotation(angle, 3, axis)
    pb.rotation_mode = "QUATERNION"
    pb.rotation_quaternion = (rest.inverted() @ R @ rest).to_quaternion()


def apply_pose(f):
    phase = 2.0 * math.pi * (f - 1) / 96.0
    s = math.sin(phase)
    s2 = math.sin(phase * 2.0)
    c2 = math.cos(phase * 2.0)

    delta = math.radians(34.0) * s
    elbow = math.radians(32.0) * (0.5 + 0.5 * s2)
    spread = math.radians(20.0) * abs(s)
    knee = math.radians(28.0) * abs(math.sin(phase + 0.9))
    twist = math.radians(12.0) * s2
    tilt = math.radians(7.0) * s

    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
        pb.rotation_quaternion = (1.0, 0.0, 0.0, 0.0)
        pb.location = (0.0, 0.0, 0.0)

    global_rot(arm.pose.bones["upperarm.L"], "Y", -CROSS + delta)
    global_rot(arm.pose.bones["upperarm.R"], "Y", CROSS - delta)
    global_rot(arm.pose.bones["forearm.L"], "Y", -elbow)
    global_rot(arm.pose.bones["forearm.R"], "Y", elbow)
    global_rot(arm.pose.bones["hand.L"], "X", math.radians(15.0) * s)
    global_rot(arm.pose.bones["hand.R"], "X", -math.radians(15.0) * s)

    global_rot(arm.pose.bones["thigh.L"], "Y", -spread)
    global_rot(arm.pose.bones["thigh.R"], "Y", spread)
    global_rot(arm.pose.bones["shin.L"], "X", -knee)
    global_rot(arm.pose.bones["shin.R"], "X", -knee)
    global_rot(arm.pose.bones["foot.L"], "X", knee * 0.4)
    global_rot(arm.pose.bones["foot.R"], "X", knee * 0.4)

    global_rot(arm.pose.bones["chest"], "Z", twist)
    global_rot(arm.pose.bones["chest"], "X", tilt)
    global_rot(arm.pose.bones["head"], "Z", -twist * 0.5)
    global_rot(arm.pose.bones["neck"], "X", -tilt * 0.5)

    arm.pose.bones["root"].location = (
        0.04 * s, 0.0, 0.02 * c2
    )


# ── clés ───────────────────────────────────────────────────────────────────
KEY_FRAMES = [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97]
for f in KEY_FRAMES:
    apply_pose(f)
    for pb in arm.pose.bones:
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
        pb.keyframe_insert(data_path="location", frame=f, group=pb.name)

# Interpolation linéaire pour un mouvement régulier
if arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"

# ── carré recalculé sur la pose en croix ───────────────────────────────────
scene.frame_set(1)
deps = bpy.context.evaluated_depsgraph_get()
ob = bpy.data.objects["Vitruve — muscle"]
ev = ob.evaluated_get(deps)
a = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
ev.data.vertices.foreach_get("co", a)
posed = a.reshape(-1, 3)
R = float(np.abs(posed[:, 0]).max())
z0 = float(posed[:, 2].min())
S = 2.0 * R
square = bpy.data.objects["Carré de Vitruve"]
curve = square.data
curve.splines.clear()
y_plane = -0.38
sp = curve.splines.new("POLY")
corners = [(-R, y_plane, z0), (R, y_plane, z0), (R, y_plane, z0 + S),
           (-R, y_plane, z0 + S), (-R, y_plane, z0)]
sp.points.add(len(corners) - 1)
for pt, c in zip(sp.points, corners):
    pt.co = (*c, 1.0)
sp.use_cyclic_u = True
cam = bpy.data.objects["Caméra Vitruve"]
cam.location.z = z0 + S * 0.5
cam.data.ortho_scale = S * 1.30
print(f"[danse] envergure posée R={R:.4f}, carré={S:.4f} m")

scene.frame_set(1)
print(f"[danse] {len(KEY_FRAMES)} clés, frames 1-97 @24fps — READY")
