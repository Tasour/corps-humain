"""Rend les séquences PNG pour chaque couche et chaque vue, puis encode en MP4.

Paramètres globaux :
  VIDEO_PREFIX = 'femme' | 'homme'
  VIDEO_DIR    = dossier de sortie
"""
import bpy
import json
import os
import subprocess
import math
from mathutils import Vector

PREFIX = globals().get("VIDEO_PREFIX", "femme")
OUT = globals().get("VIDEO_DIR", "/home/tasour/corps-humain/docs/videos")
os.makedirs(OUT, exist_ok=True)

scene = bpy.context.scene
scene.render.resolution_x = 320
scene.render.resolution_y = 370
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.view_settings.view_transform = "Standard"
scene.frame_start = 1
scene.frame_end = 48
scene.render.fps = 12

# La danse complète (96 clés) est compressée sur 48 frames rendues.
_arm = bpy.data.objects.get("Corps Rig")
if _arm and _arm.animation_data and _arm.animation_data.action:
    for _fc in _arm.animation_data.action.fcurves:
        for _kp in _fc.keyframe_points:
            _kp.co.x = 1.0 + (_kp.co.x - 1.0) * 0.5
            _kp.handle_left.x = 1.0 + (_kp.handle_left.x - 1.0) * 0.5
            _kp.handle_right.x = 1.0 + (_kp.handle_right.x - 1.0) * 0.5

catalog = json.load(open("/home/tasour/.cache/corps-sources/open-anatomy-3d/"
                         "node_modules/open-anatomy-3d/catalog.json"))
SYSTEM = {e["key"]: e["system"] for e in catalog}

VIEWS = {
    "face": (Vector((0.0, -3.6, 0.85)), Vector((0.0, 0.0, 0.85))),
    "trois-quarts": (Vector((2.2, -3.0, 1.0)), Vector((0.0, 0.0, 0.85))),
    "profil": (Vector((3.6, 0.0, 0.85)), Vector((0.0, 0.0, 0.85))),
}
LAYERS = ["peau", "muscles", "squelette", "organes", "toutes"]


def set_layer(layer):
    for o in bpy.data.objects:
        if o.type != "MESH":
            continue
        system = SYSTEM.get(o.name)
        visible = (layer == "toutes") or (layer == "peau" and o.name.startswith("skin")) \
            or (layer == "muscles" and system == "muscles") \
            or (layer == "squelette" and system == "skeleton") \
            or (layer == "organes" and system == "organs")
        o.hide_render = not visible
        o.hide_set(not visible)


cam = scene.camera
jobs = []
for layer in LAYERS:
    views = ["face"] if layer == "toutes" else list(VIEWS)
    for view in views:
        loc, target = VIEWS[view]
        cam.location = loc
        cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
        set_layer(layer)
        seq = f"/tmp/opencode/videos/{PREFIX}-{layer}-{view}"
        os.makedirs(seq, exist_ok=True)
        scene.render.filepath = seq + "/f"
        jobs.append((layer, view, seq))


def render_all():
    for layer, view, seq in jobs:
        scene.render.filepath = seq + "/f"
        bpy.ops.render.render(animation=True)
        mp4 = f"{OUT}/{PREFIX}-{layer}-{view}.mp4"
        cmd = ["ffmpeg", "-y", "-loglevel", "error", "-framerate", "12",
               "-i", seq + "/f%04d.png", "-c:v", "libx264", "-crf", "18",
               "-pix_fmt", "yuv420p", mp4]
        subprocess.run(cmd, check=False)
        print("VIDEO", mp4)
    return None


bpy.app.timers.register(render_all, first_interval=0.5)
print(f"[video] {len(jobs)} séquences planifiées pour {PREFIX}")
