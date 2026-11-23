#!/usr/bin/env python3
"""Validation topologique et de provenance : deux canaux distincts du canal métrique."""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from glb_geom import mesh_points  # noqa: E402

ROOT = '/home/tasour/corps-humain'
graph = json.load(open(f'{ROOT}/docs/models/anatomy-graph.json'))
manifest = json.load(open(f'{ROOT}/docs/models/source-manifest.json'))


def run(sex):
    meshes = mesh_points(f'{ROOT}/docs/models/corps-{sex}.glb')
    names = {n.split('.')[0].lower() for n in meshes}
    mesh_count = len(meshes)
    missing = [n for n in graph['nodes'] if n not in names]
    topo = {
        'sex': sex,
        'source': graph['source'],
        'nodes_expected': len(graph['nodes']),
        'nodes_present': len(graph['nodes']) - len(missing),
        'missing': missing,
        'fma_ids': 'notMeasured',
        'status': 'ok' if not missing else 'mismatch',
    }
    with open(f'{ROOT}/docs/analyses/validation-topologique-{sex}.json', 'w') as f:
        json.dump(topo, f, indent=1, ensure_ascii=False)

    src = manifest['sources'][sex]
    count = mesh_count
    prov = {
        'sex': sex,
        'source_sha256': src['sha256'],
        'source_commit': src['git_commit'],
        'source_mesh_count': src['mesh_count_current'],
        'delivered_mesh_count': count,
        'rule': manifest['rule'],
        'status': 'ok' if count >= manifest['sources'][sex]['mesh_count_current'] else 'mismatch',
    }
    with open(f'{ROOT}/docs/analyses/validation-provenance-{sex}.json', 'w') as f:
        json.dump(prov, f, indent=1, ensure_ascii=False)
    print('[topologie]', sex, topo['status'], 'manquants', len(missing),
          'maillages', count)


for sex in ('female', 'male'):
    run(sex)
