"""Lissage local des poids autour des sommets qui s'étirent trop."""
import bpy
import numpy as np

scene = bpy.context.scene
skin = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))


def coords(f):
    scene.frame_set(f)
    d = bpy.context.evaluated_depsgraph_get(); d.update()
    ev = skin.evaluated_get(d)
    a = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
    ev.data.vertices.foreach_get("co", a)
    return a.reshape(-1, 3)


polys = skin.data.polygons
loops = skin.data.loops
E = []
for p in range(0, len(polys), 10):
    q = polys[p]
    a, b, c = (loops[i].vertex_index for i in range(q.loop_start, q.loop_start + 3))
    E.extend(((a, b), (b, c), (c, a)))
E = np.array(E, dtype=np.int32)
base = coords(1)
e0 = np.linalg.norm(base[E[:, 0]] - base[E[:, 1]], axis=1)
keep = e0 > 0.005
E, e0 = E[keep], e0[keep]
p12 = coords(12)
r = np.linalg.norm(p12[E[:, 0]] - p12[E[:, 1]], axis=1) / e0
bad = np.unique(E[r > 2].ravel())
print("[local] sommets fautifs:", len(bad))

adj = [[] for _ in skin.data.vertices]
for e in skin.data.edges:
    i, j = e.vertices
    adj[i].append(j)
    adj[j].append(i)

names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(skin.data.vertices), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight

seeds = set(int(i) for i in bad)
for i in list(seeds):
    seeds.update(adj[i])
for iteration in range(12):
    newW = W.copy()
    for i in seeds:
        ns = adj[i]
        if ns:
            newW[i] = 0.4 * W[i] + 0.6 * W[ns].mean(axis=0)
    W = newW
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
        vg.add(ids, k / 40.0, "REPLACE")
print("[local] lissage appliqué sur", len(seeds), "sommets")
scene.frame_set(1)
