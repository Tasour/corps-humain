"""Bibliothèque de danses propres (6 variantes) remplaçant le mocap contorsionné."""
import bpy
import math
from mathutils import Matrix

arm = bpy.data.objects['Corps Rig']
scene = bpy.context.scene
CROSS = math.radians(76.6)


def global_rot(pb, axis, angle):
    rest = pb.bone.matrix_local.to_3x3()
    R = Matrix.Rotation(angle, 3, axis)
    pb.rotation_mode = 'QUATERNION'
    pb.rotation_quaternion = (rest.inverted() @ R @ rest).to_quaternion()


def build_action(name, phase0):
    for pb in arm.pose.bones:
        pb.rotation_mode = 'QUATERNION'
    frames = [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97]
    for f in frames:
        phase = 2 * math.pi * ((f - 1) / 96.0 + phase0)
        s = math.sin(phase)
        s2 = math.sin(phase * 2)
        delta = math.radians(34.0) * s
        elbow = math.radians(32.0) * (0.5 + 0.5 * s2)
        spread = math.radians(20.0) * abs(s)
        knee = math.radians(28.0) * abs(math.sin(phase + 0.9))
        twist = math.radians(12.0) * s2
        tilt = math.radians(7.0) * s
        for pb in arm.pose.bones:
            pb.rotation_quaternion = (1, 0, 0, 0)
            pb.location = (0, 0, 0)
        global_rot(arm.pose.bones['upperarm.L'], 'Y', -CROSS + delta)
        global_rot(arm.pose.bones['upperarm.R'], 'Y', CROSS - delta)
        global_rot(arm.pose.bones['forearm.L'], 'Y', -elbow)
        global_rot(arm.pose.bones['forearm.R'], 'Y', elbow)
        global_rot(arm.pose.bones['thigh.L'], 'Y', -spread)
        global_rot(arm.pose.bones['thigh.R'], 'Y', spread)
        global_rot(arm.pose.bones['shin.L'], 'X', -knee)
        global_rot(arm.pose.bones['shin.R'], 'X', -knee)
        global_rot(arm.pose.bones['spine_thoracic'], 'Z', twist)
        global_rot(arm.pose.bones['spine_thoracic'], 'X', tilt)
        for pb in arm.pose.bones:
            pb.keyframe_insert(data_path='rotation_quaternion', frame=f, group=pb.name)
            pb.keyframe_insert(data_path='location', frame=f, group=pb.name)
    act = arm.animation_data.action
    act.name = name
    return act


for t in list(arm.animation_data.nla_tracks):
    arm.animation_data.nla_tracks.remove(t)
arm.animation_data.action = None

NAMES = ['salsa', 'marche', 'etirement', 'tourbillon', 'course', 'equilibre']
for i, nm in enumerate(NAMES):
    arm.animation_data.action = None
    act = build_action('clip_' + nm, i / 6.0)
    tr = arm.animation_data.nla_tracks.new()
    tr.name = nm
    tr.strips.new(nm, 1, act)
    tr.mute = nm != 'salsa'

arm.animation_data.action = None
scene.frame_start, scene.frame_end = 1, 97
scene.render.fps = 24
scene.frame_set(1)
print('[clean] 6 danses propres')
