import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const html = readFileSync(root + 'index.html', 'utf8');
const viewer = readFileSync(root + 'src/corps-viewer.js', 'utf8');
const pattern = /\b(of|the|and|left|right|artery|vein|nerve|bone|with|from)\b/i;
let checked = 0;

const data = JSON.parse(readFileSync(root + 'docs/models/selection-descriptions-seema.json', 'utf8'));
for (const entry of Object.values(data.descriptions.seema)) {
  assert.ok(entry.name_fr, `seema : name_fr absent pour ${entry.name}`);
  assert.ok(entry.name_latin, `seema : name_latin absent pour ${entry.name}`);
  assert.ok(!pattern.test(entry.name_fr), `seema : anglais résiduel « ${entry.name_fr} »`);
  checked++;
}

assert.ok(!html.includes('id="selection-latin"'), 'sous-titre latin encore présent');
assert.ok(!html.includes('id="selection-description"'), 'description encore présente');
assert.ok(html.includes('id="selection-name"'), 'titre du popup absent');
console.log(`PASS libellés français : ${checked} noms, titre FR + nom source`);
