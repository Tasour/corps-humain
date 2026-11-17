import bpy, json, os

depsgraph = bpy.context.evaluated_depsgraph_get()
rows = []
for o in bpy.data.objects:
    if o.type != "MESH":
        continue
    evaluated = o.evaluated_get(depsgraph)
    mesh = evaluated.to_mesh()
    mesh.calc_loop_triangles()
    rows.append({
        "name": o.name,
        "verts": len(mesh.vertices),
        "polys": len(mesh.polygons),
        "tris": len(mesh.loop_triangles),
        "cols": [c.name for c in o.users_collection],
        "dims": [round(float(x), 4) for x in o.dimensions],
        "mats": [m.name for m in mesh.materials if m],
    })
    evaluated.to_mesh_clear()
out = os.environ.get("ZANATOMY_OBJECTS", "zanatomy-objects.json")
with open(out, "w") as f:
    json.dump(rows, f)
print("DUMPED", len(rows), "->", out)
