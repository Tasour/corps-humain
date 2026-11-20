/* BENCH-007 — lint des affirmations médicales.
 *
 * Refuse les formulations qui présentent l'atlas comme un outil clinique.
 * La détection est sensible à la négation : « ne remplace ni un diagnostic »
 * est autorisé, « diagnostiquez-vous » ne l'est pas. Le contenu de la
 * simulation de pathologies (src/data/diseases.js) est explicitement exempté :
 * il est affiché sous l'intitulé « pathologies simulées » et n'est pas une
 * affirmation faite au lecteur.
 *
 * Variables : CLAIMS_ROOT, CLAIMS_REPORT pour les tests négatifs.
 */

import fs from "node:fs";
import path from "node:path";

const root = process.env.CLAIMS_ROOT || path.resolve(import.meta.dirname, "..");
const reportPath = process.env.CLAIMS_REPORT || path.join(root, "docs/analyses/lint-claims.json");

const CIBLES = [
  "index.html",
  "v2.html",
  "src/main.js",
  "src/ui.js",
  "src/games.js",
  "src/data/hunt.js",
  "src/data/waypoints.js",
  "src/data/groups.js",
  "scripts/generate-pages-structures.mjs",
];
const EXEMPTIONS = [
  { fichier: "src/data/diseases.js", raison: "contenu de pathologies simulées, explicitement intitulé comme tel dans l'interface" },
];
const REGLES = [
  { id: "verbe-diagnostique", motif: /\bdiagnostiquez\b|\bdiagnostiquer\b/gi, message: "verbe diagnostique impératif" },
  { id: "outil-diagnostique", motif: /\boutil de diagnostic\b|\bmode diagnostic\b|\bà visée diagnostique\b/gi, message: "présentation de l'atlas comme outil diagnostique" },
  { id: "affirmation-patient", motif: /\bvous avez\b.{0,50}\b(maladie|pathologie|lésion|tumeur|fracture)\b/gi, message: "affirmation clinique adressée au lecteur" },
  { id: "fiabilite", motif: /\bfiable à 100\s?%\b|\bgaranti[ée]?\s+(?:un|une|le|la|des|les)?\s*(?:résultat|diagnostic|guérison)\b/gi, message: "promesse de fiabilité clinique" },
  { id: "remplacement-medical", motif: /\bremplacez?\s+(?:votre|le)\s+médecin\b|\bprescription\b/gi, message: "conseil ou prescription médicale" },
  { id: "traitement", motif: /\btraitements?\b/gi, message: "conseil thérapeutique" },
];
const NEGATIONS = /\b(pas|sans|aucun|aucune|jamais|ni|non|ne|n')\b/i;

const constats = [];
for (const relatif of CIBLES) {
  const chemin = path.join(root, relatif);
  if (!fs.existsSync(chemin)) { constats.push({ fichier: relatif, ligne: 0, regle: "fichier", message: "fichier cible absent" }); continue; }
  const lignes = fs.readFileSync(chemin, "utf8").split("\n");
  lignes.forEach((ligne, i) => {
    for (const regle of REGLES) {
      regle.motif.lastIndex = 0;
      let correspondance;
      while ((correspondance = regle.motif.exec(ligne)) !== null) {
        const avant = ligne.slice(Math.max(0, correspondance.index - 70), correspondance.index);
        if (NEGATIONS.test(avant)) continue;
        constats.push({
          fichier: relatif,
          ligne: i + 1,
          regle: regle.id,
          message: regle.message,
          extrait: ligne.trim().slice(0, 140),
        });
      }
    }
  });
}

/* Contrôles positifs : les avertissements doivent rester présents. */
for (const relatif of ["index.html", "v2.html"]) {
  const chemin = path.join(root, relatif);
  if (!fs.existsSync(chemin)) continue;
  const texte = fs.readFileSync(chemin, "utf8").toLowerCase();
  if (!/pédagogique|pedagogique/.test(texte) || !/diagnostic|diagnostiqu|avis médical/.test(texte)) {
    constats.push({ fichier: relatif, ligne: 0, regle: "avertissement", message: "avertissement pédagogique absent" });
  }
}

const rapport = {
  generated: new Date().toISOString(),
  root,
  cibles: CIBLES.length,
  exemptions: EXEMPTIONS,
  regles: REGLES.map((r) => r.id),
  constats,
  verdict: constats.length ? "ECHEC" : "OK",
};
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, `${JSON.stringify(rapport, null, 1)}\n`);
console.log(`[lint:claims] ${rapport.verdict} — ${CIBLES.length} fichiers ciblés, ${constats.length} constat(s)`);
for (const c of constats.slice(0, 10)) console.log(`  ${c.fichier}:${c.ligne} [${c.regle}] ${c.message} — ${c.extrait || ""}`);
if (constats.length) process.exit(1);
