import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import zlib from 'node:zlib';

const root = new URL('..', import.meta.url).pathname;
const dir = root + 'docs/models/body-atlas/';
const manifest = JSON.parse(readFileSync(dir + 'female-supplements.json', 'utf8'));
const raw = zlib.gunzipSync(readFileSync(dir + 'female-supplements.bin.gz'));

assert.ok(manifest.parts.length >= 300, 'compléments féminins absents');

let offset = 0;
const pad = () => { const r = offset % 4; if (r) offset += 4 - r; };
for (const part of manifest.parts) {
  pad();
  const pos = offset; offset += part.vertexCount * 3 * 4;
  pad();
  const nor = offset; offset += part.vertexCount * 3 * 4;
  pad();
  const idx = offset; offset += part.indexCount * 4;
  pad();
  assert.equal(part.positions, pos, `${part.name} : offset positions invalide`);
  assert.equal(part.normals, nor, `${part.name} : offset normales invalide (ancien bug)`);
  assert.equal(part.indices, idx, `${part.name} : offset indices invalide (ancien bug)`);
  const indices = new Uint32Array(raw.buffer, raw.byteOffset + part.indices, part.indexCount);
  for (const value of indices) {
    assert.ok(value < part.vertexCount, `${part.name} : indice ${value} hors limites`);
  }
}
assert.equal(offset, raw.length, 'taille du chunk incohérente avec le manifeste');
console.log(`PASS intégrité des compléments : ${manifest.parts.length} pièces, indices valides`);
