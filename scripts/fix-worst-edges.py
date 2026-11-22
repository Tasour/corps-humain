"""Lissage local des poids autour des sommets les plus étirés (toutes frames)."""
import bpy
import numpy as np

scene = bpy.context.scene
skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
polys = skin.data.polygons
loops = skin.data.loops
E = []
for p in range(0, len(polys), 10):
    q = polys[p]
    a, b, c = (loops[i].vertex_index for i in range(q.loop_start, q.loop_start + 3))
    E.extend(((a, b), (b, c), (c, a)))
E = np.array(E, dtype=np.int32)


def coords(f):
    scene.frame_set(f)
    d = bpy.context.evaluated_depsgraph_get(); d.update()
    ev = skin.evaluated_get(d)
    a = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
    ev.data.vertices.foreach_get('co', a)
    return a.reshape(-1, 3)


base = coords(1)
e0 = np.linalg.norm(base[E[:, 0]] - base[E[:, 1]], axis=1)
keep = e0 > 0.01
E, e0 = E[keep], e0[keep]
worst = set()
for f in [12, 22, 33, 44, 54, 65, 76, 86, 96]:
    p = coords(f)
    r = np.linalg.norm(p[E[:, 0]] - p[E[:, 1]], axis=1) / e0
    worst.update(int(i) for i in E[r > 1.9].ravel())
print('[edge] sommets à corriger:', len(worst))

adj = [[] for _ in skin.data.vertices]
for e in skin.data.edges:
    i, j = e.vertices
    adj[i].append(j); adj[j].append(i)
seeds = set(worst)
for i in list(worst):
    seeds.update(adj[i])
names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(skin.data.vertices), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight
for _ in range(15):
    N = W.copy()
    for i in seeds:
        if adj[i]:
            N[i] = 0.35 * W[i] + 0.65 * W[adj[i]].mean(axis=0)
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
            vg.add(ids, k / 40.0, 'REPLACE')
scene.frame_set(1)
print('[edge] lissage appliqué')
