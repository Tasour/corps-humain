#!/usr/bin/env python3
"""Ajoute les champs localisés aux descriptions déjà générées."""
import json
import sys

ROOT = '/home/tasour/corps-humain/docs/models/'
sys.path.insert(0, '/home/tasour/corps-humain/scripts')
from descriptions_i18n import add_localization  # noqa: E402


def system_from_file(filename):
    name = filename.lower()
    for key in ('muscle', 'skeleton', 'arter', 'vein', 'nerve', 'organ', 'skin'):
        if key in name:
            return {
                'muscle': 'muscular', 'skeleton': 'skeletal', 'arter': 'arterial',
                'vein': 'venous', 'nerve': 'nervous', 'organ': 'organs', 'skin': 'skin',
            }[key]
    return 'organs'

for source in ('seema', 'bodyatlas'):
    path = ROOT + f'selection-descriptions-{source}.json'
    data = json.load(open(path))
    entries = data['descriptions'][source]
    for entry in entries.values():
        for key in ('name_fr', 'name_en', 'origin_fr', 'origin_en',
                    'description_fr', 'description_en'):
            entry.pop(key, None)
        if not entry.get('system'):
            entry['system'] = system_from_file(entry.get('source', ''))
        add_localization(entry)
    with open(path, 'w') as handle:
        json.dump(data, handle, separators=(',', ':'), ensure_ascii=False)
    print(source, len(entries))
