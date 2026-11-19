# Plan de route — qualité 3D « 100 % des structures »

**Version 1.0 — 19 novembre 2026**
Ce plan applique la [`méthodologie qualité 3D`](METHODOLOGIE-QUALITE-3D.md). Il répond à un
objectif unique : **chaque élément du corps humain doit être présent, juste, détaillé et lisible
sous tous les angles, pour un étudiant en médecine.**

Règle de conduite : on ne passe à la phase suivante que si la **sortie mesurable** de la phase
courante est atteinte. Une phase peut être partielle, mais elle doit alors être annoncée comme
telle, avec ses chiffres.

---

## 1. Diagnostic de départ (19 novembre 2026)

| Fait mesuré | Valeur | Conséquence |
|---|---:|---|
| Structures au manifeste | 2 039 | couverture large mais incomplète |
| Triangles au LOD `high` | 5 009 243 | volume correct, répartition mauvaise |
| Structures étanches et manifold | 1 107 (54,3 %) | 932 structures à réparer ou à classer |
| Structures à winding inversé | 466 | éclairage intérieur, rendu faux |
| Structures non-manifold | 124 | surfaces non fiables |
| Faces dupliquées | 496 | surcoût et artefacts de shading |
| Structures pluri-composantes | 620 | à trier : défaut ou anatomie ? |
| Structures plafonnées à 12 000 tris | 24 | détail source jeté |
| Triangles source au-delà du plafond (borne sup.) | 1 302 552 | gain potentiel, agrégats exclus déduits |
| Structures < 1 000 tris | 954 | détail insuffisant ou structure minuscule |
| Arête P99 médiane (os / muscle / organe) | 9,0 / 12,4 / 6,9 mm | détail millimétrique impossible |
| Éléments médians manquants | œsophage, poumons entiers, hémisphères | trous anatomiques |

**Conclusion :** le pipeline n'est pas le seul coupable. Les sources ouvertes actuelles sont
grossières. Il faut donc traiter **trois fronts en parallèle** : intégrité (rapide, gain visible),
résolution (plafond à retirer), et acquisition de sources fines (lent, structurant).

---

## 2. Vue d'ensemble des phases

| Phase | Objectif | Sortie mesurable | Effort indicatif | Dépend de |
|---|---|---|---:|---|
| **P0** | Instrumenter | audit `high`, scorecard, 8 angles, Hausdorff, porte CI | 2 j (**fait**) | — |
| **P1** | Vérité des données | 100 % inventaire, 0 doublon, TA2 complet | 3 j | P0 |
| **P2** | Intégrité et orientation | 0 winding inversé, 0 non-manifold, 0 face dupliquée | 5 j | P0 |
| **P3** | Restituer la résolution source | 0 structure plafonnée, +1,30 M tris | 3 j | P2 |
| **P4** | Pilote haute résolution (5 structures) | 5 structures S3 aux cibles G4 | 10–15 j | P3 |
| **P5** | Assemblage | 0 fente > 0,5 mm sur les captures prioritaires | 5 j | P4 |
| **P6** | Matériaux et rendu | G6 satisfait sur les 5 pilotes | 8 j | P4, source textures |
| **P7** | Déploiement par système | 11 systèmes au statut S3 | 15–25 j | P5, P6 |
| **P8** | Validation et release | revue anatomiste + test étudiants + perf | 5 j | P7 |

---

## 3. P0 — Instrumenter (fait, 19 novembre 2026)

**But :** rendre toute affirmation vérifiable.

Livré :

1. **Audit topologique** — `scripts/audit-qualite-3d.mjs`, `npm run audit:3d` : topologie,
   orientation, densité, arêtes, composantes ; rapport JSON + Markdown en ~5 s.
2. **Harnais de captures 8 angles** — `scripts/captures-qualite-3d.mjs`, `npm run captures:3d` :
   1024 × 1024, fond `#1b1f24`, ombres et sol masqués, LOD `high`, 8 directions canoniques,
   cadrage sur les 8 coins de la boîte, coupe locale pour le genou, SHA-256 par image.
   **40 captures, 0 débordement** sur les 5 pilotes.
