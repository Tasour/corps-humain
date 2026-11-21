/* Table d'alias ancien ID → nouvel ID stock, appariée par nom anglais.
 * Les structures sans équivalent ne sont pas mappées : elles sont documentées
 * comme gaps, jamais réécrites vers une anatomie différente. */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const ancienPath = process.env.OLD_MANIFEST || path.join(root, "public/models/v2/manifest.json");
const ancien = JSON.parse(fs.readFileSync(ancienPath, "utf8"));
const neufPath = process.env.STOCK_MANIFEST || "/tmp/opencode/stock-build4/manifest.json";
const neuf = JSON.parse(fs.readFileSync(neufPath, "utf8"));
const out = process.env.STOCK_BUILD_OUT || "/tmp/opencode/stock-build4";
const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
const index = new Map();
for (const s of neuf.structures) if (!index.has(norm(s.fr))) index.set(norm(s.fr), s.id);
const alias = {};
const gaps = [];
for (const s of ancien.structures) {
  const cible = index.get(norm(s.en));
  if (cible) alias[s.id] = cible;
  else gaps.push({ id: s.id, nom: s.en, raison: "structure absente du socle Z-Anatomy stock (apport BodyParts3D)" });
}
const contenu = { generated: new Date().toISOString(), source: "appariement par nom anglais normalisé", alias, gaps };
fs.writeFileSync(path.join(out, "id-aliases.json"), JSON.stringify(contenu));
/* Module JS pour les données canoniques (waypoints, tests) sans fetch. */
const inverse = {};
for (const [oldId, newId] of Object.entries(alias)) inverse[newId] = oldId;
const moduleJs = `/* Généré depuis l'appariement Z-Anatomy stock — ne pas éditer à la main. */\nexport const ANCIEN_VERS_NOUVEAU = ${JSON.stringify(alias)};\nexport const NOUVEAU_VERS_ANCIEN = ${JSON.stringify(inverse)};\nexport const IDS_SANS_EQUIVALENT = ${JSON.stringify(gaps.map((g) => g.id))};\n`;
fs.writeFileSync(path.join(root, "src/data/id-aliases.js"), moduleJs);
console.log(`[alias] ${Object.keys(alias).length}/${ancien.structures.length} mappés, ${gaps.length} gaps documentés`);
