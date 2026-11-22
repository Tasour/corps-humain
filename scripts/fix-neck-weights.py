"""Rattache neck_muscles_l/r au rachis cervical et à la tête."""
import bpy
import numpy as np


def smoothstep(x, a, b):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


for side in ("l", "r"):
    ob = bpy.data.objects.get(f"neck_muscles_{side}")
    if not ob:
        continue
    a = np.empty(len(ob.data.vertices) * 3, dtype=np.float32)
    ob.data.vertices.foreach_get("co", a)
    M = np.array(ob.matrix_world, dtype=np.float64)
    p = (np.hstack([a.reshape(-1, 3).astype(np.float64),
                    np.ones((len(a) // 3, 1))]) @ M.T)[:, :3]
    t = smoothstep(p[:, 2], 1.24, 1.52)
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    for name, w in ((f"spine_cervical", 1 - t), ("head", t)):
        vg = ob.vertex_groups.new(name=name)
        lv = {}
        for i, val in enumerate(w):
            k = int(round(float(val) * 40))
            if k > 0:
                lv.setdefault(k, []).append(i)
        for k, ids in lv.items():
            vg.add(ids, k / 40.0, "REPLACE")
    print("[fix]", ob.name, "cervical/head")
