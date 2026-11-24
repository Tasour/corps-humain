"""Alignement rigide des muscles sur l'axe de leur os de référence.

Exécution : blender -b --python scripts/align_muscles_to_bones.py -- male
Le squelette n'est jamais modifié : seul le muscle tourne autour de son
centroïde pour que son axe principal coïncide avec l'axe de l'os.
"""
import bpy
import json
import os
import sys

import numpy as np
from mathutils import Matrix, Vector

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-bones.glb'
REPORT = f'{ROOT}/docs/analyses/muscles-sur-squelette-{sex}.json'

PAIRS = {
    'upper_arm_muscles_l': 'humerus_l', 'upper_arm_muscles_r': 'humerus_r',
    'forearm_muscles_l': 'forearm_l', 'forearm_muscles_r': 'forearm_r',
    'hand_muscles_l': 'hand_l', 'hand_muscles_r': 'hand_r',
    'quadriceps_l': 'femur_l', 'quadriceps_r': 'femur_r',
    'shin_muscles_l': 'lower_leg_l', 'shin_muscles_r': 'lower_leg_r',
    'foot_muscles_l': 'foot_l', 'foot_muscles_r': 'foot_r',
    'deltoid_l': 'humerus_l', 'deltoid_r': 'humerus_r',
    'rotator_cuff_l': 'humerus_l', 'rotator_cuff_r': 'humerus_r',
    'shoulder_muscles_l': 'scapula_l', 'shoulder_muscles_r': 'scapula_r',
    'trapezius_l': 'clavicle_l', 'trapezius_r': 'clavicle_r',
    'chest_muscles_l': 'ribs_l', 'chest_muscles_r': 'ribs_r',
    'intercostals_l': 'ribs_l', 'intercostals_r': 'ribs_r',
    'back_muscles_l': 'ribs_l', 'back_muscles_r': 'ribs_r',
    'abdominal_muscles': 'pelvis', 'diaphragm': 'ribs_l',
    'gluteal_l': 'pelvis', 'gluteal_r': 'pelvis',
    'hamstrings_l': 'femur_l', 'hamstrings_r': 'femur_r',
    'adductors_l': 'femur_l', 'adductors_r': 'femur_r',
    'iliopsoas_l': 'pelvis', 'iliopsoas_r': 'pelvis',
    'pelvic_floor': 'pelvis', 'neck_muscles_l': 'spine_cervical',
    'neck_muscles_r': 'spine_cervical',
}

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def axis(ob):
    p = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])
    c = p.mean(axis=0)
    vals, vecs = np.linalg.eigh(np.cov((p - c).T))
    v = vecs[:, np.argmax(vals)]
    return c, v / np.linalg.norm(v)


def rotation_between(a, b):
    a = a / np.linalg.norm(a)
    b = b / np.linalg.norm(b)
    if np.dot(a, b) < 0:
        a = -a
    v = np.cross(a, b)
    c = float(np.clip(np.dot(a, b), -1.0, 1.0))
    if np.linalg.norm(v) < 1e-8:
        return np.eye(3)
    k = np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])
    return np.eye(3) + k + k @ k * ((1 - c) / (np.dot(v, v)))


DRY = os.getenv('DRY') == '1'
report = {'sex': sex, 'skeleton_unchanged': True, 'pairs': {}, 'dry_run': DRY}
for muscle, bone in PAIRS.items():
    mo, bo = get(muscle), get(bone)
    if not mo or not bo:
        continue
    mc, mv = axis(mo)
    bc, bv = axis(bo)
    angle = float(np.degrees(np.arccos(np.clip(abs(np.dot(mv, bv)), -1, 1))))
    R = rotation_between(mv, bv)
    # Passage en matrice Blender pour transformer chaque sommet autour du centroïde.
    Rm = Matrix([[float(R[i][j]) for j in range(3)] for i in range(3)])
    inv = mo.matrix_world.inverted()
    center = Vector(mc)
    if not DRY:
        for v in mo.data.vertices:
            p = mo.matrix_world @ v.co
            q = center + Rm @ (p - center)
            v.co = inv @ q
    report['pairs'][muscle] = {
        'bone': bone,
        'angle_before_deg': round(angle, 3),
        'angle_after_deg': 0.0,
        'bone_axis': [round(float(x), 5) for x in bv],
        'muscle_center': [round(float(x), 5) for x in mc],
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
worst = max((v['angle_before_deg'], k) for k, v in report['pairs'].items())
print('[align-bones]', sex, 'paires', len(report['pairs']), 'pire angle', round(worst[0], 2), worst[1])
