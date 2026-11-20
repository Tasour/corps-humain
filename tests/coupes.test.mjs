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

/* ---------- v1 ----------------------------------------------------------- */
await page.goto(`${BASE}/`);
await page.waitForFunction(() => window.__app?.scene?.entries, null, { timeout: 120000 });

await verifier("v1 : trois axes distincts et UI cachée hors coupe", async () => {
  const d = await page.evaluate(() => {
    const s = window.__app.scene;
    return {
      axes: Object.keys(s.clipPlanes),
      normales: Object.values(s.clipPlanes).map((p) => [p.normal.x, p.normal.y, p.normal.z]),
      cache: document.getElementById('dock-coupe').hidden,
      radios: document.querySelectorAll('[data-clip-axis]').length,
      sideInitial: (() => {
        for (const e of Object.values(s.entries)) {
          let found = null;
          e.group.traverse((o) => {
            if (!found && o.isMesh && o.material && !o.material.isShaderMaterial) found = o.material.side;
          });
          if (found !== null) return found;
        }
        return null;
      })(),
    };
  });
  assert.deepEqual(d.axes, ["frontal", "sagittal", "transversal"]);
  assert.deepEqual(new Set(d.normales.map((n) => n.join(","))).size, 3);
  sideInitialV1 = d.sideInitial;
  assert.ok(sideInitialV1 !== null, "matériau v1 introuvable");
  assert.equal(d.cache, true);
  assert.equal(d.radios, 3);
});

await verifier("v1 : activation, changement d'axe et de position", async () => {
  await page.locator("#btn-section").click();
  let d = await page.evaluate(() => {
    const s = window.__app.scene;
    return {
      cache: document.getElementById('dock-coupe').hidden,
      plan: (() => {
        for (const e of Object.values(s.entries)) {
          let found = null;
          e.group.traverse((o) => {
            if (!found && o.isMesh && o.material && !o.material.isShaderMaterial) {
              found = o.material.clippingPlanes?.[0] === s.clipPlane;
            }
          });
          if (found !== null) return found;
        }
        return false;
      })(),
      normal: [s.clipPlane.normal.x, s.clipPlane.normal.y, s.clipPlane.normal.z],
    };
  });
  assert.equal(d.cache, false);
  assert.equal(d.plan, true);
  await page.locator('[data-clip-axis="sagittal"]').click();
  await page.locator("#clip-range").fill("40");
  d = await page.evaluate(() => {
    const s = window.__app.scene;
    return {
      axe: s.clipAxis,
      normal: [s.clipPlane.normal.x, s.clipPlane.normal.y, s.clipPlane.normal.z],
      constante: s.clipPlane.constant,
      coche: document.querySelector('[data-clip-axis="sagittal"]').getAttribute('aria-checked'),
    };
  });
  assert.equal(d.axe, "sagittal");
  assert.deepEqual(d.normal, [-1, 0, 0]);
  assert.ok(Math.abs(d.constante - 0.4) < 1e-6, `constante ${d.constante}`);
  assert.equal(d.coche, "true");
});

await verifier("v1 : désactivation restaure side et retire les plans", async () => {
  await page.locator("#btn-section").click();
  const d = await page.evaluate(() => {
    const s = window.__app.scene;
    const mat = [...Object.values(s.entries)].map((e) => e.group).flatMap((g) => {
      const out = [];
      g.traverse((o) => { if (o.isMesh && o.material && !o.material.isShaderMaterial) out.push(o.material); });
      return out;
    })[0];
    return { plans: mat.clippingPlanes, cote: mat.userData._clipSide, side: mat.side };
  });
  assert.equal(d.plans, null);
  assert.equal(d.cote, undefined);
  assert.equal(d.side, sideInitialV1);
  assert.equal(await page.evaluate(() => document.getElementById('dock-coupe').hidden), true);
});

/* ---------- v2 ----------------------------------------------------------- */
await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

await verifier("v2 : plan ajouté aux lots et normales correctes", async () => {
  await page.locator("#coupe-toggle").click();
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
  await page.locator('[data-clip-axe="transversal"]').click();
  await page.locator("#coupe-range").fill("-30");
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
  await page.locator("#coupe-toggle").click();
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
