"""Copie les poids des sommets de peau voisins vers les sommets orphelins."""
import bpy
import numpy as np
from mathutils.kdtree import KDTree

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(skin.data.vertices), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight
sums = W.sum(axis=1)
orphans = np.where(sums < 0.1)[0]
good = np.where(sums >= 0.5)[0]
print('[skin] orphelins', len(orphans), 'références', len(good))

a = np.empty(len(skin.data.vertices) * 3, dtype=np.float32)
skin.data.vertices.foreach_get('co', a)
P = a.reshape(-1, 3).astype(np.float64)
tree = KDTree(len(good))
for i in good:
    tree.insert(tuple(P[i]), int(i))
tree.balance()
for i in orphans:
    src = tree.find(tuple(P[i]))[1]
    W[i] = W[src]
W /= np.maximum(W.sum(axis=1, keepdims=True), 1e-9)

for g in list(skin.vertex_groups):
    skin.vertex_groups.remove(g)
for gi, name in enumerate(names):
    w = W[:, gi]
    levels = {}
    for i, val in enumerate(w):
        k = int(round(float(val) * 40))
        if k > 0:
            levels.setdefault(k, []).append(i)
    if not levels:
        continue
    vg = skin.vertex_groups.new(name=name)
    for k, ids in levels.items():
        vg.add(ids, k / 40.0, 'REPLACE')
print('[skin] poids corrigés')
