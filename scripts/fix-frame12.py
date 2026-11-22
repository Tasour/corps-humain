"""Lisse le pic du frame 12 en interpolant les poses 11 et 13."""
import bpy

arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene


def quat_at(pb, f):
    scene.frame_set(f)
    return pb.rotation_quaternion.copy()


for pb in arm.pose.bones:
    q11 = quat_at(pb, 11)
    q13 = quat_at(pb, 13)
    if q11.dot(q13) < 0:
        q13 = -q13
    q = q11 + (q13 - q11) * 0.5
    q.normalize()
    scene.frame_set(12)
    pb.rotation_quaternion = q
    pb.keyframe_insert(data_path="rotation_quaternion", frame=12, group=pb.name)

scene.frame_set(1)
print("[fix12] frame 12 interpolé")
