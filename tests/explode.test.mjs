import assert from "node:assert/strict";
import { chromium } from "playwright";

/* BENCH-005 — éclaté global v2 : réversible, monotone, sans conflit entre
 * groupes partagés, et exclusif avec la coupe. */

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
const verifier = (nom, fn) => Promise.resolve().then(fn)
  .then(() => resultats.push({ nom, ok: true }))
  .catch((e) => resultats.push({ nom, ok: false, erreur: e.message }));

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

/* Déplacement moyen sur un échantillon déterministe de 12 instances. */
const deplacement = () => page.evaluate(() => {
  const THREE = window.__THREE;
  const lots = [...window.__v2.batches.values()];
  const m = new THREE.Matrix4();
  let somme = 0, n = 0, max = 0;
  for (const lot of lots) {
    const count = Math.min(4, lot.count || 0);
    for (let i = 0; i < count; i++) {
      lot.getMatrixAt(i, m);
      const d = Math.hypot(m.elements[12], m.elements[13], m.elements[14]);
      somme += d; max = Math.max(max, d); n++;
    }
  }
  return { moyenne: somme / Math.max(1, n), max, n, groupes: window.__v2Groups.length };
});

await verifier("43 groupes et état initial à zéro", async () => {
  const d = await deplacement();
  assert.equal(d.groupes, 43);
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 0);
  assert.ok(d.max < 1e-6, `matrice initiale non identité : ${d.max}`);
});

await verifier("curseur : déplacement monotone et bouton cohérent", async () => {
  const valeurs = [0, 25, 50, 100];
  const mesures = [];
  for (const v of valeurs) {
    await page.locator("#explode-range").fill(String(v));
    mesures.push((await deplacement()).moyenne);
  }
  for (let i = 1; i < mesures.length; i++) {
    assert.ok(mesures[i] > mesures[i - 1] + 1e-6,
      `non monotone à ${valeurs[i]} % : ${mesures[i - 1]} -> ${mesures[i]}`);
  }
  const ui = await page.evaluate(() => ({
    pressed: document.getElementById('explode-toggle').getAttribute('aria-pressed'),
    valeur: document.getElementById('explode-value').textContent,
  }));
  assert.equal(ui.pressed, "true");
  assert.equal(ui.valeur, "100 %");
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 1);
});

await verifier("retour à zéro : matrices identiques, aucune dérive", async () => {
  await page.locator("#explode-range").fill("0");
  const d = await deplacement();
  assert.ok(d.max < 1e-6, `dérive après retour à zéro : ${d.max}`);
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 0);
  assert.equal(await page.evaluate(() => document.getElementById('explode-toggle').getAttribute('aria-pressed')), "false");
});

await verifier("exclusivité avec la coupe dans les deux sens", async () => {
  await page.evaluate(() => window.__v2UI.coupe.basculer());
  await page.locator("#explode-range").fill("100");
  assert.equal(await page.evaluate(() => document.getElementById('coupe-toggle').getAttribute('aria-pressed')), "false");
  await page.evaluate(() => window.__v2UI.coupe.basculer());
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 0);
});

await verifier("bouton binaire et cible tactile", async () => {
  await page.locator("#explode-toggle").click();
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 1);
  const hauteur = await page.evaluate(() => document.getElementById('explode-toggle').getBoundingClientRect().height);
  assert.ok(hauteur >= 36, `cible trop petite : ${hauteur}px`);
  await page.locator("#explode-toggle").click();
  assert.equal(await page.evaluate(() => window.__v2.explodeAmount), 0);
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles d'éclaté réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
