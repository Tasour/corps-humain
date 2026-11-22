"""Crée des copies de la peau en coupe frontale et sagittale (booléen)."""
import bpy

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))


def make_cube(name, location, scale):
    bpy.ops.mesh.primitive_cube_add(size=2, location=location)
    ob = bpy.context.object
    ob.name = name
    ob.scale = scale
    return ob


def make_section(name, cutter):
    old = bpy.data.objects.get(name)
    if old:
        bpy.data.objects.remove(old, do_unlink=True)
    copy = skin.copy()
    copy.data = skin.data.copy()
    copy.name = name
    bpy.context.scene.collection.objects.link(copy)
    mod = copy.modifiers.new('Coupe', 'BOOLEAN')
    mod.operation = 'DIFFERENCE'
    mod.object = cutter
    copy.hide_render = True
    copy.hide_set(True)
    return copy


front = make_cube('Plan coupe frontal', (0, -2, 0.85), (3, 2, 3))
make_section('Peau coupe frontale', front)
sag = make_cube('Plan coupe sagittal', (-2, 0, 0.85), (2, 3, 3))
make_section('Peau coupe sagittale', sag)
print('[section] coupes créées')