3. **Scorecard** — `scripts/scorecard-qualite-3d.mjs`, `npm run scorecard:3d` : statut S0–S4,
   portes G0/G2/G3, bloqueurs par structure, classification provisoire ouvert/fermé.
   Résultat après reconstruction : **1 355 S1, 684 S2, 0 S3** ; G0 1 979, G2 1 515, G3 950
   (puis P2 : 1 096 S1, **943 S2**, G3 **1 269**).
4. **Porte CI** — `npm run audit:3d:baseline` puis `npm run audit:3d:check` : comparaison
   **structure par structure** à `docs/analyses/qualite-3d-baseline.json`, pas seulement aux
   totaux.
5. **Écart de silhouette** — `scripts/hausdorff-v2.mjs`, `npm run hausdorff:3d` : Hausdorff
   échantillonné LOD contre LOD avec BVH de triangles. `medium` : médiane 0 mm, 271 > 0,5 mm,
   47 > 2 mm ; `low` : médiane 0,39 mm, 916 > 0,5 mm, 323 > 2 mm.
6. **Réconciliation dataset / pipeline** (jour 2) : le défaut n'était pas un manifeste périmé
   mais un seuil de dégénérescence absolu (`cross² ≥ 1e-16` ≈ 0,005 mm²) qui supprimait
   jusqu'à 95 % des triangles d'un petit objet. Corrigé (aire ≥ 1e-12 m², chaîne LOD
   `high` → `medium` → `low`), puis dataset reconstruit. `organ:cavernous-sinus-r` :
   **512 → 9 728 tris** ; LOD non monotones **16 → 0** ; étanches **1 107 → 1 341**.

**Constats P0 qui commandent la suite :**

- `organ:bp-heart` ne contient **pas le myocarde** (11 pièces : valves, sinus coronaire, veines).
  Le pilote « cœur » est l'union des 4 chambres Z-Anatomy et des valves.
- L'inventaire surestime les triangles de certains objets Z-Anatomy : ne pas en déduire des
  « pertes de détail » ; comparer toujours le maillage généré au maillage source réel.
- Les mains dépassent de ~2,5 cm l'enveloppe cutanée grossière : avertissement explicite,
  à traiter en P5. Les pilotes révèlent aussi des trous de complétude : pas de ménisques ni
  de ligaments du genou, pas d'œsophage, pas de poumons entiers, pas d'hémisphères.

**Sortie :** un tableau de bord unique où chaque structure a un statut et des preuves
(`docs/analyses/qualite-3d/scorecard.md`, `hausdorff.md`, `index.json`).

---

## 4. P1 — Vérité des données

**But :** aucun élément attendu ne doit manquer, aucun ne doit être en double.

Tâches :

1. **Réconcilier l'inventaire** avec le manifeste : 2 039 structures rendues contre l'inventaire
   anatomique complet ; lister les absents.
2. **Combler les trous médians** : œsophage (entre pharynx et estomac), poumons entiers,
   hémisphères cérébraux, veines caves, uretères, surrénales — vérifier chaque absent.
3. **Paires latérales** : détecter les structures sans pendantcontrolatéral et documenter.
4. **Doublons inter-sources** : étendre la déduplication par `(nom, côté)` aux cas de synonymie.
5. **TA2** : passer de 1 979/2 039 à 100 %, ou documenter chaque absence.
6. **Fiche de provenance** par structure : source, identifiant source, licence, version, auteur
   de la correction.

**Sortie :** G1 satisfait ; rapport `docs/analyses/completude-3d.md`.

**Risque :** certains éléments n'existent dans aucune source ouverte. Dans ce cas, la fiche dit
« absent, source indisponible », elle ne fabrique pas une forme plausible.

---

## 5. P2 — Intégrité topologique et orientation

**But :** supprimer les défauts qui rendent une structure fausse ou mal éclairée.

### 5.1 Classification préalable (indispensable)

Créer `docs/qualite/classification-structures.json` avec, par structure :

- `closed` (os plein, organe plein, ventre musculaire) ou `open` (séreuse, fascia, peau,
  vaisseau coupé, tendon en feuille) ;
- `componentsExpected` : 1, ou justification anatomique ;
- `cutPlanes` : plans de coupe déclarés pour les surfaces ouvertes ;
- `priority` : pilote, système, ou standard.

