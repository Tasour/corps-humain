"""Contrôle déterministe : étirement des arêtes > 5 mm au repos."""
import bpy
import numpy as np

scene = bpy.context.scene
deps = bpy.context.evaluated_depsgraph_get()
FRAMES = [1, 12, 22, 33, 44, 54, 65, 76, 86, 97]
THRESH = 0.005  # 5 mm

total_bad = 0
for obj_name in ["Vitruve — muscle", "Vitruve — bone"]:
    ob = bpy.data.objects[obj_name]
    polys = ob.data.polygons
    loops = ob.data.loops
    edges = []
    for p in range(0, len(polys), 60):
        poly = polys[p]
        a, b, c = (loops[i].vertex_index for i in range(poly.loop_start, poly.loop_start + 3))
        edges.extend(((a, b), (b, c), (c, a)))
    edges = np.array(edges, dtype=np.int32)

    def coords(frame):
        scene.frame_set(frame); deps.update()
        ev = ob.evaluated_get(deps)
        arr = np.empty(len(ev.data.vertices) * 3, dtype=np.float32)
        ev.data.vertices.foreach_get("co", arr)
        return arr.reshape(-1, 3)

    base = coords(1)
    e0 = np.linalg.norm(base[edges[:, 0]] - base[edges[:, 1]], axis=1)
    keep = e0 > THRESH
    edges, e0 = edges[keep], e0[keep]
    print(f"=== {obj_name}: {len(edges)} arêtes > {THRESH*1000:.0f} mm")
    print(" frame | max étirement | >3x | >2x")
    for f in FRAMES:
        p = coords(f)
        e = np.linalg.norm(p[edges[:, 0]] - p[edges[:, 1]], axis=1)
        ratio = e / e0
        n3, n2 = int((ratio > 3).sum()), int((ratio > 2).sum())
        total_bad += n3
        print("  %4d | %6.2f        | %4d | %4d" % (f, float(ratio.max()), n3, n2))
print("TOTAL >3x (arêtes >5mm) :", total_bad)
scene.frame_set(1)
