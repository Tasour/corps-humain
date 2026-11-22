"""Finalisation : peau animée, couches internes en référence anatomique statique."""
import bpy
import json
import math

scene = bpy.context.scene
catalog = json.load(open("/home/tasour/.cache/corps-sources/open-anatomy-3d/"
                         "node_modules/open-anatomy-3d/catalog.json"))
SYSTEM_OF = {e["key"]: e["system"] for e in catalog}

# Couleurs par système
COLORS = {
    "skeleton": (0.88, 0.84, 0.72), "muscles": (0.58, 0.20, 0.22),
    "organs": (0.72, 0.38, 0.34), "vessels": (0.55, 0.18, 0.20),
    "nerves": (0.85, 0.72, 0.30), "skin": (0.72, 0.50, 0.42),
}
for system, color in COLORS.items():
    m = bpy.data.materials.get("Mat " + system) or bpy.data.materials.new("Mat " + system)
    m.use_nodes = True
    bs = next(n for n in m.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    bs.inputs["Base Color"].default_value = (*color, 1)
    bs.inputs["Roughness"].default_value = 0.8
    for o in bpy.data.objects:
        if o.type == "MESH" and SYSTEM_OF.get(o.name) == system:
            o.data.materials.clear()
            o.data.materials.append(m)

# Internes : référence anatomique statique, sans déformation
for o in bpy.data.objects:
    if o.type != "MESH" or o.name.startswith("skin"):
        continue
    for m in list(o.modifiers):
        if m.type == "ARMATURE":
            o.modifiers.remove(m)
    o.hide_render = True
    o.hide_set(True)

# Peau animée visible
for o in bpy.data.objects:
    if o.type == "MESH" and o.name.startswith("skin"):
        o.hide_render = False
        o.hide_set(False)

scene.frame_set(1)
scene.render.resolution_x = 1200
scene.render.resolution_y = 1300
scene.render.image_settings.file_format = "PNG"
scene.view_settings.view_transform = "Standard"
print("[final] pret")
