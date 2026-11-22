"""Rig anatomique du corps open-anatomy-3d (femme).

Base : MakeHuman skin (CC0) + BodyParts3D + HuBMAP, CC BY 4.0.
Ancres articulaires du catalog.json, converties Y-up glTF -> Z-up Blender.
"""
import bpy
import json
import math
import re
import heapq
import numpy as np
from mathutils import Matrix

SEX = globals().get("HUMAIN_SEX", "female")
CATALOG = "/home/tasour/.cache/corps-sources/open-anatomy-3d/node_modules/open-anatomy-3d/catalog.json"
GLB = ("/home/tasour/.cache/corps-sources/open-anatomy-3d/plain-male.glb"
       if SEX == "male" else
       "/home/tasour/.cache/corps-sources/open-anatomy-3d/plain.glb")

cat = json.load(open(CATALOG))
anchors = {}
for e in cat:
    if e.get("system") == "joints":
        x, y, z = e["anchor"] if SEX == "male" else e["anchorFemale"]
        anchors[e["key"]] = np.array([x, -z, y], dtype=np.float64)
print("[rig]", SEX, "ancres:", {k: tuple(np.round(v, 3)) for k, v in anchors.items()})

# ── squelette ──────────────────────────────────────────────────────────────
B = {}


def bone(name, h, t, parent=None):
    B[name] = (tuple(h), tuple(t), parent)


bone("root", (0, 0, 0.78), (0, 0, 0.86))
bone("spine_sacral", (0, 0, 0.78), (0, 0, 0.90), "root")
bone("pelvis", (0, 0, 0.86), (0, 0, 0.92), "spine_sacral")
bone("spine_lumbar", (0, 0, 0.92), (0, 0, 1.08), "pelvis")
bone("spine_thoracic", (0, 0, 1.08), (0, 0, 1.25), "spine_lumbar")
bone("ribcage", (0, 0, 1.10), (0, 0, 1.28), "spine_thoracic")
bone("spine_cervical", (0, 0, 1.25), (0, 0, 1.39), "spine_thoracic")
bone("head", (0, 0, 1.39), (0, 0, 1.58), "spine_cervical")
bone("jaw", (0, 0.055, 1.43), (0, 0.075, 1.46), "head")
for side, sgn in (("L", 1), ("R", -1)):
    sh = anchors[f"shoulder_{side.lower()}"]
    el = anchors[f"elbow_{side.lower()}"]
    wr = anchors[f"wrist_{side.lower()}"]
    hp = anchors[f"hip_{side.lower()}"]
    kn = anchors[f"knee_{side.lower()}"]
    an = anchors[f"ankle_{side.lower()}"]
    bone(f"clavicle.{side}", (0.02 * sgn, 0.02, 1.30), sh, "spine_thoracic")
    bone(f"scapula.{side}", (0.045 * sgn, 0.09, 1.26), (0.11 * sgn, 0.055, 1.19), "spine_thoracic")
    bone(f"upperarm.{side}", sh, el, f"clavicle.{side}")
    upper_mid = tuple((np.array(sh) + np.array(el)) * 0.5)
    bone(f"upperarm_twist.{side}", el, upper_mid, f"upperarm.{side}")
    bone(f"forearm.{side}", el, wr, f"upperarm.{side}")
    fore_mid = tuple((np.array(el) + np.array(wr)) * 0.5)
    bone(f"forearm_twist.{side}", wr, fore_mid, f"forearm.{side}")
    bone(f"hand.{side}", wr, (0.245 * sgn, 0.015, 0.755), f"forearm.{side}")
    bone(f"thigh.{side}", hp, kn, "pelvis")
    bone(f"shin.{side}", kn, an, f"thigh.{side}")
    foot_tip = (0.13 * sgn, -0.10, 0.025)
    bone(f"foot.{side}", an, foot_tip, f"shin.{side}")
    bone(f"toe.{side}", foot_tip, (0.13 * sgn, -0.155, 0.018), f"foot.{side}")

NAMES = list(B)
SIGMA = 0.075

# ── scène ──────────────────────────────────────────────────────────────────
for o in list(bpy.data.objects):
    bpy.data.objects.remove(o, do_unlink=True)
bpy.ops.import_scene.gltf(filepath=GLB)

