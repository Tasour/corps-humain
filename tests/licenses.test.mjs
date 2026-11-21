import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* BENCH-010 — registre de licences et attribution visible dans l'application. */

const root = path.resolve(import.meta.dirname, "..");
const registre = JSON.parse(fs.readFileSync(path.join(root, "public/data/licenses.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/sources-checksums.json"), "utf8"));
const fiches = JSON.parse(fs.readFileSync(path.join(root, "public/data/fiches-verite.json"), "utf8"));

const resultats = [];
const verifier = (nom, fn) => {
  try { fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};
const verifierAsync = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

verifier("registre conforme aux sources canoniques", () => {
  assert.equal(registre.code.licence, "MIT");
  assert.ok(registre.donnees.length >= 1);
  for (const src of registre.donnees) {
    assert.ok(["CC BY 4.0", "CC BY-SA 4.0"].includes(src.licence), `${src.nom} : ${src.licence}`);
    assert.match(src.url, /^https:\/\//);
    assert.ok(src.attribution.length > 30);
  }
  assert.match(registre.attributionCombinedee, /^CC BY-SA 4\.0/);
});

verifier("empreintes et répartition cohérentes", () => {
  assert.equal(registre.empreintes.length, Object.keys(sources.files).length);
  for (const e of registre.empreintes) {
    assert.equal(sources.files[e.fichier], e.sha256, `${e.fichier} : empreinte divergente`);
  }
  const attendu = fiches.structures.reduce((acc, f) => {
    acc[f.licence] = (acc[f.licence] || 0) + 1;
    return acc;
  }, {});
  assert.deepEqual(registre.parLicence, attendu);
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
  if (new URL(req.url()).origin !== parsed.origin) errors.push(`requête externe ${req.url()}`);
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });

await verifierAsync("dialogue : contenus générés et liens sûrs", async () => {
  await page.locator('#btn-sources').click();
  const d = await page.evaluate(() => {
    const dialog = document.getElementById('sources-dialog');
    return {
      ouvert: dialog.open,
      texte: document.getElementById('sources-contenu').textContent,
      liens: [...document.querySelectorAll('#sources-contenu a')].map((a) => ({
        href: a.href, target: a.target, rel: a.rel,
      })),
    };
  });
  assert.equal(d.ouvert, true);
  for (const src of registre.donnees) {
    assert.ok(d.texte.includes(src.nom), `${src.nom} absent du dialogue`);
    assert.ok(d.texte.includes(src.licence), `${src.licence} absente du dialogue`);
  }
  assert.ok(d.texte.includes('MIT'));
  assert.ok(d.liens.length >= registre.donnees.length + 1);
  for (const a of d.liens) {
    assert.equal(a.target, '_blank');
    assert.match(a.rel, /noopener/);
    assert.match(a.rel, /noreferrer/);
  }
});

await verifierAsync("fermeture par bouton et par Échap", async () => {
  await page.locator('#sources-close').click();
  assert.equal(await page.evaluate(() => document.getElementById('sources-dialog').open), false);
  await page.locator('#btn-sources').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.evaluate(() => document.getElementById('sources-dialog').open), false);
});

await verifierAsync("aucune erreur ni requête externe", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de licences réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
