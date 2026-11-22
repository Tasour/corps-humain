"""Mesure les collisions entre systèmes par BVHTree.overlap (frame 20)."""
import bpy
import json
from collections import defaultdict
from mathutils.bvhtree import BVHTree
from mathutils import Vector

scene = bpy.context.scene
scene.frame_set(20)
deps = bpy.context.evaluated_depsgraph_get(); deps.update()
catalog = json.load(open('/home/tasour/.cache/corps-sources/open-anatomy-3d/'
                         'node_modules/open-anatomy-3d/catalog.json'))
SYSTEM = {e['key']: e['system'] for e in catalog}

trees = {}
for ob in bpy.data.objects:
    if ob.type != 'MESH' or ob.name.startswith('skin'):
        continue
    system = SYSTEM.get(ob.name)
    if system not in ('organs', 'skeleton', 'muscles'):
        continue
    ev = ob.evaluated_get(deps)
    a = [tuple(v.co) for v in ev.data.vertices]
    M = ob.matrix_world
    pts = [tuple(M @ Vector(v)) for v in a]
    faces = [tuple(t.vertices) for t in ob.data.loop_triangles]
    if not pts or not faces:
        continue
    trees[ob.name] = (BVHTree.FromPolygons(pts, faces, all_triangles=True), system)

print('[coll] maillages:', len(trees))
results = []
names = list(trees)
for i in range(len(names)):
    for j in range(i + 1, len(names)):
        a, b = names[i], names[j]
        sa, sb = trees[a][1], trees[b][1]
        if sa == sb == 'muscles':
            continue
        if sa == sb == 'organs' and abs(i - j) > 30:
            continue
        try:
            hits = trees[a][0].overlap(trees[b][0])
        except Exception:
            continue
        if hits:
            results.append((sa, sb, a, b, len(hits)))

results.sort(key=lambda r: -r[4])
print('[coll] paires en conflit:', len(results))
for r in results[:20]:
    print(' ', r[0], '↔', r[1], r[2], '↔', r[3], r[4])
scene.frame_set(1)