arm_data = bpy.data.armatures.new("Corps Rig")
arm = bpy.data.objects.new("Corps Rig", arm_data)
bpy.context.scene.collection.objects.link(arm)
bpy.context.view_layer.objects.active = arm
arm.select_set(True)
bpy.ops.object.mode_set(mode="EDIT")
for n, (h, t, _p) in B.items():
    eb = arm_data.edit_bones.new(n)
    eb.head, eb.tail, eb.roll = h, t, 0.0
for n, (_h, _t, p) in B.items():
    if p:
        arm_data.edit_bones[n].parent = arm_data.edit_bones[p]
bpy.ops.object.mode_set(mode="OBJECT")
arm.select_set(False)
arm.show_in_front = True
print(f"[rig] {len(B)} os")

# ── classification des maillages ──────────────────────────────────────────
MESHES = [o for o in bpy.data.objects if o.type == "MESH"]
SYSTEM = {o.name: (o.parent.name if o.parent else "unknown") for o in MESHES}


def side_of(name):
    return "L" if name.endswith("_l") else ("R" if name.endswith("_r") else None)


def rigid_bone(name):
    s = side_of(name)
    suf = f".{s}" if s else ""
    n = name.lower()
    table = [
        ("humerus", "upperarm"), ("forearm", "forearm"), ("hand", "hand"),
        ("femur", "thigh"), ("lower_leg", "shin"), ("foot", "foot"),
        ("clavicle", "clavicle"), ("scapula", "scapula"), ("patella", "shin"),
        ("ribs", "spine_thoracic"), ("sternum", "spine_thoracic"),
        ("spine_cervical", "spine_cervical"), ("spine_thoracic", "spine_thoracic"),
        ("spine_lumbar", "spine_lumbar"), ("skull", "head"),
        ("mandible", "head"), ("teeth", "head"), ("pelvis", "pelvis"),
    ]
    for key, target in table:
        if key in n:
            if target in ("upperarm", "forearm", "hand", "thigh", "shin", "foot", "clavicle", "scapula"):
                return target + suf
            return target
    return None


TORSO_BONES = ["root", "pelvis", "spine_lumbar", "spine_thoracic", "spine_cervical", "head"]


def allowed_bones(name, system):
    s = side_of(name) or "L"
    suf = f".{s}"
    n = name.lower()
    if system == "skin":
        return NAMES
    if system == "skeleton":
        r = rigid_bone(name)
        return [r] if r else TORSO_BONES
    if system in ("organs", "vessels", "nerves"):
        if system in ("vessels", "nerves"):
            if any(k in n for k in ("arm_", "arteries_arm", "veins_arm")):
                return ["spine_thoracic", f"clavicle{suf}", f"upperarm{suf}",
                        f"forearm{suf}", f"hand{suf}"]
            if any(k in n for k in ("leg_", "arteries_leg", "veins_leg")):
                return ["pelvis", f"thigh{suf}", f"shin{suf}", f"foot{suf}"]
            if any(k in n for k in ("head", "carotid", "cranial")):
                return ["head", "spine_cervical"]
            if any(k in n for k in ("pelvis",)):
                return ["pelvis", "spine_lumbar"]
            if any(k in n for k in ("abdomen",)):
                return ["spine_lumbar", "pelvis"]
            if any(k in n for k in ("thorax",)):
                return ["spine_thoracic", "spine_lumbar"]
        if any(k in n for k in ("brain", "cerebell", "brainstem", "eye", "pituitary", "cranial")):
            return ["head", "spine_cervical"]
        if any(k in n for k in ("lung", "heart", "bronch", "aorta", "thymus", "trachea",
                                "thyroid", "pulmonary")):
            return ["spine_thoracic", "spine_lumbar"]
        return ["spine_lumbar", "pelvis", "spine_thoracic"]
    # muscles
    if any(k in n for k in ("upper_arm", "forearm", "hand_muscles", "deltoid",
                            "rotator_cuff", "shoulder_muscles")):
        return ["spine_thoracic", f"clavicle{suf}", f"scapula{suf}",
                f"upperarm{suf}", f"forearm{suf}", f"hand{suf}"]
    if any(k in n for k in ("chest_muscles", "intercostals", "back_muscles", "trapezius")):
        return ["spine_thoracic", "spine_lumbar", f"clavicle{suf}", f"scapula{suf}", f"upperarm{suf}"]
    if any(k in n for k in ("gluteal", "iliopsoas", "adductors", "hamstrings",
                            "quadriceps", "pelvic_floor")):
        return ["pelvis", "spine_lumbar", f"thigh{suf}", f"shin{suf}"]
    if any(k in n for k in ("calf", "shin_muscles", "foot_muscles")):
        return [f"thigh{suf}", f"shin{suf}", f"foot{suf}"]
    if "neck_muscles" in n:
        return ["spine_cervical", "head", "spine_thoracic"]
    if any(k in n for k in ("abdominal", "diaphragm")):
        return ["spine_lumbar", "spine_thoracic", "pelvis"]
    return TORSO_BONES


