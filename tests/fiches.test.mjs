import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* BENCH-006 — fiche de vérité par structure : provenance, licence et limite,
 * générées depuis les sources canoniques et affichées sans réseau externe. */

const root = path.resolve(import.meta.dirname, "..");
const fiches = JSON.parse(fs.readFileSync(path.join(root, "public/data/fiches-verite.json"), "utf8"));
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/sources-checksums.json"), "utf8"));

const resultats = [];
const verifier = (nom, fn) => {
  try { fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};
const verifierAsync = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

verifier("une fiche par structure du manifeste", () => {
  const ids = new Set(fiches.structures.map((f) => f.id));
  assert.equal(fiches.structures.length, manifest.structures.length);
  assert.equal(ids.size, manifest.structures.length);
  for (const s of manifest.structures) assert.ok(ids.has(s.id), `${s.id} sans fiche`);
});

verifier("champs obligatoires et licences prouvées", () => {
  const licences = new Set(["CC BY-SA 4.0", "CC BY 4.0"]);
  for (const f of fiches.structures) {
    assert.ok(f.source && f.source !== "non renseignée", `${f.id} sans source`);
    assert.ok(licences.has(f.licence), `${f.id} : licence ${f.licence}`);
    assert.ok(f.limite.length > 30, `${f.id} : limite vide`);
    assert.match(f.limite, /diagnostic/, `${f.id} : avertissement absent`);
    assert.ok(f.source_id && f.source_id.length > 3, `${f.id} sans source_id`);
    assert.equal(f.date, String(sources.generated).slice(0, 10));
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
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("request", (req) => {
  const u = new URL(req.url());
  if (u.origin !== parsed.origin && !/^(data|blob):/.test(req.url())) errors.push(`requête externe ${req.url()}`);
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
const cible = fiches.structures.find((f) => f.id === "organ:bp-heart") || fiches.structures[0];

await verifierAsync("affichage : source, licence, limite et identifiant source", async () => {
  assert.equal(await page.evaluate(() => document.getElementById('detail-verite').hidden), true);
  /* La liste est tronquée à 400 entrées : on filtre d'abord par le nom réel. */
  const nom = manifest.structures.find((s) => s.id === cible.id);
  await page.locator('#search').fill(nom?.fr || nom?.en || '');
  await page.waitForTimeout(300);
  await page.locator(`#list .item[data-id="${cible.id}"]`).click();
  await page.waitForTimeout(400);
  const d = await page.evaluate(() => ({
    cache: document.getElementById('detail-verite').hidden,
    paires: [...document.querySelectorAll('#detail-verite-champs dt')]
      .map((dt, i) => [dt.textContent, document.querySelectorAll('#detail-verite-champs dd')[i].textContent]),
  }));
  assert.equal(d.cache, false);
  const champs = new Map(d.paires);
  assert.equal(champs.get('Source'), cible.source);
  assert.equal(champs.get('Licence'), cible.licence);
  assert.equal(champs.get('Identifiant source'), cible.source_id);
  assert.equal(champs.get('Limite'), cible.limite);
  assert.match(champs.get('FMA') || champs.get('TA2') || '', /\S/);
});

await verifierAsync("nettoyage à la désélection", async () => {
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  assert.equal(await page.evaluate(() => document.getElementById('detail-verite').hidden), true);
});

await verifierAsync("aucune erreur ni requête externe", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de fiches de vérité réussis · ${fiches.structures.length} fiches`);
process.exitCode = reussis === resultats.length ? 0 : 1;
