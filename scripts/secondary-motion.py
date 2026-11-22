"""Mouvement secondaire par oscillation de la transformation des organes."""
import bpy
import math

scene = bpy.context.scene
TARGETS = {
    'lung_l': (0.0025, 0.0), 'lung_r': (0.0025, 0.0),
    'heart': (0.0018, 0.0012), 'breast_l': (0.0015, 0.0),
    'breast_r': (0.0015, 0.0),
}
for name, (amp_z, amp_y) in TARGETS.items():
    ob = bpy.data.objects.get(name)
    if not ob:
        continue
    base = ob.location.copy()
    for f in range(1, 97):
        t = 2 * math.pi * (f - 1) / 24
        ob.location = (base.x, base.y + amp_y * math.sin(t), base.z + amp_z * math.sin(t))
        ob.keyframe_insert(data_path='location', frame=f, group=name)
    ob.location = base
print('[second] mouvement secondaire appliqué')
scene.frame_set(1)
