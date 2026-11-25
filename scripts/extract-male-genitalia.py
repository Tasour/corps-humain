#!/usr/bin/env python3
"""Extrait la génitalité masculine de BodyParts3D mâle vers un chunk local.

Source : docs/models/body-atlas/atlas.json (CC BY 4.0), chunk 11.
Format de sortie identique à female-supplements : [positions f32][normales f32][indices u32].
"""
import gzip
import json
import struct
from pathlib import Path

ROOT = Path('/home/tasour/corps-humain')
SOURCE = ROOT / 'docs/models/body-atlas/atlas.json'
IDS = ['FJ3132', 'FJ3133', 'FJ3134', 'FJ3135', 'FJ3136', 'FJ3137',
       'FJ3138', 'FJ3139', 'FJ3140', 'FJ3141', 'FJ3142', 'FJ3143']

doc = json.loads(SOURCE.read_text())
by_id = {p['id']: p for p in doc['parts']}
wanted = [by_id[i] for i in IDS]
chunk = doc['chunks'][wanted[0]['chunk']]['gzip'].lstrip('./')
raw = gzip.decompress((ROOT / chunk).read_bytes())


def read(part):
    n = part['vertexCount']
    pos = struct.unpack_from(f'<{n * 3}f', raw, part['positions'])
    nor = struct.unpack_from(f'<{n * 3}h', raw, part['normals'])
    nor = [v / 32767.0 for v in nor]
    idx = struct.unpack_from(f'<{part["indexCount"]}I', raw, part['indices'])
    return pos, nor, idx


def pad(offset):
    r = offset % 4
    return offset + (4 - r if r else 0)


offset = 0
blobs = []
manifest = {'version': 1, 'format': 'raw', 'source': 'BodyParts3D',
            'license': 'CC BY 4.0', 'parts': []}
for part in wanted:
    pos, nor, idx = read(part)
    entry = {
        'name': part['name'], 'id': part['id'], 'system': part['system'],
        'conceptId': part.get('conceptId'), 'bounds': part['bounds'],
        'vertexCount': part['vertexCount'], 'indexCount': part['indexCount'],
    }
    offset = pad(offset)
    entry['positions'] = offset
    blobs.append(struct.pack(f'<{len(pos)}f', *pos)); offset += len(pos) * 4
    offset = pad(offset)
    entry['normals'] = offset
    blobs.append(struct.pack(f'<{len(nor)}f', *nor)); offset += len(nor) * 4
    offset = pad(offset)
    entry['indices'] = offset
    blobs.append(struct.pack(f'<{len(idx)}I', *idx)); offset += len(idx) * 4
    manifest['parts'].append(entry)

binary = b''.join(blobs)
out = ROOT / 'docs/models/male-genitalia'
out.mkdir(exist_ok=True)
(out / 'male-genitalia.json').write_text(json.dumps(manifest, ensure_ascii=False, separators=(',', ':')))
(out / 'male-genitalia.bin.gz').write_bytes(gzip.compress(binary, compresslevel=9))
print('parts', len(wanted), 'verts', sum(p['vertexCount'] for p in wanted),
      'bytes', len(binary))
