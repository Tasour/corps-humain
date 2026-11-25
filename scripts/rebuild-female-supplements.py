#!/usr/bin/env python3
"""Reconstruit le chunk des compléments féminins sans pièces décollées.

- retire les deux muscles Transversus abdominis (référence masculine mal recalée) ;
- remplace Hairs_of_head001 par « Hair of head » issu de female-atlas
  (HMA + BodyParts3D, MIT + CC BY 4.0), dont la morphologie est féminine.

Le chunk de sortie garde le format [positions f32][normales f32][indices u32]
et des offsets canoniques alignés sur 4 octets.
"""
import gzip
import json
import struct
import sys
from pathlib import Path

ROOT = Path('/home/tasour/corps-humain')
sys.path.insert(0, str(ROOT / 'scripts'))
from descriptions_i18n import add_localization  # noqa: E402

SUP_DIR = ROOT / 'docs/models/body-atlas'
MANIFEST = SUP_DIR / 'female-supplements.json'
CHUNK = SUP_DIR / 'female-supplements.bin.gz'
DROP = {'Transversus_abdominis_muscler001', 'Transversus_abdominis_musclel001'}
HAIR_OLD = 'Hairs_of_head001'

manifest = json.loads(MANIFEST.read_text())
raw = gzip.decompress(CHUNK.read_bytes())


def decode(part):
    n = part['vertexCount']
    pos = struct.unpack_from(f'<{n * 3}f', raw, part['positions'])
    nor = struct.unpack_from(f'<{n * 3}f', raw, part['normals'])
    idx = struct.unpack_from(f'<{part["indexCount"]}I', raw, part['indices'])
    return list(pos), list(nor), list(idx)


def female_hair():
    doc = json.loads((ROOT / 'docs/models/contests/female-atlas/atlas.json').read_text())
    part = next(p for p in doc['parts'] if p['name'] == 'Hair of head')
    chunk = doc['chunks'][part['chunk']]['gzip'].lstrip('./')
    src = gzip.decompress((ROOT / chunk).read_bytes())
    n = part['vertexCount']
    pos = struct.unpack_from(f'<{n * 3}f', src, part['positions'])
    nor = struct.unpack_from(f'<{n * 3}h', src, part['normals'])
    idx = struct.unpack_from(f'<{part["indexCount"]}I', src, part['indices'])
    # Recalage : la coiffure d'origine est enfouie dans le crâne. On l'élargit
    # légèrement et on l'étire en profondeur autour du centre du crâne pour
    # faire affleurer les mèches sans déplacer le sommet.
    centered = []
    for i in range(0, len(pos), 3):
        x, y, z = pos[i], pos[i + 1], pos[i + 2]
        centered.extend((x * 1.16, y, -0.08 + (z + 0.08) * 1.9 + 0.03))
    bounds = part['bounds']
    return centered, [v / 32767.0 for v in nor], list(idx), bounds


hair_pos, hair_nor, hair_idx, hair_bounds = female_hair()
parts = []
for part in manifest['parts']:
    if part['name'] in DROP:
        continue
    if part['name'] in (HAIR_OLD, 'Hair_of_head_female'):
        part['name'] = 'Hair_of_head_female'
        part['label'] = 'Hair of head'
        part['vertexCount'] = len(hair_pos) // 3
        part['indexCount'] = len(hair_idx)
        part['bounds'] = hair_bounds
        part['entry'] = {
            'name': 'Hair of head',
            'description': 'Cheveux de la tête — chevelure féminine issue de female-atlas, recalée sur la peau Visible Human Female.',
            'source': 'Human Reference Atlas & BodyParts3D via female-atlas',
            'license': 'MIT + CC BY 4.0', 'origin': 'référence féminine',
            'system': 'integumentary',
        }
        add_localization(part['entry'])
        parts.append((part, hair_pos, hair_nor, hair_idx))
    else:
        parts.append((part, *decode(part)))

offset = 0
blobs = []


def pad():
    global offset
    r = offset % 4
    if r:
        blobs.append(b'\x00' * (4 - r)); offset += 4 - r


for part, pos, nor, idx in parts:
    pad()
    part['positions'] = offset
    blobs.append(struct.pack(f'<{len(pos)}f', *pos)); offset += len(pos) * 4
    pad()
    part['normals'] = offset
    blobs.append(struct.pack(f'<{len(nor)}f', *nor)); offset += len(nor) * 4
    pad()
    part['indices'] = offset
    blobs.append(struct.pack(f'<{len(idx)}I', *idx)); offset += len(idx) * 4
    pad()

manifest['parts'] = [p for p, _, _, _ in parts]
binary = b''.join(blobs)
MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
CHUNK.write_bytes(gzip.compress(binary, compresslevel=9))
print('parts', len(parts), 'raw', round(len(binary) / 1e6, 2), 'Mo',
      'gz', round(CHUNK.stat().st_size / 1e6, 2), 'Mo')
