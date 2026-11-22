"""Audit complet de la topologie de la peau dans la scène courante."""
import bpy
import bmesh
import numpy as np

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
bm = bmesh.new()
bm.from_mesh(skin.data)
boundary = [e for e in bm.edges if e.is_boundary]
nonmanifold = [e for e in bm.edges if not e.is_manifold]
degen = [f for f in bm.faces if f.calc_area() < 1e-10]
loose = [v for v in bm.verts if not v.link_edges]
flipped = 0
for f in bm.faces:
    if f.normal.length < 0.5:
        flipped += 1
print('[topo] sommets', len(bm.verts), 'faces', len(bm.faces))
print('[topo] bords', len(boundary), 'non-manifold', len(nonmanifold))
print('[topo] faces dégénérées', len(degen), 'sommets isolés', len(loose), 'normales nulles', flipped)
bm.free()
