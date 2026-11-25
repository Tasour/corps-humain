#!/usr/bin/env python3
"""Ajoute les descriptions localisées de la génitalité masculine."""
import json
import sys
from pathlib import Path

ROOT = Path('/home/tasour/corps-humain')
sys.path.insert(0, str(ROOT / 'scripts'))
from descriptions_i18n import add_localization  # noqa: E402

MANIFEST = ROOT / 'docs/models/male-genitalia/male-genitalia.json'
TARGET = ROOT / 'docs/models/selection-descriptions-seema.json'

manifest = json.loads(MANIFEST.read_text())
data = json.loads(TARGET.read_text())
entries = data['descriptions']['seema']
for part in manifest['parts']:
    name = part['name']
    entries[part['id']] = {
        'name': name,
        'description': f'{name} — organe du système reproducteur masculin (BodyParts3D).',
        'source': 'BodyParts3D via 3D Human Body Anatomy',
        'license': 'CC BY 4.0',
        'origin': 'référence masculine',
        'system': 'reproductive',
    }
    add_localization(entries[part['id']])
TARGET.write_text(json.dumps(data, separators=(',', ':'), ensure_ascii=False))
print('ajoutées', len(manifest['parts']), 'total', len(entries))
