"""Ajoute les caméras dos, profil et trois-quarts à la scène courante."""
import bpy
import math
from mathutils import Vector

scene = bpy.context.scene
existing = set(bpy.data.objects.keys())
specs = {
    'Cam Dos': (Vector((0, 3.6, 0.85)), Vector((0, 0, 0.85))),
    'Cam Profil': (Vector((3.6, 0, 0.85)), Vector((0, 0, 0.85))),
    'Cam 3-4': (Vector((2.2, -3.0, 1.0)), Vector((0, 0, 0.85))),
}
for name, (loc, target) in specs.items():
    if name in existing:
        continue
    cd = bpy.data.cameras.new(name)
    ob = bpy.data.objects.new(name, cd)
    scene.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = (target - loc).to_track_quat('-Z', 'Y').to_euler()
    cd.type = 'ORTHO'
    cd.ortho_scale = 1.95
print('[cam] caméras disponibles')
