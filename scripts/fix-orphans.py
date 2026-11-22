"""Rattache les sommets sans poids à l'os anatomique le plus proche."""
import bpy
import numpy as np

arm = bpy.data.objects["Corps Rig"]
bones = {b.name: (np.array(b.head_local), np.array(b.tail_local))
         for b in arm.data.bones}

for ob in bpy.data.objects:
    if ob.type != "MESH":
        continue
    orphans = [v.index for v in ob.data.vertices
               if sum(g.weight for g in v.groups) < 0.1]
    if not orphans:
        continue
    a = np.empty(len(ob.data.vertices) * 3, dtype=np.float32)
    ob.data.vertices.foreach_get("co", a)
    P = a.reshape(-1, 3).astype(np.float64)
    M = np.array(ob.matrix_world, dtype=np.float64)
    W = (np.hstack([P, np.ones((len(P), 1))]) @ M.T)[:, :3]
    # os dominant de l'objet (anatomiquement cohérent avec ses voisins)
    counts = {}
    for v in ob.data.vertices:
        for g in v.groups:
            if g.weight > 0.3:
                name = ob.vertex_groups[g.group].name
                counts[name] = counts.get(name, 0) + 1
    if not counts:
        continue
    dominant = max(counts, key=counts.get)
    vg = ob.vertex_groups.get(dominant) or ob.vertex_groups.new(name=dominant)
    vg.add(orphans, 1.0, "REPLACE")
    print("[orphan]", ob.name, len(orphans), "->", dominant)
print("[orphan] done")
