"""Configure le matériau peau PBR avec sous-surface et variation de teinte."""
import bpy

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
m = skin.data.materials[0] if skin.data.materials else bpy.data.materials.new('Peau PBR')
if not skin.data.materials:
    skin.data.materials.append(m)
m.use_nodes = True
bs = next(n for n in m.node_tree.nodes if n.type == 'BSDF_PRINCIPLED')
bs.inputs['Base Color'].default_value = (0.72, 0.50, 0.42, 1.0)
bs.inputs['Roughness'].default_value = 0.58
bs.inputs['Metallic'].default_value = 0.0
for key in ('Subsurface Weight', 'Subsurface'):
    if key in bs.inputs:
        bs.inputs[key].default_value = 0.18
        break
if 'Coat Weight' in bs.inputs:
    bs.inputs['Coat Weight'].default_value = 0.05
if 'Specular IOR Level' in bs.inputs:
    bs.inputs['Specular IOR Level'].default_value = 0.35
print('[mat] peau PBR/SSS configurée')
