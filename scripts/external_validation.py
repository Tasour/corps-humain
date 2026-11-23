"""Validation anatomique externe : modèle vs De Leva 1996 (Table 1).

Compare les longueurs de segments mesurées aux os du rig (mensurations-v2.json)
aux moyennes anthropométriques publiques, converties en ratios de stature.
"""
import hashlib
import json
import os
import sys

ROOT = '/home/tasour/corps-humain'
REF_PATH = f'{ROOT}/docs/models/external-anatomy.json'
CHECKS = f'{ROOT}/docs/models/reference-checksums.json'
digest = hashlib.sha256(open(REF_PATH, 'rb').read()).hexdigest()
sealed = json.load(open(CHECKS))['files']['external-anatomy.json']
if digest != sealed:
    raise SystemExit(f'référence externe modifiée : {digest} != {sealed}')
ext = json.load(open(REF_PATH))
model = json.load(open(f'{ROOT}/docs/analyses/mensurations-v2.json'))
sex = sys.argv[1] if len(sys.argv) > 1 else 'female'

ALIAS = {
    'cou_tete': 'head', 'tronc': 'trunk', 'humerus': 'upper_arm',
    'avant_bras': 'forearm', 'main': 'hand', 'femur': 'thigh',
    'tibia': 'shank', 'pied': 'foot',
}
stature = model['height_estimate_m']
published = ext['segments_mm'][sex]
tol = ext['tolerance_ratio']
out = {
    'sex': sex,
    'source': ext['source'],
    'model_stature_m': stature,
    'tolerance': tol,
    'segments': {},
}
failed = 0
for key, label in ALIAS.items():
    measured = model['segments'][key]['length_m']
    expected = published[label] / 1000.0
    deviation = abs(measured - expected) / expected
    status = 'ok' if deviation <= tol else 'hors tolerance'
    if status != 'ok':
        failed += 1
    out['segments'][key] = {
        'external_label': label,
        'measured_m': measured,
        'expected_m': round(expected, 5),
        'deviation': round(deviation, 5),
        'status': status,
    }
out['summary'] = {
    'total': len(out['segments']),
    'ok': len(out['segments']) - failed,
    'failed': failed,
}
path = f'{ROOT}/docs/analyses/validation-externe-{sex}.json'
with open(path, 'w') as f:
    json.dump(out, f, indent=1, ensure_ascii=False)
print(f'[externe] {sex}: {out["summary"]["ok"]}/{out["summary"]["total"]} dans la tolérance')
sys.exit(1 if failed else 0)
