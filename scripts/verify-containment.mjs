/* Vérifie que les couches internes femelles restent sous la peau. */
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
await page.goto('http://127.0.0.1:8901/?sex=f&capture=1', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.__corps && /visible|maillage/.test(
  document.getElementById('corps-info').textContent), { timeout: 120000 });

const report = await page.evaluate(() => {
  const c = window.__corps;
  const zones = {
    head: { y: [1.5, 1.67], x: [0, 0.12] },
    forearm: { y: [0.95, 1.15], x: [0.25, 0.42] },
    thigh: { y: [0.5, 0.7], x: [0.03, 0.18] },
    calf: { y: [0.25, 0.45], x: [0.03, 0.15] },
  };
  const extent = (root, layer, z) => {
    let out = null;
    c[root].traverse((o) => {
      if (!o.isBatchedMesh || o.userData.batchLayer !== layer) return;
      const a = o.geometry.getAttribute('position').array;
      const sx = o.scale.x, sz = o.scale.z, pz = o.position.z;
      let zmin = Infinity, zmax = -Infinity, n = 0;
      for (let i = 0; i < a.length; i += 3) {
        const ax = Math.abs(a[i]) * sx, y = a[i + 1], zz = a[i + 2] * sz + pz;
        if (ax > z.x[0] && ax < z.x[1] && y > z.y[0] && y < z.y[1]) {
          n++; if (zz < zmin) zmin = zz; if (zz > zmax) zmax = zz;
        }
      }
      if (n) out = { zmin, zmax, n };
    });
    return out;
  };
  const result = {};
  for (const [name, zone] of Object.entries(zones)) {
    const skin = extent('femaleModel', 'skin', zone);
    const row = { skin: { zmin: +skin.zmin.toFixed(4), zmax: +skin.zmax.toFixed(4) }, outside: [] };
    for (const layer of ['muscles', 'vessels', 'nerves', 'skeleton', 'organs']) {
      for (const root of ['femaleModel', 'supplements']) {
        const e = extent(root, layer, zone);
        if (!e) continue;
        const beyond = Math.max(0, skin.zmin - e.zmin, e.zmax - skin.zmax);
        if (beyond > 0.001) row.outside.push({ root, layer, mm: +(beyond * 1000).toFixed(1) });
      }
    }
    result[name] = row;
  }
  return result;
});

console.log(JSON.stringify(report, null, 1));
const failures = Object.entries(report).flatMap(([zone, row]) =>
  row.outside.map((o) => `${zone}/${o.root}/${o.layer} dépasse de ${o.mm} mm`));
await browser.close();
if (failures.length) {
  console.error('ECHEC contention :\n' + failures.join('\n'));
  process.exitCode = 1;
} else {
  console.log('OK contention : toutes les couches internes sous la peau');
}
