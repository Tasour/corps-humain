"""Vérification mesurable des règles anatomiques dans Blender 4.5.

Exécution : blender -b --python scripts/anatomy_rules_check.py -- female
Toutes les mesures sont chiffrées ; ce qui n'est pas mesurable est notMeasured.
"""
import bpy
import json
import math
import sys
from mathutils.kdtree import KDTree

sex = sys.argv[-1] if len(sys.argv) > 1 and sys.argv[-1] in ('female', 'male') else 'female'
ROOT = '/home/tasour/corps-humain'
SRC = f'{ROOT}/docs/models/corps-{sex}.glb'
OUT = f'{ROOT}/docs/analyses/regles-anatomiques-{sex}.json'

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)


def get(name):
    return next((o for o in bpy.data.objects if o.type == 'MESH'
                 and o.name.lower().split('.')[0] == name.lower()), None)


def points(ob, stride=17):
    pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
    return pts[::stride] if len(pts) > stride else pts


def centroid(ob):
    pts = [ob.matrix_world @ v.co for v in ob.data.vertices]
    return tuple(sum(p[i] for p in pts) / len(pts) for i in range(3))


def tree_of(ob):
    pts = points(ob)
    t = KDTree(len(pts))
    for i, p in enumerate(pts):
        t.insert(p, i)
    t.balance()
    return t


def nearest_dist(t, p):
    _co, _i, d = t.find(p)
    return d


report = {'sex': sex, 'rules': {}}


def add(rule, label, measured, expected, tol, note=''):
    ok = measured is not None and abs(measured - expected) <= tol
    report['rules'][rule] = {
        'label': label,
        'measured': round(measured, 6) if measured is not None else None,
        'expected': expected,
        'tolerance': tol,
        'status': ('ok' if ok else 'hors tolerance') if measured is not None else 'notMeasured',
        'note': note,
    }


# R1 : enveloppe peau ↔ muscles (distance minimale des points de peau vers le muscle)
skin = get('skin')
catalog = json.load(open('/home/tasour/.cache/corps-sources/open-anatomy-3d/'
                         'node_modules/open-anatomy-3d/catalog.json'))
muscle_names = [e['key'] for e in catalog if e['system'] == 'muscles']
muscles = [get(n) for n in muscle_names]
muscles = [m for m in muscles if m]
if skin and muscles:
    torso = [p for p in points(skin, 17)
             if 0.90 <= p.z <= 1.50 and abs(p.x) <= 0.35]
    dists = []
    for muscle in muscles:
        t = tree_of(muscle)
        dists.extend(nearest_dist(t, p) for p in torso)
    dists.sort()
    median = dists[len(dists) // 2]
    add('R1', 'enveloppe peau/muscle (médiane)', median, 0.010, 0.010,
        'distance au muscle le plus proche, échantillon déterministe')
else:
    add('R1', 'enveloppe peau/muscle', None, 0.010, 0.010)

# R6 : symétrie des yeux
eye_l, eye_r = get('eye_l'), get('eye_r')
if eye_l and eye_r:
    cl, cr = centroid(eye_l), centroid(eye_r)
    symmetry = abs(cl[0] + cr[0])
    add('R6', 'symétrie des yeux axe X', symmetry, 0.0, 0.002)
else:
    add('R6', 'symétrie des yeux', None, 0.0, 0.002)

# R8 : phalanges main ↔ muscles de main
hand, hand_m = get('hand_l'), get('hand_muscles_l')
if hand and hand_m:
    d = nearest_dist(tree_of(hand_m), centroid(hand))
    add('R8', 'centre main ↔ muscle de main', d, 0.0, 0.02)
else:
    add('R8', 'main ↔ muscle', None, 0.0, 0.02)

# R9 : vaisseaux du bras ↔ muscles du bras
artery, upper = get('arteries_arm_l'), get('upper_arm_muscles_l')
if artery and upper:
    d = nearest_dist(tree_of(upper), centroid(artery))
    add('R9', 'artère bras ↔ muscle bras', d, 0.0, 0.03)
else:
    add('R9', 'artère bras ↔ muscle', None, 0.0, 0.03)

# R10 : confinement des organes dans la peau (boîte englobante)
if skin and get('heart'):
    pts_skin = points(skin, 7)
    lo = [min(p[i] for p in pts_skin) for i in range(3)]
    hi = [max(p[i] for p in pts_skin) for i in range(3)]
    c = centroid(get('heart'))
    inside = all(lo[i] <= c[i] <= hi[i] for i in range(3))
    add('R10', 'coeur dans enveloppe peau', 0.0 if inside else 1.0, 0.0, 0.0)
else:
    add('R10', 'coeur dans peau', None, 0.0, 0.0)

# Non mesurable avec la géométrie disponible
add('R7', 'testicules ↔ scrotum', None, 0.0, 0.002,
    'pas de maillage scrotum séparé')
add('R5', 'orbites osseuses ↔ yeux', None, 0.0, 0.002,
    'pas de maillage orbite séparé')
add('R11', 'nerfs dans couloirs musculaires', None, 0.0, 0.03,
    'à mesurer après table de repères complète')

with open(OUT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
print('[regles]', sex, {k: v['status'] for k, v in report['rules'].items()})
