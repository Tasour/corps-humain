"""Coloration par hauteur (visage légèrement plus chaud, jambes plus froides)."""
import bpy
import numpy as np

skin = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin'))
a = np.empty(len(skin.data.vertices) * 3, dtype=np.float32)
skin.data.vertices.foreach_get('co', a)
P = a.reshape(-1, 3)
M = np.array(skin.matrix_world, dtype=np.float64)
W = (np.hstack([P, np.ones((len(P), 1))]) @ M.T)[:, :3]
t = np.clip((W[:, 2] - 0.1) / 1.5, 0, 1)
cols = np.zeros((len(P), 4), dtype=np.float32)
cols[:, 0] = 0.92 + 0.06 * t
cols[:, 1] = 0.78 + 0.04 * t
cols[:, 2] = 0.70 + 0.04 * t
cols[:, 3] = 1.0
attr = skin.data.color_attributes.get('teinte') or skin.data.color_attributes.new(
    name='teinte', type='FLOAT_COLOR', domain='POINT')
attr.data.foreach_set('color', cols.ravel())

m = skin.data.materials[0]
nt = m.node_tree
bs = next(n for n in nt.nodes if n.type == 'BSDF_PRINCIPLED')
att = nt.nodes.new('ShaderNodeVertexColor')
att.layer_name = 'teinte'
mix = nt.nodes.new('ShaderNodeMixRGB')
mix.blend_type = 'MULTIPLY'
mix.inputs[0].default_value = 0.35
nt.links.new(bs.inputs['Base Color'].links[0].from_socket if bs.inputs['Base Color'].links else att.outputs['Color'], mix.inputs[1])
nt.links.new(att.outputs['Color'], mix.inputs[2])
nt.links.new(mix.outputs['Color'], bs.inputs['Base Color'])
print('[teinte] variation appliquée')
