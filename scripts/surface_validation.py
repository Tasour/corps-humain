"""Validation métrique externe à partir des endpoints des os et de la peau.

Exécution : blender -b --python scripts/surface_validation.py
Déterministe : PCA fermé, KDTree, aucune graine, aucun seuil visuel.
"""
import bpy
import json
import os
import sys

import numpy as np
from mathutils import Vector
from mathutils.kdtree import KDTree

ROOT = '/home/tasour/corps-humain'
TARGET_STATURE = 1.72
BONES = {
    'upper_arm': 'humerus_l',
    'forearm': 'forearm_l',
    'hand': 'hand_l',
    'thigh': 'femur_l',
    'shank': 'lower_leg_l',
    'foot': 'foot_l',
}
SEGMENT_POINTS = {
    'upper_arm': ('acromion', 'radiale'),
    'forearm': ('radiale', 'stylion'),
    'hand': ('stylion', 'dactylion'),
    'thigh': ('hip', 'knee'),
    'shank': ('knee', 'ankle'),
    'foot': ('heel', 'toe'),
}


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def pts(ob):
    return np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])


def pca_endpoints(p):
    center = p.mean(axis=0)
    cov = np.cov((p - center).T)
    vals, vecs = np.linalg.eigh(cov)
    axis = vecs[:, np.argmax(vals)]
    proj = (p - center) @ axis
    lo, hi = proj.min(), proj.max()
    a = p[np.abs(proj - lo) <= 0.02 * (hi - lo)].mean(axis=0)
    b = p[np.abs(proj - hi) <= 0.02 * (hi - lo)].mean(axis=0)
    if a[0] > b[0]:
        a, b = b, a
    return a, b


def run(sex):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=f'{ROOT}/docs/models/corps-{sex}.glb')
    skin = get('skin')
    skin_pts = pts(skin)
    tree = KDTree(len(skin_pts))
    for i, p in enumerate(skin_pts):
        tree.insert(Vector(p), i)
    tree.balance()

    landmarks = {}
    rules = {}
    for segment, bone in BONES.items():
        ob = get(bone)
        if not ob:
            continue
        a, b = pca_endpoints(pts(ob))
        pa, _i, da = tree.find(Vector(a))
        pb, _j, db = tree.find(Vector(b))
        landmarks[f'{segment}_a'] = np.array(pa)
        landmarks[f'{segment}_b'] = np.array(pb)
        rules[segment] = {
            'bone': bone,
            'offset_proximal_m': round(da, 5),
            'offset_distal_m': round(db, 5),
            'status': 'proxy' if max(da, db) <= 0.10 else 'notMeasured',
        }

    targets = json.load(open(f'{ROOT}/docs/models/ansur2-targets.json'))['sexes'][sex]
    factor = TARGET_STATURE / (targets['stature_mean_mm'] / 1000.0)
    report = {
        'sex': sex,
        'source': 'ANSUR II NATICK/TR-15/007',
        'model_stature_m': TARGET_STATURE,
        'reference_stature_m': round(targets['stature_mean_mm'] / 1000.0, 4),
        'stature_factor': round(factor, 6),
        'proxies': rules,
        'segments': {},
    }
    for segment in SEGMENT_POINTS:
        lm_a, lm_b = f'{segment}_a', f'{segment}_b'
        if lm_a not in landmarks or lm_b not in landmarks:
            report['segments'][segment] = {'status': 'notMeasured'}
            continue
        measured = float(np.linalg.norm(landmarks[lm_a] - landmarks[lm_b]))
        ref = targets['segments'].get(segment)
        if not ref:
            report['segments'][segment] = {'status': 'notMeasured'}
            continue
        mean = ref['mean_mm'] / 1000.0 * factor
        sd_ref = ref['sd_mm'] / 1000.0 * factor
        offset = max(rules[segment]['offset_proximal_m'],
                     rules[segment]['offset_distal_m'])
        sd = (sd_ref ** 2 + offset ** 2) ** 0.5
        z = (measured - mean) / sd if sd else None
        report['segments'][segment] = {
            'measured_m': round(measured, 5),
            'expected_m': round(mean, 5),
            'sd_reference_m': round(sd_ref, 5),
            'sd_total_m': round(sd, 5),
            'z_score': round(z, 3) if z is not None else None,
            'status': rules[segment]['status'],
        }
    report['landmarks'] = {k: [round(float(v), 5) for v in p]
                           for k, p in landmarks.items()}
    with open(f'{ROOT}/docs/analyses/validation-metrique-{sex}.json', 'w') as f:
        json.dump(report, f, indent=1, ensure_ascii=False)
    print('[metrique]', sex,
          {k: v.get('z_score') for k, v in report['segments'].items()})


for sex in ('female', 'male'):
    run(sex)
