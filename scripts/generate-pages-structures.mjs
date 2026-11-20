/* BENCH-014 — pages statiques adressables pour chaque structure.
 *
 * Générées au build (jamais écrites à la main) depuis le manifeste, les fiches
 * de vérité et les waypoints canoniques. Aucune géométrie ni affirmation
 * anatomique n'est inventée. Sortie déterministe : deux exécutions produisent
 * exactement les mêmes octets (aucune horloge locale dans le contenu).
 *
 * Variables : PAGES_OUT (défaut public), SITE_BASE (URL publique pour le sitemap).
 */

import fs from "node:fs";
import path from "node:path";
import { getWaypoints } from "../src/data/waypoints.js";

const root = path.resolve(import.meta.dirname, "..");
const out = process.env.PAGES_OUT || path.join(root, "public");
const base = (process.env.SITE_BASE || "https://tasour.github.io/corps-humain/").replace(/\/?$/, "/");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const fiches = JSON.parse(fs.readFileSync(path.join(root, "public/data/fiches-verite.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/analyses/sources-checksums.json"), "utf8"));
const date = String(sources.generated).slice(0, 10);
const parFiche = new Map(fiches.structures.map((f) => [f.id, f]));

const echapper = (valeur) => String(valeur ?? "")
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const slug = (id) => id.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();

