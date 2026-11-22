import bpy, numpy as np

ob = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
names = [g.name for g in ob.vertex_groups]
n = len(ob.data.vertices)
W = np.zeros((n, len(names)), dtype=np.float32)
for v in ob.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight
W /= np.maximum(W.sum(axis=1, keepdims=True), 1e-9)

adj = [[] for _ in range(n)]
for e in ob.data.edges:
    i, j = e.vertices
    adj[i].append(j)
    adj[j].append(i)

for iteration in range(6):
    N = np.zeros_like(W)
    for i in range(n):
        ns = adj[i]
        if ns:
            N[i] = W[ns].mean(axis=0)
    W = 0.45 * W + 0.55 * N
    W /= np.maximum(W.sum(axis=1, keepdims=True), 1e-9)

for g in list(ob.vertex_groups):
    ob.vertex_groups.remove(g)
for gi, name in enumerate(names):
    w = W[:, gi]
    levels = {}
    for i, val in enumerate(w):
        lvl = int(round(float(val) * 40))
        if lvl > 0:
            levels.setdefault(lvl, []).append(i)
    if not levels:
        continue
    vg = ob.vertex_groups.new(name=name)
    for lvl, ids in levels.items():
        vg.add(ids, lvl / 40.0, 'REPLACE')
print('smoothed', n, len(names))
