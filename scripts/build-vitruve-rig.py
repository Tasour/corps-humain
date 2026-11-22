"""Armature + skinning du modèle Z-Anatomy pour l'homme de Vitruve animable.

La géométrie est reconstruite en pose anatomique d'origine (bras pendants) :
les poids sont calculés sur cette pose naturelle, puis l'armature porte la
pose « en croix » au frame 1. Aucune déformation de maillage n'est figée.

Source : zanatomy-all.bin (Z-Anatomy, CC BY-SA 4.0).
"""
import bpy
import json
import math
import re
import numpy as np
from mathutils import Matrix

MAN = "/home/tasour/corps-humain/zanatomy-export/zanatomy-all.json"
BIN = "/home/tasour/corps-humain/zanatomy-export/zanatomy-all.bin"
INV = "/home/tasour/corps-humain/docs/inventaire-anatomique/structures.json"

man = json.load(open(MAN))["objects"]
inv = json.load(open(INV))["categories"]
data = np.fromfile(BIN, dtype=np.uint8)

# ── squelette en pose anatomique (Blender Z-up, mètres) ────────────────────
def mirror(p):
    return (-p[0], p[1], p[2])

BONES = {
    "root":     ((0.0, 0.0, 0.90), (0.0, 0.0, 1.00)),
    "spine":    ((0.0, 0.0, 1.00), (0.0, 0.0, 1.22)),
    "chest":    ((0.0, 0.0, 1.22), (0.0, 0.0, 1.40)),
    "neck":     ((0.0, 0.0, 1.40), (0.0, 0.0, 1.53)),
    "head":     ((0.0, 0.0, 1.53), (0.0, 0.0, 1.70)),
}
for side, sgn in (("L", 1), ("R", -1)):
    sh = (0.165 * sgn, 0.027, 1.395)
    el = (0.235 * sgn, 0.010, 1.100)
    wr = (0.290 * sgn, 0.010, 0.860)
    ft = (0.315 * sgn, 0.010, 0.700)
    hp = (0.090 * sgn, 0.000, 0.880)
    kn = (0.090 * sgn, 0.000, 0.440)
    an = (0.090 * sgn, 0.000, 0.090)
    toe = (0.090 * sgn, -0.130, 0.020)
    BONES[f"clavicle.{side}"] = ((0.0, 0.0, 1.41), sh)
    BONES[f"upperarm.{side}"] = (sh, el)
    BONES[f"forearm.{side}"] = (el, wr)
    BONES[f"hand.{side}"] = (wr, ft)
    BONES[f"thigh.{side}"] = (hp, kn)
    BONES[f"shin.{side}"] = (kn, an)
    BONES[f"foot.{side}"] = (an, toe)

PARENTS = {
    "spine": "root", "chest": "spine", "neck": "chest", "head": "neck",
}
for side in ("L", "R"):
    PARENTS[f"clavicle.{side}"] = "chest"
    PARENTS[f"upperarm.{side}"] = f"clavicle.{side}"
    PARENTS[f"forearm.{side}"] = f"upperarm.{side}"
    PARENTS[f"hand.{side}"] = f"forearm.{side}"
    PARENTS[f"thigh.{side}"] = "root"
    PARENTS[f"shin.{side}"] = f"thigh.{side}"
    PARENTS[f"foot.{side}"] = f"shin.{side}"

BONE_NAMES = list(BONES)
BONE_ARR = np.array(BONE_NAMES)
SIGMA = 0.085

# ── scène propre ───────────────────────────────────────────────────────────
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj, do_unlink=True)
for mat in list(bpy.data.materials):
    bpy.data.materials.remove(mat)

HIDE_RE = re.compile(
    r"latissimus|teres major|teres minor|infraspinatus|supraspinatus|"
    r"cranium|neurocranium|viscerocranium|calvaria|skull|frontal bone|parietal bone|"
    r"occipital bone|temporal bone|sphenoid|ethmoid|zygomatic bone|lacrimal bone|"
    r"nasal bone|vomer|palatine bone|mandible|maxilla|teeth|tooth|dental|eyeball|orbit",
    re.I,
)

