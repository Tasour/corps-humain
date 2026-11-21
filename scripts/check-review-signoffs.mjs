/* Gate de revue humaine : protège l'activation publique des textures CC0.
 * Tant que textureDefault est false, on vérifie seulement l'intégrité des
 * signatures. Dès que textureDefault passe à true, 5 fiches signées par tissu
 * (avec case « texture » cochée) sont exigées. */

import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const revues = process.env.REVIEW_DIR || path.join(root, "docs/revues");
const configPath = path.join(revues, "config.json");
const signoffsPath = path.join(revues, "signoffs.json");
const tissusRequis = ["bone", "muscle", "organ", "skin"];
/* La peau est un lot unique, pas 2 009 structures : une fiche suffit. */
const MIN_PAR_TISSU = { bone: 5, muscle: 5, organ: 5, skin: 1 };

const config = fs.existsSync(configPath)
  ? JSON.parse(fs.readFileSync(configPath, "utf8"))
  : { textureDefault: false };
const signoffs = fs.existsSync(signoffsPath)
  ? JSON.parse(fs.readFileSync(signoffsPath, "utf8"))
  : { entries: [] };
const entrees = Array.isArray(signoffs.entries) ? signoffs.entries : [];
const erreurs = [];
const comptes = Object.fromEntries(tissusRequis.map((t) => [t, 0]));

for (const e of entrees) {
  if (!e.structure || !e.tissu || !e.relecteur || !e.date || !e.portee) {
    erreurs.push(`signature incomplète : ${JSON.stringify(e).slice(0, 120)}`);
    continue;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date)) erreurs.push(`date invalide pour ${e.structure}`);
  const feuille = path.join(revues, e.feuille || "");
  if (!e.feuille || !fs.existsSync(feuille)) erreurs.push(`fiche absente pour ${e.structure}`);
  if (e.texture && comptes[e.tissu] !== undefined) comptes[e.tissu]++;
}

if (config.textureDefault) {
  for (const tissu of tissusRequis) {
    if (comptes[tissu] < MIN_PAR_TISSU[tissu]) {
      erreurs.push(`${tissu} : ${comptes[tissu]}/${MIN_PAR_TISSU[tissu]} fiches signées avec texture`);
    }
  }
}

const rapport = {
  generated: new Date().toISOString(),
  textureDefault: !!config.textureDefault,
  signoffTotal: entrees.length,
  parTissu: comptes,
  seuil: MIN_PAR_TISSU,
  erreurs,
  verdict: erreurs.length ? "ECHEC" : "OK",
};
const rapportPath = process.env.REVIEW_REPORT || path.join(root, "docs/analyses/review-signoffs.json");
fs.mkdirSync(path.dirname(rapportPath), { recursive: true });
fs.writeFileSync(rapportPath, `${JSON.stringify(rapport, null, 1)}\n`);
console.log(`[review] ${rapport.verdict} — ${entrees.length} signature(s), ${tissusRequis.map((t) => `${t}:${comptes[t]}`).join(" ")}, flag=${config.textureDefault}`);
for (const e of erreurs.slice(0, 10)) console.log(`  ${e}`);
if (erreurs.length) process.exit(1);
