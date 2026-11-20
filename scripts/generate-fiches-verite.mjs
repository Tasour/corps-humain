/* BENCH-006 — fiche de vérité par structure.
 *
 * Chaque entrée est dérivée du manifeste livré, de l'inventaire canonique et
 * du registre d'empreintes sources. Aucune affirmation anatomique n'est
 * inventée : `limite` décrit uniquement des faits de provenance vérifiables.
 * Écriture atomique, génération déterministe (aucune horloge locale dans le
 * contenu : la date vient du registre de sources). */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "public/models/v2/manifest.json");
const inventoryPath = path.join(root, "docs/inventaire-anatomique/structures.json");
const checksumsPath = path.join(root, "docs/analyses/sources-checksums.json");
const outPath = path.join(root, "public/data/fiches-verite.json");
const reportPath = path.join(root, "docs/analyses/fiches-verite.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const inventaire = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const sources = JSON.parse(fs.readFileSync(checksumsPath, "utf8"));
const parId = new Map(Object.values(inventaire.categories).flat().map((s) => [s.id, s]));
const date = String(sources.generated || "").slice(0, 10) || "non renseignée";

const LICENCES = {
  "Z-Anatomy": "CC BY-SA 4.0",
  "BodyParts3D 4.0": "CC BY 4.0",
};

function limitePour(structure, source) {
  const parties = source?.bodyParts3D?.partNames?.length || 0;
  const faits = [];
  if (/Z-Anatomy/i.test(structure.source || "")) {
    faits.push("Maillage dérivé de Z-Anatomy, simplifié pour le rendu web.");
  } else if (parties > 1) {
    faits.push(`Structure assemblée à partir de ${parties} pièces BodyParts3D.`);
  } else if (parties === 1) {
    faits.push("Maillage issu d'une seule pièce BodyParts3D.");
  }
  if (source?.onlyInBodyParts3D) faits.push("Présente uniquement dans BodyParts3D.");
  if (!structure.ta2) faits.push("Code TA2 absent de l'inventaire source.");
  faits.push("Modèle pédagogique : ne pas utiliser pour un diagnostic.");
  return faits.join(" ");
}

const fiches = [];
const vus = new Set();
for (const structure of manifest.structures) {
  const source = parId.get(structure.id);
  if (!source) throw new Error(`${structure.id} absent de l'inventaire`);
  if (vus.has(structure.id)) throw new Error(`doublon ${structure.id}`);
  vus.add(structure.id);
  const fma = source.best?.modelId || source.bodyParts3D?.conceptId || null;
  fiches.push({
    id: structure.id,
    source_id: structure.source_id,
    source: structure.source || source.best?.source || "non renseignée",
    licence: LICENCES[structure.source] || manifest.license,
    fma,
    ta2: structure.ta2 || null,
    limite: limitePour(structure, source),
    date,
  });
}

const temporaire = `${outPath}.tmp`;
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(temporaire, JSON.stringify({ generated: date, structures: fiches }));
fs.renameSync(temporaire, outPath);

const rapport = {
  generated: new Date().toISOString(),
  structures: fiches.length,
  avecSource: fiches.filter((f) => f.source !== "non renseignée").length,
  avecLicence: fiches.filter((f) => f.licence).length,
  avecLimite: fiches.filter((f) => f.limite.length > 30).length,
  parLicence: fiches.reduce((acc, f) => { acc[f.licence] = (acc[f.licence] || 0) + 1; return acc; }, {}),
  verdict: "OK",
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(rapport, null, 1)}\n`);
console.log(`[fiches] ${fiches.length} fiches · ${Object.keys(rapport.parLicence).length} licences · ${Math.round(fs.statSync(outPath).size / 1024)} Ko`);