cat_of = {}
names = set()
for cat in ("bone", "muscle"):
    for e in inv[cat]:
        obj = e.get("object")
        if obj in man:
            cat_of[obj] = cat
            names.add(obj)
names = sorted(names)

# ── armature ───────────────────────────────────────────────────────────────
arm_data = bpy.data.armatures.new("Vitruve Rig")
arm = bpy.data.objects.new("Vitruve Rig", arm_data)
bpy.context.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm
arm.select_set(True)
bpy.ops.object.mode_set(mode="EDIT")
for name, (h, t) in BONES.items():
    eb = arm_data.edit_bones.new(name)
    eb.head = h
    eb.tail = t
    eb.roll = 0.0
for child, parent in PARENTS.items():
    arm_data.edit_bones[child].parent = arm_data.edit_bones[parent]
bpy.ops.object.mode_set(mode="OBJECT")
arm.select_set(False)
arm.show_in_front = True
print(f"[rig] {len(BONES)} os créés")


# ── poids ──────────────────────────────────────────────────────────────────
def rigid_target(name):
    s = ".L" if name.endswith(".l") else (".R" if name.endswith(".r") else "")
    n = name.lower()
    if "humerus" in n: return "upperarm" + s
    if "radius" in n or "ulna" in n: return "forearm" + s
    if any(k in n for k in ("carpal", "metacarpal", "phalanx of hand", "of hand")): return "hand" + s
    if "clavicle" in n: return "clavicle" + s
    if "scapula" in n: return "chest"
    if "femur" in n: return "thigh" + s
    if any(k in n for k in ("tibia", "fibula", "patella")): return "shin" + s
    if any(k in n for k in ("tarsal", "metatarsal", "phalanx of foot", "calcaneus", "of foot")): return "foot" + s
    if any(k in n for k in ("vertebra", "sacrum", "rib", "sternum")): return "spine"
    if any(k in n for k in ("cranium", "frontal", "parietal", "occipital", "temporal", "mandible", "maxilla")): return "head"
    return None


ARM_RE = re.compile(
    r"arm|forearm|hand|brachial|deltoid|humerus|radius|ulna|wrist|elbow|"
    r"pollicis|digitorum|digiti|carpi|palmar|interossei|lumbrical|anconeus|"
    r"pronator|supinator|thenar|coracobrachial|scapula|clavicle", re.I)
PECT_RE = re.compile(r"pectoralis|latissimus", re.I)
HEAD_RE = re.compile(
    r"head|cranial|cranium|facial|orbital|eye|nose|lip|mandible|maxilla|"
    r"tongue|ear|auricular|scalp|frontal|occipital|parietal", re.I)
HIP_RE = re.compile(
    r"iliotibial|fascia lata|tensor fasciae|glute|iliac|iliopsoas|psoas|"
    r"piriformis|obturator|trochanter|bursa|iliococcygeus|sacrum|pelvis|"
    r"gemellus|quadratus femoris", re.I)
LEG_RE = re.compile(
    r"thigh|leg|foot|femur|tibia|fibula|patella|sartorius|"
    r"gracilis|adductor|hamstring|biceps femoris|gastrocnemius|soleus|achilles|"
    r"calcaneal|tarsal|metatarsal|toe|hallucis|plantar|ankle|knee|hip", re.I)


def allowed_bones(region, side):
    sname = "L" if side >= 0 else "R"
    if region == "arm":
        return ["chest", f"clavicle.{sname}", f"upperarm.{sname}",
                f"forearm.{sname}", f"hand.{sname}"]
    if region == "leg":
        return ["root", f"thigh.{sname}", f"shin.{sname}", f"foot.{sname}"]
    if region == "hip":
        return ["root", "spine", f"thigh.{sname}", f"shin.{sname}"]
    if region == "pectoral":
        return ["spine", "chest", f"clavicle.{sname}", f"upperarm.{sname}"]
    if region == "head":
        return ["chest", "neck", "head"]
    return ["root", "spine", "chest", "neck", "head"]


