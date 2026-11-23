"""Remplace le corps masculin du .blend femme par anatomy-female.glb (CC BY 4.0).

La source open-anatomy-3d fournit une anatomie féminine alignée avec le même
référentiel que le modèle masculin. On importe la peau et les organes féminins,
on transfère les poids de la peau masculine sur la peau féminine, puis on
supprime la peau d'origine et la prostate.

Le GLB source est meshopt-compressé : le décompresser d'abord avec
  npx @gltf-transform/cli@4.5.1 copy anatomy-female.glb anatomy-female-plain.glb
Le chemin du GLB décompressé peut être surchargé par FEMALE_GLB.
"""
import bpy
import os

SOURCE = os.environ.get(
    'FEMALE_GLB', '/tmp/opencode/anatomy-female-plain.glb')
BLEND = '/home/tasour/corps-humain/docs/humain-femme-complet.blend'
OUT = '/home/tasour/corps-humain/docs/humain-femme-anatomie.blend'
KEEP = {'skin', 'uterus', 'vagina', 'ovary_l', 'ovary_r', 'breast_l', 'breast_r'}

bpy.ops.wm.open_mainfile(filepath=BLEND)
old_skin = next(o for o in bpy.data.objects
                if o.type == 'MESH' and o.name.lower().startswith('skin'))
old_height = max((old_skin.matrix_world @ v.co).z
                 for v in old_skin.data.vertices)

before = {o.name for o in bpy.data.objects}
bpy.ops.import_scene.gltf(filepath=SOURCE)
imported = [o for o in bpy.data.objects
            if o.name not in before and o.type == 'MESH']

# Ne garder que la peau et les organes féminins.
def base_name(ob):
    return ob.name.split('.')[0].lower()

kept_names = [ob.name for ob in imported if base_name(ob) in KEEP]
for ob in imported:
    if base_name(ob) not in KEEP:
        bpy.data.objects.remove(ob, do_unlink=True)
imported = [bpy.data.objects[name] for name in kept_names]
female_skin = next(o for o in imported if base_name(o) == 'skin')

# Boulanger les transformations importées, puis aligner la hauteur sur le rig.
for ob in imported:
    world = ob.matrix_world.copy()
    ob.parent = None
    ob.matrix_world = world
    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

new_height = max(v.co.z for v in female_skin.data.vertices)
factor = old_height / new_height
for ob in imported:
    for v in ob.data.vertices:
        v.co *= factor

# Matériaux : peau et organes.
peau = bpy.data.materials.get('Peau.005') or bpy.data.materials.get('Mat skin')
organes = bpy.data.materials.get('Mat organs')
for ob in imported:
    ob.data.materials.clear()
    ob.data.materials.append(peau if ob is female_skin else organes)
    ob['anatomie'] = base_name(ob)

rig = bpy.data.objects['Corps Rig']

# Poids automatiques : la peau féminine n'a pas la même pose de repos que la
# peau masculine, un transfert par plus proche sommet créait de longues nappes
# entre les poignets et le torse. L'auto-poids du rig donne des déformations
# propres et reste déterministe.
bpy.ops.object.select_all(action='DESELECT')
female_skin.select_set(True)
rig.select_set(True)
bpy.context.view_layer.objects.active = rig
bpy.ops.object.parent_set(type='ARMATURE_AUTO')
rig.select_set(False)

# Organes internes : attache rigide à l'os le plus proche.
rigid = {
    'uterus': 'pelvis', 'vagina': 'pelvis',
    'ovary_l': 'pelvis', 'ovary_r': 'pelvis',
    'breast_l': 'ribcage', 'breast_r': 'ribcage',
}
for ob in imported:
    if ob is female_skin:
        continue
    target = rigid.get(ob.get('anatomie', ''), 'pelvis')
    group = ob.vertex_groups.get(target) or ob.vertex_groups.new(name=target)
    group.add(list(range(len(ob.data.vertices))), 1.0, 'REPLACE')

for ob in imported:
    if ob is female_skin:
        continue  # l'auto-poids a déjà créé le modificateur Armature
    mod = ob.modifiers.new('Armature', 'ARMATURE')
    mod.object = rig

# Suppression de l'ancienne peau et de la prostate masculine.
bpy.data.objects.remove(old_skin, do_unlink=True)
for ob in list(bpy.data.objects):
    if ob.type == 'MESH' and ob.name.lower() == 'prostate':
        bpy.data.objects.remove(ob, do_unlink=True)

bpy.ops.wm.save_as_mainfile(filepath=OUT)
print('[female] sauvegardé', OUT)
print('[female] maillages importés', [o.name for o in imported])
print('[female] facteur d échelle', round(factor, 4))
