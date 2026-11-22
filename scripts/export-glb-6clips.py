"""Exporte un GLB avec les 6 clips de la bibliothèque NLA."""
import bpy
import os

SEX = globals().get('HUMAIN_SEX', 'female')
name = 'female' if SEX == 'female' else 'male'
BLEND = f'/home/tasour/corps-humain/docs/humain-{ "femme" if SEX=="female" else "homme" }-complet.blend'
OUT = f'/home/tasour/corps-humain/docs/models/corps-{name}.glb'

bpy.ops.wm.open_mainfile(filepath=BLEND)
arm = bpy.data.objects['Corps Rig']

# exclure les plans et copies de coupe de l'export
for ob in list(bpy.data.objects):
    if ob.name.startswith('Plan coupe') or ob.name.startswith('Peau coupe'):
        bpy.data.objects.remove(ob, do_unlink=True)

# ne garde que les actions des 6 clips
keep = {st.action.name for tr in arm.animation_data.nla_tracks for st in tr.strips}
for a in list(bpy.data.actions):
    if a.name not in keep:
        bpy.data.actions.remove(a)
print('[glb] actions conservées:', sorted(keep))


def do_export():
    for o in bpy.data.objects:
        if o.type == 'MESH':
            o.hide_render = False
            o.hide_set(False)
    bpy.context.scene.frame_set(1)
    bpy.context.view_layer.objects.active = arm
    bpy.ops.export_scene.gltf(
        filepath=OUT, export_format='GLB', use_selection=False,
        export_cameras=False, export_lights=False,
        export_animations=True, export_animation_mode='ACTIONS',
        export_apply=False,
    )
    print('[glb] DONE', os.path.getsize(OUT))
    return None


bpy.app.timers.register(do_export, first_interval=0.5)
print('[glb] export planifié', OUT)