def smoothstep(x, a, b):
    t = np.clip((x - a) / (b - a), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


def region_set(p, allowed, k=3):
    n = len(p)
    S = np.zeros((n, len(allowed)), dtype=np.float32)
    for j, name in enumerate(allowed):
        h, t, _ = B[name]
        H = np.array(h)
        v = np.array(t) - H
        proj = np.clip(((p - H) @ v) / (v @ v), 0.0, 1.0)[:, None]
        d = np.linalg.norm(p - (H + proj * v), axis=1)
        S[:, j] = np.exp(-(d * d) / (2 * SIGMA * SIGMA))
    idx = np.argpartition(S, -k, axis=1)[:, -k:]
    w = np.take_along_axis(S, idx, axis=1)
    w /= np.maximum(w.sum(axis=1, keepdims=True), 1e-9)
    return idx, w, np.array(allowed, dtype=object)


def geodesic(ob, p, seeds, maxdist):
    """Distance géodésique depuis les graines, le long des arêtes du maillage."""
    n = len(p)
    adj = [[] for _ in range(n)]
    for e in ob.data.edges:
        i, j = e.vertices
        d = float(np.linalg.norm(p[i] - p[j]))
        adj[i].append((j, d))
        adj[j].append((i, d))
    dist = np.full(n, 1e9, dtype=np.float64)
    heap = []
    for s in seeds:
        dist[s] = 0.0
        heapq.heappush(heap, (0.0, s))
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u] + 1e-9:
            continue
        for v, w in adj[u]:
            nd = d + w
            if nd < dist[v] and nd <= maxdist:
                dist[v] = nd
                heapq.heappush(heap, (nd, v))
    return dist


def skin_weights(p, ob):
    """Masques géodésiques doux : bras / jambes / tête / torse."""
    z = p[:, 2]
    seeds = {}
    for s, sgn in (("L", 1), ("R", -1)):
        seeds[f"arm{s}"] = np.where((p[:, 0] * sgn > 0.18) & (z < 0.88))[0]
        seeds[f"leg{s}"] = np.where((p[:, 0] * sgn > 0.07) & (z < 0.13))[0]
    arm = np.zeros(len(p), dtype=np.float64)
    leg = np.zeros(len(p), dtype=np.float64)
    for s in ("L", "R"):
        da = geodesic(ob, p, seeds[f"arm{s}"], 0.62)
        dl = geodesic(ob, p, seeds[f"leg{s}"], 1.02)
        sel = p[:, 0] > 0 if s == "L" else p[:, 0] < 0
        arm[sel] = 1 - smoothstep(da[sel], 0.44, 0.58)
        leg[sel] = 1 - smoothstep(dl[sel], 0.84, 0.99)
    head = smoothstep(z, 1.30, 1.42)
    torso = np.maximum(0.0, 1.0 - np.maximum(np.maximum(arm, leg), head))
    sets = [
        (region_set(p, TORSO_BONES, 3), torso),
        (region_set(p, ["spine_cervical", "head"], 2), head),
    ]
    for s in ("L", "R"):
        al = ["spine_thoracic", f"clavicle.{s}", f"scapula.{s}",
              f"upperarm.{s}", f"forearm.{s}", f"hand.{s}"]
        sets.append((region_set(p, al, 3), arm * (p[:, 0] > 0 if s == "L" else p[:, 0] < 0)))
        al2 = ["pelvis", f"thigh.{s}", f"shin.{s}", f"foot.{s}"]
        sets.append((region_set(p, al2, 3), leg * (p[:, 0] > 0 if s == "L" else p[:, 0] < 0)))
    total = np.zeros((len(p), len(NAMES)), dtype=np.float32)
    col = {b: i for i, b in enumerate(NAMES)}
    for (idx, w, names), mask in sets:
        for k in range(idx.shape[1]):
            for i, b in enumerate(names[idx[:, k]]):
                total[i, col[str(b)]] += float(w[i, k]) * float(mask[i])
    total /= np.maximum(total.sum(axis=1, keepdims=True), 1e-9)
    k = 4
    idx = np.argpartition(total, -k, axis=1)[:, -k:]
    w = np.take_along_axis(total, idx, axis=1)
    w /= np.maximum(w.sum(axis=1, keepdims=True), 1e-9)
    return np.array(NAMES, dtype=object)[idx], w


