import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { sourceIdFor } from "../scripts/source-id.mjs";

/* BENCH-008 — identifiant source immuable, indépendant du nom exporté.
 * Oracle : l'inventaire canonique + la fonction de dérivation partagée. */

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const inventaire = JSON.parse(fs.readFileSync(path.join(root, "docs/inventaire-anatomique/structures.json"), "utf8"));
const parId = new Map(Object.values(inventaire.categories).flat().map((s) => [s.id, s]));

const resultats = [];
const verifier = (nom, fn) => {
  try { fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

verifier("structures avec un source_id", () => {
  assert.ok(manifest.structures.length > 1000);
  assert.ok(manifest.structures.every((s) => typeof s.source_id === "string" && s.source_id.length > 3));
});

verifier("unicité et provenance Z-Anatomy", () => {
  const vus = new Set();
  for (const s of manifest.structures) {
    assert.match(s.source_id, /^za:/, `${s.id} : source_id ${s.source_id}`);
    assert.equal(vus.has(s.source_id), false, `doublon ${s.source_id}`);
    vus.add(s.source_id);
  }
  assert.equal(vus.size, manifest.structures.length);
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
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
const echantillon = manifest.structures.find((s) => s.id === "organ:bp-heart") || manifest.structures[0];

const verifierAsync = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

await verifierAsync("moteur : index source et résolution double", async () => {
  const d = await page.evaluate((id) => ({
    tailleIndex: window.__v2.bySourceId.size,
    parId: window.__v2.resolveId(id)?.source_id,
    parSource: window.__v2.resolveId(window.__v2.byId.get(id).source_id)?.id,
  }), echantillon.id);
  assert.equal(d.tailleIndex, manifest.structures.length);
  assert.equal(d.parId, echantillon.source_id);
  assert.equal(d.parSource, echantillon.id);
});

await verifierAsync("deep link par source_id", async () => {
  await page.goto(`${BASE}/v2.html?vue=${encodeURIComponent(echantillon.source_id)}`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  await page.waitForTimeout(500);
  const nom = await page.evaluate(() => document.getElementById("sel-name").textContent.trim());
  assert.equal(nom, echantillon.fr || echantillon.en);
});

await verifierAsync("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles d'identifiant source réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
