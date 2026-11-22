"""Fond la fin de la boucle sur son début pour une transition sans saut."""
import bpy

arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene
N = scene.frame_end
BLEND = 10

for pb in arm.pose.bones:
    orig = {}
    for f in range(N - BLEND + 1, N + 1):
        scene.frame_set(f)
        orig[f] = pb.rotation_quaternion.copy()
    targets = {}
    for i in range(BLEND):
        scene.frame_set(i + 1)
        targets[i + 1] = pb.rotation_quaternion.copy()
    for i, f in enumerate(range(N - BLEND + 1, N + 1)):
        q0 = orig[f]
        q1 = targets[i + 1]
        if q0.dot(q1) < 0:
            q1 = -q1
        t = (i + 1) / BLEND
        q = q0 + (q1 - q0) * t
        q.normalize()
        scene.frame_set(f)
        pb.rotation_quaternion = q
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)

scene.frame_set(1)
print("[loop] transition cyclique sur", BLEND, "frames")
