#!/usr/bin/env python3
"""Localise toutes les entrées des compléments féminins (FR + nom source)."""
import json
import sys
from pathlib import Path

ROOT = Path('/home/tasour/corps-humain')
sys.path.insert(0, str(ROOT / 'scripts'))
from descriptions_i18n import add_localization, localize_name  # noqa: E402

MUSCLES = {
    'Frontalis muscle': 'muscle frontal',
    'Nasalis muscle': 'muscle nasal',
    'Orbital part of orbicularis oculi': 'partie orbitaire du muscle orbiculaire de l’œil',
    'Palpebral part of orbicularis oculi': 'partie palpébrale du muscle orbiculaire de l’œil',
    'Orbicularis oris muscle': 'muscle orbiculaire de la bouche',
    'Zygomaticus major muscle': 'muscle grand zygomatique',
    'Zygomaticus minor muscle': 'muscle petit zygomatique',
    'Corrugator supercilii': 'muscle corrugateur du sourcil',
    'Depressor anguli oris': 'muscle abaisseur de l’angle de la bouche',
    'Depressor labii inferioris': 'muscle abaisseur de la lèvre inférieure',
    'Procerus muscle': 'muscle procerus',
    'Risorius muscle': 'muscle risorius',
    'Levator labii superioris': 'muscle élévateur de la lèvre supérieure',
    'Mentalis muscle': 'muscle mentonnier',
    'Superficial part of masseter': 'partie superficielle du muscle masséter',
    'Deep part of masseter': 'partie profonde du muscle masséter',
    'Temporalis muscle': 'muscle temporal',
    'Latissimus dorsi muscle': 'muscle grand dorsal',
    'Rectus abdominis muscle': 'muscle droit de l’abdomen',
    'Quadratus lumborum muscle': 'muscle carré des lombes',
}


def french_name(name):
    base = str(name or '')
    side = ''
    if ' — ' in base:
        base, side = base.split(' — ', 1)
        side = ' — ' + side
    base = base.strip()
    if base in MUSCLES:
        return MUSCLES[base] + side
    return localize_name(base, 'fr') + side


path = ROOT / 'docs/models/body-atlas/female-supplements.json'
manifest = json.loads(path.read_text())
count = 0
for part in manifest['parts']:
    entry = part.get('entry')
    if not entry:
        continue
    entry['name'] = entry.get('name') or part['name']
    entry['name_fr'] = french_name(entry['name'])
    entry['name_latin'] = entry['name']
    add_localization(entry)
    entry['name_fr'] = french_name(entry['name'])
    count += 1
path.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
print('entrées localisées', count)
