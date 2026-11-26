import { readFileSync, existsSync, statSync } from 'node:fs';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const p = (x) => new URL(x, root).pathname;
const report = JSON.parse(readFileSync(p('docs/analyses/verification-4-couches.json'), 'utf8'));
const completeness = JSON.parse(readFileSync(p('docs/analyses/completude-couches.json'), 'utf8'));

assert.ok(existsSync(p('docs/videos/homme-validation.mp4')), 'vidéo homme absente');
const files = ['skin', 'muscles', 'skeleton', 'organs', 'arteries', 'veins', 'nerves']
  .map((n) => p(`docs/models/male/${n}.glb`));
for (const f of files) {
  assert.ok(existsSync(f), `GLB ${f} absent`);
  assert.ok(statSync(f).size < 10e6, `GLB ${f} trop gros`);
}
assert.equal(report.orphans.male, 0);
assert.ok(report.skin_edge_stretch_gt10mm.male.max_ratio < 2.25);
assert.equal(report.layers_moving_gt1cm.male, '128/128');
assert.equal(completeness.missing.male.length, 0);

console.log('OK — produit final vérifié (homme seul)');
