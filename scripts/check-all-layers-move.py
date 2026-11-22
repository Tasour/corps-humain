import bpy, numpy as np
s=bpy.context.scene
def sample(f):
    s.frame_set(f); d=bpy.context.evaluated_depsgraph_get(); d.update()
    out={}
    for o in bpy.data.objects:
        if o.type!='MESH': continue
        ev=o.evaluated_get(d); a=np.empty(len(ev.data.vertices)*3,dtype=np.float32)
        ev.data.vertices.foreach_get('co',a)
        out[o.name]=a.reshape(-1,3)[::max(1,len(a)//3000)]
    return out
a=sample(1); b=sample(20)
moving=0; static=[]
for n in a:
    if n not in b: continue
    d=float(np.linalg.norm(a[n]-b[n],axis=1).max())
    if d>0.01: moving+=1
    else: static.append((n,round(d,4)))
print('MESHES moving>1cm:',moving,'/',len(a))
print('static samples:',static[:12])
s.frame_set(1)
