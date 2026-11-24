"""Remplace le diaphragme par son enveloppe convexe, puis confinement lissé."""
import bpy
import bmesh
import os
import sys

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-diaphragm.glb'
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)
ob = next(o for o in bpy.data.objects if o.type == 'MESH'
          and o.name.lower().split('.')[0] == 'diaphragm')
old_name = ob.data.name
pts = [tuple(ob.matrix_world @ v.co) for v in ob.data.vertices]
bm = bmesh.new()
for p in pts[::3]:
    bm.verts.new(p)
bmesh.ops.convex_hull(bm, input=list(bm.verts), use_existing_faces=False)
verts = [tuple(v.co) for v in bm.verts]
faces = [tuple(v.index for v in f.verts) for f in bm.faces if len(f.verts) >= 3]
bm.free()
mesh = bpy.data.meshes.new('diaphragm_tmp')
mesh.from_pydata(verts, [], faces)
mesh.update()
for poly in mesh.polygons:
    poly.use_smooth = True
for mat in ob.data.materials:
    mesh.materials.append(mat)
ob.matrix_world.identity()
old = ob.data
ob.data = mesh
if old.users == 0:
    bpy.data.meshes.remove(old)
mesh.name = old_name
bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[diaphragm]', sex, 'vertices', len(verts), 'faces', len(faces))