Sans cette classification, on corrigerait des anatomies correctes.

### 5.2 Corrections, dans cet ordre

1. ✅ **Winding par composante** : volume signé local, composantes fermées uniquement ;
   inverser indices et normales si négatif. Résultat : **566 → 0**.
   Le scorecard passe de 684 à **943 structures S2**, G3 de 950 à **1 269**.
2. ✅ **Faces dupliquées** : suppression à la source **et après chaque simplification**.
   Résultat : **521 → 0**.
3. **Arêtes non-manifold** : diagnostic par structure, correction ou exclusion documentée.
   Cible : **124 → 0**.
4. **Soudure intra-structure** à 0,01 mm, puis recalcul des normales avec angle seuil.
5. **Faces dégénérées** : déjà à 0, maintenir.
6. **Composantes** : conserver les justifiées, souder les fragments d'une même structure.

### 5.3 Preuve

- `npm run audit:3d` avant/après, mêmes paramètres.
- Captures avant/après sur 10 structures témoins (fémur, cœur, foie, diaphragme, mandibule,
  2 muscles, 2 os, 1 organe creux).
- Aucune régression des 35 tests 3D ni des 52 tests de groupes.

**Sortie :** G2 et G3 satisfaits sur 100 % des structures fermées ; 0 winding inversé.

**Gain attendu :** rendu nettement plus juste sur 466 structures, sans toucher aux sources.

---

## 6. P3 — Restituer la résolution disponible

**But :** arrêter de jeter le détail que les sources contiennent déjà.

Tâches :

1. **Retirer le plafond `high: 12000`** et définir le `high` comme « source complète ».
2. **Construire la chaîne LOD depuis le `high`** : `medium` et `low` simplifiés depuis le
   maillage fin, avec `LockBorder` et repli sans contrainte de bord.
3. **Budgéter** : le `high` ne doit pas être chargé pour tout le corps ; le streaming par
   structure et le LOD automatique existants doivent absorber le surcoût.
4. **Mesurer** : triangles, poids gzip, temps de chargement, fps, mémoire.
5. **Seuils adaptatifs** : viser la densité par classe (méthodologie §G4) quand la source le
   permet ; sinon, consigner la limite de source.

**Sortie :** 0 structure plafonnée ; `high` ≥ source ; **jusqu'à +1,30 M triangles**
récupérés (borne supérieure, agrégats exclus déduits) ; poids `high` maîtrisé
(objectif ≤ 90 Mo gzip, sinon streaming plus agressif).

**Risque :** explosion mémoire et fps. Mitigation : le `high` reste paresseux, chargé par
structure ou par système, jamais pour les 2 039 à la fois.

---

## 7. P4 — Pilote haute résolution sur 5 structures

**But :** prouver qu'on peut atteindre la cible médicale, avant de généraliser.

Structures pilotes, choisies pour leurs difficultés complémentaires :

| Structure | Difficulté | Ce qu'elle valide |
|---|---|---|
| **Cœur** | cavités, valves, gros vaisseaux | organe creux + arbre vasculaire |
| **Encéphale** | gyri, scissures, ventricules | surface plissée + hémisphères |
| **Main** | 27 os, tendons, gaines | petite échelle + articulations |
| **Face** | os fins, cartilages, muscles peauciers | silhouette et lignes médianes |
| **Genou** | os, cartilage, ménisques, ligaments | contact entre structures |

### 7.1 Matrice de sources à évaluer

| Source | Type | Licence à vérifier | Résolution attendue |
|---|---|---|---|
| Human Reference Atlas (HRA / HuBMAP) | organes de référence 3D | CC BY 4.0 (à confirmer) | haute, par organe |
| OpenAnatomy | exports Slicer, atlas | CC BY 4.0 (à confirmer) | moyenne à haute |
| Z-Anatomy (sources Blender) | maillages complets | CC BY-SA 4.0 | moyenne, variable |
| Visible Human Project (NLM) | cryosections + segmentations | domaine public avec attribution | très haute, bruitée |
| BodyParts3D 4.0 | maillages japonais | CC BY 4.0 | moyenne |
| NIH 3D Print Exchange | modèles médicaux | variable, à vérifier | variable |
| Modèles commerciaux (Zygote, etc.) | haute résolution | payante | très haute |

