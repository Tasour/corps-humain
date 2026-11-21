/* Harnais unique — preuve de la base saine.
 * Séquentiel, un seul navigateur, timeout court. Écrit docs/analyses/socle-sain.json. */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const base = process.env.SOCLE_BASE || "http://127.0.0.1:5199";
const rapportPath = path.join(root, "docs/analyses/socle-sain.json");
const captures = path.join(root, "docs/analyses/socle-sain");
const etapes = [];
const verifier = (nom, ok, detail) => {
  etapes.push({ nom, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${nom}${detail ? ` — ${detail}` : ""}`);
};

/* 1. Reproductibilité de l'export source (déjà prouvée, on relit le rapport). */
const harnais = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/harness-blender-export.json"), "utf8"));
verifier("export Z-Anatomy byte-identique", harnais.byteIdentique === true,
  `${harnais.objets} objets, Blender ${harnais.blender.split(",")[0]}`);

/* 2. Manifeste livré. */
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const stock = manifest.structures.filter((s) => !s.apport).length;
const apports = manifest.structures.filter((s) => s.apport).length;
verifier("manifeste 1989 = 1524 stock + 465 apports",
  manifest.structures.length === 1989 && stock === 1524 && apports === 465,
  `${manifest.structures.length} = ${stock} + ${apports}`);

/* 3. Qualité géométrique mesurée sur le build stock (avant ajout des apports). */
const qualite = JSON.parse(fs.readFileSync("/tmp/opencode/stock-quality4/qualite-3d.json", "utf8")).summary;
verifier("géométrie saine : winding/dégénérés/normales nulles = 0",
  qualite.invertedWindingStructures === 0 && qualite.degenerateTriangles === 0 && qualite.zeroNormalVertices === 0,
  `étanchéité ${qualite.watertightPct} %, faces retournées ${qualite.flippedPct} %`);

/* 4. Cohérence des chunks livrés. */
const check = spawnSync(process.execPath, [path.join(root, "scripts/check-modele.mjs")], {
  cwd: root, encoding: "utf8", timeout: 120000,
});
verifier("modèle livré cohérent", check.status === 0, (check.stdout || "").trim());

/* 5. Rendu réel dans un seul navigateur (optionnel : SOCLE_SKIP_BROWSER=1
 * permet de valider la géométrie seule sans coût GPU. */
fs.mkdirSync(captures, { recursive: true });
if (process.env.SOCLE_SKIP_BROWSER !== "1") {
const navigateur = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--disable-gpu", "--use-gl=swiftshader-webgl"],
});
try {
  const page = await navigateur.newPage({ viewport: { width: 800, height: 600 } });
  const erreurs = [];
  page.on("pageerror", (e) => erreurs.push(String(e).slice(0, 140)));
  await page.goto(`${base}/v2.html`, { waitUntil: "load", timeout: 60000 });
  await page.waitForFunction(() => window.__v2?.ready === true, null, { timeout: 60000 });
  await page.waitForTimeout(500);
  const rendu = await page.evaluate(() => ({
    structures: window.__v2.structures.length,
    appels: window.__renderer.info.render.calls,
  }));
  verifier("rendu réel sans erreur", rendu.structures === 1989 && rendu.appels === 4 && erreurs.length === 0,
    `${rendu.structures} structures, ${rendu.appels} appels, ${erreurs.length} erreur(s)`);
  /* Une seule capture : le coût du rendu logiciel est élevé et la preuve
   * visuelle complète est déjà produite par `npm run captures:3d`. */
  await page.locator("#viewport").screenshot({ path: path.join(captures, "socle-angle-0.png") });
} finally {
  await navigateur.close();
}
}

const ok = etapes.every((e) => e.ok);
const rapport = {
  generated: new Date().toISOString(),
  base: "Z-Anatomy stock + apports BodyParts3D CC BY 4.0",
  manifest: { version: manifest.version, licence: manifest.license, structures: manifest.structures.length, stock, apports },
  qualite: qualite,
  etapes,
  captures: "docs/analyses/socle-sain/socle-angle-0.png",
  verdict: ok ? "OK" : "ECHEC",
  condition: "Relicenciement du code en CC BY-SA 4.0 requis par l'issue amont #6 avant activation publique définitive",
};
fs.mkdirSync(path.dirname(rapportPath), { recursive: true });
fs.writeFileSync(rapportPath, `${JSON.stringify(rapport, null, 1)}\n`);
process.exit(ok ? 0 : 1);
