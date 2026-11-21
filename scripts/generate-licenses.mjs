/* BENCH-010 — registre de licences machine-readable.
 *
 * Généré depuis le manifeste livré, le registre d'empreintes et les fiches de
 * vérité. Aucune licence n'est devinée : seules les déclarations présentes
 * dans ces sources canoniques sont reprises. Écriture atomique. */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/sources-checksums.json"), "utf8"));
const fiches = JSON.parse(fs.readFileSync(path.join(root, "public/data/fiches-verite.json"), "utf8"));
const outPath = path.join(root, "public/data/licenses.json");
const date = String(sources.generated).slice(0, 10);

const registre = {
  generated: date,
  code: {
    licence: "MIT",
    auteurs: "Vincent Tassier",
    annee: 2026,
    licenceFichier: "LICENSE",
    url: "https://github.com/Tasour/corps-humain",
  },
  donnees: (manifest.sources || []).map((src) => ({
    nom: src.name,
    licence: src.license,
    url: src.url,
    role: /Z-Anatomy/i.test(src.name)
      ? "Maillages anatomiques principaux et identifiants TA2"
      : "Organes, os, muscles et peau complémentaires",
    attribution: /Z-Anatomy/i.test(src.name)
      ? "Z-Anatomy — Gauthier Kervyn et contributeurs, CC BY-SA 4.0. Toute redistribution des maillages dérivés doit conserver la licence CC BY-SA 4.0."
      : "BodyParts3D 4.0 — Database Center for Life Science, CC BY 4.0.",
  })),
  textures: fs.readdirSync(path.join(root, "public/textures"))
    .filter((nom) => fs.existsSync(path.join(root, "public/textures", nom, "manifest.json")))
    .map((nom) => {
      const m = JSON.parse(fs.readFileSync(path.join(root, "public/textures", nom, "manifest.json"), "utf8"));
      return {
        tissu: m.tissue,
        source: m.source,
        licence: m.license,
        url: m.url,
        graine: m.seed,
        taille: m.size,
        empreintes: m.maps,
      };
    }),
  attributionCombinedee: manifest.license,
  parLicence: fiches.structures.reduce((acc, f) => {
    acc[f.licence] = (acc[f.licence] || 0) + 1;
    return acc;
  }, {}),
  empreintes: Object.entries(sources.files || {}).map(([fichier, sha256]) => ({ fichier, sha256 })),
  avertissement: "Modèle pédagogique. Aucune donnée affichée n'a valeur diagnostique.",
};

const temporaire = `${outPath}.tmp`;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(temporaire, JSON.stringify(registre));
fs.renameSync(temporaire, outPath);
console.log(`[licences] ${registre.donnees.length} sources, ${registre.empreintes.length} empreintes, ${Math.round(fs.statSync(outPath).size / 1024)} Ko`);
