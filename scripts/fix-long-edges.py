"""Lisse les poids des sommets formant des arêtes >0,25 m en pose."""
import bpy
import numpy as np

scene = bpy.context.scene
skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))

def coords(f):
    scene.frame_set(f)
    d = bpy.context.evaluated_depsgraph_get(); d.update()
    ev = skin.evaluated_get(d)
    a = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
    ev.data.vertices.foreach_get('co', a)
    return a.reshape(-1, 3)

bad = set()
for f in [12, 22, 33, 40, 54, 65, 76, 86]:
    p = coords(f)
    for poly in skin.data.polygons:
        vs = list(poly.vertices)
        for i in range(len(vs)):
            if np.linalg.norm(p[vs[i]] - p[vs[(i+1) % len(vs)]]) > 0.22:
                bad.update((vs[i], vs[(i+1) % len(vs)]))
print('[long] sommets', len(bad))

adj = [[] for _ in skin.data.vertices]
for e in skin.data.edges:
    i, j = e.vertices
    adj[i].append(j); adj[j].append(i)
seeds = set(bad)
for i in list(bad):
    seeds.update(adj[i])

names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(skin.data.vertices), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight
for _ in range(20):
    N = W.copy()
    for i in seeds:
        if adj[i]:
            N[i] = 0.2 * W[i] + 0.8 * W[adj[i]].mean(axis=0)
    W = N
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
    if levels:
        vg = skin.vertex_groups.new(name=name)
        for k, ids in levels.items():
            vg.add(ids, k/40.0, 'REPLACE')
scene.frame_set(1)
print('[long] corrigé')
