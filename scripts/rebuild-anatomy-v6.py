"""Reconstruit les couches anatomiques à partir de anatomy-<sexe>.glb (CC BY 4.0).

Le squelette d'origine est conservé tel quel. Toutes les autres couches
(peau, muscles, organes, vaisseaux, nerfs) sont remplacées par les maillages
complets de la source, avec une couleur par structure d'après catalog.json.
"""
import bpy
import json
import os
import re
from mathutils.kdtree import KDTree

ROOT = '/home/tasour/corps-humain'
CAT = json.load(open('/home/tasour/.cache/corps-sources/open-anatomy-3d/'
                     'node_modules/open-anatomy-3d/catalog.json'))
BY_KEY = {e['key'].lower(): e for e in CAT}
SKELETON = {e['key'].lower() for e in CAT if e['system'] == 'skeleton'}
SOURCE = {
    'female': '/tmp/opencode/anatomy-female-plain.glb',
    'male': '/tmp/opencode/anatomy-male-plain.glb',
}
BLEND = {
    'female': ROOT + '/docs/humain-femme-anatomie.blend',
    'male': ROOT + '/docs/humain-homme-complet.blend',
}
OUT = {
    'female': ROOT + '/docs/humain-femme-v6.blend',
    'male': ROOT + '/docs/humain-homme-v6.blend',
}


def base(name):
    return re.sub(r'\.\d+$', '', name).lower()


def hex_color(value):
    value = (value or '#cccccc').lstrip('#')
    return tuple(int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1,)


def material(key):
    entry = BY_KEY.get(key, {})
    name = 'V6 ' + (entry.get('label') or key)
    mat = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    for link in list(mat.node_tree.links):
        if link.to_node == bsdf and link.to_socket.name == 'Base Color':
            mat.node_tree.links.remove(link)
    bsdf.inputs['Base Color'].default_value = hex_color(entry.get('color'))
    bsdf.inputs['Roughness'].default_value = 0.75
    return mat


def build(sex):
    bpy.ops.wm.open_mainfile(filepath=BLEND[sex])
    rig = bpy.data.objects['Corps Rig']
    kept_skeleton = {}
    for ob in list(bpy.data.objects):
        if ob.type != 'MESH':
            continue
        key = base(ob.name)
        if key in SKELETON:
            kept_skeleton[key] = ob
            continue
        bpy.data.objects.remove(ob, do_unlink=True)

    before = {o.name for o in bpy.data.objects}
    bpy.ops.import_scene.gltf(filepath=SOURCE[sex])
    imported = [o for o in bpy.data.objects
                if o.name not in before and o.type == 'MESH']

    for ob in imported:
        key = base(ob.name)
        if key in kept_skeleton or key not in BY_KEY:
            bpy.data.objects.remove(ob, do_unlink=True)
            continue

        world = ob.matrix_world.copy()
        ob.parent = None
        ob.matrix_world = world
        bpy.ops.object.select_all(action='DESELECT')
        ob.select_set(True)
        bpy.context.view_layer.objects.active = ob
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

        ob.data.materials.clear()
        ob.data.materials.append(material(key))

        if BY_KEY[key]['system'] in ('skin', 'muscles'):
            bpy.ops.object.select_all(action='DESELECT')
            ob.select_set(True)
            rig.select_set(True)
            bpy.context.view_layer.objects.active = rig
            bpy.ops.object.parent_set(type='ARMATURE_AUTO')
            rig.select_set(False)
        else:
            # Attache rigide à l'os le plus proche : les couches internes sont
            # des vues anatomiques figées dans le viewer.
            bones = list(rig.data.bones)
            head = min(bones, key=lambda b: (rig.matrix_world @ b.head_local - ob.matrix_world.translation).length)
            group = ob.vertex_groups.new(name=head.name)
            group.add(list(range(len(ob.data.vertices))), 1.0, 'REPLACE')
            mod = ob.modifiers.new('Armature', 'ARMATURE')
            mod.object = rig

    # Muscles du visage absents de la source : formes simples mais nommées,
    # attachées à la tête, pour ne plus laisser un crâne sans muscles.
    face = [
        ('frontalis', (0, -0.085, 1.66), (0.055, 0.02, 0.035)),
        ('orbicularis_oculi_l', (-0.032, -0.088, 1.635), (0.024, 0.012, 0.015)),
        ('orbicularis_oculi_r', (0.032, -0.088, 1.635), (0.024, 0.012, 0.015)),
        ('masseter_l', (-0.055, -0.06, 1.585), (0.018, 0.035, 0.03)),
        ('masseter_r', (0.055, -0.06, 1.585), (0.018, 0.035, 0.03)),
        ('orbicularis_oris', (0, -0.09, 1.565), (0.038, 0.012, 0.022)),
    ]
    for name, loc, scale in face:
        bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8,
                                             location=loc)
        ob = bpy.context.object
        ob.name = name
        ob.scale = scale
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        ob.data.materials.append(material('masseter_l') if 'masseter' in name else material('frontalis'))
        group = ob.vertex_groups.new(name='head')
        group.add(list(range(len(ob.data.vertices))), 1.0, 'REPLACE')
        mod = ob.modifiers.new('Armature', 'ARMATURE')
        mod.object = rig

    bpy.ops.wm.save_as_mainfile(filepath=OUT[sex])
    print('[v6]', sex, 'squelette conservé', len(kept_skeleton),
          'maillages', len([o for o in bpy.data.objects if o.type == 'MESH']))


for sex in ('female', 'male'):
    build(sex)
