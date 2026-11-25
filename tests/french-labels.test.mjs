import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const html = readFileSync(root + 'index.html', 'utf8');
const viewer = readFileSync(root + 'src/corps-viewer.js', 'utf8');
const pattern = /\b(of|the|and|left|right|artery|vein|nerve|bone|with|from)\b/i;
let checked = 0;

for (const source of ['seema', 'bodyatlas']) {
  const data = JSON.parse(readFileSync(root + `docs/models/selection-descriptions-${source}.json`, 'utf8'));
  for (const entry of Object.values(data.descriptions[source])) {
    assert.ok(entry.name_fr, `${source} : name_fr absent pour ${entry.name}`);
    assert.ok(entry.name_latin, `${source} : name_latin absent pour ${entry.name}`);
    assert.ok(!pattern.test(entry.name_fr), `${source} : anglais résiduel « ${entry.name_fr} »`);
    checked++;
  }
}

assert.ok(html.includes('id="selection-latin"'), 'sous-titre latin absent de la popup');
assert.ok(viewer.includes("field === 'latin'"), 'résolution du nom latin absente');
console.log(`PASS libellés français : ${checked} noms, titre FR + nom source`);
