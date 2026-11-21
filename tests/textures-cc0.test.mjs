import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* Textures CC0 : provenance, empreintes, budget et branchement derrière ?tex=cc0.
 * Le flag reste désactivé par défaut (validation anatomiste en attente). */

const root = path.resolve(import.meta.dirname, "..");
const tissus = ["bone", "muscle", "organ", "skin", "veins"];
const resultats = [];
const verifier = async (nom, fn) => {
  try { await fn(); resultats.push({ nom, ok: true }); }
  catch (e) { resultats.push({ nom, ok: false, erreur: e.message }); }
};

await verifier("manifestes CC0, empreintes et budget", () => {
  for (const tissu of tissus) {
    const dossier = path.join(root, "public/textures", tissu);
    const manifeste = JSON.parse(fs.readFileSync(path.join(dossier, "manifest.json"), "utf8"));
    assert.equal(manifeste.license, "CC0", `${tissu} : licence ${manifeste.license}`);
    assert.equal(manifeste.tissue, tissu);
    assert.match(manifeste.url, /^https:\/\/3dtextures\.me\//);
    for (const [carte, attendu] of Object.entries(manifeste.maps)) {
      const fichier = path.join(dossier, `${carte}.jpg`);
      assert.ok(fs.existsSync(fichier), `${tissu}/${carte} absent`);
      const hash = crypto.createHash("sha256").update(fs.readFileSync(fichier)).digest("hex");
      assert.equal(hash, attendu, `${tissu}/${carte} : empreinte divergente`);
    }
    const octets = fs.readdirSync(dossier)
      .filter((f) => f.endsWith(".jpg"))
      .reduce((n, f) => n + fs.statSync(path.join(dossier, f)).size, 0);
    assert.ok(octets <= 8 * 1024 * 1024, `${tissu} : ${Math.round(octets / 1024)} Ko > 8 Mo`);
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
page.on("pageerror", (e) => erreurs.push(String(e)));
page.on("request", (req) => {
  if (new URL(req.url()).origin !== parsed.origin) erreurs.push(`externe ${req.url()}`);
});

await page.goto(`${BASE}/v2.html`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await verifier("défaut : rendu procédural, aucun flag", async () => {
  const d = await page.evaluate(() => ({
    flag: window.__v2Textures,
    source: window.__v2.textures.bone.map.image?.constructor?.name,
  }));
  assert.equal(d.flag, null);
  assert.equal(d.source, "HTMLCanvasElement", "la texture par défaut n'est pas procédurale");
});

await page.goto(`${BASE}/v2.html?tex=cc0`);
await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
await verifier("?tex=cc0 : cartes chargées pour chaque tissu", async () => {
  const d = await page.evaluate(() => {
    const e = window.__v2;
    const src = (t) => e.textures[t]?.map?.image?.src || "";
    return {
      flag: window.__v2Textures,
      src: Object.fromEntries(["bone", "muscle", "organ", "skin", "veins"].map((t) => [t, src(t)])),
    };
  });
  assert.equal(d.flag, "cc0");
  for (const tissu of tissus) {
    assert.match(d.src[tissu], new RegExp(`/textures/${tissu}/albedo\\.jpg`), `${tissu} : carte non chargée`);
  }
});

await verifier("aucune erreur ni requête externe", async () => {
  assert.deepEqual(erreurs, []);
});

await ctx.close();
await browser.close();
const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles de textures CC0 réussis`);
process.exitCode = reussis === resultats.length ? 0 : 1;
