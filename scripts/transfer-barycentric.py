"""Transfert barycentrique des poids de la peau vers toutes les couches internes.

Chaque sommet interne reçoit les poids interpolés du triangle de peau le plus
proche : les tissus suivent exactement la même déformation que la surface.
"""
import bpy
import numpy as np
from mathutils.kdtree import KDTree

skin = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))
arm = bpy.data.objects["Corps Rig"]


def world_vertices(ob):
    a = np.empty(len(ob.data.vertices) * 3, dtype=np.float32)
    ob.data.vertices.foreach_get("co", a)
    M = np.array(ob.matrix_world, dtype=np.float64)
    return (np.hstack([a.reshape(-1, 3).astype(np.float64),
                       np.ones((len(a) // 3, 1))]) @ M.T)[:, :3]


P = world_vertices(skin)
skin.data.calc_loop_triangles()
tris = np.array([[lt.vertices[0], lt.vertices[1], lt.vertices[2]]
                 for lt in skin.data.loop_triangles], dtype=np.int32)
cent = P[tris].mean(axis=1)
names = [g.name for g in skin.vertex_groups]
W = np.zeros((len(P), len(names)), dtype=np.float32)
for v in skin.data.vertices:
    for g in v.groups:
        W[v.index, g.group] = g.weight
W /= np.maximum(W.sum(axis=1, keepdims=True), 1e-9)

tree = KDTree(len(cent))
for i, c in enumerate(cent):
    tree.insert(tuple(c), i)
tree.balance()
print(f"[bary] peau {len(P)} sommets, {len(tris)} triangles, {len(names)} groupes")


def closest_bary(p, a, b, c):
    """Barycentrique du point le plus proche sur le triangle (u,v,w)."""
    ab, ac, ap = b - a, c - a, p - a
    d1, d2 = ab @ ap, ac @ ap
    if d1 <= 0 and d2 <= 0:
        return np.array([1.0, 0.0, 0.0]), np.linalg.norm(ap)
    bp = p - b
    d3, d4 = ab @ bp, ac @ bp
    if d3 >= 0 and d4 <= d3:
        return np.array([0.0, 1.0, 0.0]), np.linalg.norm(bp)
    vc = d1 * d4 - d3 * d2
    if vc <= 0 and d1 >= 0 and d3 <= 0:
        t = d1 / (d1 - d3)
        cp = p - (a + t * ab)
        return np.array([1 - t, t, 0.0]), np.linalg.norm(cp)
    cp2 = p - c
    d5, d6 = ab @ cp2, ac @ cp2
    if d6 >= 0 and d5 <= d6:
        return np.array([0.0, 0.0, 1.0]), np.linalg.norm(cp2)
    vb = d5 * d2 - d1 * d6
    if vb <= 0 and d2 >= 0 and d6 <= 0:
        t = d2 / (d2 - d6)
        cp = p - (a + t * ac)
        return np.array([1 - t, 0.0, t]), np.linalg.norm(cp)
    va = d3 * d6 - d5 * d4
    if va <= 0 and d4 - d3 >= 0 and d5 - d6 >= 0:
        t = (d4 - d3) / ((d4 - d3) + (d5 - d6))
        cp = p - (b + t * (c - b))
        return np.array([0.0, 1 - t, t]), np.linalg.norm(cp)
    den = 1.0 / (va + vb + vc)
    return np.array([vb * den, vc * den, va * den]), 0.0


targets = [o for o in bpy.data.objects
           if o.type == "MESH" and o is not skin]
for ob in targets:
    Q = world_vertices(ob)
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    has_mod = any(m.type == "ARMATURE" for m in ob.modifiers)
    if not has_mod:
        mod = ob.modifiers.new("Armature", "ARMATURE")
        mod.object = arm
    groups = {i: {} for i in range(len(names))}
    for k, p in enumerate(Q):
        best = None
        for _co, ti, _d in tree.find_n(tuple(p), 6):
            tv = tris[ti]
            bary, dist = closest_bary(p, P[tv[0]], P[tv[1]], P[tv[2]])
            if best is None or dist < best[0]:
                best = (dist, bary, tv)
        _, bary, tv = best
        w = bary[0] * W[tv[0]] + bary[1] * W[tv[1]] + bary[2] * W[tv[2]]
        for gi, val in enumerate(w):
            lvl = int(round(float(val) * 40))
            if lvl > 0:
                groups[gi].setdefault(lvl, []).append(k)
    for gi, lv in groups.items():
        if not lv:
            continue
        vg = ob.vertex_groups.new(name=names[gi])
        for lvl, ids in lv.items():
            vg.add(ids, lvl / 40.0, "REPLACE")
    print(f"[bary] {ob.name}: {len(ob.vertex_groups)} groupes")
print("[bary] DONE")
