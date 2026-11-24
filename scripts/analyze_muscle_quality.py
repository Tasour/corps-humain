#!/usr/bin/env python3
"""Mesure déterministe de la qualité des maillages musculaires.

Compare le maillage livré au maillage avant confinement et calcule :
- le ratio longueur max / médiane des arêtes ;
- le déplacement maximal par sommet.
"""
import json
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(__file__))
from glb_geom import load_glb, accessor_array  # noqa: E402

ROOT = '/home/tasour/corps-humain'
CURRENT = f'{ROOT}/docs/models/corps-male.glb'
BEFORE = '/tmp/opencode/male-before-confinement.glb'
OUT = f'{ROOT}/docs/analyses/pointes-musculaires-male.json'


def meshes(path):
    doc, binary = load_glb(path)
    out = {}
    for mesh in doc['meshes']:
        name = mesh.get('name', '').split('.')[0]
        pts, idx = [], []
        for prim in mesh['primitives']:
            if 'POSITION' not in prim['attributes']:
                continue
            p = accessor_array(doc, binary, prim['attributes']['POSITION'])[:, :3]
            pts.append(p)
            if 'indices' in prim:
                idx.append(accessor_array(doc, binary, prim['indices'])[:, 0].astype(int))
        if pts:
            out[name] = (np.vstack(pts), np.concatenate(idx) if idx else np.array([], dtype=int))
    return out


def edge_stats(points, indices):
    if len(indices) < 3:
        return None, None
    a = points[indices[0::3]]
    b = points[indices[1::3]]
    c = points[indices[2::3]]
    lengths = np.concatenate([
        np.linalg.norm(a - b, axis=1),
        np.linalg.norm(b - c, axis=1),
        np.linalg.norm(c - a, axis=1),
    ])
    med = float(np.median(lengths))
    return float(lengths.max() / med) if med else None, med


cur = meshes(CURRENT)
old = meshes(BEFORE)
report = {'source_comparee': '158ebf8', 'meshes': {}}
for name, (pts, idx) in cur.items():
    if not any(k in name.lower() for k in ('musc', 'deltoid', 'trapez', 'rotator', 'diaphragm')):
        continue
    ratio, med = edge_stats(pts, idx)
    disp = None
    if name in old:
        reference = old[name][0]
        d = []
        for start in range(0, len(pts), 512):
            chunk = pts[start:start + 512]
            d.append(np.sqrt(((chunk[:, None, :] - reference[None, :, :]) ** 2).sum(axis=2)).min(axis=1))
        d = np.concatenate(d)
        disp = {'max_m': round(float(d.max()), 5),
                'p95_m': round(float(np.percentile(d, 95)), 5)}
    report['meshes'][name] = {
        'edge_ratio_max_median': round(ratio, 3) if ratio else None,
        'edge_median_m': round(med, 6) if med else None,
        'displacement': disp,
    }

with open(OUT, 'w') as f:
    json.dump(report, f, indent=1, ensure_ascii=False)
worst = sorted(((v['edge_ratio_max_median'] or 0, k) for k, v in report['meshes'].items()), reverse=True)
print('[qualite]', 'pire ratio', worst[0], 'maillages', len(report['meshes']))
