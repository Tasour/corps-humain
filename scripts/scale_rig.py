#!/usr/bin/env python3
"""Applique au rig le même facteur global déjà appliqué aux sommets.

Déterministe : lit docs/models/scale-manifest.json, ne devine rien.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from glb_geom import load_glb, write_glb, world_matrices  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(__file__))
MANIFEST = f'{ROOT}/docs/models/scale-manifest.json'


def descendants(doc, root_index):
    out = []
    nodes = doc['nodes']
    for child in nodes[root_index].get('children', []):
        out.append(child)
        out.extend(descendants(doc, child))
    return out


def run(sex):
    manifest = json.load(open(MANIFEST))
    path = f'{ROOT}/docs/models/corps-{sex}.glb'
    doc0, _ = load_glb(path)
    w0 = world_matrices(doc0)
    current = next(float(w0[i][1, 3]) for i, n in enumerate(doc0['nodes'])
                   if n.get('name', '').lower() == 'upperarm.l')
    expected = manifest['rig_up_expected_m'][sex]
    factor = expected / current

    doc, binary = load_glb(path)
    rig = next(i for i, n in enumerate(doc['nodes'])
               if n.get('name') == 'Corps Rig')
    bones = descendants(doc, rig)
    scaled = 0
    for i in bones:
        node = doc['nodes'][i]
        if 'translation' in node:
            node['translation'] = [v * factor for v in node['translation']]
            scaled += 1
        elif 'matrix' in node:
            m = node['matrix']
            m[12] *= factor
            m[13] *= factor
            m[14] *= factor
            scaled += 1
    tmp = path + '.tmp'
    write_glb(tmp, doc, binary)
    os.replace(tmp, path)

    doc2, _ = load_glb(path)
    worlds = world_matrices(doc2)
    up = next(worlds[i][1, 3] for i, n in enumerate(doc2['nodes'])
              if n.get('name', '').lower() == 'upperarm.l')
    manifest['rig_up_expected_m'][sex] = round(float(up), 6)
    manifest['rig_nodes_scaled'] = scaled
    with open(MANIFEST, 'w') as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)
    print('[scale-rig]', sex, 'os', scaled, 'upperarm.L up', round(float(up), 6))


if __name__ == '__main__':
    for sex in ('female', 'male'):
        run(sex)