def procedural(p, side, allowed):
    """Poids lissés sur les 3 segments autorisés les plus proches."""
    n = len(p)
    S = np.zeros((n, len(allowed)), dtype=np.float32)
    for j, name in enumerate(allowed):
        h, t = BONES[name]
        H = np.array(h, dtype=np.float64)
        v = np.array(t, dtype=np.float64) - H
        proj = np.clip(((p - H) @ v) / (v @ v), 0.0, 1.0)[:, None]
        Q = H + proj * v
        d = np.linalg.norm(p - Q, axis=1)
        S[:, j] = np.exp(-(d * d) / (2.0 * SIGMA * SIGMA))
    idx = np.argpartition(S, -3, axis=1)[:, -3:]
    w = np.take_along_axis(S, idx, axis=1)
    w /= np.maximum(w.sum(axis=1, keepdims=True), 1e-9)
    return np.array(allowed, dtype=object)[idx], w


buckets = {
    "bone": {name: {} for name in BONE_NAMES},
    "muscle": {name: {} for name in BONE_NAMES},
}
geo = {"bone": [], "muscle": []}
faces = {"bone": [], "muscle": []}
running = {"bone": 0, "muscle": 0}


def store(cat, bone_names, indices, weights):
    """ bone_names : tableau de noms, un par sommet. """
    b = buckets[cat]
    for bn, i, w in zip(bone_names, indices, weights):
        lvl = int(round(float(w) * 20))
        if lvl > 0:
            b[str(bn)].setdefault(lvl, []).append(int(i))


for name in names:
    if HIDE_RE.search(name):
        continue
    rec = man[name]
    p = np.frombuffer(data, dtype="<f4", count=rec["vertexCount"] * 3,
                      offset=rec["positions"]).reshape(-1, 3).copy()
    idx = np.frombuffer(data, dtype="<u4", count=rec["indexCount"],
                        offset=rec["indices"]).copy()
    # atlas (X, Y=vertical, Z=front) -> Blender (X, -Z, Y)
    p = np.column_stack((p[:, 0], -p[:, 2], p[:, 1]))
    side = 1 if name.endswith(".l") else (-1 if name.endswith(".r") else 0)
    cat = cat_of[name]
    off = running[cat]
    running[cat] += len(p)
    indices = np.arange(len(p)) + off
    target = rigid_target(name) if cat == "bone" else None
    if target and target in BONE_NAMES:
        store(cat, np.full(len(p), target), indices, np.ones(len(p)))
    else:
        b = rec["bounds"]
        lateral = b["max"][0] > 0.19 if side > 0 else b["min"][0] < -0.19
        if b["max"][1] < 0.70:
            region = "leg"
        elif PECT_RE.search(name):
            region = "pectoral"
        elif ARM_RE.search(name) or (lateral and b["min"][1] > 0.55 and b["max"][1] < 1.50):
            region = "arm"
        elif HIP_RE.search(name):
            region = "hip"
        elif b["max"][1] < 0.98 or LEG_RE.search(name):
            region = "leg"
        elif HEAD_RE.search(name):
            region = "head"
        elif LEG_RE.search(name):
            region = "leg"
        else:
            region = "torso"
        allowed = allowed_bones(region, side)
        bi, bw = procedural(p, side, allowed)
        for k in range(3):
            store(cat, bi[:, k], indices, bw[:, k])
    geo[cat].append(p)
    faces[cat].append(idx + off)


