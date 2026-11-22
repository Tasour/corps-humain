"""Égalise les poids des deux sommets de l'arête la plus étirée."""
import bpy
import numpy as np

scene = bpy.context.scene
skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
polys = skin.data.polygons; loops = skin.data.loops
E = []
for p in range(0, len(polys), 10):
    q = polys[p]
    a, b, c = (loops[i].vertex_index for i in range(q.loop_start, q.loop_start + 3))
    E.extend(((a, b), (b, c), (c, a)))
E = np.array(E, dtype=np.int32)


def C(f):
    scene.frame_set(f)
    d = bpy.context.evaluated_depsgraph_get(); d.update()
    ev = skin.evaluated_get(d)
    a = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
    ev.data.vertices.foreach_get('co', a)
    return a.reshape(-1, 3)


base = C(1)
e0 = np.linalg.norm(base[E[:, 0]] - base[E[:, 1]], axis=1)
idx = np.where(e0 > 0.01)[0]
E, e0 = E[idx], e0[idx]
names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(skin.data.vertices), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight

for f in [22, 33, 54]:
    p = C(f)
    r = np.linalg.norm(p[E[:, 0]] - p[E[:, 1]], axis=1) / e0
    for k in np.where(r > 1.95)[0]:
        a, b = E[k]
        avg = (W[a] + W[b]) * 0.5
        W[a] = avg; W[b] = avg
        print('[edge] égalisé', a, b, 'ratio', round(float(r[k]), 2))

W /= np.maximum(W.sum(axis=1, keepdims=True), 1e-9)
for g in list(skin.vertex_groups):
    skin.vertex_groups.remove(g)
for gi, name in enumerate(names):
    w = W[:, gi]
    levels = {}
    for i, val in enumerate(w):
        kk = int(round(float(val) * 40))
        if kk > 0:
            levels.setdefault(kk, []).append(i)
    if levels:
        vg = skin.vertex_groups.new(name=name)
        for kk, ids in levels.items():
            vg.add(ids, kk / 40.0, 'REPLACE')
scene.frame_set(1)
print('[edge] fait')
