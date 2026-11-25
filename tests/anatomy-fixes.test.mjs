import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import zlib from 'node:zlib';

const root = new URL('..', import.meta.url).pathname;
const read = (p) => readFileSync(root + p);
const manifest = JSON.parse(read('docs/models/male-genitalia/male-genitalia.json'));
const binary = zlib.gunzipSync(read('docs/models/male-genitalia/male-genitalia.bin.gz'));
const supplements = JSON.parse(read('docs/models/body-atlas/female-supplements.json'));
const descriptions = JSON.parse(read('docs/models/selection-descriptions-seema.json'));
const viewer = read('src/corps-viewer.js', 'utf8');

assert.equal(manifest.parts.length, 12, 'génitalité masculine incomplète');
assert.ok(manifest.license === 'CC BY 4.0', 'licence de la source masculine absente');
let offset = 0;
const pad = () => { const r = offset % 4; if (r) offset += 4 - r; };
for (const part of manifest.parts) {
  pad(); assert.equal(part.positions, offset, `${part.name} : offset positions`);
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.normals, offset, `${part.name} : offset normales`);
  offset += part.vertexCount * 3 * 4;
  pad(); assert.equal(part.indices, offset, `${part.name} : offset indices`);
  offset += part.indexCount * 4;
  pad();
  const idx = new Uint32Array(binary.buffer, binary.byteOffset + part.indices, part.indexCount);
  for (const value of idx) assert.ok(value < part.vertexCount, `${part.name} : indice hors limites`);
  const entry = descriptions.descriptions.seema[part.id];
  assert.ok(entry?.name_fr && entry?.name_en, `${part.id} : descriptions localisées absentes`);
}
assert.equal(offset, binary.length, 'taille du chunk masculin incohérente');

assert.ok(!supplements.parts.some((p) => /transversus_abdominis/i.test(p.name)),
  'muscle détaché toujours publié');
const hair = supplements.parts.find((p) => p.name === 'Hair_of_head_female');
assert.ok(hair, 'chevelure féminine absente');
assert.ok(/MIT \+ CC BY 4\.0/.test(hair.entry?.license || ''), 'licence de la chevelure absente');
assert.ok(viewer.includes("geo.translate(0, 0, -0.015)"), 'recul du côlon absent');
assert.ok(read('docs/analyses/anatomie-2026-11-25.json').length > 500, 'archivage des mesures absent');

console.log('PASS anatomie : 12 pièces mâles, cheveux féminins, côlon reculé');
