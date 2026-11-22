"""Bouche les extrémités ouvertes de la peau et vérifie la topologie."""
import bpy
import bmesh

skin = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))
bm = bmesh.new()
bm.from_mesh(skin.data)
boundary = [e for e in bm.edges if e.is_boundary]
print("[skin] bords ouverts avant:", len(boundary))
if boundary:
    bmesh.ops.holes_fill(bm, edges=boundary, sides=0)
bm.normal_update()
bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
bm.to_mesh(skin.data)
bm.free()
skin.data.update()

bm2 = bmesh.new()
bm2.from_mesh(skin.data)
bad = [e for e in bm2.edges if not e.is_manifold]
print("[skin] bords ouverts après:", len([e for e in bm2.edges if e.is_boundary]),
      "arêtes non-manifold:", len(bad))
print("[skin] sommets:", len(skin.data.vertices), "faces:", len(skin.data.polygons))
bm2.free()
