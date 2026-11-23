#!/usr/bin/env python3
"""Invariant mécanique : peau et rig partagent la même échelle.

Échoue si la peau et les os ne sont plus cohérents à 1 mm près.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from glb_geom import load_glb, mesh_points, world_matrices, find  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(__file__))
MANIFEST = f'{ROOT}/docs/models/scale-manifest.json'
TOL = 0.001


def check(sex):
    manifest = json.load(open(MANIFEST))
    target = manifest['target_stature_m']
    expected = manifest['rig_up_expected_m'][sex]
    path = f'{ROOT}/docs/models/corps-{sex}.glb'
    skin = find(mesh_points(path), 'skin')
    top = float(skin[:, 1].max())
    doc, _ = load_glb(path)
    worlds = world_matrices(doc)
    up = next(float(worlds[i][1, 3]) for i, n in enumerate(doc['nodes'])
              if n.get('name', '').lower() == 'upperarm.l')
    ok = abs(top - target) <= TOL and abs(up - expected) <= TOL
    print('[invariant]', sex, 'skin_top', round(top, 6),
          'rig_up', round(up, 6), 'expected', expected,
          'OK' if ok else 'FAIL')
    return ok


if __name__ == '__main__':
    sys.exit(0 if all(check(sex) for sex in ('female', 'male')) else 1)
