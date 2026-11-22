"""Lissage temporel des quaternions de la boucle mocap (moyenne mobile ±1)."""
import bpy

arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene
n = scene.frame_end - scene.frame_start + 1

for pb in arm.pose.bones:
    qs = []
    for f in range(scene.frame_start, scene.frame_end + 1):
        scene.frame_set(f)
        qs.append(pb.rotation_quaternion.copy())
    # déroulement des signes
    for i in range(1, len(qs)):
        if qs[i].dot(qs[i-1]) < 0:
            qs[i] = -qs[i]
    smooth = []
    for i in range(len(qs)):
        window = qs[max(0, i-1):min(len(qs), i+2)]
        q = window[0].copy()
        for other in window[1:]:
            q = q + (other - q) * (1.0 / len(window))
        q.normalize()
        smooth.append(q)
    for i, q in enumerate(smooth):
        scene.frame_set(scene.frame_start + i)
        pb.rotation_quaternion = q
        pb.keyframe_insert(data_path="rotation_quaternion",
                           frame=scene.frame_start + i, group=pb.name)
scene.frame_set(1)
print("[temp] lissage temporel appliqué")
