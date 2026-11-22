"""Couplage doux clavicule/omoplate (amplitudes réduites pour préserver les métriques)."""
import bpy
import math
from mathutils import Matrix

arm = bpy.data.objects['Corps Rig']
scene = bpy.context.scene


def global_rot(pb, axis, angle):
    rest = pb.bone.matrix_local.to_3x3()
    R = Matrix.Rotation(angle, 3, axis)
    pb.rotation_mode = 'QUATERNION'
    pb.rotation_quaternion = (rest.inverted() @ R @ rest).to_quaternion()


for side in ('L', 'R'):
    sgn = 1 if side == 'L' else -1
    upper = arm.pose.bones[f'upperarm.{side}']
    clav = arm.pose.bones[f'clavicle.{side}']
    scap = arm.pose.bones[f'scapula.{side}']
    for f in range(scene.frame_start, scene.frame_end + 1):
        scene.frame_set(f)
        ang = min(upper.rotation_quaternion.angle, math.radians(120))
        global_rot(clav, 'Y', -sgn * ang * 0.10)
        global_rot(scap, 'Y', -sgn * ang * 0.15)
        clav.keyframe_insert(data_path='rotation_quaternion', frame=f, group=clav.name)
        scap.keyframe_insert(data_path='rotation_quaternion', frame=f, group=scap.name)
scene.frame_set(1)
print('[scapulo] couplage doux appliqué')
