"""Poids rigides par objet pour les couches internes (évite les étirements)."""
import bpy

LIMBS = {"upperarm", "forearm", "hand", "thigh", "shin", "foot", "clavicle", "scapula"}
RULES = [
    ("forearm", "forearm"), ("hand", "hand"), ("upper_arm_muscles", "upperarm"),
    ("humerus", "upperarm"), ("deltoid", "upperarm"), ("rotator_cuff", "upperarm"),
    ("shoulder_muscles", "upperarm"), ("clavicle", "clavicle"), ("scapula", "scapula"),
    ("chest_muscles", "spine_thoracic"), ("intercostals", "spine_thoracic"),
    ("back_muscles", "spine_thoracic"), ("trapezius", "spine_thoracic"),
    ("ribs", "spine_thoracic"), ("sternum", "spine_thoracic"),
    ("spine_cervical", "spine_cervical"), ("neck_muscles", "spine_cervical"),
    ("spine_thoracic", "spine_thoracic"), ("spine_lumbar", "spine_lumbar"),
    ("skull", "head"), ("mandible", "head"), ("teeth", "head"),
    ("brain", "head"), ("cerebell", "head"), ("brainstem", "head"),
    ("eye", "head"), ("pituitary", "head"), ("carotid", "head"),
    ("cranial_nerves", "head"), ("arteries_head", "head"),
    ("quadriceps", "thigh"), ("hamstrings", "thigh"), ("adductors", "thigh"),
    ("femur", "thigh"), ("arteries_leg", "thigh"), ("veins_leg", "thigh"),
    ("lower_leg", "shin"), ("shin_muscles", "shin"), ("calf", "shin"), ("patella", "shin"),
    ("foot_muscles", "foot"), ("foot", "foot"),
    ("gluteal", "pelvis"), ("pelvic_floor", "pelvis"), ("iliopsoas", "pelvis"),
    ("arteries_pelvis", "pelvis"), ("veins_pelvis", "pelvis"),
    ("diaphragm", "spine_thoracic"), ("abdominal", "spine_lumbar"),
    ("arteries_thorax", "spine_thoracic"), ("veins_thorax", "spine_thoracic"),
    ("arteries_abdomen", "spine_lumbar"), ("veins_abdomen", "spine_lumbar"),
    ("spinal_cord", "spine_lumbar"),
    ("arteries_arm", "upperarm"), ("veins_arm", "upperarm"),
]


def target(name):
    n = name.lower()
    side = ".L" if name.endswith("_l") else (".R" if name.endswith("_r") else "")
    for key, bone in RULES:
        if key in n:
            return bone + side if bone in LIMBS else bone
    return "spine_lumbar"


count = 0
for ob in bpy.data.objects:
    if ob.type != "MESH" or ob.name.startswith("skin"):
        continue
    bone = target(ob.name)
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    vg = ob.vertex_groups.new(name=bone)
    vg.add(list(range(len(ob.data.vertices))), 1.0, "REPLACE")
    count += 1
print("[rigide]", count, "maillages internes")
