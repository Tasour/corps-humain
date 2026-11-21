/* BENCH-014 — contrôle de dérive des pages statiques.
 * Deux générations indépendantes doivent produire des octets identiques ;
 * si le build a déjà écrit public/structures/, il doit correspondre à la
 * génération fraîche. Aucune réécriture du dépôt. */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";

const root = path.resolve(import.meta.dirname, "..");
const generateur = path.join(root, "scripts/generate-pages-structures.mjs");
const rapportPath = path.join(root, "docs/analyses/pages-structures.json");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-pages-"));

function generer(dossier) {
  const resultat = spawnSync(process.execPath, [generateur], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, PAGES_OUT: dossier },
  });
  if (resultat.status !== 0) throw new Error(resultat.stderr || resultat.stdout);
}

function empreintes(dossier) {
  const sortie = new Map();
  const parcourir = (actuel, prefixe = "") => {
    for (const entree of fs.readdirSync(actuel, { withFileTypes: true })) {
      const chemin = path.join(actuel, entree.name);
      const relatif = prefixe ? `${prefixe}/${entree.name}` : entree.name;
      if (entree.isDirectory()) parcourir(chemin, relatif);
      else if (entree.isFile()) {
        sortie.set(relatif, crypto.createHash("sha256").update(fs.readFileSync(chemin)).digest("hex"));
      }
    }
  };
  parcourir(dossier);
  return sortie;
}

const a = path.join(tmp, "a");
const b = path.join(tmp, "b");
fs.mkdirSync(a, { recursive: true });
fs.mkdirSync(b, { recursive: true });
generer(a);
generer(b);
const empreintesA = empreintes(a);
const empreintesB = empreintes(b);

const divergences = [];
if (empreintesA.size !== empreintesB.size) {
  divergences.push(`${empreintesA.size} fichiers contre ${empreintesB.size}`);
}
for (const [fichier, hash] of empreintesA) {
  if (empreintesB.get(fichier) !== hash) divergences.push(`${fichier} diffère entre deux générations`);
}
const pages = [...empreintesA.keys()].filter((f) => f.startsWith("structures/") && f.endsWith(".html") && !f.endsWith("index.html"));
const attendu = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8")).structures.length;
if (pages.length !== attendu) divergences.push(`${pages.length} pages au lieu de ${attendu}`);

const publicStructures = path.join(root, "public/structures/index.html");
let deriveBuild = "non généré";
if (fs.existsSync(publicStructures)) {
  const empreintesBuild = empreintes(path.join(root, "public"));
  const cibles = [...empreintesA.keys()].filter((f) => f.startsWith("structures/") || f === "sitemap.xml" || f === "robots.txt");
  const Different = cibles.filter((f) => empreintesBuild.get(f) !== empreintesA.get(f));
  deriveBuild = Different.length ? `${Different.length} fichiers dérivents : ${Different.slice(0, 5).join(", ")}` : "conforme";
  if (Different.length) divergences.push(`build : ${deriveBuild}`);
}

const rapport = {
  generated: new Date().toISOString(),
  pages: pages.length,
  fichiers: empreintesA.size,
  determinisme: divergences.length ? "ECHEC" : "OK",
  build: deriveBuild,
  divergences,
  verdict: divergences.length ? "ECHEC" : "OK",
};
fs.mkdirSync(path.dirname(rapportPath), { recursive: true });
fs.writeFileSync(rapportPath, `${JSON.stringify(rapport, null, 1)}\n`);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`[pages] ${rapport.verdict} — ${rapport.pages} pages, ${rapport.fichiers} fichiers, build ${deriveBuild}`);
if (divergences.length) {
  for (const d of divergences.slice(0, 10)) console.log(`  ${d}`);
  process.exit(1);
}
