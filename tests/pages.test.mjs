import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

/* BENCH-014 — contenu des pages statiques : sémantique, titres cohérents,
 * description 150–250 caractères et zéro ressource distante chargée. */

const root = path.resolve(import.meta.dirname, "..");
const generateur = path.join(root, "scripts/generate-pages-structures.mjs");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "corps-pages-test-"));
const resultat = spawnSync(process.execPath, [generateur], {
  cwd: root,
  encoding: "utf8",
  env: { ...process.env, PAGES_OUT: tmp },
});
assert.equal(resultat.status, 0, resultat.stderr || resultat.stdout);

const dossier = path.join(tmp, "structures");
const fichiers = fs.readdirSync(dossier).filter((f) => f.endsWith(".html") && f !== "index.html");
const ATTENDU = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8")).structures.length;
assert.equal(fichiers.length, ATTENDU);

let verifiees = 0;
for (const nom of fichiers) {
  const html = fs.readFileSync(path.join(dossier, nom), "utf8");
  assert.match(html, /^<!doctype html>\s*\n<html lang="fr">/);
  assert.equal((html.match(/<main>/g) || []).length, 1, `${nom} : <main> unique`);
  const titre = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const og = html.match(/<meta property="og:title" content="([^"]+)">/)?.[1];
  const h1 = html.match(/<h1>([^<]+)<\/h1>/)?.[1];
  assert.ok(titre && og && h1, `${nom} : titres absents`);
  assert.equal(og, titre, `${nom} : og:title ≠ title`);
  assert.equal(h1, titre, `${nom} : h1 ≠ title`);
  const description = html.match(/<meta name="description" content="([^"]+)">/)?.[1] || "";
  assert.ok(description.length >= 150 && description.length <= 250,
    `${nom} : description ${description.length} caractères`);
  assert.ok(html.includes("Modèle pédagogique"), `${nom} : avertissement absent`);
  assert.ok(!/<script\b/i.test(html), `${nom} : script présent`);
  assert.ok(!/<img\b[^>]*src="https?:/i.test(html), `${nom} : image distante`);
  assert.ok(!/<link\b[^>]*rel="stylesheet"[^>]*href="https?:/i.test(html), `${nom} : CSS distante`);
  assert.ok(html.includes("../index.html?vue="), `${nom} : lien deep link absent`);
  verifiees++;
}

const sitemap = fs.readFileSync(path.join(tmp, "sitemap.xml"), "utf8");
assert.equal((sitemap.match(/<loc>/g) || []).length, ATTENDU);
const robots = fs.readFileSync(path.join(tmp, "robots.txt"), "utf8");
assert.match(robots, /Sitemap: https:\/\//);

const index = fs.readFileSync(path.join(dossier, "index.html"), "utf8");
assert.equal((index.match(/href="\.\/[a-z0-9-]+\.html"/g) || []).length, ATTENDU);

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`PASS  ${verifiees} pages statiques : titres cohérents, descriptions 150–250, zéro ressource distante`);
