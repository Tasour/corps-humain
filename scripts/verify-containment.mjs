/* Vérifie la cohérence du modèle femelle : pas de déformation par couche,
 * côtes autour des poumons, cheveux couvrant l'occiput. */
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 900, height: 800 }, serviceWorkers: 'block' });
const page = await context.newPage();
await page.goto('http://127.0.0.1:8901/?sex=f&capture=1', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__corps && /visible|maillage/.test(
  document.getElementById('corps-info').textContent), { timeout: 120000 });

const report = await page.evaluate(() => {
  const c = window.__corps;
  const scaled = [];
  for (const root of ['femaleModel', 'supplements']) {
    c[root].traverse((o) => {
      if (!o.isBatchedMesh) return;
      if (Math.abs(o.scale.x - 1) > 1e-6 || Math.abs(o.scale.z - 1) > 1e-6) {
        scaled.push({ root, layer: o.userData.batchLayer, scale: o.scale.toArray() });
      }
    });
  }

  const radial = (part) => {
    const g = part.geometry;
    g.computeBoundingBox();
    const b = g.boundingBox;
    return Math.max(Math.abs(b.min.x), Math.abs(b.max.x));
  };
  let ribMax = 0, lungMax = 0;
  c.femaleModel.traverse((o) => {
    if (!o.isBatchedMesh) return;
    for (const part of (o.userData.parts || [])) {
      const n = (part.name || '').toLowerCase();
      if (/rib/.test(n) && o.userData.batchLayer === 'skeleton') ribMax = Math.max(ribMax, radial(part));
      if (/lung/.test(n) && o.userData.batchLayer === 'organs') lungMax = Math.max(lungMax, radial(part));
    }
  });

  const headBox = (root, layer) => {
    let box = null;
    c[root].traverse((o) => {
      if (!o.isBatchedMesh || o.userData.batchLayer !== layer) return;
      const a = o.geometry.getAttribute('position').array;
      for (let i = 0; i < a.length; i += 3) {
        if (a[i + 1] < 1.44) continue;
        if (!box) box = { zmin: Infinity, zmax: -Infinity };
        box.zmin = Math.min(box.zmin, a[i + 2]);
        box.zmax = Math.max(box.zmax, a[i + 2]);
      }
    });
    return box;
  };
  return {
    scaled,
    ribs: +ribMax.toFixed(4),
    lungs: +lungMax.toFixed(4),
    hair: headBox('supplements', 'cosmetic'),
    skull: headBox('femaleModel', 'skeleton'),
  };
});

console.log(JSON.stringify(report, null, 1));
const ok = [];
ok.push(['aucune déformation par couche', report.scaled.length === 0]);
ok.push(['côtes à l’extérieur des poumons', report.ribs > report.lungs]);
ok.push(['cheveux derrière l’occiput', !!report.hair && !!report.skull && report.hair.zmin <= report.skull.zmin + 0.02]);
let failed = false;
for (const [label, pass] of ok) {
  console.log(`${pass ? 'OK' : 'ECHEC'} — ${label}`);
  if (!pass) failed = true;
}
await browser.close();
if (failed) process.exitCode = 1;
else console.log('OK cohérence du modèle femelle');
