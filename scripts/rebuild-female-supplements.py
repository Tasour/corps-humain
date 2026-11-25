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
    """Chevelure CC0 importée de CharacterCreator (MakeHuman long01).

    Source : kblood/CharacterCreator — output/hair_long01.glb, CC0-1.0.
    Alignement déterministe sur le crâne femelle mesuré.
    """
    sys.path.insert(0, str(ROOT / 'scripts'))
    from glb_geom import load_glb, accessor_array

    doc, binary = load_glb(ROOT / 'docs/models/hair-cc0/hair_long01.glb')
    primitive = doc['meshes'][0]['primitives'][0]
    pos = accessor_array(doc, binary, primitive['attributes']['POSITION'])
    nor = accessor_array(doc, binary, primitive['attributes']['NORMAL'])
    idx = accessor_array(doc, binary, primitive['indices']).reshape(-1).astype(int)

    # Crâne femelle : centre x ≈ -0,006, centre z ≈ -0,046, sommet 1,6663.
    # Coiffure source : centre x = 0, centre z ≈ 0,0145, sommet 1,6689.
    fitted = []
    for x, y, z in pos:
        x2 = x * 0.9 - 0.006
        y2 = y - 0.0026
        z1 = (z - 0.0145) * 0.9 - 0.046
        # Extension vers l'arrière, dosée selon la hauteur : forte au niveau
        # du crâne (couvre l'occiput), nulle aux épaules (évite une nappe).
        t = max(0.0, min(1.0, (y2 - 1.38) / 0.24))
        k = 1.0 + 0.35 * t
        z2 = (-0.02 + (z1 + 0.02) * k - 0.005 * t) if z1 < -0.02 else z1
        fitted.append((x2, y2, z2))
    normals = [tuple(v / (sum(c * c for c in v) ** 0.5 or 1)) for v in nor]
    bounds = [[min(p[i] for p in fitted), max(p[i] for p in fitted)] for i in range(3)]
    return [v for p in fitted for v in p], [v for n in normals for v in n], list(idx), bounds


def female_hair_procedural():
    """Chevelure longue déterministe : calotte lisse + nappe arrière.

    Géométrie originale générée à partir des mensurations du crâne féminin.
    Aucun modèle tiers, aucune graine aléatoire.
    """
    import math

    cx, cy, cz = 0.0, 1.555, -0.045
    rx, ry, rz = 0.088, 0.112, 0.098
    off = 0.007
    pos, idx = [], []

    # Calotte : hémisphère tronqué au-dessus du front.
    nphi, ntheta = 96, 14
    for i in range(ntheta + 1):
        theta = 1.35 * i / ntheta
        for j in range(nphi):
            phi = 2 * math.pi * j / nphi
            s = math.sin(theta)
            pos.append((cx + (rx + off) * s * math.cos(phi),
                        cy + (ry + off) * math.cos(theta),
                        cz + (rz + off) * s * math.sin(phi)))
    for i in range(ntheta):
        for j in range(nphi):
            a = i * nphi + j
            b = i * nphi + (j + 1) % nphi
            c = (i + 1) * nphi + j
            d = (i + 1) * nphi + (j + 1) % nphi
            idx.extend((a, c, b, b, c, d))

    # Nappe arrière : surface lisse qui descend jusqu'aux épaules.
    na = 64
    nrows = 18
    base = len(pos)
    for i in range(nrows + 1):
        t = i / nrows
        y = 1.61 - 0.35 * t
        rx_row = 0.09 + 0.07 * t
        rz_row = 0.10 + 0.02 * t
        zc = cz - 0.01 * t
        for j in range(na + 1):
            a = -1.8 + 3.6 * j / na
            wave = 0.003 * math.sin(a * 3 + t * 2)
            x = rx_row * math.sin(a) + wave * math.sin(a)
            z = zc - rz_row * math.cos(a) + wave * math.cos(a)
            pos.append((x, y, z))
    for i in range(nrows):
        for j in range(na):
            a = base + i * (na + 1) + j
            b = a + 1
            c = a + na + 1
            d = c + 1
            idx.extend((a, c, b, b, c, d))

    # Normales accumulées à partir des faces.
    nor = [[0.0, 0.0, 0.0] for _ in pos]
    for a, b, c in zip(idx[0::3], idx[1::3], idx[2::3]):
        pa, pb, pc = pos[a], pos[b], pos[c]
        u = [pb[i] - pa[i] for i in range(3)]
        v = [pc[i] - pa[i] for i in range(3)]
        n = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
        for vi in (a, b, c):
            for i in range(3):
                nor[vi][i] += n[i]
    for n in nor:
        length = math.sqrt(sum(v * v for v in n)) or 1.0
        for i in range(3):
            n[i] /= length

    bounds = [[min(p[i] for p in pos), max(p[i] for p in pos)] for i in range(3)]
    return [v for p in pos for v in p], [v for n in nor for v in n], idx, bounds


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
