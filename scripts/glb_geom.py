#!/usr/bin/env python3
"""Lecture géométrique directe d'un GLB, sans Blender.

Déterministe : aucune graine, aucun aléa, aucun seuil visuel.
Fournit centroid / maxz / minz / names / invariant.
"""
import json
import math
import struct
import sys

import numpy as np

COMPONENTS = {
    5120: ('i1', 1), 5121: ('u1', 1), 5122: ('i2', 2),
    5123: ('u2', 2), 5125: ('u4', 4), 5126: ('f4', 4),
}
TYPES = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4, 'MAT4': 16}


def load_glb(path):
    raw = open(path, 'rb').read()
    if raw[:4] != b'glTF':
        raise ValueError('magic GLB absent')
    version, total = struct.unpack('<II', raw[4:12])
    if version != 2 or total != len(raw):
        raise ValueError('en-tête GLB incohérent')
    pos = 12
    chunks = {}
    while pos < len(raw):
        length, ctype = struct.unpack('<II', raw[pos:pos + 8])
        chunks[ctype] = raw[pos + 8:pos + 8 + length]
        pos += 8 + length
    doc = json.loads(chunks[0x4E4F534A].decode('utf-8').rstrip(' '))
    return doc, chunks[0x004E4942]


def write_glb(path, doc, binary):
    text = json.dumps(doc, ensure_ascii=False, separators=(',', ':')).encode('utf-8')
    text += b' ' * ((4 - len(text) % 4) % 4)
    binary += b'\x00' * ((4 - len(binary) % 4) % 4)
    length = 12 + 8 + len(text) + 8 + len(binary)
    out = b'glTF' + struct.pack('<II', 2, length)
    out += struct.pack('<II', len(text), 0x4E4F534A) + text
    out += struct.pack('<II', len(binary), 0x004E4942) + binary
    open(path, 'wb').write(out)


def accessor_array(doc, binary, idx):
    acc = doc['accessors'][idx]
    view = doc['bufferViews'][acc['bufferView']]
    code, size = COMPONENTS[acc['componentType']]
    ncomp = TYPES[acc['type']]
    stride = view.get('byteStride', size * ncomp)
    start = view.get('byteOffset', 0) + acc.get('byteOffset', 0)
    count = acc['count']
    dtype = np.dtype('<' + code)
    out = np.empty((count, ncomp), dtype=np.float64)
    for i in range(count):
        offset = start + i * stride
        out[i] = np.frombuffer(binary, dtype=dtype, count=ncomp,
                               offset=offset)
    return out


def mat4_identity():
    return np.eye(4, dtype=np.float64)


def trs_matrix(node):
    if 'matrix' in node:
        return np.array(node['matrix'], dtype=np.float64).reshape(4, 4).T
    m = mat4_identity()
    if 'translation' in node:
        m[:3, 3] = node['translation']
    if 'rotation' in node:
        x, y, z, w = node['rotation']
        n = math.sqrt(x * x + y * y + z * z + w * w) or 1.0
        x, y, z, w = x / n, y / n, z / n, w / n
        m[:3, :3] = np.array([
            [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w)],
            [2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w)],
            [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)],
        ])
    if 'scale' in node:
        m[:3, :3] *= np.array(node['scale'], dtype=np.float64)
    return m


def world_matrices(doc):
    nodes = doc.get('nodes', [])
    parents = {i: None for i in range(len(nodes))}
    for i, node in enumerate(nodes):
        for child in node.get('children', []):
            parents[child] = i
    cache = {}

    def build(i):
        if i in cache:
            return cache[i]
        local = trs_matrix(nodes[i])
        p = parents[i]
        world = build(p) @ local if p is not None else local
        cache[i] = world
        return world

    for i in range(len(nodes)):
        build(i)
    return cache


def mesh_points(path):
    doc, binary = load_glb(path)
    worlds = world_matrices(doc)
    result = {}
    for ni, node in enumerate(doc.get('nodes', [])):
        if 'mesh' not in node:
            continue
        mesh = doc['meshes'][node['mesh']]
        name = mesh.get('name', 'mesh_%d' % node['mesh'])
        points = []
        for prim in mesh['primitives']:
            if 'POSITION' not in prim['attributes']:
                continue
            local = accessor_array(doc, binary, prim['attributes']['POSITION'])
            homogeneous = np.hstack([local[:, :3],
                                     np.ones((len(local), 1))])
            points.append((homogeneous @ worlds[ni].T)[:, :3])
        if points:
            result.setdefault(name, []).append(np.vstack(points))
    return {k: np.vstack(v) for k, v in result.items()}


def find(points, name):
    target = name.lower().split('.')[0]
    for key, value in points.items():
        if key.lower().split('.')[0] == target:
            return value
    raise KeyError(name)


def main():
    path = sys.argv[1]
    command = sys.argv[2]
    points = mesh_points(path)
    if command == 'names':
        for name in sorted(points):
            print(name)
        return
    name = sys.argv[3]
    p = find(points, name)
    if command == 'centroid':
        print(' '.join('%.6f' % v for v in p.mean(axis=0)))
    elif command == 'maxz':
        print('%.6f' % p[:, 2].max())
    elif command == 'maxy':
        # glTF est Y-up : l'axe vertical est Y, pas Z.
        print('%.6f' % p[:, 1].max())
    elif command == 'minz':
        print('%.6f' % p[:, 2].min())
    elif command == 'count':
        print(len(p))
    else:
        raise SystemExit('commande inconnue: ' + command)


if __name__ == '__main__':
    main()
