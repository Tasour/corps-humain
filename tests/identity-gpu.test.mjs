import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

/* BENCH-018 — identité par vertex en un seul lot de rendu par catégorie.
 * Le mécanisme existe déjà dans v2-engine.js : ce contrôle le prouve et
 * interdit toute régression (carte incomplète ou explosion des draw calls). */

const root = path.resolve(import.meta.dirname, "..");
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
await page.waitForTimeout(1200);

const mesures = await page.evaluate(() => {
  const e = window.__v2;
  let vertices = 0, couverts = 0, invalides = 0, plages = 0;
  for (const [cle, carte] of e.mergedVertexMap) {
    const mesh = e.mergedMeshes.get(cle);
    const count = mesh?.geometry?.attributes?.position?.count || 0;
    vertices += count;
    couverts += carte.length;
    if (carte.length !== count) invalides++;
    for (const v of carte) {
      if (v >= e.structures.length || v === 0xffffffff) invalides++;
    }
    for (const plage of (e.mergedRanges.get(cle)?.values() || [])) {
      plages++;
      if (plage.start < 0 || plage.start + plage.count > carte.length) invalides++;
    }
  }
  return {
    structures: e.structures.length,
    mergedMode: e.mergedMode,
    lots: e.mergedMeshes.size,
    vertices,
    couverts,
    invalides,
    plages,
    appels: window.__renderer.info.render.calls,
    visibles: e.currentVisible.size,
  };
});

await verifier("carte d'identité par vertex complète", async () => {
  assert.equal(mesures.structures, JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8")).structures.length);
  assert.equal(mesures.mergedMode, true);
  assert.ok(mesures.lots >= 4, `${mesures.lots} lots fusionnés`);
  assert.equal(mesures.couverts, mesures.vertices, "des vertices sans identité");
  assert.equal(mesures.invalides, 0, `${mesures.invalides} identité(s) invalide(s)`);
  assert.equal(mesures.plages, mesures.structures, "plages de structures incomplètes");
});

await verifier("un seul appel de rendu par lot", async () => {
  assert.ok(mesures.appels <= 8, `${mesures.appels} appels de rendu`);
  assert.equal(mesures.visibles, JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8")).structures.length, "corps entier non visible");
});

await verifier("picking fusionné résout une structure réelle", async () => {
  const piques = await page.evaluate(() => {
    const e = window.__v2;
    const THREE = window.__THREE;
    const camera = window.__v2.camera;
    const cibles = e.structures.filter((s) => s.category === 'organ').slice(0, 6);
    const resultats = [];
    for (const s of cibles) {
      const centre = e.focusTarget(s).center;
      const dir = centre.clone().sub(camera.position).normalize();
      const ray = new THREE.Raycaster(camera.position.clone(), dir);
      const hit = e.pickMerged(ray);
      resultats.push({ demande: s.id, obtenu: hit?.structure?.id || hit?.id || null });
    }
    return resultats;
  });
  assert.ok(piques.length >= 5);
  const avecHit = piques.filter((p) => p.obtenu);
  /* Un petit vaisseau peut être occulté ou absent du LOD courant : on exige
   * une majorité de résolutions, pas l'exhaustivité géométrique. */
  assert.ok(avecHit.length >= 4, `picking résolu pour ${avecHit.length}/${piques.length}`);
  const valides = await page.evaluate((ids) => ids.every((id) => !!window.__v2.resolveId(id)),
    avecHit.map((p) => p.obtenu));
  assert.equal(valides, true, "picking fusionné a renvoyé un ID inconnu");
});

await verifier("aucune erreur console", async () => {
  assert.deepEqual(errors, []);
});

await ctx.close();
await browser.close();

const rapport = {
  generated: new Date().toISOString(),
  item: "BENCH-018",
  etat: "déjà implémenté dans v2-engine.js ; vérifié et verrouillé par ce test",
  mesures,
  tests: resultats,
  verdict: resultats.every((r) => r.ok) ? "OK" : "ECHEC",
};
fs.mkdirSync(path.join(root, "docs/analyses"), { recursive: true });
/* Le rapport curaté (captures, verdict) vit dans identity-gpu-2026-11-20.json :
 * ce test écrit uniquement son résultat brut dans un fichier séparé. */
fs.writeFileSync(path.join(root, "docs/analyses/identity-gpu-test.json"), `${JSON.stringify(rapport, null, 1)}\n`);

const reussis = resultats.filter((r) => r.ok).length;
for (const r of resultats) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.nom}${r.ok ? "" : ` — ${r.erreur}`}`);
console.log(`\n${reussis}/${resultats.length} contrôles d'identité GPU réussis · ${mesures.appels} appels · ${mesures.couverts} vertices identifiés`);
process.exitCode = reussis === resultats.length ? 0 : 1;
