"""Mesure deterministe des segments et ratios depuis landmarks.json."""
import json
import math

ROOT = '/home/tasour/corps-humain'
d = json.load(open(ROOT + '/docs/models/landmarks.json'))
p = {x['id']: x['position'] for x in d['landmarks']}


def dist(a, b):
    if a not in p or b not in p:
        return None
    return math.dist(p[a], p[b])


segments = {
    'bras_total': ['clavicle_l', 'hand_l'],
    'humerus': ['clavicle_l', 'forearm_l'],
    'avant_bras': ['forearm_l', 'hand_l'],
    'jambe_totale': ['pelvis', 'foot_l'],
    'femur': ['pelvis', 'femur_l'],
    'tibia': ['femur_l', 'lower_leg_l'],
    'pied': ['lower_leg_l', 'foot_l'],
    'tronc': ['spine_cervical', 'pelvis'],
    'tete': ['spine_cervical', 'skull'],
    'epaules': ['clavicle_l', 'clavicle_r'],
    'bassin': ['femur_l', 'femur_r'],
}
measured = {k: dist(*v) for k, v in segments.items()}
H = sum(v for k, v in measured.items() if k in ('tete', 'tronc', 'femur', 'tibia', 'pied') and v)
canon = {
    'bras_total': 0.44, 'humerus': 0.19, 'avant_bras': 0.15,
    'jambe_totale': 0.53, 'femur': 0.245, 'tibia': 0.246, 'pied': 0.152,
    'tronc': 0.30, 'tete': 0.13, 'epaules': 0.23, 'bassin': 0.19,
}
report = {'height_estimate_m': round(H, 5), 'tolerance_ratio': 0.02, 'segments': {}}
for name, value in measured.items():
    if value is None:
        report['segments'][name] = {'status': 'notMeasured'}
        continue
    ratio = value / H if H else 0
    expected = canon[name]
    deviation = abs(ratio - expected) / expected
    report['segments'][name] = {
        'length_m': round(value, 5),
        'ratio': round(ratio, 5),
        'expected': expected,
        'deviation': round(deviation, 5),
        'status': 'ok' if deviation <= 0.02 else 'hors tolerance',
    }
with open(ROOT + '/docs/analyses/mensurations.json', 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
print('[mesures] H', round(H, 3), 'ok',
      sum(1 for v in report['segments'].values() if v.get('status') == 'ok'),
      '/', len(report['segments']))
