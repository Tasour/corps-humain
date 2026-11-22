"""Classe les paires de collision BVH en anatomiquement attendues ou pathologiques."""
import bpy
import json
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
    if SYSTEM.get(ob.name) not in ('organs', 'skeleton', 'muscles'):
        continue
    ev = ob.evaluated_get(deps)
    pts = [tuple(ob.matrix_world @ Vector(v.co)) for v in ev.data.vertices]
    faces = [tuple(t.vertices) for t in ob.data.loop_triangles]
    if pts and faces:
        trees[ob.name] = (BVHTree.FromPolygons(pts, faces, all_triangles=True),
                          SYSTEM[ob.name])

ATTENDUES = [('heart', 'lung'), ('brain', 'brainstem'), ('larynx', 'pharynx'),
             ('ribs', 'spine'), ('skull', 'teeth'), ('skull', 'mandible')]
expected = []
pathological = []
names = list(trees)
for i in range(len(names)):
    for j in range(i + 1, len(names)):
        a, b = names[i], names[j]
        sa, sb = trees[a][1], trees[b][1]
        try:
            n = len(trees[a][0].overlap(trees[b][0]))
        except Exception:
            continue
        if not n:
            continue
        ok = (sa == 'muscles' and sb in ('skeleton', 'organs', 'muscles')) or \
             (sb == 'muscles' and sa in ('skeleton', 'organs', 'muscles')) or \
             (sa == 'skeleton' and sb == 'skeleton') or \
             (sa == 'organs' and sb == 'organs') or \
             (sa == 'organs' and sb == 'skeleton') or \
             (sb == 'organs' and sa == 'skeleton') or \
             any(x in a and y in b or x in b and y in a for x, y in ATTENDUES)
        (expected if ok else pathological).append(
            {'a': a, 'b': b, 'systemes': [sa, sb], 'triangles': n})

report = {'frame': 20, 'attendues': len(expected), 'pathologiques': len(pathological),
          'exemples_attendus': expected[:10], 'pathologiques_liste': pathological[:30]}
json.dump(report, open('/home/tasour/corps-humain/docs/analyses/collisions-animees.json', 'w'),
          ensure_ascii=False, indent=1)
print('[coll] attendues', len(expected), 'pathologiques', len(pathological))
for p in pathological[:10]:
    print('  ', p['a'], '↔', p['b'], p['triangles'])
scene.frame_set(1)
