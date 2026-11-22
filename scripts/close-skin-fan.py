"""Ferme toutes les boucles de bord de la peau par un éventail de faces."""
import bpy
import bmesh
from collections import defaultdict

skin = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))
bm = bmesh.new()
bm.from_mesh(skin.data)
boundary = [e for e in bm.edges if e.is_boundary]
print("[fan] bords initiaux:", len(boundary))

adj = defaultdict(list)
for e in boundary:
    a, b = e.verts
    adj[a].append(b)
    adj[b].append(a)

seen = set()
components = []
for v in adj:
    if v in seen:
        continue
    stack = [v]
    comp = set()
    edges = []
    while stack:
        u = stack.pop()
        if u in comp:
            continue
        comp.add(u)
        for w in adj[u]:
            edges.append((u, w))
            if w not in comp:
                stack.append(w)
    seen |= comp
    components.append((comp, edges))

print("[fan] boucles:", len(components))
for comp, edges in components:
    if len(comp) < 3:
        continue
    center = bm.verts.new(tuple(sum(v.co[i] for v in comp) / len(comp) for i in range(3)))
    done = set()
    for u, w in edges:
        key = frozenset((u, w))
        if key in done:
            continue
        done.add(key)
        try:
            bm.faces.new((u, w, center))
        except ValueError:
            pass
bm.to_mesh(skin.data)
bm.free()
skin.data.update()

bm2 = bmesh.new()
bm2.from_mesh(skin.data)
print("[fan] bords restants:", len([e for e in bm2.edges if e.is_boundary]),
      "non-manifold:", len([e for e in bm2.edges if not e.is_manifold]))
print("[fan] sommets:", len(skin.data.vertices), "faces:", len(skin.data.polygons))
bm2.free()
