"""Pose en croix + danse sur le rig du corps open-anatomy-3d."""
import bpy
import math
import json
from mathutils import Matrix

SEX = globals().get("HUMAIN_SEX", "female")
_catalog = json.load(open("/home/tasour/.cache/corps-sources/open-anatomy-3d/"
                          "node_modules/open-anatomy-3d/catalog.json"))
_joints = {e["key"]: (e["anchor"] if SEX == "male" else e["anchorFemale"])
           for e in _catalog if e.get("system") == "joints"}

arm = bpy.data.objects["Corps Rig"]
scene = bpy.context.scene
scene.frame_start = 1
scene.frame_end = 97
scene.render.fps = 24

# angle shoulder->elbow dans le plan frontal (Y-up converti)
sh = _joints["shoulder_l"]
el = _joints["elbow_l"]
CROSS = math.atan2(el[1] - sh[1], el[0] - sh[0])


def global_rot(pb, axis, angle):
    rest = pb.bone.matrix_local.to_3x3()
    R = Matrix.Rotation(angle, 3, axis)
    pb.rotation_mode = "QUATERNION"
    pb.rotation_quaternion = (rest.inverted() @ R @ rest).to_quaternion()


def apply_pose(f):
    phase = 2.0 * math.pi * (f - 1) / 96.0
    s = math.sin(phase)
    s2 = math.sin(2 * phase)
    delta = math.radians(34.0) * s
    elbow = math.radians(32.0) * (0.5 + 0.5 * s2)
    spread = math.radians(20.0) * abs(s)
    knee = math.radians(28.0) * abs(math.sin(phase + 0.9))
    twist = math.radians(12.0) * s2
    tilt = math.radians(7.0) * s

    for pb in arm.pose.bones:
        pb.rotation_mode = "QUATERNION"
        pb.rotation_quaternion = (1, 0, 0, 0)
        pb.location = (0, 0, 0)

    global_rot(arm.pose.bones["upperarm.L"], "Y", CROSS + delta)
    global_rot(arm.pose.bones["upperarm.R"], "Y", -CROSS - delta)
    global_rot(arm.pose.bones["forearm.L"], "Y", -elbow)
    global_rot(arm.pose.bones["forearm.R"], "Y", elbow)
    global_rot(arm.pose.bones["hand.L"], "X", math.radians(15) * s)
    global_rot(arm.pose.bones["hand.R"], "X", -math.radians(15) * s)

    global_rot(arm.pose.bones["thigh.L"], "Y", -spread)
    global_rot(arm.pose.bones["thigh.R"], "Y", spread)
    global_rot(arm.pose.bones["shin.L"], "X", -knee)
    global_rot(arm.pose.bones["shin.R"], "X", -knee)
    global_rot(arm.pose.bones["foot.L"], "X", knee * 0.4)
    global_rot(arm.pose.bones["foot.R"], "X", knee * 0.4)

    global_rot(arm.pose.bones["spine_thoracic"], "Z", twist)
    global_rot(arm.pose.bones["spine_thoracic"], "X", tilt)
    global_rot(arm.pose.bones["head"], "Z", -twist * 0.5)
    global_rot(arm.pose.bones["spine_cervical"], "X", -tilt * 0.5)
    arm.pose.bones["root"].location = (0.03 * s, 0.0, 0.015 * math.cos(2 * phase))


for f in [1, 7, 13, 19, 25, 31, 37, 43, 49, 55, 61, 67, 73, 79, 85, 91, 97]:
    apply_pose(f)
    for pb in arm.pose.bones:
        pb.keyframe_insert(data_path="rotation_quaternion", frame=f, group=pb.name)
        pb.keyframe_insert(data_path="location", frame=f, group=pb.name)
if arm.animation_data and arm.animation_data.action:
    for fc in arm.animation_data.action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "LINEAR"

# ── présentation ───────────────────────────────────────────────────────────
world = bpy.data.worlds.new("Studio") if scene.world is None else scene.world
scene.world = world
world.use_nodes = True
bg = next(n for n in world.node_tree.nodes if n.type == "BACKGROUND")
bg.inputs["Color"].default_value = (0.16, 0.17, 0.19, 1)
bg.inputs["Strength"].default_value = 0.5


def light(name, loc, power, size):
    d = bpy.data.lights.new(name, "AREA")
    d.energy = power
    d.shape = "DISK"
    d.size = size
    o = bpy.data.objects.new(name, d)
    scene.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = (math.radians(75), 0, 0)


light("Clé", (1.2, -2.2, 2.0), 110, 3.0)
light("Remplissage", (-1.5, -1.8, 1.0), 55, 2.5)
cd = bpy.data.cameras.new("Caméra")
cam = bpy.data.objects.new("Caméra", cd)
scene.collection.objects.link(cam)
cam.location = (0, -3.6, 0.81)
cam.rotation_euler = (math.radians(90), 0, 0)
cd.type = "ORTHO"
cd.ortho_scale = 1.95
scene.camera = cam
scene.render.resolution_x = 1100
scene.render.resolution_y = 1300
scene.render.image_settings.file_format = "PNG"
scene.view_settings.view_transform = "Standard"

# matériaux par système
COLORS = {
    "skeleton": (0.88, 0.84, 0.72), "muscles": (0.58, 0.20, 0.22),
    "organs": (0.72, 0.38, 0.34), "vessels": (0.55, 0.18, 0.20),
    "nerves": (0.85, 0.72, 0.30), "skin": (0.72, 0.50, 0.42),
}
SYSTEM_OF = {e["key"]: e["system"] for e in _catalog}
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

# peau visible par défaut, couches internes masquées
for o in bpy.data.objects:
    if o.type == "MESH" and not o.name.startswith("skin"):
        o.hide_render = True
        o.hide_set(True)
scene.frame_set(1)
print(f"[danse] croix={math.degrees(CROSS):.1f}deg, 17 clés — READY")
