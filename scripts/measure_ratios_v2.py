"""Mensurations déterministes à partir des os du rig (centres articulaires).

Exécution : blender -b --python scripts/measure_ratios_v2.py
"""
import bpy
import json
import math

ROOT = '/home/tasour/corps-humain'
SRC = ROOT + '/docs/models/corps-female.glb'
OUT = ROOT + '/docs/analyses/mensurations-v2.json'

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=SRC)
arm = next(o for o in bpy.data.objects if o.type == 'ARMATURE')

BONES = {
    'upperarm.L': 'upperarm_l', 'upperarm.R': 'upperarm_r',
    'forearm.L': 'forearm_l', 'forearm.R': 'forearm_r',
    'hand.L': 'hand_l', 'hand.R': 'hand_r',
    'thigh.L': 'thigh_l', 'thigh.R': 'thigh_r',
    'shin.L': 'shin_l', 'shin.R': 'shin_r',
    'foot.L': 'foot_l', 'foot.R': 'foot_r',
    'spine_cervical': 'cervical', 'spine_thoracic': 'thoracic',
    'spine_lumbar': 'lumbar', 'head': 'head',
}


def head(name):
    b = arm.data.bones.get(name)
    return [float(v) for v in b.head_local] if b else None


def tail(name):
    b = arm.data.bones.get(name)
    return [float(v) for v in b.tail_local] if b else None


def length(a, b):
    return math.dist(a, b) if a and b else None

segments = {
    'humerus': length(head('upperarm.L'), tail('upperarm.L')),
    'avant_bras': length(head('forearm.L'), tail('forearm.L')),
    'main': length(head('hand.L'), tail('hand.L')),
    'bras_total': None,
    'femur': length(head('thigh.L'), tail('thigh.L')),
    'tibia': length(head('shin.L'), tail('shin.L')),
    'pied': length(head('foot.L'), tail('foot.L')),
    'jambe_totale': None,
    'cou_tete': length(head('spine_cervical'), head('head')),
    'tronc': length(head('spine_cervical'), head('spine_lumbar')),
}
segments['bras_total'] = sum(segments[k] for k in ('humerus', 'avant_bras', 'main'))
segments['jambe_totale'] = sum(segments[k] for k in ('femur', 'tibia', 'pied'))
skin = next(o for o in bpy.data.objects if o.type == 'MESH'
            and o.name.lower().startswith('skin'))
H = max((skin.matrix_world @ v.co).z for v in skin.data.vertices)

canon = {
    'humerus': 0.186, 'avant_bras': 0.146, 'main': 0.109,
    'bras_total': 0.441, 'femur': 0.245, 'tibia': 0.246, 'pied': 0.152,
    'jambe_totale': 0.643, 'cou_tete': 0.130, 'tronc': 0.300,
}
report = {'height_estimate_m': round(H, 5), 'tolerance': 0.02, 'segments': {}}
for name, value in segments.items():
    ratio = value / H if H else 0
    expected = canon[name]
    deviation = abs(ratio - expected) / expected
    report['segments'][name] = {
        'length_m': round(value, 5), 'ratio': round(ratio, 5),
        'expected': expected, 'deviation': round(deviation, 5),
        'status': 'ok' if deviation <= 0.02 else 'hors tolerance',
    }
with open(OUT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
print('[mesures-v2] H', round(H, 3), 'ok',
      sum(1 for v in report['segments'].values() if v['status'] == 'ok'),
      '/', len(report['segments']))
