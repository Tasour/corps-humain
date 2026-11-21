import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { TOURS, getWaypoints } from "../src/data/waypoints.js";
import { resoudre } from "./helpers-alias.mjs";

/* BENCH-011 — tours guidés multi-structures.
 * Oracle : TOURS + manifeste + getWaypoints(). Aucun texte attendu n'est recopié. */

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));

const verifier = (liste, nom, fn) => Promise.resolve().then(fn)
  .then(() => liste.push({ nom, ok: true }))
  .catch((e) => liste.push({ nom, ok: false, erreur: e.message }));

const donnees = [];
verifier(donnees, "chaque étape référence une structure et un waypoint existants", () => {
  assert.ok(TOURS.length >= 2, "moins de deux tours");
  for (const tour of TOURS) {
    assert.ok(tour.steps.length >= 2, `${tour.id} : moins de deux étapes`);
    for (const step of tour.steps) {
      const s = resoudre(step.id, byId);
      assert.ok(s, `${tour.id} : ${step.id} absent du manifeste`);
      const w = getWaypoints(s);
      assert.ok(step.wp >= 0 && step.wp < w.length, `${tour.id} : wp ${step.wp} hors bornes (${w.length})`);
    }
  }
});

const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const ctx = await browser.newContext({ viewport: { width: 1360, height: 880 } });
const page = await ctx.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const resultats = [];

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
const tour = TOURS[0];
const premiere = byId.get(tour.steps[0].id);
const deuxieme = byId.get(tour.steps[1].id);

await verifier(resultats, "démarrage : HUD, étape 1 et waypoint affichés", async () => {
  await page.getByRole("button", { name: `Tour : ${tour.label}` }).click();
  await page.waitForFunction(() => document.getElementById("tour-step")?.textContent?.startsWith("étape 1/"), null, { timeout: 30000 });
  const d = await page.evaluate(() => ({
    cache: document.getElementById("tour-hud").hidden,
    label: document.getElementById("tour-label").textContent,
    etape: document.getElementById("tour-step").textContent,
    titre: document.getElementById("wp-title").textContent,
    nom: document.getElementById("sel-name").textContent,
    url: location.href,
  }));
  assert.equal(d.cache, false);
  assert.equal(d.label, tour.label);
  assert.equal(d.etape, `étape 1/${tour.steps.length}`);
  assert.equal(d.nom, premiere.fr || premiere.en);
  assert.equal(d.titre, getWaypoints(premiere)[tour.steps[0].wp].title);
  const url = new URL(d.url);
  assert.equal(url.searchParams.get("wp"), String(tour.steps[0].wp));
});

await verifier(resultats, "suivant / précédent : structure et URL cohérentes", async () => {
  await page.locator("#tour-next").click();
  await page.waitForFunction(() => document.getElementById("tour-step")?.textContent?.startsWith("étape 2/"), null, { timeout: 30000 });
  let d = await page.evaluate(() => ({
    etape: document.getElementById("tour-step").textContent,
    titre: document.getElementById("wp-title").textContent,
    url: location.href,
  }));
  assert.equal(d.etape, `étape 2/${tour.steps.length}`);
  assert.equal(d.titre, getWaypoints(deuxieme)[tour.steps[1].wp].title);
  assert.equal(new URL(d.url).searchParams.get("vue"), deuxieme.id);
  await page.locator("#tour-prev").click();
  await page.waitForFunction(() => document.getElementById("tour-step")?.textContent?.startsWith("étape 1/"), null, { timeout: 30000 });
  d = await page.evaluate(() => document.getElementById("tour-step").textContent);
  assert.equal(d, `étape 1/${tour.steps.length}`);
});

await verifier(resultats, "pause : bascule aria-pressed et libellé", async () => {
  await page.locator("#tour-pause").click();
  const d = await page.evaluate(() => ({
    pressed: document.getElementById("tour-pause").getAttribute("aria-pressed"),
    texte: document.getElementById("tour-pause").textContent,
    hauteur: document.getElementById("tour-pause").getBoundingClientRect().height,
  }));
  assert.equal(d.pressed, "true");
  assert.equal(d.texte, "Reprendre");
  assert.ok(d.hauteur >= 36, `cible trop petite : ${d.hauteur}px`);
});

await verifier(resultats, "Échap quitte le tour en priorité", async () => {
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  const d = await page.evaluate(() => ({
    hidden: document.getElementById("tour-hud").hidden,
    affiche: getComputedStyle(document.getElementById("tour-hud")).display !== "none",
  }));
  assert.equal(d.hidden, true);
  assert.equal(d.affiche, false, "le HUD reste affiché malgré l'attribut hidden");
});

/* Mouvement réduit : pas d'enchaînement automatique, mode manuel. */
const ctxReduce = await browser.newContext({ viewport: { width: 1360, height: 880 }, reducedMotion: "reduce" });
const pageReduce = await ctxReduce.newPage();
pageReduce.setDefaultTimeout(90000);
await verifier(resultats, "mouvement réduit : démarrage en mode manuel", async () => {
  await pageReduce.goto(`${BASE}/v2.html`);
  await pageReduce.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  await pageReduce.getByRole("button", { name: `Tour : ${tour.label}` }).click();
  await pageReduce.waitForFunction(() => document.getElementById("tour-step")?.textContent?.startsWith("étape 1/"), null, { timeout: 30000 });
  const d = await pageReduce.evaluate(() => ({
    pressed: document.getElementById("tour-pause").getAttribute("aria-pressed"),
    texte: document.getElementById("tour-pause").textContent,
  }));
  assert.equal(d.pressed, "true");
  assert.equal(d.texte, "Reprendre");
  await pageReduce.waitForTimeout(2600);
  assert.ok((await pageReduce.evaluate(() => document.getElementById("tour-step").textContent)).startsWith("étape 1/"),
    "le tour a avancé malgré prefers-reduced-motion");
});
await ctxReduce.close();

await verifier(resultats, "aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const tout = [...donnees, ...resultats];
const reussis = tout.filter((r) => r.ok).length;
for (const r of tout) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${tout.length} contrôles de tour réussis · ${TOURS.length} tours`);
process.exitCode = reussis === tout.length ? 0 : 1;
