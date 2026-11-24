"""Remplace les six sphères faciales par le modèle CC0 Innerscene.

Exécution : blender -b --python scripts/integrate_facial_muscles.py -- male
"""
import bpy
import numpy as np
import os
import sys
from mathutils import Vector

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'male'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
TMP = f'{ROOT}/docs/models/.corps-{sex}-face.glb'
FACE = '/tmp/opencode/muscle-sources/head-and-neck-muscles.glb'
OLD = ('frontalis', 'orbicularis_oculi_l', 'orbicularis_oculi_r',
       'masseter_l', 'masseter_r', 'orbicularis_oris')

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)
before = {o.name for o in bpy.data.objects}

for name in OLD:
    ob = next((o for o in bpy.data.objects if o.type == 'MESH'
               and o.name.lower() == name.lower()), None)
    if ob:
        bpy.data.objects.remove(ob, do_unlink=True)

# Cible : région crânienne de la peau.
skin = next(o for o in bpy.data.objects if o.type == 'MESH'
            and o.name.lower().startswith('skin'))
sp = np.array([tuple(skin.matrix_world @ v.co) for v in skin.data.vertices])
head = sp[sp[:, 2] > 1.35]
target_center = head.mean(axis=0)
target_height = head[:, 2].max() - head[:, 2].min()

bpy.ops.import_scene.gltf(filepath=FACE)
imported = [o for o in bpy.data.objects if o.name not in before and o.type == 'MESH']
if not imported:
    raise RuntimeError('aucun muscle facial importé')
ip = []
for o in imported:
    pts = [o.matrix_world @ v.co for v in o.data.vertices]
    ip.append(np.array([tuple(p) for p in pts]))
allp = np.vstack(ip)
source_center = allp.mean(axis=0)
source_height = allp[:, 2].max() - allp[:, 2].min()
factor = target_height / source_height

# Matériau musculaire existant.
ref = next((o for o in bpy.data.objects if o.type == 'MESH'
            and o.name.lower().split('.')[0] == 'abdominal_muscles'), None)
material = ref.data.materials[0] if ref and ref.data.materials else None

for ob in imported:
    inv = ob.matrix_world.inverted()
    for v in ob.data.vertices:
        p = np.array(tuple(ob.matrix_world @ v.co))
        q = (p - source_center) * factor + target_center
        v.co = inv @ Vector(tuple(q))
    if material:
        ob.data.materials.clear()
        ob.data.materials.append(material)
    ob.name = 'face_' + ob.name.lower().replace(' ', '_')

bpy.ops.export_scene.gltf(
    filepath=TMP, export_format='GLB', use_selection=False,
    export_cameras=False, export_lights=False, export_animations=False,
    export_materials='EXPORT', export_apply=False)
os.replace(TMP, SRC)
print('[face]', sex, 'imported', len(imported),
      'factor', round(float(factor), 5), 'center', np.round(target_center, 4).tolist())
