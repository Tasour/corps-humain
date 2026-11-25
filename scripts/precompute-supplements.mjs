/* Précalcule les compléments féminins dans un chunk binaire.
 *
 * Le binaire livré est la source de vérité : il contient déjà les positions,
 * normales et indices recalés sur la femme. Ce script ne le régénère jamais
 * depuis buildSupplements() (qui relit le manifeste et peut propager un
 * décalage d'offsets) ; il vérifie les offsets et localise les entrées.
 */
import fs from 'node:fs';
import zlib from 'node:zlib';
import { execFileSync } from 'node:child_process';

const DIR = 'docs/models/body-atlas/';
const MANIFEST = DIR + 'female-supplements.json';
const CHUNK = DIR + 'female-supplements.bin.gz';

const localize = (entry) => JSON.parse(execFileSync('python3', ['-c', `
import json,sys
sys.path.insert(0,'/home/tasour/corps-humain/scripts')
from descriptions_i18n import add_localization
entry=json.loads(sys.stdin.read())
add_localization(entry)
print(json.dumps(entry,ensure_ascii=False))
`, '-'], { input: JSON.stringify(entry), encoding: 'utf8' }));

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const gz = fs.readFileSync(CHUNK);
const raw = zlib.gunzipSync(gz);

/* Offsets canoniques : [positions][normales][indices], alignés sur 4 octets. */
let offset = 0;
const pad = () => { const r = offset % 4; if (r) { offset += 4 - r; } };
let repaired = 0;
for (const part of manifest.parts) {
  pad();
  const positions = offset;
  offset += part.vertexCount * 3 * 4;
  pad();
  const normals = offset;
  offset += part.vertexCount * 3 * 4;
  pad();
  const indices = offset;
  offset += part.indexCount * 4;
  pad();
  if (part.positions !== positions || part.normals !== normals || part.indices !== indices) {
    repaired++;
  }
  part.positions = positions;
  part.normals = normals;
  part.indices = indices;
}
if (offset !== raw.length) {
  throw new Error(`Taille manifeste incompatible : ${offset} octets attendus, ${raw.length} présents`);
}
for (const part of manifest.parts) {
  if (part.entry) part.entry = localize(part.entry);
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest));

console.log('parts', manifest.parts.length, 'raw', (raw.length / 1e6).toFixed(2), 'Mo',
  'gz', (gz.length / 1e6).toFixed(2), 'Mo', 'offsets réparés', repaired);
