"""Export GLB final : matériaux par système, 6 animations, sans coupes."""
import bpy
import json
import os

SEX = globals().get('HUMAIN_SEX', 'female')
name = 'female' if SEX == 'female' else 'male'
BLEND = f'/home/tasour/corps-humain/docs/humain-{"femme" if SEX=="female" else "homme"}-complet.blend'
OUT = f'/home/tasour/corps-humain/docs/models/corps-{name}.glb'
CAT = json.load(open('/home/tasour/.cache/corps-sources/open-anatomy-3d/'
                     'node_modules/open-anatomy-3d/catalog.json'))
SYSTEM = {e['key']: e['system'] for e in CAT}

bpy.ops.wm.open_mainfile(filepath=BLEND)
for ob in list(bpy.data.objects):
    if ob.name.startswith('Plan coupe') or ob.name.startswith('Peau coupe'):
        bpy.data.objects.remove(ob, do_unlink=True)

COLORS = {
    'skin': (0.72, 0.50, 0.42, 1), 'skeleton': (0.88, 0.84, 0.72, 1),
    'muscles': (0.58, 0.20, 0.22, 1), 'organs': (0.72, 0.38, 0.34, 1),
    'vessels': (0.55, 0.18, 0.20, 1), 'nerves': (0.85, 0.72, 0.30, 1),
}
for sys, col in COLORS.items():
    m = bpy.data.materials.get('Mat ' + sys) or bpy.data.materials.new('Mat ' + sys)
    m.use_nodes = True
    bs = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
    bs.inputs['Base Color'].default_value = col
    bs.inputs['Roughness'].default_value = 0.75

for ob in bpy.data.objects:
    if ob.type != 'MESH':
        continue
    sys = SYSTEM.get(ob.name)
    if sys and sys in COLORS:
        ob.data.materials.clear()
        ob.data.materials.append(bpy.data.materials['Mat ' + sys])

# Boulanger les transformations d'objets dans les données de maillage :
# sans cela, les matrices de peau GLB sont décalées et les os se dispersent.
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

# glTF plafonne à 4 influences par sommet : on ne garde que les 4 plus fortes.
for ob in bpy.data.objects:
    if ob.type != 'MESH' or not ob.name.startswith('skin'):
        continue
    groups = [g.name for g in ob.vertex_groups]
    keep_weights = {}
    for v in ob.data.vertices:
        vals = sorted(((groups[g.group], g.weight) for g in v.groups),
                      key=lambda x: -x[1])[:4]
        total = sum(w for _, w in vals) or 1.0
        keep_weights[v.index] = [(n, w / total) for n, w in vals]
    for g in list(ob.vertex_groups):
        ob.vertex_groups.remove(g)
    by_group = {}
    for i, vals in keep_weights.items():
        for n, w in vals:
            by_group.setdefault(n, []).append((i, w))
    for gname, pairs in by_group.items():
        vg = ob.vertex_groups.new(name=gname)
        for i, w in pairs:
            vg.add([i], w, 'REPLACE')

arm = bpy.data.objects['Corps Rig']
keep = {st.action.name for tr in arm.animation_data.nla_tracks for st in tr.strips}
for a in list(bpy.data.actions):
    if a.name not in keep:
        bpy.data.actions.remove(a)
print('[glb] actions', sorted(keep))


def do_export():
    for ob in bpy.data.objects:
        if ob.type == 'MESH':
            ob.hide_render = False
            ob.hide_set(False)
    bpy.context.scene.frame_set(1)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.export_scene.gltf(
        filepath=OUT, export_format='GLB', use_selection=False,
        export_cameras=False, export_lights=False,
        export_animations=True, export_animation_mode='ACTIONS',
        export_apply=False)
    print('[glb] DONE', os.path.getsize(OUT))
    return None


bpy.app.timers.register(do_export, first_interval=0.5)
print('[glb] planifié', OUT)
