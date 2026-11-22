"""Os de contrôle IK dédiés aux pieds et aux mains, influence prudente."""
import bpy

arm = bpy.data.objects['Corps Rig']
scene = bpy.context.scene
INFLUENCE = globals().get('IK_INFLUENCE', 0.05)

# contrôles aux positions actuelles des extrémités
for side in ('L', 'R'):
    for src, ctrl in ((f'foot.{side}', f'foot_ctrl.{side}'),
                      (f'hand.{side}', f'hand_ctrl.{side}')):
        if ctrl in arm.data.bones:
            continue
        pb = arm.pose.bones[src]
        pos = pb.matrix.translation.copy()
        bpy.ops.object.select_all(action='DESELECT')
        arm.select_set(True)
        bpy.context.view_layer.objects.active = arm
        bpy.ops.object.mode_set(mode='EDIT')
        eb = arm.data.edit_bones.new(ctrl)
        eb.head = pos
        eb.tail = pos + __import__('mathutils').Vector((0, 0.06, 0))
        bpy.ops.object.mode_set(mode='OBJECT')
        print('[ik] contrôle', ctrl)

for side in ('L', 'R'):
    shin = arm.pose.bones[f'shin.{side}']
    fore = arm.pose.bones[f'forearm.{side}']
    for pb, target, chain in ((shin, f'foot_ctrl.{side}', 2),
                              (fore, f'hand_ctrl.{side}', 2)):
        for c in list(pb.constraints):
            if c.type == 'IK':
                pb.constraints.remove(c)
        c = pb.constraints.new('IK')
        c.target = arm
        c.subtarget = target
        c.chain_count = chain
        c.influence = INFLUENCE
        print('[ik]', pb.name, '->', target, INFLUENCE)
scene.frame_set(1)
