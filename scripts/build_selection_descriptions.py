#!/usr/bin/env python3
"""Construit les descriptions de sélection à partir des sources amont."""
import json
import os
import re
import sys

ROOT = '/home/tasour/corps-humain'
SEEMA_SRC = '/tmp/opencode/seema-src/content'
FEMALE_MANIFEST = f'{ROOT}/docs/models/body-atlas/atlas-female.json'
OUT = f'{ROOT}/docs/models/selection-descriptions.json'
sys.path.insert(0, f'{ROOT}/scripts')
from glb_geom import load_glb  # noqa: E402
from descriptions_i18n import add_localization, system_label  # noqa: E402


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
                'origin': 'Z-Anatomy / BodyParts3D (référence masculine)',
                'system': system_from_file(fname),
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
                'origin': 'Z-Anatomy / BodyParts3D (référence masculine)',
                'system': system_from_file(fname),
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
                    'origin': 'Z-Anatomy / BodyParts3D (référence masculine)',
                    'system': system_from_file(g),
                }
    for entry in out.values():
        add_localization(entry)
    return out


SYSTEMS = {
    'skeletal': 'squelette', 'muscular': 'musculaire', 'arterial': 'artériel',
    'venous': 'veineux', 'nervous': 'nerveux', 'cardiac': 'cardiaque',
    'respiratory': 'respiratoire', 'digestive': 'digestif', 'urinary': 'urinaire',
    'sensory': 'sensoriel', 'endocrine': 'endocrinien', 'lymphatic': 'lymphatique',
    'reproductive': 'reproducteur', 'pregnancy': 'grossesse', 'connective': 'conjonctif',
    'integumentary': 'tégumentaire',
}


CURATED = {
    'FMA:7379': {
        'description': 'Segment bas latéral du lobe inférieur gauche (S9) : territoire pulmonaire '
                       'desservi par la bronche segmentaire basale latérale (B9) et l’artère '
                       'segmentaire correspondante. Il répond au segment basal antérieur (S8) '
                       'en avant et au segment basal postérieur (S10) en arrière.',
        'source': 'Terminologia Anatomica — FMA:7379 (Human Reference Atlas)',
        'license': 'CC BY 4.0',
    },
}


def system_from_file(filename):
    name = filename.lower()
    for key in ('muscle', 'skeleton', 'arter', 'vein', 'nerve', 'organ', 'skin'):
        if key in name:
            return {
                'muscle': 'muscular', 'skeleton': 'skeletal', 'arter': 'arterial',
                'vein': 'venous', 'nerve': 'nervous', 'organ': 'organs', 'skin': 'skin',
            }[key]
    return 'organs'


def female_origin(part_id):
    if part_id.startswith('VH_F_'):
        return 'Visible Human Female (HRA)'
    if part_id.startswith('GFJM'):
        return 'BodyParts3D 4.0 — miroir recalé sur la femelle'
    if part_id.startswith('GFJ'):
        return 'BodyParts3D 4.0 — recalé sur la femelle'
    if part_id.startswith('Allen'):
        return 'Allen Human Reference Atlas'
    return 'Human Reference Atlas'


def load_female_body():
    data = json.load(open(FEMALE_MANIFEST))
    out = {}
    for p in data['parts']:
        sid = p['id']
        system = SYSTEMS.get(p.get('system'), p.get('system', 'anatomique'))
        concept = p.get('conceptId', '')
        origin = female_origin(sid)
        curated = CURATED.get(concept, {})
        if p.get('system') == 'pregnancy':
            desc = curated.get('description') or (
                f'{p.get("name") or sid} — Référence de grossesse issue du {origin} '
                f'({concept}) : structure témoin, non présente hors grossesse.')
        else:
            desc = curated.get('description') or (
                f'{p.get("name") or sid} — Structure du système {system} identifiée '
                f'{concept} dans {origin}.')
        out[sid] = {
            'name': p.get('name') or sid,
            'description': ' '.join(desc.split()),
            'source': curated.get('source') or (
                'Body Atlas 3D — Human Reference Atlas / Visible Human Female'
                if sid.startswith('VH_F_') else
                'Body Atlas 3D — BodyParts3D 4.0 (DBCLS), recalé sur la femelle'),
            'license': curated.get('license', 'CC BY 4.0'),
            'origin': origin,
            'system': p.get('system', 'organs'),
        }
    for entry in out.values():
        add_localization(entry)
    return out


result = {
    'version': 2,
    'sources': {
        'seema': 'https://github.com/SeemaBansal1/3d-human-body-anatomy',
        'bodyatlas': 'https://github.com/ImliStack/Body-Atlas-3D',
    },
    'descriptions': {
        'seema': load_seema(),
        'bodyatlas': load_female_body(),
    },
}
with open(OUT, 'w') as f:
    json.dump(result, f, indent=1, ensure_ascii=False)
for source in ('seema', 'bodyatlas'):
    subset = {'version': result['version'],
              'sources': {source: result['sources'][source]},
              'descriptions': {source: result['descriptions'][source]}}
    with open(f'{ROOT}/docs/models/selection-descriptions-{source}.json', 'w') as f:
        json.dump(subset, f, separators=(',', ':'), ensure_ascii=False)
print('[descriptions] seema', len(result['descriptions']['seema']),
      'bodyatlas', len(result['descriptions']['bodyatlas']))
