/* BENCH-012 — contrôle du modèle livré.
 *
 * Vérifie que le jeu de données distribué (manifeste + chunks + fiches) est
 * cohérent avec les sources et les références utilisées par l'application.
 * Aucune géométrie n'est fabriquée : on contrôle les identités, les LOD,
 * l'intégrité des chunks gzip, les licences et les références de contenu.
 *
 * Variables d'environnement pour les tests négatifs :
 *   CHECK_MODELE_DIR       dossier des chunks (défaut public/models/v2)
 *   CHECK_MODELE_MANIFEST  chemin du manifeste (défaut <DIR>/manifest.json)
 * Sortie : docs/analyses/check-modele.json
 */

import fs from "node:fs";
import path from "node:path";
import { CURATED_IDS, TOURS } from "../src/data/waypoints.js";
import { GROUPS } from "../src/data/groups.js";
import { HUNT_TARGETS } from "../src/data/hunt.js";

const root = path.resolve(import.meta.dirname, "..");
const dir = process.env.CHECK_MODELE_DIR || path.join(root, "public/models/v2");
const manifestPath = process.env.CHECK_MODELE_MANIFEST || path.join(dir, "manifest.json");
const reportPath = process.env.CHECK_MODELE_REPORT || path.join(root, "docs/analyses/check-modele.json");
const fichesPath = path.join(root, "public/data/fiches-verite.json");
const checksumsPath = path.join(root, "docs/analyses/sources-checksums.json");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const fiches = JSON.parse(fs.readFileSync(fichesPath, "utf8"));
const sources = JSON.parse(fs.readFileSync(checksumsPath, "utf8"));
const structures = manifest.structures || [];
const anomalies = [];
const ajouter = (controle, message, details = {}) => {
  anomalies.push({ controle, message, ...details });
};

/* 1 — identités */
const ids = new Set();
const sourceIds = new Set();
for (const s of structures) {
  if (ids.has(s.id)) ajouter("identite", `ID dupliqué ${s.id}`);
  ids.add(s.id);
  if (!s.source_id) ajouter("identite", `${s.id} sans source_id`);
  else if (sourceIds.has(s.source_id)) ajouter("identite", `source_id dupliqué ${s.source_id}`);
  sourceIds.add(s.source_id);
}

/* 2 — chaîne de LOD monotone et complète */
for (const s of structures) {
  const niveaux = ["low", "medium", "high"].map((l) => s.lod?.[l]);
  if (niveaux.some((r) => !r || !r.vertexCount || !r.indexCount)) {
    ajouter("lod", `${s.id} : LOD incomplet`);
    continue;
  }
  if (!(niveaux[0].vertexCount <= niveaux[1].vertexCount && niveaux[1].vertexCount <= niveaux[2].vertexCount)) {
    ajouter("lod", `${s.id} : vertexCount non monotone`);
  }
  if (!(niveaux[0].indexCount <= niveaux[1].indexCount && niveaux[1].indexCount <= niveaux[2].indexCount)) {
    ajouter("lod", `${s.id} : indexCount non monotone`);
  }
}

/* 3 — intégrité des chunks gzip (magic + taille décompressée déclarée) */
const extremites = new Map();
for (const s of structures) {
  for (const lod of ["low", "medium", "high"]) {
    const r = s.lod[lod];
    const cle = r?.chunk ? r.chunk.replace(/\.bin$/, "") : `${s.category}.${lod}`;
    const fin = Math.max(
      r.indices + r.indexCount * (r.indexType === "u16" ? 2 : 4),
      r.positions + r.vertexCount * 12,
    );
    extremites.set(cle, Math.max(extremites.get(cle) || 0, fin));
  }
}
for (const [cle, fin] of extremites) {
  const fichier = path.join(dir, `${cle}.bin.gz`);
  if (!fs.existsSync(fichier)) { ajouter("chunks", `${cle} : fichier absent`); continue; }
  const tampon = fs.readFileSync(fichier);
  if (tampon[0] !== 0x1f || tampon[1] !== 0x8b) {
    ajouter("chunks", `${cle} : magic gzip invalide`);
    continue;
  }
  const taille = tampon.readUInt32LE(tampon.length - 4);
  if (fin > taille) ajouter("chunks", `${cle} : dépassement ${fin} > ${taille}`);
}

/* 4 — licences déclarées */
for (const src of manifest.sources || []) {
  if (!src.license) ajouter("licences", `${src.name} sans licence`);
}
if (!manifest.license) ajouter("licences", "licence combinée absente");
const licencesAutorisees = new Set(["CC BY 4.0", "CC BY-SA 4.0"]);
for (const f of fiches.structures || []) {
  if (!licencesAutorisees.has(f.licence)) ajouter("licences", `${f.id} : licence ${f.licence}`);
}

/* 5 — références utilisées par l'application */
const referentiels = [
  ["waypoints", CURATED_IDS],
  ["groupes", GROUPS.flatMap((g) => g.members)],
  ["chasse", HUNT_TARGETS.map((t) => t.id)],
  ["tours", TOURS.flatMap((t) => t.steps.map((s) => s.id))],
];
/* Les références vers des structures exclues pour licence (rein CC BY-NC)
 * sont des gaps documentés, pas des anomalies : elles sont filtrées ici. */
const EXCLUSIONS_LICENCE = new Set(["organ:kidney-l", "organ:kidney-r"]);
for (const [nom, liste] of referentiels) {
  for (const id of new Set(liste)) {
    if (EXCLUSIONS_LICENCE.has(id)) continue;
    if (!ids.has(id)) ajouter("references", `${nom} : ${id} absent du manifeste`);
  }
}

/* 6 — provenance des fiches */
if ((fiches.structures || []).length !== structures.length) {
  ajouter("fiches", `${fiches.structures?.length} fiches pour ${structures.length} structures`);
}
const fichesParId = new Map((fiches.structures || []).map((f) => [f.id, f]));
for (const s of structures) {
  const f = fichesParId.get(s.id);
  if (!f) continue;
  if (f.source_id !== s.source_id) ajouter("fiches", `${s.id} : source_id divergent`);
  if (f.date !== String(sources.generated).slice(0, 10)) ajouter("fiches", `${s.id} : date de provenance divergente`);
}

const rapport = {
  generated: new Date().toISOString(),
  manifest: path.relative(root, manifestPath),
  structures: structures.length,
  chunks: extremites.size,
  controles: ["identite", "lod", "chunks", "licences", "references", "fiches"],
  anomalies,
  verdict: anomalies.length ? "ECHEC" : "OK",
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(rapport, null, 1)}\n`);
console.log(`[check-modele] ${rapport.verdict} — ${structures.length} structures, ${extremites.size} chunks, ${anomalies.length} anomalie(s)`);
for (const a of anomalies.slice(0, 10)) console.log(`  ${a.controle} : ${a.message}`);
if (anomalies.length) process.exit(1);
