/* BENCH-008 — ajoute `source_id` au manifeste livré sans régénérer la
 * géométrie. Idempotent : relancer le script ne change aucun champ.
 * Écriture atomique (temporaire + rename) et contrôle d'unicité avant écriture. */

import fs from "node:fs";
import path from "node:path";
import { sourceIdFor } from "./source-id.mjs";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "public/models/v2/manifest.json");
const inventoryPath = path.join(root, "docs/inventaire-anatomique/structures.json");
const reportPath = path.join(root, "docs/analyses/source-ids.json");

const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));
const parId = new Map(Object.values(inventory.categories).flat().map((s) => [s.id, s]));
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const vus = new Map();
let ajoutes = 0;
let existants = 0;
const divergences = [];
for (const structure of manifest.structures) {
  const source = parId.get(structure.id);
  if (!source) throw new Error(`structure ${structure.id} absente de l'inventaire`);
  const attendu = sourceIdFor(source);
  if (structure.source_id === undefined) {
    structure.source_id = attendu;
    ajoutes++;
  } else {
    existants++;
    if (structure.source_id !== attendu) {
      divergences.push({ id: structure.id, actuel: structure.source_id, attendu });
    }
  }
  if (vus.has(attendu)) {
    throw new Error(`source_id dupliqué ${attendu} : ${vus.get(attendu)} et ${structure.id}`);
  }
  vus.set(attendu, structure.id);
}
if (divergences.length) {
  throw new Error(`source_id divergents (${divergences.length}) : ${JSON.stringify(divergences.slice(0, 5))}`);
}

const temporaire = `${manifestPath}.tmp`;
fs.writeFileSync(temporaire, JSON.stringify(manifest));
fs.renameSync(temporaire, manifestPath);

const rapport = {
  generated: new Date().toISOString(),
  structures: manifest.structures.length,
  uniques: vus.size,
  ajoutes,
  existants,
  divergences: divergences.length,
  verdict: "OK",
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(rapport, null, 1)}\n`);
console.log(`[source-id] ${rapport.structures} structures · ${rapport.uniques} identifiants uniques · ${ajoutes} ajoutés · ${existants} déjà présents`);
