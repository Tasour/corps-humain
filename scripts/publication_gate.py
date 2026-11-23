#!/usr/bin/env python3
"""Gate de publication à quatre canaux séparés, sans champ agrégé « validé »."""
import json
import os
import sys

ROOT = '/home/tasour/corps-humain'
fails = []

for sex in ('female', 'male'):
    metric = json.load(open(f'{ROOT}/docs/analyses/validation-metrique-{sex}.json'))
    for name, seg in metric['segments'].items():
        z = seg.get('z_score')
        if z is None or abs(z) > 2:
            fails.append(f'{sex} métrique {name}: z={z}')
        if seg.get('status') not in ('proxy', 'comparable'):
            fails.append(f'{sex} métrique {name}: statut {seg.get("status")}')

    topo = json.load(open(f'{ROOT}/docs/analyses/validation-topologique-{sex}.json'))
    if topo['status'] != 'ok' or topo['missing']:
        fails.append(f'{sex} topologie: {topo["status"]} {topo["missing"]}')

    prov = json.load(open(f'{ROOT}/docs/analyses/validation-provenance-{sex}.json'))
    if prov['status'] != 'ok':
        fails.append(f'{sex} provenance: {prov["status"]}')

if fails:
    for f in fails:
        print('GATE FAIL', f)
    sys.exit(1)

print('GATE OK — métrique, topologique, provenance')
