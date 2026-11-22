import bpy, numpy as np
from mathutils.kdtree import KDTree

before = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath='/home/tasour/.cache/corps-sources/open-anatomy-3d/plain.glb')
new = [o for o in bpy.data.objects if o not in before]
female = next(o for o in new if o.type == 'MESH' and o.name.startswith('skin'))
male = next(o for o in bpy.data.objects if o.type == 'MESH' and o.name.startswith('skin') and o not in new)
arm = bpy.data.objects['Corps Rig']
print('female', female.name, len(female.data.vertices), 'male', male.name, len(male.data.vertices))

# poids自动 de la peau féminine
for m in list(female.modifiers):
    female.modifiers.remove(m)
for g in list(female.vertex_groups):
    female.vertex_groups.remove(g)
bpy.ops.object.select_all(action='DESELECT')
female.select_set(True); arm.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.object.parent_set(type='ARMATURE_AUTO', keep_transform=True)
print('female groups', len(female.vertex_groups))


def world(o):
    a = np.empty(len(o.data.vertices) * 3, dtype=np.float32)
    o.data.vertices.foreach_get('co', a)
    M = np.array(o.matrix_world, dtype=np.float64)
    return (np.hstack([a.reshape(-1, 3).astype(np.float64),
                       np.ones((len(a) // 3, 1))]) @ M.T)[:, :3]


fp = world(female)
mp = world(male)
scale = (mp[:, 2].max() - mp[:, 2].min()) / (fp[:, 2].max() - fp[:, 2].min())
fc = (fp.min(axis=0) + fp.max(axis=0)) / 2.0
mc = (mp.min(axis=0) + mp.max(axis=0)) / 2.0
fp = (fp - fc) * scale + mc
fp[:, 2] += mp[:, 2].min() - fp[:, 2].min()
print('scale', round(float(scale), 4))

tree = KDTree(len(fp))
for i, p in enumerate(fp):
    tree.insert(tuple(p), i)
tree.balance()

fnames = [g.name for g in female.vertex_groups]
fw = {g: np.zeros(len(female.data.vertices), dtype=np.float32) for g in fnames}
for v in female.data.vertices:
    for g in v.groups:
        fw[fnames[g.group]][v.index] = g.weight

for g in list(male.vertex_groups):
    male.vertex_groups.remove(g)
near = np.empty(len(mp), dtype=np.int32)
for i, p in enumerate(mp):
    near[i] = tree.find(tuple(p))[1]
for gi, name in enumerate(fnames):
    w = fw[fnames[gi]][near]
    levels = {}
    for i, val in enumerate(w):
        lvl = int(round(float(val) * 20))
        if lvl > 0:
            levels.setdefault(lvl, []).append(i)
    if not levels:
        continue
    vg = male.vertex_groups.new(name=name)
    for lvl, ids in levels.items():
        vg.add(ids, lvl / 20.0, 'REPLACE')
print('male groups', len(male.vertex_groups))

for o in new:
    bpy.data.objects.remove(o, do_unlink=True)
for m in male.modifiers:
    if m.type == 'ARMATURE':
        m.object = arm
print('transfer DONE')
