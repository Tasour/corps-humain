"""Ajoute 3 clips supplémentaires aux pistes NLA existantes."""
import bpy

arm = bpy.data.objects['Corps Rig']
base = '/home/tasour/.cache/corps-sources/mocap-cmu/'
EXTRA = [
    ('tourbillon', base + '55_01__dance-whirl__120fps.bvh'),
    ('course', base + '111_24__run__120fps.bvh'),
    ('equilibre', base + '49_20__balance-on-one-leg-outstretched-arms__120fps.bvh'),
]
for name, path in EXTRA:
    if name in [t.name for t in arm.animation_data.nla_tracks]:
        continue
    arm.animation_data.action = None
    bpy.context.view_layer.objects.active = arm
    globals()['MOCAP_CLIP'] = path
    exec(open('/home/tasour/corps-humain/scripts/retarget-mocap.py').read())
    act = arm.animation_data.action
    act.name = 'clip_' + name
    tr = arm.animation_data.nla_tracks.new()
    tr.name = name
    tr.strips.new(name, 1, act)
    tr.mute = True
    print('[nla]', name)
arm.animation_data.action = None
bpy.context.scene.frame_set(1)
print('[nla] bibliothèque étendue:', [t.name for t in arm.animation_data.nla_tracks])
