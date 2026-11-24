import { readFileSync, existsSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const p = (x) => new URL(x, root).pathname;
const report = JSON.parse(readFileSync(p('docs/analyses/verification-4-couches.json'), 'utf8'));
const completeness = JSON.parse(readFileSync(p('docs/analyses/completude-couches.json'), 'utf8'));

for (const sex of ['femme', 'homme']) {
  assert.ok(existsSync(p(`docs/videos/${sex}-validation.mp4`)), `vidéo ${sex} absente`);
  const glb = p(`docs/models/corps-${sex === 'femme' ? 'female' : 'male'}-opt.glb`);
  assert.ok(existsSync(glb), `GLB ${sex} absent`);
  assert.ok(statSync(glb).size < 25e6, `GLB ${sex} trop gros`);
}

assert.equal(report.orphans.female, 0);
assert.equal(report.orphans.male, 0);
assert.ok(report.skin_edge_stretch_gt10mm.female.max_ratio < 2.25);
assert.ok(report.skin_edge_stretch_gt10mm.male.max_ratio < 2.25);
assert.equal(report.layers_moving_gt1cm.female, '133/133');
assert.equal(report.layers_moving_gt1cm.male, '128/128');
assert.equal(completeness.missing.female.length, 0);
assert.equal(completeness.missing.male.length, 0);

console.log('OK — produit final vérifié');
