import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { getWaypoints } from "../src/data/waypoints.js";

/* BENCH-001 — deep links vers une structure et un waypoint.
 * L'oracle est la source canonique des waypoints + le manifeste livré :
 * on compare le titre affiché au titre calculé, sans le recopier. */

const BASE = process.env.TEST_BASE || "http://127.0.0.1:5199";
let parsed;
try { parsed = new URL(BASE); } catch { throw new Error(`TEST_BASE invalide : ${BASE}`); }
if (!/^https?:$/.test(parsed.protocol)) throw new Error(`TEST_BASE doit être http(s) : ${BASE}`);

const manifest = JSON.parse(
  fs.readFileSync(path.resolve(import.meta.dirname, "../public/models/v2/manifest.json"), "utf8"),
);
const byId = new Map(manifest.structures.map((s) => [s.id, s]));
const ID = "organ:bp-heart";
const structure = byId.get(ID);
assert.ok(structure, `${ID} absent du manifeste`);
const waypoints = getWaypoints(structure);
assert.ok(waypoints.length >= 2);

const browser = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const context = await browser.newContext({ viewport: { width: 1360, height: 880 } });
await context.grantPermissions(["clipboard-read", "clipboard-write"]);
const page = await context.newPage();
page.setDefaultTimeout(90000);
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
const resultats = [];
const verifier = (nom, fn) => Promise.resolve().then(fn)
  .then(() => resultats.push({ nom, ok: true }))
  .catch((e) => resultats.push({ nom, ok: false, erreur: e.message }));

async function ouvrir(query) {
  await page.goto(`${BASE}/v2.html${query}`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  await page.waitForTimeout(700);
  return page.evaluate(() => ({
    nom: document.getElementById("sel-name")?.textContent?.trim(),
    titre: document.getElementById("wp-title")?.textContent?.trim(),
    visible: !!window.__v2?.waypointsVisible,
    waypointVisible: getComputedStyle(document.getElementById("waypoint-info")).display !== "none",
  }));
}

await verifier("wp valide : structure, waypoint et repères affichés", async () => {
  const d = await ouvrir(`?vue=${encodeURIComponent(ID)}&wp=1`);
  assert.equal(d.nom, structure.fr || structure.en);
  assert.equal(d.titre, waypoints[1].title);
  assert.equal(d.visible, true);
  assert.equal(d.waypointVisible, true);
});

await verifier("wp hors bornes : ramené au dernier waypoint", async () => {
  const d = await ouvrir(`?vue=${encodeURIComponent(ID)}&wp=999`);
  assert.equal(d.titre, waypoints[waypoints.length - 1].title);
});

await verifier("identifiant inconnu : aucun crash, aucun repère", async () => {
  const d = await ouvrir("?vue=structure:inexistante");
  assert.equal(d.visible, false);
  assert.equal(d.waypointVisible, false);
});

await verifier("copier le lien conserve vue, wp et le flag tex", async () => {
  await ouvrir(`?tex=os-proxy&vue=${encodeURIComponent(ID)}&wp=2`);
  const hauteur = await page.evaluate(() =>
    document.getElementById("wp-copy").getBoundingClientRect().height);
  assert.ok(hauteur >= 36, `cible trop petite : ${hauteur}px`);
  await page.locator("#wp-copy").click();
  const lien = await page.evaluate(() => navigator.clipboard.readText());
  const url = new URL(lien);
  assert.equal(url.searchParams.get("vue"), ID);
  assert.equal(url.searchParams.get("wp"), "2");
  assert.equal(url.searchParams.get("tex"), "os-proxy");
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await context.close();
await browser.close();

const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de deep link réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
