import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url).pathname;
const html = readFileSync(root + "index.html", "utf8");
const js = readFileSync(root + "src/corps-viewer.js", "utf8");
const i18n = readFileSync(root + "src/i18n.js", "utf8");
const settings = readFileSync(root + "src/settings.js", "utf8");

assert.ok(html.includes('id="panel-reglages"'), "panneau Réglages absent");
assert.ok(html.includes('id="setting-theme"'), "sélecteur de thème absent");
assert.ok(html.includes('id="setting-lang"'), "sélecteur de langue absent");
assert.ok((html.match(/data-i18n=/g) || []).length >= 20, "textes internationalisés insuffisants");
assert.ok(html.includes('value="system" data-i18n="themeSystem"'), "thème système absent");
assert.ok(html.includes('value="fr" data-i18n="languageFr"'), "français par défaut absent");
assert.ok(html.includes('value="en" data-i18n="languageEn"'), "anglais absent");
assert.ok(i18n.includes("fr: {") && i18n.includes("en: {"), "dictionnaires fr/en absents");
assert.ok(i18n.includes("export function applyI18n"), "application de la langue absente");
assert.ok(i18n.includes("export function t("), "fonction t absente");
assert.ok(settings.includes("corps-theme") && settings.includes("corps-lang"),
  "persistance des préférences absente");
assert.ok(settings.includes("prefers-color-scheme"), "suivi du système absent");
assert.ok(js.includes("syncSceneTheme"), "thème de la scène non synchronisé");
assert.ok(js.includes("localizedField"), "champs localisés absents du popup");
assert.ok(js.includes("updateLayerAvailability"), "couches par sexe absentes");
assert.ok(js.includes("activate(requested, false)"), "recadrage au changement de sexe encore présent");
assert.ok(!js.includes("position.x = 0.45"), "décalage de modèle encore présent");
assert.ok(!js.includes("position.x = -0.45"), "décalage de modèle encore présent");
assert.ok(js.includes("aria-disabled"), "case grossesse non désactivée proprement");
assert.ok(js.includes("FEMALE_CONTAIN"), "contention des couches femelles absente");
assert.ok(js.includes("containFemaleLayers"), "application de la contention absente");
assert.ok(js.includes("const clean = new Set(['skin', 'skeleton', 'organs', 'cosmetic'])"),
  "affichage féminin par défaut non nettoyé");
console.log("PASS préférences, langues et caméra stable");
