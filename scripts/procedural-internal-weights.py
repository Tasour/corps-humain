"""Poids procéduraux par région anatomique pour les couches internes.

Chaque objet est classé par son nom dans une chaîne anatomique (bras, jambe,
tronc, tête), puis ses sommets sont pondérés uniquement sur les os de cette
chaîne. Évite les ailes des objets groupés qui traversent plusieurs segments.
"""
import bpy
import json
import re
import numpy as np

arm = bpy.data.objects["Corps Rig"]
catalog = json.load(open("/home/tasour/.cache/corps-sources/open-anatomy-3d/"
                         "node_modules/open-anatomy-3d/catalog.json"))
SYSTEM = {e["key"]: e["system"] for e in catalog}
BONES = {b.name: (tuple(b.head_local), tuple(b.tail_local)) for b in arm.data.bones}
SIGMA = 0.07

ARM_RE = re.compile(
    r"arm|hand|brachial|deltoid|humerus|radius|ulna|wrist|elbow|pollicis|"
    r"digitorum|digiti|carpi|palmar|interossei|lumbrical|anconeus|pronator|"
    r"supinator|thenar|coracobrachial|scapula|clavicle|rotator_cuff|shoulder", re.I)
PECT_RE = re.compile(r"pectoralis|latissimus|chest_muscles|back_muscles|trapezius|intercostals", re.I)
HIP_RE = re.compile(
    r"iliotibial|fascia lata|tensor fasciae|glute|iliac|iliopsoas|psoas|"
    r"piriformis|obturator|trochanter|bursa|pelvic_floor", re.I)
HEAD_RE = re.compile(
    r"head|cranial|cranium|facial|orbital|eye|nose|lip|mandible|maxilla|"
    r"tongue|ear|auricular|scalp|frontal|occipital|parietal|brain|cerebell|"
    r"brainstem|pituitary|salivary|larynx|pharynx|teeth", re.I)
LEG_RE = re.compile(
    r"thigh|leg|foot|femur|tibia|fibula|patella|sartorius|gracilis|"
    r"adductor|hamstring|biceps femoris|gastrocnemius|soleus|achilles|"
    r"calcaneal|tarsal|metatarsal|toe|hallucis|plantar|ankle|knee|quadriceps|calf", re.I)

TORSO = ["root", "spine_sacral", "pelvis", "spine_lumbar", "spine_thoracic",
         "spine_cervical", "ribcage", "head"]


def allowed(name, system, bounds):
    s = ".L" if name.endswith("_l") else (".R" if name.endswith("_r") else "")
    if not s:
        s = ".L"
    n = name.lower()
    lateral = bounds["max"][0] > 0.19 if s == ".L" else bounds["min"][0] < -0.19
    if system == "skeleton":
        table = [("humerus", "upperarm"), ("forearm", "forearm"), ("hand", "hand"),
                 ("femur", "thigh"), ("lower_leg", "shin"), ("foot", "foot"),
                 ("clavicle", "clavicle"), ("scapula", "scapula"), ("patella", "shin"),
                 ("ribs", "ribcage"), ("sternum", "ribcage"), ("spine_", "spine_"),
                 ("skull", "head"), ("mandible", "head"), ("teeth", "head"), ("jaw", "head")]
        for key, t in table:
            if key in n:
                if t == "spine_":
                    return [x for x in BONES if x.startswith("spine")]
                return [t + s if t in ("upperarm", "forearm", "hand", "thigh", "shin",
                                       "foot", "clavicle", "scapula") else t]
        return TORSO
    if system in ("organs", "vessels", "nerves"):
        if any(k in n for k in ("arm_", "arteries_arm", "veins_arm")):
            return ["spine_thoracic", f"clavicle{s}", f"upperarm{s}", f"forearm{s}", f"hand{s}"]
        if any(k in n for k in ("leg_", "arteries_leg", "veins_leg")):
            return ["pelvis", f"thigh{s}", f"shin{s}", f"foot{s}"]
        if HEAD_RE.search(n):
            return ["head", "spine_cervical"]
        if any(k in n for k in ("pelvis",)):
            return ["pelvis", "spine_lumbar"]
        if any(k in n for k in ("thorax",)):
            return ["ribcage", "spine_thoracic"]
        if any(k in n for k in ("abdomen",)):
            return ["spine_lumbar", "pelvis"]
        return ["spine_lumbar", "ribcage", "pelvis"]
    # muscles
    if bounds["max"][2] < 0.70:
        return ["pelvis", f"thigh{s}", f"shin{s}", f"foot{s}"]
    if PECT_RE.search(n):
        return ["spine_thoracic", "ribcage", f"clavicle{s}", f"upperarm{s}"]
    if ARM_RE.search(n) or (lateral and bounds["min"][2] > 0.55 and bounds["max"][2] < 1.50):
        return ["spine_thoracic", f"clavicle{s}", f"scapula{s}", f"upperarm{s}",
                f"forearm{s}", f"hand{s}"]
    if HIP_RE.search(n):
        return ["pelvis", "spine_lumbar", f"thigh{s}", f"shin{s}"]
    if LEG_RE.search(n) or bounds["max"][2] < 0.98:
        return ["pelvis", f"thigh{s}", f"shin{s}", f"foot{s}"]
    if HEAD_RE.search(n):
        return ["spine_cervical", "head"]
    return TORSO


def weights(p, names):
    if len(names) < 3:
        names = list(names) + [names[0]] * (3 - len(names))
    n = len(p)
    S = np.zeros((n, len(names)), dtype=np.float32)
    for j, name in enumerate(names):
        h, t = BONES[name]
        H = np.array(h)
        v = np.array(t) - H
        proj = np.clip(((p - H) @ v) / (v @ v), 0.0, 1.0)[:, None]
        d = np.linalg.norm(p - (H + proj * v), axis=1)
        S[:, j] = np.exp(-(d * d) / (2 * SIGMA * SIGMA))
    idx = np.argpartition(S, -3, axis=1)[:, -3:]
    w = np.take_along_axis(S, idx, axis=1)
    w /= np.maximum(w.sum(axis=1, keepdims=True), 1e-9)
    return idx, w, np.array(names, dtype=object)[idx]


for ob in bpy.data.objects:
    if ob.type != "MESH" or ob.name.startswith("skin"):
        continue
    cat = SYSTEM.get(ob.name, "organs")
    a = np.empty(len(ob.data.vertices) * 3, dtype=np.float32)
    ob.data.vertices.foreach_get("co", a)
    M = np.array(ob.matrix_world, dtype=np.float64)
    p = (np.hstack([a.reshape(-1, 3).astype(np.float64),
                    np.ones((len(a) // 3, 1))]) @ M.T)[:, :3]
    # bounds en coordonnées du maillage source (approximées par les positions monde)
    bounds = {"min": p.min(axis=0).tolist(), "max": p.max(axis=0).tolist()}
    names = allowed(ob.name, cat, bounds)
    idx, w, bn = weights(p, names)
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    groups = {}
    for i in range(len(p)):
        for k in range(idx.shape[1]):
            b = str(bn[i, k])
            lvl = int(round(float(w[i, k]) * 40))
            if lvl > 0:
                groups.setdefault(b, {}).setdefault(lvl, []).append(i)
    for b, lv in groups.items():
        vg = ob.vertex_groups.new(name=b)
        for lvl, ids in lv.items():
            vg.add(ids, lvl / 40.0, "REPLACE")
print("[proc] poids procéduraux appliqués")
