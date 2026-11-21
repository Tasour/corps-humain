/* BENCH revue humaine — génère une fiche de relecture adressable avec les
 * 8 angles réels (procédural vs ?tex=cc0) et les métadonnées de provenance.
 * Aucun verdict n'est écrit ici : la signature humaine passe par corps_review_sign. */

import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const argumentsBruts = process.argv.slice(2);
function option(nom, defaut = "") {
  const i = argumentsBruts.indexOf(`--${nom}`);
  return i >= 0 ? argumentsBruts[i + 1] : defaut;
}
const structureId = option("structure", "skin:body");
const tissu = option("tissue", "bone");
const dossier = path.resolve(root, option("out", `docs/revues/${new Date().toISOString().slice(0, 10)}`));
const slug = structureId.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
const dossierFiche = path.join(dossier, `${tissu}-${slug}`);
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const ficheSource = JSON.parse(fs.readFileSync(path.join(root, "public/data/fiches-verite.json"), "utf8"));
const structure = manifest.structures.find((s) => s.id === structureId) || null;
const fiche = ficheSource.structures.find((f) => f.id === structureId) || null;

let serveur = null;
const base = process.env.REVIEW_BASE || "http://127.0.0.1:5216";
if (!process.env.REVIEW_BASE) {
  serveur = spawn("node", [path.join(root, "node_modules/vite/bin/vite.js"), "--host", "127.0.0.1", "--port", "5216", "--strictPort"], {
    cwd: root, stdio: "ignore",
  });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(base, { signal: AbortSignal.timeout(1500) })).ok) break; } catch { /* attente */ }
    await new Promise((r) => setTimeout(r, 250));
  }
}

fs.mkdirSync(dossierFiche, { recursive: true });
const navigateur = await chromium.launch({
  executablePath: process.env.CI ? undefined : "/usr/bin/chromium",
});
const angles = [];
for (const [etat, query] of [["avant", "/v2.html"], ["apres", "/v2.html?tex=cc0"]]) {
  const contexte = await navigateur.newContext({ viewport: { width: 1658, height: 1150 } });
  const page = await contexte.newPage();
  page.setDefaultTimeout(120000);
  await page.goto(`${base}${query}`);
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 120000 });
  if (tissu === "skin") await page.evaluate(() => window.__v2.setSkinVisible(true));
  if (structure) await page.evaluate((id) => {
    const s = window.__v2.resolveId(id);
    if (s) window.__v2.focusTarget?.(s);
  }, structureId);
  await page.waitForTimeout(700);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const y = 0.9 + (i % 2 ? 0.55 : 0.15);
    await page.evaluate(([x, yy, z]) => {
      window.__v2.camera.position.set(x, yy, z);
      window.__v2.camera.lookAt(0, 0.9, 0);
    }, [Math.sin(a) * 2.85, y, Math.cos(a) * 2.85]);
    await page.waitForTimeout(280);
    const fichier = `${etat}-angle-${i}.png`;
    await page.locator("#viewport").screenshot({ path: path.join(dossierFiche, fichier) });
    angles.push({ etat, index: i, fichier });
  }
  await contexte.close();
}
await navigateur.close();
if (serveur) serveur.kill("SIGTERM");

const meta = {
  structure: structureId,
  tissu,
  source_id: structure?.source_id || "skin:body",
  source: fiche?.source || "atlas CORPS",
  licence: fiche?.licence || "CC0 (textures)",
  limite: fiche?.limite || "Lot peau : modèle pédagogique, sans valeur diagnostique.",
  angles,
  signee: false,
  generated: new Date().toISOString(),
};
fs.writeFileSync(path.join(dossierFiche, "sheet.json"), `${JSON.stringify(meta, null, 1)}\n`);

const lignes = angles.map((a) => `<tr><td>${a.index}</td><td><img src="${a.fichier}" alt="angle ${a.index} ${a.etat}" loading="lazy"></td></tr>`).join("");
const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Fiche de relecture — ${structureId}</title>
<style>body{font:14px system-ui;max-width:1200px;margin:auto;padding:20px;color:#222}
img{width:100%;max-width:520px;border:1px solid #ddd}table{border-collapse:collapse;width:100%}
td{padding:8px;border-bottom:1px solid #eee;vertical-align:top}label{display:block;margin:10px 0}
.warning{background:#fff4d6;padding:10px;border-left:3px solid #d99}</style></head>
<body><h1>Fiche de relecture — ${structureId}</h1>
<p><b>Tissu :</b> ${tissu} · <b>Identifiant source :</b> ${meta.source_id} · <b>Source :</b> ${meta.source} (${meta.licence})</p>
<p class="warning">Modèle pédagogique. Ces textures sont illustratives, pas des scans anatomiques. Aucune valeur diagnostique.</p>
<p><b>Limite connue :</b> ${meta.limite}</p>
<h2>8 angles — rendu procédural</h2><table>${angles.filter((a) => a.etat === "avant").map((a) => `<tr><td>${a.index}</td><td><img src="${a.fichier}" alt="procédural angle ${a.index}"></td></tr>`).join("")}</table>
<h2>8 angles — textures CC0 (?tex=cc0)</h2><table>${angles.filter((a) => a.etat === "apres").map((a) => `<tr><td>${a.index}</td><td><img src="${a.fichier}" alt="CC0 angle ${a.index}"></td></tr>`).join("")}</table>
<h2>Validation humaine</h2>
<form>
<label><input type="checkbox" name="geometrie"> La géométrie est anatomiquement plausible sous les 8 angles</label>
<label><input type="checkbox" name="texture"> La texture est acceptable comme illustration (pas comme scan)</label>
<label>Nom du relecteur : <input name="relecteur" size="40"></label>
<label>Date : <input name="date" type="date"></label>
<label>Portée exacte : <input name="portee" size="60" placeholder="ex. os : 5 structures, surface uniquement"></label>
<label>Notes : <textarea name="notes" rows="3" cols="70"></textarea></label>
</form>
<p><b>Important :</b> cette fiche n'est pas signée tant que l'outil <code>corps_review_sign</code> n'a pas enregistré
le nom, la date et la portée dans <code>docs/revues/signoffs.json</code>.</p>
</body></html>`;
fs.writeFileSync(path.join(dossierFiche, "fiche.html"), html);
console.log(`[review] fiche ${structureId} (${tissu}) → ${dossierFiche}`);
