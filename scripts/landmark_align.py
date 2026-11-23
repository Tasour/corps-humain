"""Alignement déterministe des couches par repères anatomiques.

Exécution dans Blender 4.5 :
  blender -b --python scripts/landmark_align.py -- female

Méthode : pour chaque repère, on prend le centroïde du maillage nommé dans la
couche de référence (skin), puis le sommet/centroïde correspondant dans chaque
autre couche. On résout R,t par Kabsch (SVD) en fermé, det(R)=+1, puis on
applique la même transformation rigide à toute la couche. Aucun aléa.
"""
import bpy
import json
import math
import os
import sys

import numpy as np

SEX = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'female'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{SEX}.glb'
TMP = f'{ROOT}/docs/models/.corps-{SEX}-landmarks.glb'
REPORT = f'{ROOT}/docs/analyses/alignement-{SEX}.json'
TOL = 0.01  # 1 cm entre couches internes (épaisseur des tissus)

# Repères nommés présents dans plusieurs couches (catalogue open-anatomy).
LANDMARKS = [
    'hand_l', 'hand_r', 'forearm_l', 'forearm_r',
    'upperarm_l', 'upperarm_r', 'clavicle_l', 'clavicle_r',
    'humerus_l', 'humerus_r', 'femur_l', 'femur_r',
    'lower_leg_l', 'lower_leg_r', 'foot_l', 'foot_r',
    'pelvis', 'ribs_l', 'ribs_r', 'skull',
    'brain', 'heart', 'liver', 'lung_l', 'lung_r',
    'eye_l', 'eye_r',
]

SYSTEMS = {
    'skeleton': {'hand_l': 'hand_l', 'hand_r': 'hand_r', 'foot_l': 'foot_l', 'foot_r': 'foot_r',
                 'pelvis': 'pelvis', 'skull': 'skull', 'ribs_l': 'ribs_l', 'ribs_r': 'ribs_r',
                 'femur_l': 'femur_l', 'femur_r': 'femur_r'},
    'muscles': {'hand_l': 'hand_muscles_l', 'hand_r': 'hand_muscles_r',
                'foot_l': 'foot_muscles_l', 'foot_r': 'foot_muscles_r',
                'pelvis': 'pelvic_floor', 'skull': 'neck_muscles_l',
                'ribs_l': 'chest_muscles_l', 'ribs_r': 'chest_muscles_r',
                'femur_l': 'quadriceps_l', 'femur_r': 'quadriceps_r'},
    'vessels': {'hand_l': 'arteries_arm_l', 'hand_r': 'arteries_arm_r',
                'foot_l': 'arteries_leg_l', 'foot_r': 'arteries_leg_r',
                'pelvis': 'arteries_pelvis', 'skull': 'arteries_head',
                'ribs_l': 'arteries_thorax', 'ribs_r': 'veins_thorax'},
    'nerves': {'skull': 'cranial_nerves', 'pelvis': 'spinal_cord',
               'foot_l': 'Cauda equina root 1'},
    'organs': {'skull': 'brain', 'pelvis': 'bladder', 'ribs_l': 'heart',
               'ribs_r': 'lung_l', 'femur_l': 'liver'},
}


def base_name(name):
    return name.lower().split('.')[0]


def world_centroid(ob):
    pts = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices], dtype=np.float64)
    return pts.mean(axis=0)


def nearest_vertex(ob, target):
    pts = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices], dtype=np.float64)
    i = int(np.argmin(np.sum((pts - target) ** 2, axis=1)))
    return pts[i]


def objects_for(names):
    out = {}
    for n in names:
        ob = next((o for o in bpy.data.objects if o.type == 'MESH'
                   and base_name(o.name) == n.lower()), None)
        if ob:
            out[n] = ob
    return out


def kabsch(P, Q):
    """R,t minimizing ||R p_i + t - q_i||^2, avec det(R)=+1."""
    pc, qc = P.mean(axis=0), Q.mean(axis=0)
    H = (P - pc).T @ (Q - qc)
    U, _S, Vt = np.linalg.svd(H)
    d = np.linalg.det(Vt.T @ U.T)
    D = np.diag([1.0, 1.0, d])
    R = Vt.T @ D @ U.T
    t = qc - R @ pc
    return R, t


bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)

# Référence : centroïdes des maillages du squelette (repères internes), pas la
# surface de peau qui en est séparée par l'épaisseur des tissus.
skeleton_objs = {key: objects_for((mesh,)).get(mesh)
                 for key, mesh in SYSTEMS['skeleton'].items()}
reference = {key: world_centroid(ob) for key, ob in skeleton_objs.items() if ob}

report = {'sex': SEX, 'reference': 'skin', 'tolerance_m': TOL, 'layers': {}}
for layer, names in SYSTEMS.items():
    if layer == 'skin':
        continue
    objs = {key: objects_for((mesh,)).get(mesh) for key, mesh in names.items()}
    objs = {k: v for k, v in objs.items() if v is not None}
    present = [n for n in LANDMARKS if n in objs and n in reference]
    if len(present) < 3:
        report['layers'][layer] = {'status': 'notMeasured', 'reason': 'moins de 3 repères'}
        continue
    P = np.array([world_centroid(objs[n]) for n in present])
    Q = np.array([reference[n] for n in present])
    R, t = kabsch(P, Q)
    before = float(np.sqrt(np.mean(np.sum((P - Q) ** 2, axis=1))))
    after_pts = P @ R.T + t
    after = float(np.sqrt(np.mean(np.sum((after_pts - Q) ** 2, axis=1))))
    maxres = float(np.sqrt(np.max(np.sum((after_pts - Q) ** 2, axis=1))))
    report['layers'][layer] = {
        'status': 'ok' if maxres <= TOL else 'hors tolerance',
        'landmarks': present,
        'rmse_before_m': round(before, 6),
        'rmse_after_m': round(after, 6),
        'max_residual_m': round(maxres, 6),
        'det_R': round(float(np.linalg.det(R)), 6),
    }
    if maxres > TOL:
        continue
    for ob in objs.values():
        for v in ob.data.vertices:
            p = ob.matrix_world @ v.co
            v.co = ob.matrix_world.inverted() @ (__import__('mathutils').Vector(R @ np.array(p) + t))

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[landmarks]', SEX, json.dumps({k: v['status'] for k, v in report['layers'].items()}))
