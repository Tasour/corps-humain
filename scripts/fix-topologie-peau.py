"""Supprime les faces dégénérées et recalcule les normales de la peau."""
import bpy
import bmesh

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
bm = bmesh.new()
bm.from_mesh(skin.data)
degen = [f for f in bm.faces if f.calc_area() < 1e-10]
if degen:
    bmesh.ops.delete(bm, geom=degen, context='FACES')
    print('[fix] faces supprimées:', len(degen))
bm.normal_update()
for f in bm.faces:
    if f.normal.length < 0.5:
        f.normal_update()
bmesh.ops.recalc_face_normals(bm, faces=bm.faces[:])
bm.to_mesh(skin.data)
bm.free()
skin.data.update()
print('[fix] topologie nettoyée')
