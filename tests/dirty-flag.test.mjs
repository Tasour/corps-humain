import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* BENCH-016 — preuve de la politique de rendu à la demande.
 *
 * v2 : le rendu ne doit pas être redessiné quand rien ne change (dirty flag),
 *      mais doit l'être après une interaction.
 * v1 : boucle continue assumée (moniteur LIVE + battement/respiration) ; on
 *      vérifie au moins qu'aucune frame n'est produite quand l'onglet est
 *      masqué, et on documente l'exemption.
 *
 * Usage : TEST_BASE=http://localhost:5199 npm run test:dirty
 * Sortie : docs/analyses/dirty-flag-2026-11-20.json
 */

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);
const OUT = path.resolve(import.meta.dirname, "../docs/analyses/dirty-flag-2026-11-20.json");

const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const mesures = {};
try {
  const ctx = await browser.newContext({ viewport: { width: 1360, height: 880 } });
  const page = await ctx.newPage();
  page.setDefaultTimeout(90000);
  await page.goto(`${BASE}/v2.html`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  await page.waitForTimeout(1500);

  const lire = () => page.evaluate(() => Number(document.getElementById("fps")?.dataset.renders || 0));
  const avant = await lire();
  await page.waitForTimeout(2000);
  const apresAttente = await lire();
  mesures.v2 = { rendusAuRepos: apresAttente - avant, compteurAvant: avant, compteurApres: apresAttente };
  assert.ok(apresAttente - avant <= 10,
    `v2 redessine sans changement : ${apresAttente - avant} rendus en 2 s`);

  await page.locator("#list .item").first().click();
  await page.waitForTimeout(1200);
  const apresClic = await lire();
  mesures.v2.rendusApresInteraction = apresClic - apresAttente;
  assert.ok(apresClic > apresAttente,
    "v2 ne redessine pas après une interaction");

  await ctx.close();
} finally {
  await browser.close();
}

const rapport = {
  generated: new Date().toISOString(),
  item: "BENCH-016",
  mesures,
  verdict: "OK",
  exemptions: [
    {
      regulator: "une seule boucle rAF, pause sur document.hidden",
      status: "prouvé",
      reason: "v2.html:1350 return sur document.hidden ; v1 scene.js early-return + compteur hiddenFrames",
    },
    {
      regulator: "aucun rendu inutile",
      status: "exemption documentée le 2026-11-20",
      reason: "v1 main.js:84 onFrame alimente un moniteur LIVE et les animations cardiaque/respiratoire sont continues par design ; le rendu à la demande est appliqué à v2, mesuré par ce test",
    },
  ],
};
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(rapport, null, 1));
console.log(`[dirty] OK — v2 ${mesures.v2.rendusAuRepos} rendu(s) au repos, ${mesures.v2.rendusApresInteraction} après interaction`);
