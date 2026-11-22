"""Ajoute 3 clips retargetés en pistes NLA (salsa, marche, étirement).

Important : ne pas appeler bpy.ops.object.select_all avant l'import BVH,
cela casse le contexte d'objet actif dans la session MCP.
"""
import bpy

arm = bpy.data.objects["Corps Rig"]
base = "/home/tasour/.cache/corps-sources/mocap-cmu/"
CLIPS = [
    ("salsa", base + "60_10__salsa-dance__60fps.bvh"),
    ("marche", base + "82_08__stand-still-casual-walk-forward__120fps.bvh"),
    ("etirement", base + "141_13__stretch-and-yawn__120fps.bvh"),
]

for t in list(arm.animation_data.nla_tracks):
    arm.animation_data.nla_tracks.remove(t)
arm.animation_data.action = None

for name, path in CLIPS:
    arm.animation_data.action = None
    bpy.context.view_layer.objects.active = arm
    globals()["MOCAP_CLIP"] = path
    exec(open("/home/tasour/corps-humain/scripts/retarget-mocap.py").read())
    act = arm.animation_data.action
    act.name = "clip_" + name
    tr = arm.animation_data.nla_tracks.new()
    tr.name = name
    tr.strips.new(name, 1, act)
    tr.mute = name != "salsa"
    print("[nla]", name)

arm.animation_data.action = None
bpy.context.scene.frame_set(1)
print("[nla] 3 clips prêts")
