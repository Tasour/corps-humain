import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { CURATED_IDS, getWaypoints } from "../src/data/waypoints.js";

/* BENCH-009 — catalogue des vues remarquables.
 * Oracle : CURATED_IDS + manifeste + getWaypoints(), pas de nombre codé en dur. */

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const attendus = CURATED_IDS.filter((id) => byId.has(id));

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
await page.waitForTimeout(600);

await verifier("une entrée par identifiant curé présent au manifeste", async () => {
  const d = await page.evaluate(() => [...document.querySelectorAll("#vues-catalogue [data-vue]")].map((b) => b.dataset.vue));
  assert.equal(d.length, attendus.length, `${d.length} entrées au lieu de ${attendus.length}`);
  assert.deepEqual(new Set(d), new Set(attendus), "identifiants divergents");
});

await verifier("compteur et légendes cohérents avec les waypoints", async () => {
  const d = await page.evaluate(() => ({
    compteur: document.getElementById("vues-count").textContent,
    entrees: [...document.querySelectorAll("#vues-catalogue [data-vue]")].map((b) => ({
      id: b.dataset.vue, legende: b.querySelector("small")?.textContent || "",
    })),
    hauteur: Math.min(...[...document.querySelectorAll("#vues-catalogue [data-vue]")]
      .map((b) => b.getBoundingClientRect().height)),
  }));
  assert.equal(d.compteur, `(${attendus.length})`);
  for (const e of d.entrees) {
    const n = getWaypoints(byId.get(e.id)).length;
    assert.equal(e.legende, `${n} vues`, `${e.id} : ${e.legende}`);
  }
  assert.ok(d.hauteur >= 36, `cible trop petite : ${d.hauteur}px`);
});

await verifier("clic : URL deep link, sélection et premier waypoint", async () => {
  const id = attendus.find((x) => byId.get(x)?.category === "organ") || attendus[0];
  await page.goto(`${BASE}/v2.html?wp=3`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  await page.locator(`#vues-catalogue [data-vue="${id}"]`).click();
  await page.waitForTimeout(500);
  const d = await page.evaluate(() => ({
    url: location.href,
    nom: document.getElementById("sel-name")?.textContent?.trim(),
    titre: document.getElementById("wp-title")?.textContent?.trim(),
    visible: !!window.__v2?.waypointsVisible,
  }));
  const url = new URL(d.url);
  assert.equal(url.searchParams.get("vue"), id);
  assert.equal(url.searchParams.has("wp"), false, "ancien wp conservé");
  assert.equal(d.nom, byId.get(id).fr || byId.get(id).en);
  assert.equal(d.titre, getWaypoints(byId.get(id))[0].title);
  assert.equal(d.visible, true);
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles du catalogue réussis · ${attendus.length} vues`);
process.exitCode = reussis === resultats.length ? 0 : 1;
