"""Génère docs/models/landmarks.json depuis les centroïdes des maillages du squelette.

Exécution : blender -b --python scripts/build_landmarks.py
Déterministe : aucun aléa, aucun seuil visuel.
"""
import bpy
import json
import os

ROOT = '/home/tasour/corps-humain'
SRC = ROOT + '/docs/models/corps-female.glb'
OUT = ROOT + '/docs/models/landmarks.json'

NAMES = [
    'hand_l', 'hand_r', 'forearm_l', 'forearm_r', 'humerus_l', 'humerus_r',
    'clavicle_l', 'clavicle_r', 'scapula_l', 'scapula_r', 'upperarm_l', 'upperarm_r',
    'pelvis', 'ribs_l', 'ribs_r', 'sternum', 'skull', 'mandible', 'teeth',
    'spine_cervical', 'spine_thoracic', 'spine_lumbar',
    'femur_l', 'femur_r', 'patella_l', 'patella_r',
    'lower_leg_l', 'lower_leg_r', 'foot_l', 'foot_r',
    'brain', 'brainstem', 'cerebellum', 'eye_l', 'eye_r',
    'heart', 'lung_l', 'lung_r', 'liver', 'stomach', 'spleen',
    'kidney_l', 'kidney_r', 'bladder', 'uterus', 'ovary_l', 'ovary_r',
    'aorta', 'vena_cava_inferior', 'vena_cava_superior',
    'arteries_thorax', 'veins_thorax', 'arteries_abdomen', 'veins_abdomen',
    'arteries_arm_l', 'arteries_arm_r', 'veins_arm_l', 'veins_arm_r',
    'arteries_leg_l', 'arteries_leg_r', 'veins_leg_l', 'veins_leg_r',
    'arteries_head', 'arteries_pelvis', 'veins_pelvis',
    'hand_muscles_l', 'hand_muscles_r', 'foot_muscles_l', 'foot_muscles_r',
    'forearm_muscles_l', 'forearm_muscles_r',
    'upper_arm_muscles_l', 'upper_arm_muscles_r',
    'chest_muscles_l', 'chest_muscles_r', 'quadriceps_l', 'quadriceps_r',
    'abdominal_muscles', 'trapezius_l', 'trapezius_r',
    'cranial_nerves', 'spinal_cord', 'Cauda equina root 1',
]

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)

landmarks = []
for name in NAMES:
    ob = next((o for o in bpy.data.objects if o.type == 'MESH'
               and o.name.lower().split('.')[0] == name.lower()), None)
    if not ob:
        continue
    pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
    c = [sum(p[i] for p in pts) / len(pts) for i in range(3)]
    landmarks.append({
        'id': name,
        'mesh': name,
        'position': [round(float(v), 6) for v in c],
        'tolerance_m': 0.002,
        'system': 'reference',
    })

out = {
    'version': 1,
    'frame': 'glTF Y-up, mètres, origine au sol',
    'method': 'centroïdes des maillages, déterministe',
    'count': len(landmarks),
    'landmarks': landmarks,
}
with open(OUT, 'w') as f:
    json.dump(out, f, indent=1, ensure_ascii=False)
print('[landmarks]', len(landmarks), 'repères écrits')
