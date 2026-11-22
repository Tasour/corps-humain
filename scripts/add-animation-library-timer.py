"""Ajoute 3 clips retargetés en pistes NLA, exécuté via timer (contexte complet)."""
import bpy

arm = bpy.data.objects["Corps Rig"]
base = "/home/tasour/.cache/corps-sources/mocap-cmu/"
CLIPS = [
    ("salsa", base + "60_10__salsa-dance__60fps.bvh"),
    ("marche", base + "82_08__stand-still-casual-walk-forward__120fps.bvh"),
    ("etirement", base + "141_13__stretch-and-yawn__120fps.bvh"),
]


def build():
    for tr in list(arm.animation_data.nla_tracks):
        arm.animation_data.nla_tracks.remove(tr)
    arm.animation_data.action = None
    for name, path in CLIPS:
        bpy.ops.object.select_all(action="DESELECT")
        arm.select_set(True)
        bpy.context.view_layer.objects.active = arm
        arm.animation_data.action = None
        globals()["MOCAP_CLIP"] = path
        exec(open("/home/tasour/corps-humain/scripts/retarget-mocap.py").read())
        act = arm.animation_data.action
        act.name = "clip_" + name
        track = arm.animation_data.nla_tracks.new()
        track.name = name
        track.strips.new(name, 1, act)
        track.mute = name != "salsa"
        print("[nla]", name)
    arm.animation_data.action = None
    bpy.context.scene.frame_set(1)
    print("[nla] DONE")
    return None


bpy.app.timers.register(build, first_interval=0.5)
print("[nla] planifié")