**Aucune source n'est retenue avant vérification écrite de sa licence et de sa compatibilité
avec CC BY-SA 4.0.** Une source non compatible ne peut pas être mélangée au jeu actuel.

### 7.2 Procédure par structure

1. Acquérir la source, consigner licence, version, auteur.
2. Recadrer et **enregistrer** dans le repère existant (même échelle, même orientation, même
   position) ; mesurer l'écart de repositionnement.
3. Nettoyer : souder, orienter, supprimer les composantes parasites.
4. Simplifier vers un `high` cible et un `medium` / `low` dérivés.
5. Mesurer G2–G4 et l'écart de silhouette avec la source.
6. Capturer 8 angles, comparer côte à côte avec la version actuelle.
7. Revue experte (anatomiste) : liste de défauts, corrections, nouvelle passe.
8. Décision : adopter, adapter, ou rejeter avec motif.

**Sortie :** 5 structures au statut S3, avec densité et arête P99 dans les cibles, captures 8
angles validées, et un **rapport de comparaison** chiffré.

**Risque majeur :** licence ou qualité insuffisante. Mitigation : évaluer 2 sources par
structure ; si aucune ne convient, consigner la limite et garder la meilleure version actuelle
sans la déclarer « médicale ».

---

## 8. P5 — Assemblage

**But :** supprimer les fentes et les lignes médianes qui trahissent le collage de maillages.

Défauts connus, à traiter dans cet ordre :

1. **Ligne médiane** des muscles abdominaux et du rachis.
2. **Épaules** : écart entre ceinture scapulaire, humérus et muscles deltoïdiens.
3. **Hanches** : écart entre bassin, fémur et muscles fessiers.
4. **Mains et pieds** : doigts fondus, phalanges disjointes.
5. **Face** : paupières, lèvres, ailes du nez.

Méthode : mesure géométrique de proximité entre structures voisines + captures 8 angles.
On ne soude pas deux structures : on ajuste les extrémités, on ajoute la structure manquante
(ex. cartilage, bourse), ou on déclare le contact légitime.

**Sortie :** 0 fente > 0,5 mm sur les captures des 5 pilotes et des 10 structures témoins.

---

## 9. P6 — Matériaux et rendu

**But :** remplacer l'aspect « plastique » par une réponse tissulaire crédible.

Tâches :

1. Trouver une source de textures **CC0 / CC BY** (scan de tissu, photos normalisées) ou
   construire des textures procédurales multi-échelles assumées comme telles.
2. Une famille de matériaux par tissu : os, corticale/spongieux, muscle, foie, poumon, graisse,
   cartilage, vaisseau, nerf, peau.
3. Cartes albédo + rugosité + normale + AO, résolution adaptée à la taille de la structure.
4. Approximation de diffusion sous-surface pour la peau et les organes mous (sans prétendre à la
   simulation physique exacte).
5. Éclairage studio et environnement IBL cohérents ; vérifier sous 8 angles et 2 températures.
6. Aucune texture ne doit inventer un détail anatomique absent de la géométrie.

**Sortie :** G6 satisfait sur les 5 pilotes ; rapport de comparaison visuelle.

**Dépendance :** chantier 2 (PBR) actuellement bloqué faute de source de textures. Ce plan le
débloque en acceptant explicitement une phase procédurale documentée comme telle.

---

## 10. P7 — Déploiement par système

Ordre de déploiement, du plus visible au plus spécialisé :

1. Squelette (axe, crâne, membres).
2. Muscles superficiels, puis profonds.
3. Appareil digestif.
4. Appareil respiratoire.
5. Cœur et vaisseaux.
6. Appareil urinaire et génital.
7. Système nerveux central et périphérique.
8. Organes des sens.
9. Tissus de soutien, fascias, séreuses.

Pour chaque système : scorecard, captures, corrections, puis passage au système suivant.
Aucun système n'est déclaré terminé tant que ses structures ne sont pas S3.

**Sortie :** 11 systèmes au statut S3 ; tableau de bord public.

---

## 11. P8 — Validation et release

1. **Revue anatomiste** : échantillon stratifié de 100 structures, grille de défauts, taux
   d'erreur acceptable < 2 % de défauts majeurs.