function description(structure, fiche, points) {
  const parties = [
    `${structure.fr} (${structure.la || "nom latin non renseigné"}) : structure ${structure.category} de l'atlas anatomique CORPS.`,
    points[0]?.text || "",
    `Source ${fiche.source}, licence ${fiche.licence}.`,
    `Modèle pédagogique, sans valeur diagnostique.`,
  ];
  let texte = "";
  for (const partie of parties) {
    if (texte.length >= 150) break;
    texte += (texte ? " " : "") + partie.replace(/\s+/g, " ").trim();
  }
  if (texte.length < 150) texte += ` Identifiant source : ${structure.source_id}.`;
  if (texte.length > 250) {
    /* 249 caractères + l'ellipse = 250 au maximum, même sans espace
     * commode avant la limite. */
    texte = texte.slice(0, 249);
    const coupe = texte.lastIndexOf(" ");
    texte = `${texte.slice(0, coupe > 180 ? coupe : 249)}…`;
  }
  /* L'apostrophe typographique évite l'entité &amp;#39; (5 caractères) dans
   * l'attribut et garantit une mesure de description fiable. */
  return texte.replace(/'/g, "’");
}

const CSS = `body{margin:0;font:15px/1.6 system-ui,sans-serif;color:#e7f1fb;background:#04080f}
main,header,footer{max-width:760px;margin:auto;padding:18px}
a{color:#67e8f9}h1{font:600 28px Georgia,serif}h2{font:600 17px Georgia,serif;margin-top:26px}
.latin{color:#7e94ab;font-style:italic}dl{display:grid;grid-template-columns:auto 1fr;gap:5px 14px}
dt{color:#7e94ab}dd{margin:0;overflow-wrap:anywhere}li{margin:8px 0}
.avertissement{padding:12px;border:1px solid #2b3d4d;border-radius:8px;color:#9fb4c5}
@media(prefers-color-scheme:light){body{background:#fffdf9;color:#24313a}a{color:#0b7285}.avertissement{border-color:#ccd7df;color:#4d5d66}}`;

const dossier = path.join(out, "structures");
fs.mkdirSync(dossier, { recursive: true });
const entreesSitemap = [];
const groupes = new Map();

for (const structure of manifest.structures) {
  const fiche = parFiche.get(structure.id);
  if (!fiche) throw new Error(`${structure.id} sans fiche de vérité`);
  const points = getWaypoints(structure);
  const titre = `${structure.fr} — structure anatomique | CORPS`;
  const nomFichier = `${slug(structure.id)}.html`;
  const url = `${base}structures/${nomFichier}`;
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${echapper(titre)}</title>
<meta property="og:title" content="${echapper(titre)}">
<meta name="description" content="${echapper(description(structure, fiche, points))}">
<link rel="canonical" href="${echapper(url)}">
<style>${CSS}</style>
</head>
<body>
<header><a href="../v2.html">← Atlas 3D</a> · <a href="./index.html">Toutes les structures</a></header>
<main>
<h1>${echapper(titre)}</h1>
<p class="latin">${echapper(structure.la || "")}</p>
<section><h2>Provenance</h2><dl>
<dt>Système</dt><dd>${echapper(structure.category)}</dd>
<dt>Source</dt><dd>${echapper(fiche.source)}</dd>
<dt>Licence</dt><dd>${echapper(fiche.licence)}</dd>
<dt>FMA</dt><dd>${echapper(fiche.fma || "—")}</dd>
<dt>TA2</dt><dd>${echapper(fiche.ta2 || "—")}</dd>
<dt>Identifiant source</dt><dd>${echapper(structure.source_id)}</dd>
<dt>Vérifié le</dt><dd>${echapper(fiche.date)}</dd>
</dl></section>
<section><h2>Limites du modèle</h2><p>${echapper(fiche.limite)}</p></section>
<section><h2>Points d'intérêt</h2><ol>${points.map((p) => `<li><strong>${echapper(p.title)}</strong> — ${echapper(p.text)}</li>`).join("")}</ol></section>
<section><h2>Explorer en 3D</h2><p><a href="../v2.html?vue=${encodeURIComponent(structure.id)}&amp;wp=0">Ouvrir cette structure dans l'atlas 3D</a></p></section>
<p class="avertissement">Modèle pédagogique. Aucune donnée affichée n'a valeur diagnostique.</p>
</main>
<footer><a href="../v2.html">CORPS — atlas anatomique</a></footer>
</body>
</html>
`;
  const chemin = path.join(dossier, nomFichier);
  const temporaire = `${chemin}.tmp`;
  fs.writeFileSync(temporaire, html);
  fs.renameSync(temporaire, chemin);
  entreesSitemap.push({ url, nomFichier, date });
  if (!groupes.has(structure.category)) groupes.set(structure.category, []);
  groupes.get(structure.category).push({ structure, nomFichier });
}

const lignesIndex = [];
for (const [categorie, liste] of [...groupes].sort((a, b) => a[0].localeCompare(b[0]))) {
  lignesIndex.push(`<h2>${echapper(categorie)} (${liste.length})</h2><ul>`);
  for (const { structure, nomFichier } of liste.sort((a, b) => (a.structure.fr || "").localeCompare(b.structure.fr || ""))) {
    lignesIndex.push(`<li><a href="./${nomFichier}">${echapper(structure.fr || structure.en)}</a></li>`);
  }
  lignesIndex.push("</ul>");
}
const index = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Structures anatomiques — CORPS</title><meta property="og:title" content="Structures anatomiques — CORPS">
<meta name="description" content="Index des ${manifest.structures.length} structures anatomiques de l'atlas CORPS, avec provenance, licence et points d'intérêt pour chacune.">
<link rel="canonical" href="${echapper(base)}structures/index.html"><style>${CSS}</style></head>
<body><header><a href="../v2.html">← Atlas 3D</a></header><main>
<h1>Structures anatomiques</h1><p>${manifest.structures.length} structures, chaque page indique sa source, sa licence et ses limites.</p>
${lignesIndex.join("\n")}
</main></body></html>
`;
fs.writeFileSync(path.join(dossier, "index.html"), index);

fs.writeFileSync(path.join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entreesSitemap.map((e) => `<url><loc>${echapper(e.url)}</loc><lastmod>${e.date}</lastmod></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *
Allow: /
Sitemap: ${base}sitemap.xml
`);

console.log(`[pages] ${entreesSitemap.length} pages + index + sitemap + robots → ${out}`);
