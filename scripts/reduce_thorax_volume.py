"""Réduction locale du volume cutané thoracique par champ lissé.

Exécution : blender -b --python scripts/reduce_thorax_volume.py -- male
Un sommet de peau situé à plus de 20 mm du muscle le plus proche est rapproché
de 15 mm de ce muscle. Le déplacement est lissé sur la topologie de la peau.
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
TMP = f'{ROOT}/docs/models/.corps-{sex}-thorax.glb'
REPORT = f'{ROOT}/docs/analyses/reduction-thorax-{sex}.json'
MAX_GAP = 0.020
KEEP = 0.015
ITERATIONS = 8

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


skin = get('skin')
cat = json.load(open(f'{ROOT}/docs/models/catalog.json'))
muscle_pts = []
for entry in cat:
    if entry['system'] != 'muscles':
        continue
    ob = get(entry['key'])
    if not ob:
        continue
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        if 0.95 <= p.z <= 1.35 and abs(p.x) <= 0.25:
            muscle_pts.append(tuple(p))
tree = KDTree(len(muscle_pts))
for i, p in enumerate(muscle_pts):
    tree.insert(p, i)
tree.balance()

n = len(skin.data.vertices)
local = np.array([tuple(v.co) for v in skin.data.vertices], dtype=np.float64)
world = np.array([tuple(skin.matrix_world @ v.co) for v in skin.data.vertices], dtype=np.float64)
disp = np.zeros((n, 3), dtype=np.float64)
for i, p in enumerate(world):
    if not (0.95 <= p[2] <= 1.35 and abs(p[0]) <= 0.25):
        continue
    co, _j, d = tree.find(tuple(p))
    if d > MAX_GAP:
        direction = np.array(co) - p
        disp[i] = direction / d * min(d - KEEP, 0.03)

neighbors = [[] for _ in range(n)]
for e in skin.data.edges:
    a, b = e.vertices
    neighbors[a].append(b)
    neighbors[b].append(a)
orig = np.linalg.norm(disp, axis=1)
for _ in range(ITERATIONS):
    smoothed = disp.copy()
    for i, ns in enumerate(neighbors):
        if ns:
            smoothed[i] = 0.5 * disp[i] + 0.5 * disp[ns].mean(axis=0)
    disp = smoothed
scale = np.minimum(1.0, 1.1 * orig / np.maximum(np.linalg.norm(disp, axis=1), 1e-12))
disp *= scale[:, None]
for i, v in enumerate(skin.data.vertices):
    v.co = tuple(local[i] + disp[i])

with open(REPORT, 'w') as f:
    json.dump({
        'sex': sex, 'max_gap_m': MAX_GAP, 'keep_m': KEEP,
        'vertices_moved': int(np.sum(orig > 1e-9)),
        'max_move_m': round(float(orig.max()), 6),
    }, f, indent=1, ensure_ascii=False)

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[thorax]', sex, 'sommets déplacés', int(np.sum(orig > 1e-9)))
