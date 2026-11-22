"""Exporte un GLB animé par sexe depuis la scène Blender sauvegardée."""
import bpy
import os

SEX = globals().get("HUMAIN_SEX", "female")
BLEND = (f"/home/tasour/corps-humain/docs/humain-"
         f"{'femme' if SEX == 'female' else 'homme'}-complet.blend")
OUT = f"/home/tasour/corps-humain/docs/models/corps-{SEX}.glb"
os.makedirs(os.path.dirname(OUT), exist_ok=True)

bpy.ops.wm.open_mainfile(filepath=BLEND)
for o in bpy.data.objects:
    if o.type == "MESH":
        o.hide_render = False
        o.hide_set(False)
bpy.context.scene.frame_set(1)
_arm = bpy.data.objects.get("Corps Rig")
if _arm:
    bpy.ops.object.select_all(action="DESELECT")
    _arm.select_set(True)
    bpy.context.view_layer.objects.active = _arm

bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    use_selection=False,
    export_cameras=False,
    export_lights=False,
    export_animations=True,
    export_animation_mode="ACTIONS",
    export_apply=False,
)
print("[glb]", OUT, os.path.getsize(OUT), "octets")
