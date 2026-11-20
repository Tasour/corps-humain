import fs from "node:fs";
import path from "node:path";

/* Applique les exclusions de la revue visuelle à un jeu de données déjà construit.
 *
 * Utile quand les sources BodyParts3D ne sont plus disponibles pour un rebuild
 * complet : les chunks conservent les octets des structures exclues (espace
 * perdu, sans effet visuel), seul le manifeste est filtré. Le pipeline
 * `build-anatomy-v2.mjs` applique les mêmes patchs lors d'un rebuild normal.
 *
 * Usage :
 *   node scripts/appliquer-exclusions-revue.mjs
 *   V2_OUT=/chemin/vers/v2 node scripts/appliquer-exclusions-revue.mjs
 */

const ROOT = path.resolve(import.meta.dirname, "..");
const V2 = process.env.V2_OUT || path.join(ROOT, "public/models/v2");
const PATCH_DIR = path.join(ROOT, "docs/inventaire-anatomique/patches");
const manifestPath = path.join(V2, "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

const exclusions = new Map();
for (const file of fs.readdirSync(PATCH_DIR).filter((f) => f.endsWith(".json")).sort()) {
  const patch = JSON.parse(fs.readFileSync(path.join(PATCH_DIR, file), "utf8"));
  for (const e of patch.exclusions || []) exclusions.set(e.id, { reason: e.reason, replacements: e.replacements || [], patch: file });
}

const before = manifest.structures.length;
manifest.structures = manifest.structures.filter((s) => !exclusions.has(s.id));
manifest.reviewExclusions = {
  generated: new Date().toISOString(),
  count: before - manifest.structures.length,
  applied: [...exclusions.entries()].map(([id, v]) => ({ id, ...v })),
};
fs.writeFileSync(manifestPath, JSON.stringify(manifest));
console.log(`[exclusions] ${before} -> ${manifest.structures.length} structures (${before - manifest.structures.length} exclues)`);
