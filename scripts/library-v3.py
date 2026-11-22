"""Bibliothèque NLA complète utilisant retarget-v3 (conjugaison des repos)."""
import bpy

arm = bpy.data.objects["Corps Rig"]
base = "/home/tasour/.cache/corps-sources/mocap-cmu/"
CLIPS = [
    ("salsa", base + "60_10__salsa-dance__60fps.bvh"),
    ("marche", base + "82_08__stand-still-casual-walk-forward__120fps.bvh"),
    ("etirement", base + "141_13__stretch-and-yawn__120fps.bvh"),
    ("tourbillon", base + "55_01__dance-whirl__120fps.bvh"),
    ("course", base + "111_24__run__120fps.bvh"),
    ("equilibre", base + "49_20__balance-on-one-leg-outstretched-arms__120fps.bvh"),
]
for t in list(arm.animation_data.nla_tracks):
    arm.animation_data.nla_tracks.remove(t)
arm.animation_data.action = None
for name, path in CLIPS:
    bpy.ops.object.select_all(action="DESELECT")
    arm.select_set(True)
    bpy.context.view_layer.objects.active = arm
    arm.animation_data.action = None
    globals()["MOCAP_CLIP"] = path
    exec(open("/home/tasour/corps-humain/scripts/retarget-v3.py").read())
    act = arm.animation_data.action
    act.name = "clip_" + name
    tr = arm.animation_data.nla_tracks.new()
    tr.name = name
    tr.strips.new(name, 1, act)
    tr.mute = name != "salsa"
    print("[lib]", name)
arm.animation_data.action = None
bpy.context.scene.frame_set(1)
print("[lib] 6 clips prêts")
