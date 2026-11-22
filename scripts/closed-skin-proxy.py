"""Crée une copie fermée de la peau (bouchage des bords) pour les tests BVH."""
import bpy
import bmesh

source = next(o for o in bpy.data.objects if o.type == "MESH" and o.name.startswith("skin"))
name = "skin_closed"
old = bpy.data.objects.get(name)
if old:
    bpy.data.objects.remove(old, do_unlink=True)

proxy = source.copy()
proxy.data = source.data.copy()
proxy.name = name
proxy.data.name = name
bpy.context.scene.collection.objects.link(proxy)

# groupes de sommets identiques
for vg in list(proxy.vertex_groups):
    proxy.vertex_groups.remove(vg)
for vg in source.vertex_groups:
    nv = proxy.vertex_groups.new(name=vg.name)
    for v in source.data.vertices:
        for g in v.groups:
            if g.group == vg.index and g.weight > 0.001:
                nv.add([v.index], g.weight, "REPLACE")

# armature
for m in list(proxy.modifiers):
    proxy.modifiers.remove(m)
for m in source.modifiers:
    if m.type == "ARMATURE":
        nm = proxy.modifiers.new("Armature", "ARMATURE")
        nm.object = m.object

bm = bmesh.new()
bm.from_mesh(proxy.data)
boundary = [e for e in bm.edges if e.is_boundary]
print("[proxy] bords ouverts:", len(boundary))
if boundary:
    try:
        bmesh.ops.holes_fill(bm, edges=boundary, sides=0)
        print("[proxy] trous bouchés")
    except Exception as exc:
        print("[proxy] holes_fill échoué:", exc)
bm.to_mesh(proxy.data)
bm.free()
proxy.data.update()
proxy.hide_render = True
proxy.hide_set(True)
print("[proxy] sommets:", len(proxy.data.vertices))
