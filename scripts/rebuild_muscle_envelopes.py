"""Reconstruit les muscles tubulaires comme enveloppes autour de leur os.

Exécution : blender -b --python scripts/rebuild_muscle_envelopes.py -- male
Géométrie déterministe : 24 anneaux, 16 segments radiaux, rayons ANSUR II.
"""
import bpy
import json
import os
import sys

import numpy as np

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-rebuilt.glb'
REPORT = f'{ROOT}/docs/analyses/reconstruction-musculaire-{sex}.json'
RADII = json.load(open(f'{ROOT}/docs/models/muscle-radii.json'))
CLASSIF = json.load(open(f'{ROOT}/docs/models/muscle-classification-{sex}.json'))
RINGS = 24
SEGMENTS = 16
BONE_OF = {
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


def pca(points):
    c = points.mean(axis=0)
    vals, vecs = np.linalg.eigh(np.cov((points - c).T))
    return c, vals, vecs


def basis(axis):
    ref = np.array([0.0, 0.0, 1.0])
    if abs(np.dot(axis, ref)) > 0.9:
        ref = np.array([1.0, 0.0, 0.0])
    e1 = np.cross(axis, ref)
    e1 /= np.linalg.norm(e1)
    e2 = np.cross(axis, e1)
    e2 /= np.linalg.norm(e2)
    return e1, e2


def build_tube(center, axis, radius, anisotropy, old_points):
    e1, e2 = basis(axis)
    proj = (old_points - center) @ axis
    lo, hi = proj.min(), proj.max()
    span = hi - lo
    lo -= 0.05 * span
    hi += 0.05 * span
    verts, faces = [], []
    for i in range(RINGS):
        u = i / (RINGS - 1)
        t = lo + u * (hi - lo)
        taper = 0.2 + 0.8 * np.sin(np.pi * u)
        rx = radius * anisotropy[0] * taper
        ry = radius * anisotropy[1] * taper
        c = center + axis * (t - float((lo + hi) / 2))
        for j in range(SEGMENTS):
            a = 2 * np.pi * j / SEGMENTS
            verts.append(c + e1 * (rx * np.cos(a)) + e2 * (ry * np.sin(a)))
    for i in range(RINGS - 1):
        for j in range(SEGMENTS):
            a = i * SEGMENTS + j
            b = i * SEGMENTS + (j + 1) % SEGMENTS
            c = (i + 1) * SEGMENTS + j
            d = (i + 1) * SEGMENTS + (j + 1) % SEGMENTS
            faces.append((a, b, d, c))
    verts.append(center + axis * (lo - float((lo + hi) / 2)))
    verts.append(center + axis * (hi - float((lo + hi) / 2)))
    start = len(verts) - 2
    for j in range(SEGMENTS):
        faces.append((start, (j + 1) % SEGMENTS, j))
        faces.append((start + 1, (RINGS - 1) * SEGMENTS + j,
                      (RINGS - 1) * SEGMENTS + (j + 1) % SEGMENTS))
    return np.array(verts), faces


report = {'sex': sex, 'rings': RINGS, 'segments': SEGMENTS,
          'source_radii': 'docs/models/muscle-radii.json', 'rebuilt': {}, 'kept': {}}
for name, info in CLASSIF['meshes'].items():
    bone_name = BONE_OF.get(name)
    ob, bo = get(name), get(bone_name) if bone_name else None
    if not ob or not bo:
        continue
    if info['kind'] != 'tubular' or name not in RADII['radii_m']:
        report['kept'][name] = {'reason': 'plaque ou rayon absent'}
        continue
    old = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices])
    bp = np.array([tuple(bo.matrix_world @ v.co) for v in bo.data.vertices])
    bc, bvals, bvecs = pca(bp)
    axis = bvecs[:, np.argmax(bvals)]
    mc, mvals, mvecs = pca(old)
    perp = np.array([v for v in mvals])
    perp = np.delete(perp, np.argmax(mvals))
    aniso = np.sqrt(perp / np.mean(perp))
    aniso = np.clip(aniso, 0.6, 1.4)
    aniso = aniso / np.sqrt(np.prod(aniso))
    verts, faces = build_tube(mc, axis, RADII['radii_m'][name], aniso, old)
    old_name = ob.data.name
    mesh = bpy.data.meshes.new(name + '_tmp_rebuilt')
    mesh.from_pydata([tuple(v) for v in verts], [], faces)
    mesh.update()
    for poly in mesh.polygons:
        poly.use_smooth = True
    for mat in ob.data.materials:
        mesh.materials.append(mat)
    ob.matrix_world.identity()
    old_mesh = ob.data
    ob.data = mesh
    if old_mesh.users == 0:
        bpy.data.meshes.remove(old_mesh)
    mesh.name = old_name
    report['rebuilt'][name] = {
        'bone': bone_name,
        'radius_m': RADII['radii_m'][name],
        'axis': [round(float(x), 5) for x in axis],
        'anisotropy': [round(float(x), 4) for x in aniso],
        'vertices': len(verts),
        'faces': len(faces),
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[rebuild]', sex, 'reconstruits', len(report['rebuilt']),
      'conserves', len(report['kept']))
