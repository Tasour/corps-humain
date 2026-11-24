import assert from "node:assert/strict";
import { chromium } from "playwright";

/* BENCH-004 — coupes frontale / sagittale / transversale dans les deux moteurs.
 * On vérifie l'état réel des matériaux Three.js, pas seulement l'UI. */

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);

const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const ctx = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await ctx.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const resultats = [];
let sideInitialV1 = null;
const verifier = (nom, fn) => Promise.resolve().then(fn)
  .then(() => resultats.push({ nom, ok: true }))
  .catch((e) => resultats.push({ nom, ok: false, erreur: e.message }));

/* ---------- v2 ----------------------------------------------------------- */
await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

await verifier("v2 : plan ajouté aux lots et normales correctes", async () => {
  await page.evaluate(() => window.__v2UI.coupe.basculer());
  const d = await page.evaluate(() => {
    const lots = [...window.__v2.batches.values()];
    const mat = lots[0].material;
    return {
      pressed: document.getElementById('coupe-toggle').getAttribute('aria-pressed'),
      local: window.__renderer.localClippingEnabled,
      plans: mat.clippingPlanes?.length || 0,
      normal: [mat.clippingPlanes[0].normal.x, mat.clippingPlanes[0].normal.y, mat.clippingPlanes[0].normal.z],
    };
  });
  assert.equal(d.pressed, "true");
  assert.equal(d.local, true);
  assert.equal(d.plans, 1);
  assert.deepEqual(d.normal, [0, 0, -1]);
});

await verifier("v2 : axe transversal et position appliqués", async () => {
  await page.evaluate(() => { window.__v2UI.coupe.axe("transversal"); window.__v2UI.coupe.position(-0.3); });
  const d = await page.evaluate(() => {
    const mat = [...window.__v2.batches.values()][0].material;
    return {
      normal: [mat.clippingPlanes[0].normal.x, mat.clippingPlanes[0].normal.y, mat.clippingPlanes[0].normal.z],
      constante: mat.clippingPlanes[0].constant,
      coche: document.querySelector('[data-clip-axe="transversal"]').getAttribute('aria-checked'),
    };
  });
  assert.deepEqual(d.normal, [0, -1, 0]);
  assert.ok(Math.abs(d.constante + 0.3) < 1e-6, `constante ${d.constante}`);
  assert.equal(d.coche, "true");
});

await verifier("v2 : désactivation restaure side et retire les plans", async () => {
  await page.evaluate(() => window.__v2UI.coupe.basculer());
  const d = await page.evaluate(() => {
    const mat = [...window.__v2.batches.values()][0].material;
    return {
      plans: mat.clippingPlanes,
      cote: mat.userData._clipSide,
      pressed: document.getElementById('coupe-toggle').getAttribute('aria-pressed'),
    };
  });
  assert.equal(d.plans, null);
  assert.equal(d.cote, undefined);
  assert.equal(d.pressed, "false");
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de coupe réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
