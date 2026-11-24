"""Confinement des muscles avec champ de déplacement lissé.

Exécution : blender -b --python scripts/confine_muscles_smooth.py -- male
Contrairement à la projection sommet-par-sommet, on lisse le champ de
déplacement sur la topologie du maillage avant de l'appliquer : les pointes
disparaissent sans détruire les détails.
"""
import bpy
import json
import os
import sys

import numpy as np
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-muscles-smooth.glb'
REPORT = f'{ROOT}/docs/analyses/confinement-musculaire-lisse-{sex}.json'
MARGIN = 0.002
ITERATIONS = 12
LAMBDA = 0.5

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


skin = get('skin')
sp = [skin.matrix_world @ v.co for v in skin.data.vertices]
sn = [skin.matrix_world.to_3x3() @ v.normal for v in skin.data.vertices]
tree = KDTree(len(sp))
for i, p in enumerate(sp):
    tree.insert(p, i)
tree.balance()

catalog = json.load(open(f'{ROOT}/docs/models/catalog.json'))
report = {'sex': sex, 'margin_m': MARGIN, 'iterations': ITERATIONS, 'meshes': {}}

for entry in catalog:
    if entry['system'] != 'muscles':
        continue
    ob = get(entry['key'])
    if not ob:
        continue
    n = len(ob.data.vertices)
    local = np.array([tuple(v.co) for v in ob.data.vertices], dtype=np.float64)
    world = np.array([tuple(ob.matrix_world @ v.co) for v in ob.data.vertices], dtype=np.float64)
    target = world.copy()
    for i, p in enumerate(world):
        co, j, _d = tree.find(tuple(p))
        signed = np.dot(p - np.array(co), np.array(sn[j]))
        if signed > -MARGIN:
            target[i] = p - np.array(sn[j]) * (signed + MARGIN)
    disp_world = target - world
    inv3 = np.array(ob.matrix_world.inverted().to_3x3(), dtype=np.float64)
    disp = disp_world @ inv3.T
    orig_norm = np.linalg.norm(disp, axis=1)

    neighbors = [[] for _ in range(n)]
    for e in ob.data.edges:
        a, b = e.vertices
        neighbors[a].append(b)
        neighbors[b].append(a)
    for _ in range(ITERATIONS):
        smoothed = disp.copy()
        for i, ns in enumerate(neighbors):
            if ns:
                smoothed[i] = (1 - LAMBDA) * disp[i] + LAMBDA * disp[ns].mean(axis=0)
        disp = smoothed
    norm = np.linalg.norm(disp, axis=1)
    cap = 1.2 * orig_norm
    scale = np.minimum(1.0, cap / np.maximum(norm, 1e-12))
    disp *= scale[:, None]

    for i, v in enumerate(ob.data.vertices):
        v.co = tuple(local[i] + disp[i])

    report['meshes'][entry['key']] = {
        'vertices_initial': int(np.sum(orig_norm > 1e-9)),
        'max_displacement_m': round(float(orig_norm.max()), 6),
    }

with open(REPORT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[confine-lisse]', sex, 'maillages', len(report['meshes']))
