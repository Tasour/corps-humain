import bpy, numpy as np
s=bpy.context.scene; deps=bpy.context.evaluated_depsgraph_get()
ob=next(o for o in bpy.data.objects if o.type=='MESH' and o.name.startswith('skin'))
polys=ob.data.polygons; loops=ob.data.loops
edges=[]
for p in range(0,len(polys),10):
    q=polys[p]; a,b,c=(loops[i].vertex_index for i in range(q.loop_start,q.loop_start+3))
    edges.extend(((a,b),(b,c),(c,a)))
edges=np.array(edges,dtype=np.int32)
def coords(f):
    s.frame_set(f); deps.update(); ev=ob.evaluated_get(deps)
    a=np.empty(len(ev.data.vertices)*3,dtype=np.float32); ev.data.vertices.foreach_get('co',a)
    return a.reshape(-1,3)
base=coords(1)
e0=np.linalg.norm(base[edges[:,0]]-base[edges[:,1]],axis=1)
keep=e0>0.005; edges=edges[keep]; e0=e0[keep]
print('edges',len(edges))
for f in [1,12,22,33,44,54,65,76,86,97]:
    p=coords(f); e=np.linalg.norm(p[edges[:,0]]-p[edges[:,1]],axis=1); r=e/e0
    print(f, 'max',round(float(r.max()),2),'>3x',int((r>3).sum()),'>2x',int((r>2).sum()))
s.frame_set(1)
