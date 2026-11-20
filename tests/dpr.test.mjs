import assert from "node:assert/strict";
import { basePixelRatio, dprSuivant, MAX_DPR, FENETRES_RESTAURATION } from "../src/qualite-rendu.js";

/* BENCH-017 — oracle indépendant : les transitions attendues sont écrites
 * en dur depuis la spécification (seuils 8 ms / 4 ms, pas 0,25, plafond 2),
 * sans appeler l'implémentation pour les calculer. */

const resultats = [];
function verifier(nom, obtenu, attendu) {
  assert.deepEqual(obtenu, attendu, nom);
  resultats.push(nom);
}

verifier("dpr 4 avec cap 4 -> plafond matériel 2", basePixelRatio(4, 4), 2);
verifier("dpr 3 sans cap -> 1,5", basePixelRatio(3), 1.5);
verifier("dpr 1,25 -> 1,25", basePixelRatio(1.25), 1.25);
verifier("dpr invalide -> 1", basePixelRatio(NaN), 1);
verifier("dpr nul -> 1", basePixelRatio(0), 1);

verifier("dégradation 1,5 -> 1,25", dprSuivant({ pixelRatio: 1.5, base: 1.5, avgMs: 20 }),
  { pixelRatio: 1.25, bonnesFenetres: 0, action: "degrade" });
verifier("dégradation 1,25 -> 1", dprSuivant({ pixelRatio: 1.25, base: 1.5, avgMs: 9 }),
  { pixelRatio: 1, bonnesFenetres: 0, action: "degrade" });
verifier("plancher 1 même sous forte charge", dprSuivant({ pixelRatio: 1, base: 1.5, avgMs: 100 }),
  { pixelRatio: 1, bonnesFenetres: 0, action: "aucune" });

/* Hystérésis : la zone 4–8 ms ne change rien et remet le compteur à zéro. */
verifier("zone neutre 6 ms", dprSuivant({ pixelRatio: 1, base: 1.5, avgMs: 6, bonnesFenetres: 2 }),
  { pixelRatio: 1, bonnesFenetres: 0, action: "aucune" });

let etat = { pixelRatio: 1, bonnesFenetres: 0 };
for (let i = 1; i < FENETRES_RESTAURATION; i++) {
  etat = dprSuivant({ ...etat, base: 1.5, avgMs: 2 });
  verifier(`restauration en attente ${i}/${FENETRES_RESTAURATION}`, etat,
    { pixelRatio: 1, bonnesFenetres: i, action: "attend" });
}
verifier("restauration après 3 fenêtres calmes", dprSuivant({ ...etat, base: 1.5, avgMs: 2 }),
  { pixelRatio: 1.25, bonnesFenetres: 0, action: "restaure" });

verifier("base 4 est ramenée à 2 puis dégradée à 1,75", dprSuivant({ pixelRatio: 4, base: 4, avgMs: 20 }),
  { pixelRatio: 1.75, bonnesFenetres: 0, action: "degrade" });
verifier("avgMs invalide ne modifie rien", dprSuivant({ pixelRatio: 1.25, base: 1.5, avgMs: undefined }),
  { pixelRatio: 1.25, bonnesFenetres: 0, action: "aucune" });

/* Invariant global : aucune sortie ne dépasse le plafond matériel. */
for (const dpr of [-1, 0, 1, 1.5, 3, 8, Infinity]) {
  for (const base of [-1, 0, 1, 1.5, 4, 8]) {
    const b = basePixelRatio(dpr, base);
    assert.ok(b >= 1 && b <= MAX_DPR, `base hors bornes : dpr=${dpr} base=${base} -> ${b}`);
    for (const ms of [-5, 0, 4, 6, 8, 20, NaN]) {
      const out = dprSuivant({ pixelRatio: b, base, avgMs: ms });
      assert.ok(out.pixelRatio >= 1 && out.pixelRatio <= MAX_DPR,
        `dpr hors bornes : dpr=${dpr} base=${base} ms=${ms} -> ${out.pixelRatio}`);
    }
  }
}

console.log(`${resultats.length} cas nommés + grillage bornes OK`);
