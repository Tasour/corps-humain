"""Supprime les faces de peau dont une arête dépasse 0,25 m (fils parasites)."""
import bpy
import bmesh

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
scene = bpy.context.scene
scene.frame_set(40)
deps = bpy.context.evaluated_depsgraph_get(); deps.update()
# on travaille sur la géométrie de repos : repérer les faces avec arête très longue
bm = bmesh.new()
bm.from_mesh(skin.data)
bad = []
for f in bm.faces:
    vs = list(f.verts)
    for i in range(len(vs)):
        d = (vs[i].co - vs[(i + 1) % len(vs)].co).length
        if d > 0.25:
            bad.append(f)
            break
print('[spider] faces à retirer:', len(bad))
if bad:
    bmesh.ops.delete(bm, geom=bad, context='FACES')
bm.to_mesh(skin.data)
bm.free()
skin.data.update()
scene.frame_set(1)
