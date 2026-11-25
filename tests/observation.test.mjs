import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");
const i18n = readFileSync(root + "src/i18n.js", "utf8");

assert.ok(html.includes('<button type="button" id="pivot-indicator"'),
  "indicateur de pivot non interactif");
assert.ok(js.includes("const REGIONS = ["), "registre des régions absent");
const regionKeys = (js.match(/key: '(head|neck|hands|arms|torso|abdomen|pelvis|thighs|legs|feet)'/g) || []);
assert.equal(regionKeys.length, 10, "dix régions attendues");
assert.ok(js.includes("const observe = (key)"), "fonction observe absente");
assert.ok(js.includes("const cycleRegion"), "navigation entre régions absente");
assert.ok(js.includes("const fitZoomFor"), "calcul de zoom d'encadrement absent");
assert.ok(js.includes("case '['"), "navigation clavier absente");
assert.ok(js.includes("tween = null;\n    down ="), "annulation de transition au geste absente");
assert.ok(js.includes("reduced ? null"), "respect de prefers-reduced-motion absent");
assert.ok(i18n.includes("regionHead") && i18n.includes("tête"), "libellé de région FR absent");
assert.ok(i18n.includes("regionFeet") && i18n.includes("feet"), "libellé de région EN absent");
assert.ok(i18n.includes("regionObserved"), "préfixe d'observation absent");
console.log("PASS observation : 10 régions, transition et retour");