def weights(p, allowed, rigid=None):
    n = len(p)
    if rigid:
        return np.full((n, 1), rigid, dtype=object), np.ones((n, 1), dtype=np.float32)
    m = len(allowed)
    S = np.zeros((n, m), dtype=np.float32)
    for j, name in enumerate(allowed):
        h, t, _ = B[name]
        H = np.array(h)
        v = np.array(t) - H
        proj = np.clip(((p - H) @ v) / (v @ v), 0.0, 1.0)[:, None]
        d = np.linalg.norm(p - (H + proj * v), axis=1)
        S[:, j] = np.exp(-(d * d) / (2 * SIGMA * SIGMA))
    k = min(4, m)
    idx = np.argpartition(S, -k, axis=1)[:, -k:]
    w = np.take_along_axis(S, idx, axis=1)
    w /= np.maximum(w.sum(axis=1, keepdims=True), 1e-9)
    return np.array(allowed, dtype=object)[idx], w


# ── poids ──────────────────────────────────────────────────────────────────
for ob in MESHES:
    name = ob.name
    system = SYSTEM[name]
    continue  # poids automatiques de Blender (heat weighting) pour tous les maillages
    a = np.empty(len(ob.data.vertices) * 3, dtype=np.float32)
    ob.data.vertices.foreach_get("co", a)
    local = a.reshape(-1, 3).astype(np.float64)
    M = np.array(ob.matrix_world, dtype=np.float64)
    p = (np.hstack([local, np.ones((len(local), 1))]) @ M.T)[:, :3]
    allowed = allowed_bones(name, system)
    rigid = allowed[0] if (system == "skeleton" and len(allowed) == 1) else None
    bn, ww = weights(p, allowed, rigid)
    groups = {}
    for i in range(len(p)):
        for k in range(bn.shape[1]):
            b = str(bn[i, k])
            lvl = int(round(float(ww[i, k]) * 20))
            if lvl > 0:
                groups.setdefault(b, {}).setdefault(lvl, []).append(i)
    for b, levels in groups.items():
        if b not in B:
            continue
        vg = ob.vertex_groups.new(name=b)
        for lvl, ids in levels.items():
            vg.add(ids, lvl / 20.0, "REPLACE")
    mod = ob.modifiers.new("Armature", "ARMATURE")
    mod.object = arm
print(f"[rig] poids appliqués à {len(MESHES)-1} maillages internes")

# ── poids automatiques de Blender pour tous les maillages ────────────────
for ob in MESHES:
    bpy.ops.object.select_all(action="DESELECT")
    ob.select_set(True)
    arm.select_set(True)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.object.parent_set(type="ARMATURE_AUTO", keep_transform=True)
    ob.select_set(False)
print("[rig] poids automatiques appliqués à tous les maillages")

# ── matériau peau ──────────────────────────────────────────────────────────
skin = next(o for o in MESHES if SYSTEM[o.name] == "skin")
m = bpy.data.materials.new("Peau")
m.use_nodes = True
bs = next(n for n in m.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
bs.inputs["Base Color"].default_value = (0.72, 0.50, 0.42, 1.0)
bs.inputs["Roughness"].default_value = 0.62
try:
    bs.inputs["Subsurface Weight"].default_value = 0.12
except KeyError:
    bs.inputs["Subsurface"].default_value = 0.12
skin.data.materials.clear()
skin.data.materials.append(m)
print("[rig] SCENE READY")
