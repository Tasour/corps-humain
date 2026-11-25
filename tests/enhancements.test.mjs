import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");
const alignment = JSON.parse(readFileSync(root + "docs/models/facial-alignment.json", "utf8"));

const count = (needle) => js.split(needle).length - 1;
assert.ok(html.includes('id="cp-couche-pregnancy"'), "couche grossesse absente");
assert.ok(!html.includes('data-layer="pregnancy" checked'), "grossesse visible par défaut");
assert.ok(js.includes("pregnancy: 'pregnancy'"), "grossesse non isolée du mapping");
assert.ok(count("add(maleCenter") >= 13, "moins de 13 repères de recalage");
assert.ok(js.includes("G_FJ2811: 'skin'"), "oreille externe femelle mal classée");
assert.ok(js.includes("matches(o.name, HAIR_TOKENS)"), "cheveux non câblés");
const facial = js.match(/const FACIAL_TOKENS = \[([\s\S]*?)\];/)?.[1] || "";
assert.equal((facial.match(/'/g) || []).length, 28, "14 tokens faciaux attendus");
const trunk = js.match(/const TRUNK_TOKENS = \[([\s\S]*?)\];/)?.[1] || "";
assert.equal((trunk.match(/'/g) || []).length, 10, "5 tokens de tronc attendus");
assert.ok(js.includes("nervesFile"), "nerfs périphériques absents");
assert.ok(js.includes("référence masculine adaptée"), "provenance des compléments absente");
assert.ok(js.includes("RENDER_ORDER"), "ordre de rendu des couches absent");
assert.ok(js.includes("xray = true"), "mode Rayon X par défaut absent");
assert.ok(js.includes("layer = 'muscles'; kind = 'muscle facial'"),
  "muscles faciaux non fusionnés avec les muscles");
assert.ok(!js.includes("layer = 'facial'"), "sous-couche faciale encore présente");
assert.ok(js.includes("fitTps"), "interpolant TPS absent");
assert.ok(js.includes("thresholdMm = 0.1") || js.includes("<= 0.1"),
  "seuil de 0,1 mm absent du calcul");
assert.ok(alignment.count === 34, "rapport d'alignement incomplet");
assert.ok(alignment.residualMmMax <= 0.1, "résidu d'alignement supérieur à 0,1 mm");
assert.ok(alignment.entries.every((e) => e.residualMm <= 0.1), "un muscle dépasse le seuil");
assert.ok(js.includes("setActiveSex("), "bouton sexe non câblé");
assert.ok(js.includes("sex-toggle"), "bouton sexe absent du viewer");
assert.ok(js.includes("searchParams.set('sex'"), "sexe non conservé dans l'URL");
assert.ok(js.includes("zoomAtPoint("), "zoom au point touché absent");
assert.ok(!js.includes("setPivotBody(startBody)"), "pivot encore modifié au relâchement");
console.log("PASS compléments, alignement facial et interface");
