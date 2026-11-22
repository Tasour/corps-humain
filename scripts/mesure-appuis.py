"""Mesure le déplacement des pieds et la dérive du centre de masse."""
import bpy
import numpy as np

arm = bpy.data.objects['Corps Rig']
scene = bpy.context.scene
feet = {s: [] for s in ('L', 'R')}
com = []
for f in range(1, 97):
    scene.frame_set(f)
    bpy.context.view_layer.update()
    for s in ('L', 'R'):
        pb = arm.pose.bones[f'foot.{s}']
        feet[s].append(pb.matrix.translation.copy())
    h = arm.pose.bones['root'].matrix.translation.copy()
    com.append(h)
for s in ('L', 'R'):
    P = np.array(feet[s])
    step = np.linalg.norm(np.diff(P, axis=0), axis=1)
    print(f'[appui] pied {s}: déplacement max/frame {step.max():.4f} m, '
          f'amplitude {np.ptp(P[:, :2], axis=0).round(3)}')
C = np.array(com)
print(f'[com] dérive horizontale {np.ptp(C[:, :2], axis=0).round(3)} m, '
      f'verticale {np.ptp(C[:, 2]):.3f} m')
scene.frame_set(1)
