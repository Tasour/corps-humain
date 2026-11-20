import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* BENCH-015 — étiquette ancrée sur la surface et ligne de rappel.
 * L'oracle est la projection du centre de la structure : l'ancre doit en
 * être distincte (point de surface), tout en restant dans le viewport. */

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const cible = manifest.structures.find((s) => s.id === "organ:bp-heart");
assert.ok(cible);

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
const verifier = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await page.locator('#search').fill(cible.fr || cible.en);
await page.waitForTimeout(300);
await page.locator(`#list .item[data-id="${cible.id}"]`).click();
/* Le cadrage de sélection est animé : on attend sa fin avant de mesurer. */
await page.waitForTimeout(1500);

await verifier("ancre de surface distincte du centre projeté", async () => {
  const d = await page.evaluate((id) => {
    const structure = window.__v2.resolveId(id);
    const c = window.__v2.focusTarget(structure).center.clone().project(window.__v2.camera);
    const viewport = document.getElementById('viewport');
    return {
      label: window.__label,
      centre: [(c.x * 0.5 + 0.5) * viewport.clientWidth, (-c.y * 0.5 + 0.5) * viewport.clientHeight],
      taille: [viewport.clientWidth, viewport.clientHeight],
    };
  }, cible.id);
  assert.ok(d.label, "aucune étiquette exposée");
  const dist = Math.hypot(d.label.ancre[0] - d.centre[0], d.label.ancre[1] - d.centre[1]);
  assert.ok(dist > 2, `ancre confondue avec le centre (${dist.toFixed(2)} px)`);
  assert.ok(d.label.ancre[0] >= 0 && d.label.ancre[0] <= d.taille[0]);
  assert.ok(d.label.ancre[1] >= 0 && d.label.ancre[1] <= d.taille[1]);
});

await verifier("ligne de rappel reliée au cartouche", async () => {
  const d = await page.evaluate(() => ({
    texte: document.getElementById('label').textContent,
    visible: getComputedStyle(document.getElementById('label')).display !== 'none',
    svg: getComputedStyle(document.getElementById('label-lines')).display !== 'none',
    ligne: {
      x1: +document.getElementById('label-line').getAttribute('x1'),
      y1: +document.getElementById('label-line').getAttribute('y1'),
      x2: +document.getElementById('label-line').getAttribute('x2'),
      y2: +document.getElementById('label-line').getAttribute('y2'),
    },
    gauche: parseFloat(document.getElementById('label').style.left),
    haut: parseFloat(document.getElementById('label').style.top),
  }));
  assert.equal(d.visible, true);
  assert.equal(d.svg, true);
  assert.equal(d.texte, cible.fr || cible.en);
  assert.equal(d.ligne.x2, d.gauche);
  assert.equal(d.ligne.y2, d.haut);
  assert.ok(Math.hypot(d.ligne.x2 - d.ligne.x1, d.ligne.y2 - d.ligne.y1) > 5,
    "ligne de rappel trop courte");
  assert.ok(d.haut >= 150 || d.ligne.y1 > 700, "cartouche dans la zone des HUD supérieurs");
});

await verifier("l'ancre suit la rotation de la caméra", async () => {
  const avant = await page.evaluate(() => window.__label.ancre.slice());
  await page.evaluate(() => document.querySelector('#viewport canvas').focus());
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(700);
  const apres = await page.evaluate(() => window.__label.ancre.slice());
  assert.ok(Math.hypot(apres[0] - avant[0], apres[1] - avant[1]) > 1,
    "l'ancre ne suit pas la caméra");
});

await verifier("masquage avec les waypoints", async () => {
  await page.evaluate(() => window.__v2.setWaypointsVisible(true));
  await page.waitForTimeout(150);
  const d = await page.evaluate(() => ({
    label: getComputedStyle(document.getElementById('label')).display,
    ligne: getComputedStyle(document.getElementById('label-lines')).display,
  }));
  assert.equal(d.label, 'none');
  assert.equal(d.ligne, 'none');
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles d'étiquette réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
