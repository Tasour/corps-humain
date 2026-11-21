import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { DISEASES } from "../src/data/diseases.js";
import { TARGET_TO_STRUCTURES } from "../src/data/disease-targets.js";
import { resoudre } from "./helpers-alias.mjs";

/* Pathologies simulées portées de v1 vers v2 : couverture du mapping,
 * comportement réel du HUD et absence d'affirmation diagnostique. */

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const ids = new Set(manifest.structures.map((s) => s.id));
const resultats = [];
const verifier = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

await verifier("30 pathologies et 27 cibles mappées", () => {
  const cibles = new Set();
  for (const d of DISEASES) for (const e of d.effects || []) cibles.add(e.target);
  assert.equal(DISEASES.length, 30);
  assert.equal(cibles.size, 27);
  assert.deepEqual([...cibles].filter((c) => !TARGET_TO_STRUCTURES[c]), []);
  for (const [cible, liste] of Object.entries(TARGET_TO_STRUCTURES)) {
    /* Les reins sont exclus du socle Z-Anatomy (composant CC BY-NC) :
     * leur cible reste textuelle, documentée comme gap de licence. */
    if (cible === "reins") continue;
    for (const id of liste) assert.ok(ids.has(id) || resoudre(id, new Map([...ids].map((x) => [x, x]))), `${cible} → ${id} absent du manifeste`);
  }
});

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
const erreurs = [];
page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 150)));
page.on("request", (r) => {
  if (new URL(r.url()).origin !== parsed.origin) erreurs.push(`externe ${r.url()}`);
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

await verifier("liste des pathologies et recherche", async () => {
  const n = await page.locator("#patho-list button").count();
  assert.equal(n, DISEASES.length);
  await page.locator("#patho-search").fill("asthme");
  assert.equal(await page.locator("#patho-list button").count(), 1);
  await page.locator("#patho-search").fill("");
});

await verifier("activation : HUD, effets, constantes et sévérité", async () => {
  await page.locator("#patho-list button").first().click();
  await page.waitForTimeout(300);
  const d = await page.evaluate(() => ({
    cache: document.getElementById("patho-hud").hidden,
    nom: document.getElementById("patho-name").textContent,
    effets: document.getElementById("patho-effects").textContent,
    vitales: document.querySelectorAll("#patho-vitals div").length,
    note: document.querySelector(".patho-note").textContent,
  }));
  assert.equal(d.cache, false);
  assert.ok(d.nom.length > 2);
  assert.ok(d.effets.length > 10, "aucun effet affiché");
  assert.equal(d.vitales, 6);
  assert.match(d.note, /pédagogique/);
  const avant = await page.locator("#patho-vitals").textContent();
  await page.locator("#patho-severity").fill("10");
  await page.waitForTimeout(200);
  const apres = await page.locator("#patho-vitals").textContent();
  assert.notEqual(avant, apres, "les constantes ne suivent pas la sévérité");
});

await verifier("comparaison et quiz symptômes", async () => {
  await page.locator("#patho-compare").click();
  assert.equal(await page.locator("#patho-compare").getAttribute("aria-pressed"), "false");
  await page.locator("#patho-quiz").click();
  const boutons = await page.locator("#patho-quiz-area button").count();
  assert.equal(boutons, 4);
  await page.locator("#patho-quiz-area button").first().click();
  assert.ok((await page.locator("#patho-quiz-area").textContent()).includes("simulation pédagogique"));
});

await verifier("sortie sans résidu", async () => {
  await page.locator("#patho-quit").click();
  assert.equal(await page.evaluate(() => document.getElementById("patho-hud").hidden), true);
});

await verifier("aucune erreur ni requête externe", async () => {
  assert.deepEqual(erreurs, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de pathologies simulées réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
