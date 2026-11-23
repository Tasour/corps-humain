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
from mathutils import Vector

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
    color = (0.55, 0.78, 0.92, 1) if key in ('lung_l', 'lung_r') else hex_color(entry.get('color'))
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = 0.75
    return mat


def build(sex):
    bpy.ops.wm.open_mainfile(filepath=BLEND[sex])
    rig = bpy.data.objects['Corps Rig']
    # L'auto-poids échoue sur la peau masculine (tous les poids à 0) : on
    # garde les poids de l'ancienne peau pour les transférer par plus proche
    # sommet sur la nouvelle peau, de même sexe et même repère.
    old_skin_weights = None
    if sex == 'male':
        old = next((o for o in bpy.data.objects
                    if o.type == 'MESH' and o.name.lower().startswith('skin')), None)
        if old:
            names = [g.name for g in old.vertex_groups]
            old_skin_weights = (
                [old.matrix_world @ v.co for v in old.data.vertices],
                names,
                [[(names[g.group], g.weight) for g in v.groups]
                 for v in old.data.vertices],
            )
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
        if (key in kept_skeleton or key not in BY_KEY
                or key in ('breast_l', 'breast_r', 'larynx')):
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

        is_skin = BY_KEY[key]['system'] == 'skin'
        if sex == 'male' and is_skin and old_skin_weights:
            old_points, old_names, old_weights = old_skin_weights
            tree = KDTree(len(old_points))
            for i, point in enumerate(old_points):
                tree.insert(point, i)
            tree.balance()
            groups = {name: ob.vertex_groups.new(name=name) for name in old_names}
            for v in ob.data.vertices:
                _, nearest, _ = tree.find(v.co)
                for name, weight in old_weights[nearest]:
                    groups[name].add([v.index], weight, 'REPLACE')
            mod = ob.modifiers.new('Armature', 'ARMATURE')
            mod.object = rig
        elif BY_KEY[key]['system'] in ('skin', 'muscles'):
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

    # Nerfs périphériques : modèle CC0 Innerscene (moelle + racines nerveuses).
    # Importé, mis à l'échelle sur le canal rachidien du rig, puis attaché
    # rigidement aux os du rachis. Le viewer reconnaît le préfixe `nerve_`.
    nerve_source = '/tmp/opencode/peripheral-nerves.glb'
    if os.path.exists(nerve_source):
        before = {o.name for o in bpy.data.objects}
        bpy.ops.import_scene.gltf(filepath=nerve_source)
        for ob in [o for o in bpy.data.objects
                   if o.name not in before and o.type == 'MESH'
                   and 'envelope' in o.name.lower()]:
            bpy.data.objects.remove(ob, do_unlink=True)
        nerves = [o for o in bpy.data.objects
                  if o.name not in before and o.type == 'MESH']
        for ob in nerves:
            world = ob.matrix_world.copy()
            ob.parent = None
            ob.matrix_world = world
            bpy.ops.object.select_all(action='DESELECT')
            ob.select_set(True)
            bpy.context.view_layer.objects.active = ob
            bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        points = [v.co for ob in nerves for v in ob.data.vertices]
        lo = [min(p[i] for p in points) for i in range(3)]
        hi = [max(p[i] for p in points) for i in range(3)]
        height = max(hi[2] - lo[2], 1e-6)
        scale = 0.58 / height
        center = [(lo[i] + hi[i]) / 2 for i in range(3)]
        target = Vector((0, 0, 1.24))
        center = Vector(center)
        nerve_mat = bpy.data.materials.get('V6 Nerf périphérique') or bpy.data.materials.new('V6 Nerf périphérique')
        nerve_mat.use_nodes = True
        bsdf = next(n for n in nerve_mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
        bsdf.inputs['Base Color'].default_value = (0.95, 0.78, 0.20, 1)
        bsdf.inputs['Roughness'].default_value = 0.7
        for ob in nerves:
            for v in ob.data.vertices:
                v.co = ((v.co - center) * scale) + target
        # Assemblage : les 259 racines forment un seul arbre nerveux continu
        # au lieu de segments flottants attenants à des os aléatoires.
        bpy.ops.object.select_all(action='DESELECT')
        for ob in nerves:
            ob.select_set(True)
        bpy.context.view_layer.objects.active = nerves[0]
        bpy.ops.object.join()
        tree = bpy.context.object
        tree.name = 'nerves_peripheral'
        tree.data.materials.clear()
        tree.data.materials.append(nerve_mat)
        bones = [b for b in rig.data.bones if 'spine' in b.name.lower() or b.name == 'head']
        nearest = min(bones, key=lambda b: (rig.matrix_world @ b.head_local - tree.matrix_world.translation).length)
        group = tree.vertex_groups.new(name=nearest.name)
        group.add(list(range(len(tree.data.vertices))), 1.0, 'REPLACE')
        mod = tree.modifiers.new('Armature', 'ARMATURE')
        mod.object = rig
        print('[v6]', sex, 'nerfs assemblés', len(nerves), 'maillages -> 1')

    # Vaisseaux supplémentaires : modèle CC0 Innerscene (système circulatoire).
    # Le modèle CC0 Innerscene a été écarté : l'utilisateur conserve le jeu
    # d'origine open-anatomy, déjà aligné et coloré par structure.
    vessel_source = ''
    if os.path.exists(vessel_source):
        before = {o.name for o in bpy.data.objects}
        bpy.ops.import_scene.gltf(filepath=vessel_source)
        for ob in [o for o in bpy.data.objects
                   if o.name not in before and o.type == 'MESH'
                   and 'envelope' in o.name.lower()]:
            bpy.data.objects.remove(ob, do_unlink=True)
        vessels = [o for o in bpy.data.objects
                   if o.name not in before and o.type == 'MESH']
        for ob in vessels:
            world = ob.matrix_world.copy()
            ob.parent = None
            ob.matrix_world = world
            bpy.ops.object.select_all(action='DESELECT')
            ob.select_set(True)
            bpy.context.view_layer.objects.active = ob
            bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        points = [v.co for ob in vessels for v in ob.data.vertices]
        lo = [min(p[i] for p in points) for i in range(3)]
        hi = [max(p[i] for p in points) for i in range(3)]
        scale = 1.72 / max(hi[2] - lo[2], 1e-6)
        center = Vector([(lo[i] + hi[i]) / 2 for i in range(3)])
        target = Vector((0, 0, 0.86))
        mats = {}
        for name, color in [('artere', (0.85, 0.16, 0.18, 1)),
                            ('veine', (0.18, 0.38, 0.85, 1))]:
            m = bpy.data.materials.get('V6 ' + name) or bpy.data.materials.new('V6 ' + name)
            m.use_nodes = True
            bsdf = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
            bsdf.inputs['Base Color'].default_value = color
            mats[name] = m
        for i, ob in enumerate(vessels, 1):
            for v in ob.data.vertices:
                v.co = ((v.co - center) * scale) + target
            low = ob.name.lower()
            veine = 'ven' in low or 'atri' in low or 'auricular' in low
            ob.name = 'vessel_ext_%03d' % i
            ob.data.materials.clear()
            ob.data.materials.append(mats['veine' if veine else 'artere'])
            bones = [b for b in rig.data.bones if 'spine' in b.name.lower() or b.name == 'head']
            nearest = min(bones, key=lambda b: (rig.matrix_world @ b.head_local - ob.matrix_world.translation).length)
            group = ob.vertex_groups.new(name=nearest.name)
            group.add(list(range(len(ob.data.vertices))), 1.0, 'REPLACE')
            mod = ob.modifiers.new('Armature', 'ARMATURE')
            mod.object = rig
        print('[v6]', sex, 'vaisseaux importés', len(vessels))

    bpy.ops.wm.save_as_mainfile(filepath=OUT[sex])
    print('[v6]', sex, 'squelette conservé', len(kept_skeleton),
          'maillages', len([o for o in bpy.data.objects if o.type == 'MESH']))


for sex in ('female', 'male'):
    build(sex)
