"""Une seule vidéo de validation par sexe : toutes les couches, vue face.

Corrige le bug du rendu précédent (caméra/couche appliqués une seule fois).
"""
import bpy
import os
import subprocess
from mathutils import Vector

PREFIX = globals().get("VIDEO_PREFIX", "femme")
OUT = "/home/tasour/corps-humain/docs/videos"
os.makedirs(OUT, exist_ok=True)

scene = bpy.context.scene
scene.render.resolution_x = 320
scene.render.resolution_y = 370
scene.render.image_settings.file_format = "PNG"
scene.frame_start = 1
scene.frame_end = 48

arm = bpy.data.objects.get("Corps Rig")
if arm and arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.co.x = 1.0 + (kp.co.x - 1.0) * 0.5
            kp.handle_left.x = 1.0 + (kp.handle_left.x - 1.0) * 0.5
            kp.handle_right.x = 1.0 + (kp.handle_right.x - 1.0) * 0.5

for o in bpy.data.objects:
    if o.type == "MESH":
        coup = o.name.startswith("Plan coupe") or o.name.startswith("Peau coupe")
        o.hide_render = coup
        o.hide_set(coup)


def _zero_root(scene):
    rig = bpy.data.objects.get("Corps Rig")
    if rig:
        rig.pose.bones["root"].location = (0.0, 0.0, 0.0)


if _zero_root not in bpy.app.handlers.frame_change_pre:
    bpy.app.handlers.frame_change_pre.append(_zero_root)

cam = scene.camera
loc = Vector((0.0, -3.6, 0.85))
target = Vector((0.0, 0.0, 0.85))
cam.location = loc
cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()

seq = f"/tmp/opencode/videos/final-{PREFIX}"
os.makedirs(seq, exist_ok=True)
scene.render.filepath = seq + "/f"


def render():
    bpy.context.view_layer.update()
    bpy.ops.render.render(animation=True)
    mp4 = f"{OUT}/{PREFIX}-validation.mp4"
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", "12",
                    "-i", seq + "/f%04d.png", "-c:v", "libx264", "-crf", "18",
                    "-pix_fmt", "yuv420p", mp4], check=False)
    print("VIDEO FINAL", mp4)
    return None


bpy.app.timers.register(render, first_interval=0.5)
print(f"[video] validation {PREFIX} planifiée")