# ── maillages + groupes + modifier ────────────────────────────────────────
def material(name, color, rough=0.9):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1.0)
    m.use_nodes = True
    node = next(n for n in m.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    node.inputs["Base Color"].default_value = (*color, 1.0)
    node.inputs["Roughness"].default_value = rough
    return m


mats = {
    "bone": material("Os — ivoire", (0.86, 0.78, 0.62)),
    "muscle": material("Muscles — sépia", (0.46, 0.24, 0.21)),
}
for cat in ("bone", "muscle"):
    v = np.concatenate(geo[cat])
    f = np.concatenate(faces[cat])
    me = bpy.data.meshes.new(f"Vitruve — {cat}")
    me.vertices.add(len(v))
    me.vertices.foreach_set("co", v.ravel().astype(np.float32))
    me.loops.add(len(f))
    me.loops.foreach_set("vertex_index", f.ravel().astype(np.int32))
    me.polygons.add(len(f) // 3)
    me.polygons.foreach_set("loop_start", np.arange(len(f) // 3, dtype=np.int32) * 3)
    me.polygons.foreach_set("loop_total", np.full(len(f) // 3, 3, dtype=np.int32))
    me.update()
    ob = bpy.data.objects.new(f"Vitruve — {cat}", me)
    bpy.context.collection.objects.link(ob)
    me.materials.append(mats[cat])
    for bone_name, levels in buckets[cat].items():
        if not levels:
            continue
        vg = ob.vertex_groups.new(name=bone_name)
        for lvl, ids in levels.items():
            vg.add(ids, lvl / 20.0, "REPLACE")
    mod = ob.modifiers.new("Armature", "ARMATURE")
    mod.object = arm
    print(f"[rig] {cat}: {len(v)} sommets, {len(f)//3} triangles, groupes={len(ob.vertex_groups)}")


# ── présentation ───────────────────────────────────────────────────────────
ink = material("Encre", (0.16, 0.13, 0.11))
allv = np.concatenate(geo["bone"] + geo["muscle"])
R = float(np.abs(allv[:, 0]).max())
z0 = float(allv[:, 2].min())
S = 2.0 * R
y_plane = -0.38
curve = bpy.data.curves.new("Carré", "CURVE")
curve.dimensions = "3D"
curve.bevel_depth = 0.0035
curve.bevel_resolution = 2
corners = [(-R, y_plane, z0), (R, y_plane, z0), (R, y_plane, z0 + S),
           (-R, y_plane, z0 + S), (-R, y_plane, z0)]
sp = curve.splines.new("POLY")
sp.points.add(len(corners) - 1)
for pt, c in zip(sp.points, corners):
    pt.co = (*c, 1.0)
sp.use_cyclic_u = True
square = bpy.data.objects.new("Carré de Vitruve", curve)
bpy.context.collection.objects.link(square)
square.data.materials.append(ink)

world = bpy.data.worlds.new("Parchemin") if bpy.context.scene.world is None else bpy.context.scene.world
bpy.context.scene.world = world
world.use_nodes = True
bg = next(n for n in world.node_tree.nodes if n.type == "BACKGROUND")
bg.inputs["Color"].default_value = (0.94, 0.90, 0.80, 1.0)
bg.inputs["Strength"].default_value = 0.45


def area(name, loc, power, size):
    d = bpy.data.lights.new(name, "AREA")
    d.energy = power
    d.shape = "DISK"
    d.size = size
    ob = bpy.data.objects.new(name, d)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = (math.radians(75), 0.0, 0.0)


area("Clé", (1.6, -2.6, 2.6), 260, 4.0)
area("Remplissage", (-2.0, -2.0, 1.2), 110, 3.0)

cam_d = bpy.data.cameras.new("Caméra Vitruve")
cam = bpy.data.objects.new("Caméra Vitruve", cam_d)
bpy.context.collection.objects.link(cam)
cam.location = (0.0, -4.2, z0 + S * 0.5)
cam.rotation_euler = (math.radians(90), 0.0, 0.0)
cam_d.type = "ORTHO"
cam_d.ortho_scale = S * 1.30
scene = bpy.context.scene
scene.camera = cam
scene.render.resolution_x = 1200
scene.render.resolution_y = 1300
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.view_settings.view_transform = "Standard"
scene.render.use_freestyle = True
ls = scene.view_layers[0].freestyle_settings.linesets[0].linestyle
ls.color = (0.18, 0.14, 0.10)
ls.thickness = 1.3
print(f"[rig] R={R:.4f} H={allv[:,2].max()-z0:.4f} — SCENE READY")
