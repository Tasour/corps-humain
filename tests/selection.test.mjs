import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");
const maleDesc = JSON.parse(readFileSync(root + "docs/models/selection-descriptions-seema.json", "utf8"));
const desc = maleDesc;

/* Popup accessible. */
assert.ok(html.includes('id="selection-popup"'), "popup absente");
assert.ok(html.includes('role="dialog"'), "popup sans rôle dialog");
assert.ok(html.includes('aria-modal="false"'), "aria-modal absent");
assert.ok(html.includes('aria-live="polite"'), "annonce aria-live absente");
assert.ok(html.includes('id="selection-name"'), "nom du popup absent");
assert.ok(!html.includes('id="selection-description"'), "description toujours présente");
assert.ok(!html.includes('id="selection-source"'), "source toujours présente");
assert.ok(!html.includes('id="selection-latin"'), "sous-titre toujours présent");
assert.ok(!js.includes('popupDesc'), "référence JS à la description résiduelle");
assert.ok(!js.includes('popupSource'), "référence JS à la source résiduelle");
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
assert.ok(desc.descriptions.seema, "descriptions incomplètes");
for (const [source, entries] of Object.entries(desc.descriptions)) {
  for (const [id, entry] of Object.entries(entries)) {
    assert.ok(entry.name && id, `${source}:${id} sans nom`);
    assert.ok(entry.description, `${source}:${id} sans description`);
    assert.ok(entry.source, `${source}:${id} sans source`);
    assert.ok(entry.license, `${source}:${id} sans licence`);
    assert.ok(entry.origin, `${source}:${id} sans provenance`);
  }
}
const glbJson = (file) => {
  const buf = readFileSync(file);
  assert.equal(buf.toString("ascii", 0, 4), "glTF", `${file} n'est pas un GLB`);
  const len = buf.readUInt32LE(12);
  assert.equal(buf.toString("ascii", 16, 20), "JSON", `${file} sans chunk JSON`);
  return JSON.parse(buf.toString("utf8", 20, 20 + len));
};
for (const file of ["skin", "muscles", "skeleton", "organs", "arteries", "veins", "nerves"]) {
  const doc = glbJson(root + `docs/models/male/${file}.glb`);
  for (const node of doc.nodes || []) {
    if (node.mesh === undefined || !node.name) continue;
    assert.ok(desc.descriptions.seema[node.name], `seema:${node.name} sans description`);
  }
}

/* Contrôle de la peau. */
assert.ok(js.includes("G_FJ2811: 'skin'"), "oreille externe mal classée");
console.log(`PASS sélection — ${Object.keys(desc.descriptions.seema).length} pièces, ` +
  `${Object.keys(desc.descriptions.seema).length} homme`);
