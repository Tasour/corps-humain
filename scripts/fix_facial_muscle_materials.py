#!/usr/bin/env python3
"""Colorie les six muscles faciaux comme les autres muscles.

Exécution : python3 scripts/fix_facial_muscle_materials.py
Modifie uniquement les matériaux, aucune géométrie.
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from glb_geom import load_glb, write_glb  # noqa: E402

ROOT = '/home/tasour/corps-humain'
MUSCLE_COLOR = [0.7098039388656616, 0.27450981736183167, 0.239215686917305, 1.0]


def run(sex):
    path = f'{ROOT}/docs/models/corps-{sex}.glb'
    doc, binary = load_glb(path)
    for material in doc['materials']:
        name = material.get('name', '')
        if name in ('V6 frontalis', 'V6 masseter_l'):
            pbr = material.setdefault('pbrMetallicRoughness', {})
            pbr['baseColorFactor'] = MUSCLE_COLOR
            material['name'] = 'V6 Facial Muscles'
    tmp = path + '.tmp'
    write_glb(tmp, doc, binary)
    os.replace(tmp, path)
    print('[materiaux]', sex, 'muscles faciaux coloriés')


for sex in ('female', 'male'):
    run(sex)
