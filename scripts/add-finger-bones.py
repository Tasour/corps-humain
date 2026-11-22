"""Ajoute 30 os de doigts et un os de langue au rig (sans modifier l'animation)."""
import bpy
from mathutils import Vector

arm = bpy.data.objects['Corps Rig']
existing = set(arm.data.bones.keys())
bpy.ops.object.select_all(action='DESELECT')
arm.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.object.mode_set(mode='EDIT')

for side, sgn in (('L', 1), ('R', -1)):
    hand = arm.data.edit_bones.get(f'hand.{side}')
    if not hand:
        continue
    root = Vector(hand.tail)
    for fi in range(5):
        spread = (fi - 2) * 0.012
        base = root + Vector((0.0, spread, -0.012 * abs(fi - 2)))
        parent = hand
        for seg in range(3):
            name = f'finger{fi+1}_{seg+1}.{side}'
            if name in existing:
                parent = arm.data.edit_bones[name]
                continue
            eb = arm.data.edit_bones.new(name)
            start = base + Vector((sgn * 0.022 * seg, spread * 0.1, -0.004 * seg))
            end = start + Vector((sgn * 0.022, 0.0, -0.004))
            eb.head, eb.tail = start, end
            eb.parent = parent
            parent = eb

if 'tongue' not in existing:
    eb = arm.data.edit_bones.new('tongue')
    eb.head = (0.0, 0.045, 1.44)
    eb.tail = (0.0, 0.085, 1.47)
    eb.parent = arm.data.edit_bones['head']

bpy.ops.object.mode_set(mode='OBJECT')
print('[rig] os:', len(arm.data.bones))
