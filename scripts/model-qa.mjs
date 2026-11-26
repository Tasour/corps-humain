/* QA du modèle 3D, homme et femme : un rapport PASS/FAIL mesuré. */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = process.env.QA_URL || 'http://127.0.0.1:8901';
const ZONES = {
  head: { y: [1.44, 1.70] },
  forearm: { y: [0.95, 1.20] },
  thigh: { y: [0.45, 0.75] },
  calf: { y: [0.10, 0.45] },
  foot: { y: [0, 0.10] },
};
const TOLERANCE_MM = 2;

const browser = await chromium.launch({ headless: true });
const report = { date: new Date().toISOString(), toleranceMm: TOLERANCE_MM, sexes: {} };

for (const sex of ['m', 'f']) {
  const context = await browser.newContext({ viewport: { width: 900, height: 800 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  await page.goto(`${BASE}/?sex=${sex}&capture=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__corps && /visible|maillage/.test(
    document.getElementById('corps-info').textContent), { timeout: 120000 });

  const data = await page.evaluate((zones) => {
    const c = window.__corps;
    const models = c.activeSex === 'male'
      ? [c.maleModel]
      : [c.femaleModel, c.supplements].filter(Boolean);
    const box = (layer, zone) => {
      let out = null;
      for (const model of models) model.traverse((o) => {
        if (!o.isBatchedMesh || o.userData.batchLayer !== layer) return;
        const m = new o.matrix.constructor();
        (o.userData.parts || []).forEach((part, idx) => {
          o.getMatrixAt(idx, m);
          const e = m.elements;
          const a = part.geometry.getAttribute('position').array;
          for (let i = 0; i < a.length; i += 3) {
            const x = a[i], y0 = a[i + 1], z = a[i + 2];
            const wx = e[0] * x + e[4] * y0 + e[8] * z + e[12];
            const wy = e[1] * x + e[5] * y0 + e[9] * z + e[13];
            const wz = e[2] * x + e[6] * y0 + e[10] * z + e[14];
            if (wy < zone.y[0] || wy >= zone.y[1]) continue;
            if (!out) out = { mn: [Infinity, Infinity, Infinity], mx: [-Infinity, -Infinity, -Infinity], n: 0 };
            out.n++;
            const w = [wx, wy, wz];
            for (let k = 0; k < 3; k++) {
              if (w[k] < out.mn[k]) out.mn[k] = w[k];
              if (w[k] > out.mx[k]) out.mx[k] = w[k];
            }
          }
        });
      });
      return out;
    };
    const zonesOut = {};
    for (const [name, zone] of Object.entries(zones)) {
      const skin = box('skin', zone);
      const row = { skin: skin ? { mn: skin.mn.map((v) => +v.toFixed(3)), mx: skin.mx.map((v) => +v.toFixed(3)) } : null, outsideMm: 0, layers: [] };
      if (skin) {
        for (const layer of ['muscles', 'vessels', 'nerves', 'skeleton', 'organs']) {
          const b = box(layer, zone);
          if (!b) continue;
          let beyond = 0;
          for (let k = 0; k < 3; k++) {
            beyond = Math.max(beyond, skin.mn[k] - b.mn[k], b.mx[k] - skin.mx[k]);
          }
          if (beyond > 0) row.layers.push({ layer, mm: +(beyond * 1000).toFixed(1) });
          row.outsideMm = Math.max(row.outsideMm, +(beyond * 1000).toFixed(1));
        }
      }
      zonesOut[name] = row;
    }
    let ribMax = 0, lungMax = 0;
    for (const model of models) model.traverse((o) => {
      if (!o.isBatchedMesh) return;
      for (const part of (o.userData.parts || [])) {
        const n = (part.name || '').toLowerCase();
        const g = part.geometry;
        g.computeBoundingBox();
        const rad = Math.max(Math.abs(g.boundingBox.min.x), Math.abs(g.boundingBox.max.x));
        if (/rib/.test(n) && o.userData.batchLayer === 'skeleton') ribMax = Math.max(ribMax, rad);
        if (/lung/.test(n) && o.userData.batchLayer === 'organs') lungMax = Math.max(lungMax, rad);
      }
    });
    let hair = null;
    for (const model of models) model.traverse((o) => {
      if (!o.isBatchedMesh || o.userData.batchLayer !== 'cosmetic') return;
      const a = o.geometry.getAttribute('position').array;
      for (let i = 0; i < a.length; i += 3) {
        if (a[i + 1] < 1.55) continue;
        if (!hair) hair = { zmin: Infinity, zmax: -Infinity };
        hair.zmin = Math.min(hair.zmin, a[i + 2]);
        hair.zmax = Math.max(hair.zmax, a[i + 2]);
      }
    });
    return {
      zones: zonesOut,
      ribs: +ribMax.toFixed(3),
      lungs: +lungMax.toFixed(3),
      hair: hair && { zmin: +hair.zmin.toFixed(3), zmax: +hair.zmax.toFixed(3) },
      drawCalls: c.renderer.info.render.calls,
      layers: [...c.activeLayers],
    };
  }, ZONES);

  const labelFiles = sex === 'm' ? ['seema'] : ['bodyatlas'];
  let english = 0, total = 0;
  for (const source of labelFiles) {
    const file = JSON.parse(readFileSync(new URL(`../docs/models/selection-descriptions-${source}.json`, import.meta.url), 'utf8'));
    for (const entry of Object.values(file.descriptions[source])) {
      total++;
      if (/\b(of|the|and|left|right|artery|vein|nerve|bone|with|from)\b/i.test(entry.name_fr || '')) english++;
    }
  }

  const checks = {
    containment: Object.values(data.zones).every((z) => z.outsideMm <= TOLERANCE_MM),
    ribsOutsideLungs: data.ribs > data.lungs,
    scalpCovered: !!data.hair,
    labelsFrench: english === 0,
    drawCalls: data.drawCalls <= 12,
  };
  report.sexes[sex] = { ...data, labels: { total, english }, checks };
  await context.close();
}
await browser.close();

const dir = new URL('../docs/analyses/', import.meta.url);
mkdirSync(dir, { recursive: true });
writeFileSync(new URL('modele-qa.json', dir), JSON.stringify(report, null, 1));

let failed = false;
for (const [sex, row] of Object.entries(report.sexes)) {
  console.log(`\n== ${sex === 'm' ? 'homme' : 'femme'} (${row.drawCalls} draw calls)`);
  for (const [name, pass] of Object.entries(row.checks)) {
    if (!pass) failed = true;
    console.log(`${pass ? 'OK  ' : 'ECHEC'} ${name}`);
  }
  for (const [zone, z] of Object.entries(row.zones)) {
    if (z.outsideMm > TOLERANCE_MM) console.log(`   ${zone}: ${z.outsideMm} mm hors peau`, z.layers);
  }
  console.log(`   côtes ${row.ribs} / poumons ${row.lungs} ; noms anglais ${row.labels.english}/${row.labels.total}`);
}
process.exitCode = failed ? 1 : 0;
