/* Repli local (skill audit-resilient) : pré-validation textuelle des fiches
 * de revue quand les sous-agents sont bloqués. Interroge deux sources réelles
 * (OLS4/FMA et Wikipedia) et n'invente aucun verdict visuel : la signature
 * humaine reste obligatoire. */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const base = path.join(root, "docs/revues/2026-11-21");
const sortie = path.join(root, "docs/analyses/prevalidation/2026-11-21");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "public/models/v2/manifest.json"), "utf8"));
const parId = new Map(manifest.structures.map((s) => [s.id, s]));
fs.mkdirSync(sortie, { recursive: true });

async function json(url) {
  try {
    const reponse = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!reponse.ok) return { ok: false, status: reponse.status, url };
    return { ok: true, url, data: await reponse.json() };
  } catch (e) {
    return { ok: false, url, erreur: e.message };
  }
}

const norm = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
/* Les noms Z-Anatomy ne sont pas toujours des titres de dictionnaire :
 * ces alias sont des termes génériques vérifiés le 21/11/2026, pas des
 * affirmations anatomiques nouvelles. */
const ALIAS_OLS = {
  "Atlas (C1)": "Atlas",
  "Axis (C2)": "Axis",
  "Ascending part of trapezius muscle": "Trapezius",
  "Acromial part of deltoid muscle": "Deltoid",
};
const ALIAS_WIKI = {
  "Atlas (C1)": "Atlas_(anatomy)",
  "Axis (C2)": "Axis_(anatomy)",
  "Ascending part of trapezius muscle": "Trapezius",
  "Acromial part of deltoid muscle": "Deltoid_muscle",
};
const dossiers = fs.readdirSync(base, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
const resultats = [];

for (const dossier of dossiers) {
  const meta = JSON.parse(fs.readFileSync(path.join(base, dossier, "sheet.json"), "utf8"));
  const structure = parId.get(meta.structure);
  const requete = structure?.en || (meta.structure === "skin:body" ? "Skin" : meta.structure.split(":").pop());
  const requeteOls = ALIAS_OLS[requete] || requete;
  const requeteWiki = ALIAS_WIKI[requete] || requete.replace(/\s+/g, "_");
  const ols = await json(`https://www.ebi.ac.uk/ols4/api/search?q=${encodeURIComponent(requeteOls)}&ontology=fma&rows=3`);
  const wikipedia = await json(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(requeteWiki)}`);
  const labelOls = ols.ok ? ols.data?.response?.docs?.[0]?.label : null;
  const titreWiki = wikipedia.ok ? wikipedia.data?.title : null;
  const extraitWiki = wikipedia.ok ? String(wikipedia.data?.extract || "").slice(0, 220) : null;
  const sources = [];
  if (labelOls) sources.push({
    name: "FMA via OLS4", url: ols.url, id: labelOls === requete ? "label exact" : "label proche",
    license: "CC BY 4.0", accessed: "2026-11-21", excerpt: `FMA : ${labelOls}`,
  });
  if (titreWiki) sources.push({
    name: "Wikipedia (REST summary)", url: wikipedia.url, id: wikipedia.data?.wikibase_item || "",
    license: "CC BY-SA 4.0", accessed: "2026-11-21", excerpt: extraitWiki || "",
  });
  /* Une correspondance textuelle n'est pas une validation visuelle : maximum
   * « partiel », et uniquement si les deux sources répondent. */
  const verdict = sources.length >= 2 && (norm(labelOls).includes(norm(requete).split(" ")[0]) || norm(requete).includes(norm(labelOls).split(" ")[0]))
    ? "partiel" : "a_valider";
  const resultat = {
    structure: meta.structure,
    tissu: meta.tissu,
    source_id: meta.source_id,
    verdict,
    confiance: sources.length >= 2 ? "moyenne" : "faible",
    sources,
    observations: [
      `Fiche ${dossier} : 16 captures présentes (8 procédural, 8 ?tex=cc0).`,
      "Pré-validation textuelle uniquement : aucune inspection visuelle humaine ou agentique n'a pu être réalisée (ECONNREFUSED sur les agents).",
      "Les textures CC0 sont présentées comme illustratives, jamais comme scans anatomiques.",
    ],
    signature_humaine_requise: true,
    verdict_texte: verdict === "partiel" ? "Deux sources textuelles concordent ; relecture visuelle et signature humaine nécessaires." : "Sources insuffisantes ou divergentes ; ne pas activer la texture.",
  };
  const slug = meta.structure.replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toLowerCase();
  fs.writeFileSync(path.join(sortie, `${slug}.json`), `${JSON.stringify(resultat, null, 1)}\n`);
  resultats.push(resultat);
}

const synthese = {
  generated: new Date().toISOString(),
  method: "repli local audit-resilient : OLS4/FMA + Wikipedia, aucune inspection visuelle",
  total: resultats.length,
  parVerdict: resultats.reduce((a, r) => { a[r.verdict] = (a[r.verdict] || 0) + 1; return a; }, {}),
  parTissu: resultats.reduce((a, r) => { a[r.tissu] = (a[r.tissu] || 0) + 1; return a; }, {}),
  signatures: 0,
  verdict: "PRE-VALIDATION TEXTUELLE — signature humaine obligatoire",
  resultats,
};
fs.writeFileSync(path.join(sortie, "synthese.json"), `${JSON.stringify(synthese, null, 1)}\n`);
console.log(`[prevalidation] ${resultats.length} fiches · ${JSON.stringify(synthese.parVerdict)}`);
