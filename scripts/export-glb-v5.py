"""Export GLB source : 6 matériaux PBR par système, 6 danses, transforms boulangés.

Différence avec v4 : le fichier exporté garde explicitement les six matériaux
PBR (peau, squelette, muscles, organes, vaisseaux, nerfs). La compression
meshopt est ensuite faite par scripts/optimize-glb-v5.mjs avec --palette false
pour ne pas les fusionner en palette.

Usage :
  HUMAIN_SEX=female blender -b docs/humain-femme-complet.blend \
      --python scripts/export-glb-v5.py
"""
import bpy
import json
import os

SEX = os.environ.get('HUMAIN_SEX', 'female')
name = 'female' if SEX == 'female' else 'male'
DEFAULT_BLEND = f'/home/tasour/corps-humain/docs/humain-{"femme" if SEX=="female" else "homme"}-complet.blend'
BLEND = os.environ.get('HUMAIN_BLEND', DEFAULT_BLEND)
OUT = f'/home/tasour/corps-humain/docs/models/corps-{name}.glb'
CAT = json.load(open('/home/tasour/.cache/corps-sources/open-anatomy-3d/'
                     'node_modules/open-anatomy-3d/catalog.json'))
SYSTEM = {e['key']: e['system'] for e in CAT}

COLORS = {
    'skin': (0.72, 0.50, 0.42, 1), 'skeleton': (0.88, 0.84, 0.72, 1),
    'muscles': (0.58, 0.20, 0.22, 1), 'organs': (0.72, 0.38, 0.34, 1),
    'vessels': (0.55, 0.18, 0.20, 1), 'nerves': (0.85, 0.72, 0.30, 1),
}

for ob in list(bpy.data.objects):
    if ob.name.startswith('Plan coupe') or ob.name.startswith('Peau coupe'):
        bpy.data.objects.remove(ob, do_unlink=True)

# Le matériau peau du .blend relie Base Color à un attribut de couleur de
# sommet. On coupe ce lien pour que l'exporteur écrive le baseColorFactor PBR
# voulu dans le GLB (sinon facteur blanc implicite → peau blanche).
peau = bpy.data.materials.get('Peau.005')
if peau and peau.use_nodes:
    bsdf_peau = next(n for n in peau.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    for link in list(peau.node_tree.links):
        if link.to_node == bsdf_peau and link.to_socket.name == 'Base Color':
            peau.node_tree.links.remove(link)
    bsdf_peau.inputs['Base Color'].default_value = COLORS['skin']

PRESERVE = bool(os.environ.get('PRESERVE_MATERIALS'))
if not PRESERVE:
  for sys_name, color in COLORS.items():
    mat = bpy.data.materials.get('Mat ' + sys_name) or bpy.data.materials.new('Mat ' + sys_name)
    mat.use_nodes = True
    bsdf = next(n for n in mat.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    bsdf.inputs['Base Color'].default_value = color
    bsdf.inputs['Roughness'].default_value = 0.75
    bsdf.inputs['Metallic'].default_value = 0.0

assigned = {}
if not PRESERVE:
  for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    system = SYSTEM.get(ob.name)
    if system and system in COLORS:
        ob.data.materials.clear()
        ob.data.materials.append(bpy.data.materials['Mat ' + system])
        assigned[system] = assigned.get(system, 0) + 1

# Boulanger les transformations : sans cela les matrices de peau GLB sont décalées.
for ob in list(bpy.data.objects):
    if ob.type != 'MESH':
        continue
    world = ob.matrix_world.copy()
    ob.parent = None
    ob.matrix_world = world
    bpy.ops.object.select_all(action='DESELECT')
    ob.select_set(True)
    bpy.context.view_layer.objects.active = ob
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# Sans attribut de couleur, l'exporteur écrit le baseColorFactor du matériau
# PBR dans le GLB (avec COLOR_0 il le remplace par un facteur blanc implicite).
for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    for attr in list(ob.data.color_attributes):
        ob.data.color_attributes.remove(attr)

# glTF plafonne à 4 influences par sommet.
for ob in bpy.data.objects:
    if ob.type != 'MESH' or not ob.name.startswith('skin'):
        continue
    groups = [g.name for g in ob.vertex_groups]
    keep = {}
    for v in ob.data.vertices:
        vals = sorted(((groups[g.group], g.weight) for g in v.groups),
                      key=lambda x: -x[1])[:4]
        total = sum(w for _, w in vals) or 1.0
        keep[v.index] = [(n, w / total) for n, w in vals]
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    by_group = {}
    for i, vals in keep.items():
        for gname, w in vals:
            by_group.setdefault(gname, []).append((i, w))
    for gname, pairs in by_group.items():
        vg = ob.vertex_groups.new(name=gname)
        for i, w in pairs:
            vg.add([i], w, 'REPLACE')

arm = bpy.data.objects['Corps Rig']
dances = {'clip_salsa', 'clip_marche', 'clip_etirement',
          'clip_tourbillon', 'clip_course', 'clip_equilibre'}
for action in list(bpy.data.actions):
    if action.name not in dances:
        bpy.data.actions.remove(action)

# Amplitudes anatomiques : la même table est appliquée au runtime three.js.
import importlib.util
_spec = importlib.util.spec_from_file_location(
    'clamp_animations', '/home/tasour/corps-humain/scripts/clamp-animations.py')
_clamp = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_clamp)
if [a for a in bpy.data.actions if a.name.startswith('clip_')]:
    _clamp.clamp_actions(bpy)

_spec2 = importlib.util.spec_from_file_location(
    'rebuild_arm_animations',
    '/home/tasour/corps-humain/scripts/rebuild-arm-animations.py')
_arms = importlib.util.module_from_spec(_spec2)
_spec2.loader.exec_module(_arms)
if [a for a in bpy.data.actions if a.name.startswith('clip_')]:
    _arms.rebuild(bpy)

for ob in bpy.data.objects:
    if ob.type == 'MESH':
        ob.hide_render = False
        ob.hide_set(False)
bpy.context.scene.frame_set(1)
bpy.context.view_layer.objects.active = arm

bpy.ops.export_scene.gltf(
    filepath=OUT, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_materials='EXPORT',
    export_animations=False, export_apply=False)

print('[v5] export', OUT, os.path.getsize(OUT), 'bytes')
print('[v5] matériaux assignés :', assigned)
print('[v5] actions', sorted(a.name for a in bpy.data.actions))
