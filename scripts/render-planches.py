"""Rend 4 vues (face, dos, profil, 3/4) de la scène courante."""
import bpy
import os

SEX = globals().get('HUMAIN_SEX', 'femme')
BLEND = f'/home/tasour/corps-humain/docs/humain-{SEX}-complet.blend'
bpy.ops.wm.open_mainfile(filepath=BLEND)
OUT = f'/tmp/opencode/planches/{SEX}'
os.makedirs(OUT, exist_ok=True)
scene = bpy.context.scene
scene.render.resolution_x = 360
scene.render.resolution_y = 420
scene.render.image_settings.file_format = 'PNG'
scene.frame_set(1)
# La racine du mocap translate le corps : on la neutralise pour la planche.
_arm = bpy.data.objects.get('Corps Rig')
if _arm:
    for tr in _arm.animation_data.nla_tracks:
        tr.mute = True
    _arm.animation_data.action = None
    for pb in _arm.pose.bones:
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)
    bpy.context.view_layer.update()
for ob in bpy.data.objects:
    if ob.type == 'MESH':
        vis = ob.name.startswith('skin')
        ob.hide_render = not vis
        ob.hide_set(not vis)

CAMERAS = [('face', 'Camera'), ('dos', 'Cam Dos'),
           ('profil', 'Cam Profil'), ('3-4', 'Cam 3-4')]
for name, cam_name in CAMERAS:
    cam = bpy.data.objects.get(cam_name) or bpy.data.objects.get('Caméra')
    if not cam:
        continue
    scene.camera = cam
    scene.render.filepath = f'{OUT}/{name}.png'
    bpy.ops.render.render(write_still=True)
    print('[planche]', name)
