/* BENCH rebuild propre — vérifie que deux rebuilds depuis les mêmes sources
 * épinglées produisent exactement les mêmes octets (chunks + manifeste).
 * La date de génération du manifeste est normalisée avant comparaison.
 * Écriture uniquement dans un répertoire temporaire + le rapport de preuve. */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "..");
const build = path.join(root, "scripts/build-anatomy-v2.mjs");
const rapportPath = path.join(root, "docs/analyses/rebuild-verification.json");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-rebuild-"));

function construire(dossier) {
  const resultat = spawnSync(process.execPath, [build], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, V2_OUT: dossier },
  });
  if (resultat.status !== 0) throw new Error(resultat.stderr || resultat.stdout);
  return resultat.stdout.trim().split("\n").slice(-2).join(" ");
}

const sorties = [];
for (const nom of ["a", "b"]) {
  const dossier = path.join(tmp, nom);
  fs.mkdirSync(dossier, { recursive: true });
  sorties.push({ nom, dossier, journal: construire(dossier) });
}

function empreintes(dossier) {
  const resultat = new Map();
  const parcourir = (actuel, prefixe = "") => {
    for (const entree of fs.readdirSync(actuel, { withFileTypes: true })) {
      const chemin = path.join(actuel, entree.name);
      const relatif = prefixe ? `${prefixe}/${entree.name}` : entree.name;
      if (entree.isDirectory()) parcourir(chemin, relatif);
      else if (entree.isFile()) {
        let contenu = fs.readFileSync(chemin);
        if (relatif === "manifest.json") {
          const json = JSON.parse(contenu.toString());
          delete json.generated;
          contenu = Buffer.from(JSON.stringify(json));
        }
        resultat.set(relatif, crypto.createHash("sha256").update(contenu).digest("hex"));
      }
    }
  };
  parcourir(dossier);
  return resultat;
}

const a = empreintes(sorties[0].dossier);
const b = empreintes(sorties[1].dossier);
const divergences = [];
if (a.size !== b.size) divergences.push(`${a.size} fichiers contre ${b.size}`);
for (const [fichier, hash] of a) {
  if (b.get(fichier) !== hash) divergences.push(fichier);
}
const rapport = {
  generated: new Date().toISOString(),
  sources: "zanatomy-export + cache BP3D épinglé (voir sources-checksums.json)",
  sequence: "build-anatomy-v2.mjs avec fixes-composantes.json appliqués au build ; AUCUN post-traitement de composantes",
  fichiersComparés: a.size,
  divergences,
  journaux: sorties.map((s) => s.journal),
  verdict: divergences.length ? "ECHEC" : "OK",
};
fs.mkdirSync(path.dirname(rapportPath), { recursive: true });
fs.writeFileSync(rapportPath, `${JSON.stringify(rapport, null, 1)}\n`);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`[rebuild] ${rapport.verdict} — ${rapport.fichiersComparés} fichiers identiques sur deux builds`);
if (divergences.length) {
  for (const d of divergences.slice(0, 10)) console.log(`  divergent : ${d}`);
  process.exit(1);
}