2. **Test étudiants** : 10 étudiants en médecine, tâches d'identification sous 8 angles,
   mesure du taux de réussite et du temps.
3. **Performance** : desktop, mobile milieu de gamme, mode hors ligne.
4. **Accessibilité** : non-régression des 19 contrôles.
5. **Release** : version de données, version de méthode, journal des changements.

---

## 12. Les 10 prochains jours (prochaine étape concrète)

| Jour | Action | Preuve attendue |
|---:|---|---|
| 1 ✅ | Harnais de captures 8 angles | 5 structures × 8 captures, 0 débordement |
| 1 ✅ | Scorecard et porte CI | 1 399 S1 / 640 S2 / 0 S3, check OK |
| 2 ✅ | Écart de silhouette LOD | `hausdorff.md`, 271/47 medium, 916/323 low |
| 2 ✅ | **Réconcilier dataset et pipeline** | 0 LOD non monotone, sinus caverneux 512 → 9 728 tris, 1 341 étanches |
| 3 | Valider la classification ouvert/fermé (907 bords, 620 pluri-composantes) | `classification-structures.json` v2 |
| 4 ✅ | Corriger le winding par composante | 566 → 0, audit avant/après, captures témoin |
| 5 ✅ | Supprimer les faces dupliquées | 521 → 0 ; non-manifold 126 → 128 (à traiter jour 6) |
| 6 | Rebuild + audit complet + tests | 35/35 tests, rapport à jour |
| 7 | Retirer le plafond 12 000 et reconstruire la chaîne LOD | 0 plafonnée, +1,30 M tris |
| 8 | Mesurer poids, fps, mémoire ; ajuster le streaming | budget respecté |
| 9 | Matrice de licences des sources haute résolution | tableau signé, 2 sources retenues |
| 10 | Décision go/no-go et rapport de phase | `docs/analyses/qualite-3d-p2.md` |

---

## 13. Indicateurs de succès (tableau de bord)

| Indicateur | Aujourd'hui | Cible P3 | Cible P7 |
|---|---:|---:|---:|
| Structures au statut S3 | 0 | 5 | 2 039 |
| Winding inversé | 0 | 0 | 0 |
| Non-manifold | 124 | 0 | 0 |
| Faces dupliquées | 0 | 0 | 0 |
| Structures plafonnées | 24 | 0 | 0 |
| Triangles `high` | 5,07 M | jusqu'à 6,31 M | selon sources |
| Densité médiane os | 52 tri/cm² | ≥ 80 | ≥ 150 |
| Densité médiane muscle | 35 tri/cm² | ≥ 50 | ≥ 80 |
| Densité médiane organe | 111 tri/cm² | ≥ 150 | ≥ 200 |
| Fentes > 0,5 mm (pilotes) | non mesuré | 0 | 0 |
| Structures avec 8 angles capturés | 5 sujets (40 images) | 5 | 2 039 |
| Validation anatomiste | 0 | 5 | 100 |

---

## 14. Risques et parades

| Risque | Impact | Parade |
|---|---|---|
| Aucune source haute résolution compatible | cible G4 inatteignable | pilote honnête, publier la limite, chercher des sources commerciales |
| Explosion mémoire / fps après suppression du plafond | application inutilisable | LOD paresseux par structure, budget mesuré avant généralisation |
| Correction du winding qui casse un rendu | régression visuelle | captures avant/après, tests 3D, rollback par structure |
| Classification erronée d'une surface ouverte | « réparation » d'une anatomie correcte | revue des cas douteux, déclaration explicite |
| Bandwidth de revue experte | retard | échantillonnage stratifié, grille courte, priorisation des pilotes |
| Dérive marketing (« qualité militaire ») | perte de confiance | aucune affirmation sans rapport chiffré et captures |

---

## 15. Ce qui n'est pas au programme

- Pas de génération de géométrie par IA : une image ne prouve pas une forme 3D.
- Pas de promesse de vérité clinique : l'atlas reste un outil d'apprentissage.
- Pas de correction cosmétique avant la correction topologique.
- Pas de généralisation à 2 039 structures avant validation des 5 pilotes.
- Pas de « terminé » sans captures 8 angles et mesures avant/après.
