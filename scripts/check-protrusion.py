"""Mesure les sommets internes situés hors de la surface de peau (BVH)."""
import bpy
import numpy as np
from mathutils.bvhtree import BVHTree
from mathutils import Vector

scene = bpy.context.scene
scene.frame_set(20)
deps = bpy.context.evaluated_depsgraph_get()
deps.update()
skin = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))
ev = skin.evaluated_get(deps)
bv = BVHTree.FromObject(skin, deps, deform=True)
inv = np.array(skin.matrix_world.inverted(), dtype=np.float64)

results = []
for ob in bpy.data.objects:
    if ob.type != "MESH" or ob is skin:
        continue
    eo = ob.evaluated_get(deps)
    a = np.empty(len(eo.data.vertices) * 3, dtype=np.float32)
    eo.data.vertices.foreach_get("co", a)
    P = a.reshape(-1, 3).astype(np.float64)
    # passe en espace local de la peau
    M = np.array(eo.matrix_world, dtype=np.float64)
    W = np.hstack([P, np.ones((len(P), 1))]) @ M.T
    L = (W @ inv.T)[:, :3]
    step = max(1, len(L) // 300)
    outside = 0
    total = 0
    direction = Vector((1, 0, 0))
    for p in L[::step]:
        origin = Vector(p)
        count = 0
        for _ in range(20):
            hit = bv.ray_cast(origin, direction, 10.0)
            if hit[0] is None:
                break
            count += 1
            origin = hit[0] + direction * 1e-4
        total += 1
        if count % 2 == 0:
            outside += 1
    if outside:
        results.append((ob.name, outside, total, round(outside / max(total, 1), 3)))

results.sort(key=lambda r: -r[3])
print("PROTRUSION", len(results), "objets")
for r in results[:25]:
    print(" ", r)
scene.frame_set(1)
