#!/usr/bin/env python3
"""Construit les descriptions de sélection à partir des sources amont."""
import json
import os
import re
import sys

ROOT = '/home/tasour/corps-humain'
SEEMA_SRC = '/tmp/opencode/seema-src/content'
FEMALE_MANIFEST = f'{ROOT}/docs/models/contests/female-atlas/atlas.json'
OUT = f'{ROOT}/docs/models/selection-descriptions.json'
sys.path.insert(0, f'{ROOT}/scripts')
from glb_geom import load_glb  # noqa: E402


def norm(s):
    s = str(s).lower()
    s = re.sub(r'\.\d+$', '', s)
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    return ' '.join(s.split())


def shorten(text, n=240):
    text = ' '.join(str(text or '').split())
    if len(text) <= n:
        return text
    return text[:n].rsplit(' ', 1)[0] + '…'


def load_seema():
    aliases = {}
    for fname in sorted(os.listdir(SEEMA_SRC)):
        if not fname.endswith('.json') or fname == 'doctor.json':
            continue
        path = os.path.join(SEEMA_SRC, fname)
        try:
            data = json.load(open(path))
        except Exception:
            continue
        if not isinstance(data, dict) or 'structures' not in data:
            continue
        for st in data['structures']:
            summary = shorten(st.get('summary') or st.get('common') or st.get('medical'))
            if not summary:
                continue
            entry = {
                'name': st.get('medical') or st.get('common') or st.get('id'),
                'description': summary,
                'source': f'SeemaBansal 3d-human-body-anatomy — {fname}',
                'license': 'CC BY-SA 4.0',
            }
            for key in [st.get('id'), st.get('medical'), st.get('common')] + list(st.get('match') or []):
                if key:
                    aliases.setdefault(norm(key), entry)
        for key, common in (data.get('commonNames') or {}).items():
            aliases.setdefault(norm(key), {
                'name': key,
                'description': f'{common} — nom courant référencé dans {fname}.',
                'source': f'SeemaBansal 3d-human-body-anatomy — {fname}',
                'license': 'CC BY-SA 4.0',
            })
    out = {}
    models = f'{ROOT}/docs/models/forks/seema/models'
    for g in sorted(os.listdir(models)):
        if not g.endswith('.glb'):
            continue
        doc, _ = load_glb(os.path.join(models, g))
        for node in doc['nodes']:
            name = node.get('name', '')
            if not name or node.get('mesh') is None:
                continue
            key = norm(name)
            if key in aliases:
                out[name] = aliases[key]
            else:
                out[name] = {
                    'name': name,
                    'description': f'Structure anatomique référencée dans la source {g}.',
                    'source': f'SeemaBansal 3d-human-body-anatomy — {g}',
                    'license': 'CC BY-SA 4.0',
                }
    return out


SYSTEMS = {
    'skeletal': 'squelette', 'muscular': 'musculaire', 'arterial': 'artériel',
    'venous': 'veineux', 'nervous': 'nerveux', 'cardiac': 'cardiaque',
    'respiratory': 'respiratoire', 'digestive': 'digestif', 'urinary': 'urinaire',
    'sensory': 'sensoriel', 'endocrine': 'endocrinien', 'lymphatic': 'lymphatique',
    'reproductive': 'reproducteur', 'pregnancy': 'grossesse', 'connective': 'conjonctif',
    'integumentary': 'tégumentaire',
}


def load_female_atlas():
    data = json.load(open(FEMALE_MANIFEST))
    out = {}
    for p in data['parts']:
        sid = p['id']
        system = SYSTEMS.get(p.get('system'), p.get('system', 'anatomique'))
        fma = p.get('conceptId', '')
        desc = f'Structure du système {system} identifiée {fma} dans le Human Reference Atlas (Visible Human Female).'
        if p.get('name'):
            desc = f'{p["name"]} — {desc}'
        out[sid] = {
            'name': p.get('name') or sid,
            'description': ' '.join(desc.split()),
            'source': 'Female Atlas — Human Reference Atlas / Visible Human Female',
            'license': 'CC BY 4.0',
        }
    return out


result = {
    'version': 1,
    'sources': {
        'seema': 'https://github.com/SeemaBansal1/3d-human-body-anatomy',
        'female-atlas': 'https://github.com/HiMahendraBeniwal/female-atlas',
    },
    'descriptions': {
        'seema': load_seema(),
        'female-atlas': load_female_atlas(),
    },
}
with open(OUT, 'w') as f:
    json.dump(result, f, indent=1, ensure_ascii=False)
print('[descriptions] seema', len(result['descriptions']['seema']),
      'female-atlas', len(result['descriptions']['female-atlas']))
