import bpy, numpy as np
s=bpy.context.scene
sk=next(o for o in bpy.data.objects if o.type=='MESH' and o.name.startswith('skin'))
def C(f):
    s.frame_set(f); d=bpy.context.evaluated_depsgraph_get(); d.update()
    ev=sk.evaluated_get(d); a=np.empty(len(ev.data.vertices)*3,dtype=np.float32)
    ev.data.vertices.foreach_get('co',a); return a.reshape(-1,3)
polys=sk.data.polygons; loops=sk.data.loops
E=[]
for p in range(0,len(polys),10):
    q=polys[p]; a,b,c=(loops[i].vertex_index for i in range(q.loop_start,q.loop_start+3))
    E.extend(((a,b),(b,c),(c,a)))
E=np.array(E,dtype=np.int32)
base=C(1); e0=np.linalg.norm(base[E[:,0]]-base[E[:,1]],axis=1)
k=e0>0.01; E=E[k]; e0=e0[k]
print('edges >10mm:',len(E))
for f in [1,12,22,33,44,54,65,76,86,96]:
    p=C(f); r=np.linalg.norm(p[E[:,0]]-p[E[:,1]],axis=1)/e0
    print(f,'max',round(float(r.max()),2),'>2x',int((r>2).sum()),'>1.5x',int((r>1.5).sum()))
s.frame_set(1)
