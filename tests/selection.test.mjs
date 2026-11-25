import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");
const maleDesc = JSON.parse(readFileSync(root + "docs/models/selection-descriptions-seema.json", "utf8"));
const femaleDesc = JSON.parse(readFileSync(root + "docs/models/selection-descriptions-bodyatlas.json", "utf8"));
const desc = { descriptions: { ...maleDesc.descriptions, ...femaleDesc.descriptions } };

/* Popup accessible. */
assert.ok(html.includes('id="selection-popup"'), "popup absente");
assert.ok(html.includes('role="dialog"'), "popup sans rôle dialog");
assert.ok(html.includes('aria-modal="false"'), "aria-modal absent");
assert.ok(html.includes('aria-live="polite"'), "annonce aria-live absente");
assert.ok(html.includes('id="selection-name"'), "nom du popup absent");
assert.ok(html.includes('id="selection-description"'), "description du popup absente");
assert.ok(html.includes('id="selection-source"'), "source du popup absente");
assert.ok(html.includes('id="selection-close"'), "bouton de fermeture absent");
assert.ok(html.includes('id="selection-popup"') && html.includes('width:44px'),
  "bouton de fermeture trop petit");

/* Raycast : premier objet touché, reset dans le vide, échap. */
assert.ok(js.includes("new THREE.Raycaster()"), "raycaster absent");
assert.ok(js.includes("setFromCamera(ndc, camera)"), "rayon depuis la caméra absent");
assert.ok(js.includes("intersectObjects(activeBodies(), true)"), "raycast sur le corps actif absent");
assert.ok(js.includes("hits.find("), "premier objet visible non retenu");
assert.ok(js.includes("if (mesh) select(mesh"), "sélection absente");
assert.ok(js.includes("else clearSelection()"), "reset dans le vide absent");
assert.ok(js.includes("e.key === 'Escape'"), "échap absent");
assert.ok(js.includes("moved > 6"), "seuil anti-glisser absent");

/* Contour turquoise. */
assert.ok(js.includes("new THREE.EdgesGeometry("), "contour géométrique absent");
assert.ok(js.includes("outlineKind = 'fresnel'"), "overlay Fresnel absent");
assert.ok(js.includes("THIN_LAYERS.has(mesh.userData.layer)"), "protection des maillages fins absente");
assert.ok(js.includes("0x40f0e0"), "couleur turquoise absente");
assert.ok(js.includes("THREE.AdditiveBlending"), "fusion additive absente");
assert.ok(js.includes("Math.sin(now / 1200"), "flash 1,2 s absent");
assert.ok(js.includes("reduced ? 0.9"), "reduced motion absent");

/* Descriptions sourcées : champs obligatoires. */
assert.ok(desc.descriptions.seema && desc.descriptions.bodyatlas, "descriptions incomplètes");
for (const [source, entries] of Object.entries(desc.descriptions)) {
  for (const [id, entry] of Object.entries(entries)) {
    assert.ok(entry.name && id, `${source}:${id} sans nom`);
    assert.ok(entry.description, `${source}:${id} sans description`);
    assert.ok(entry.source, `${source}:${id} sans source`);
    assert.ok(entry.license, `${source}:${id} sans licence`);
    assert.ok(entry.origin, `${source}:${id} sans provenance`);
  }
}
assert.ok(desc.descriptions.bodyatlas.VH_F_left_lateral_basal_bronchopulmonary_segment
  .description.includes('S9'), "description médicale de FMA:7379 absente");

/* Couverture : chaque pièce sélectionnable possède une entrée. */
const female = JSON.parse(readFileSync(root + "docs/models/body-atlas/atlas-female-meshopt.json", "utf8"));
for (const p of female.parts) {
  assert.ok(desc.descriptions.bodyatlas[p.id], `bodyatlas:${p.id} sans description`);
}

/* Contrôles anatomiques : une seule paire d'yeux, aucune structure mâle pure. */
const sclera = female.parts.filter((p) => /^(left|right) sclera$/i.test(p.name));
assert.equal(sclera.length, 2, `${sclera.length} sclères au lieu de deux`);
const maleOnly = ['penis', 'testis', 'testicle', 'prostate', 'scrotum', 'seminal vesicle'];
for (const p of female.parts) {
  assert.ok(!maleOnly.some((t) => p.name.toLowerCase().includes(t)),
    `structure masculine dans le set femelle : ${p.name}`);
}

const glbJson = (file) => {
  const buf = readFileSync(file);
  assert.equal(buf.toString("ascii", 0, 4), "glTF", `${file} n'est pas un GLB`);
  const len = buf.readUInt32LE(12);
  assert.equal(buf.toString("ascii", 16, 20), "JSON", `${file} sans chunk JSON`);
  return JSON.parse(buf.toString("utf8", 20, 20 + len));
};
for (const file of ["skin", "muscles", "skeleton", "organs", "arteries", "veins", "nerves"]) {
  const doc = glbJson(root + `docs/models/forks/seema/models/${file}.glb`);
  for (const node of doc.nodes || []) {
    if (node.mesh === undefined || !node.name) continue;
    assert.ok(desc.descriptions.seema[node.name], `seema:${node.name} sans description`);
  }
}

/* Couches ajoutées et compléments de la référence masculine. */
assert.ok(js.includes("const REFERENCE_LAYERS = ['pregnancy']"), "couche grossesse absente");
assert.ok(js.includes("G_FJ2811: 'skin'"), "oreille externe femelle mal classée");
assert.ok(js.includes('FACIAL_TOKENS'), "tokens muscles faciaux absents");
assert.ok(js.includes('TRUNK_TOKENS'), "tokens muscles du tronc absents");
assert.ok(js.includes('HAIR_TOKENS'), "tokens cheveux absents");
assert.ok(js.includes('female-supplements.json'), "compléments précalculés absents");
assert.ok(js.includes('facialAlignment'), "rapport d'alignement absent");

console.log(`PASS sélection — ${Object.keys(desc.descriptions.seema).length} homme, ` +
  `${Object.keys(desc.descriptions.bodyatlas).length} femme`);
