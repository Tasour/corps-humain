# Benchmark — socle 3D propre (reprise à zéro)

**Date : 21 novembre 2026 · Skill : `benchmark-concurrentiel` (mode complet)**

## 0. Cible et requêtes

Cible : remplacer l'assemblage CORPS actuel par un **socle unique Z-Anatomy stock**, exporté avec Blender, sans correctifs anatomiques inventés.

Requêtes utilisées le 21/11/2026 :
`Z-Anatomy stock Blender export all meshes clean single source CC BY-SA 4.0 2026`.
Sources : README et `License.txt` amonts, issue #6 du dépôt officiel, page AnatomyTOOL Open3Dmodel, dépôt `moueza/Z-Anatomy`, guide `pedram-fm/human-anatomy`.

## 1. Candidats

| Candidat | Licence prouvée | Couverture | Qualité de surface | Reproductibilité | Verdict |
|---|---|---|---|---|---|
| **Z-Anatomy amont (stock)** | CC BY-SA 4.0 (`License.txt`) ; amont BP3D CC BY-SA 2.1 JP | squelette, muscles, organes, vaisseaux, nerfs | retopo d'origine, artefacts « hookés » documentés | `.blend` + scripts, mais version Blender critique | 🟡 sous conditions |
| Open3Dmodel (AnatomyTOOL) | CC BY-SA | ZA retopologié | surface améliorée (LUMC/UMCU) | pipeline non ouvert | 🟡 |
| BodyParts3D 4.0 | CC BY 4.0 officiel (27/02/2025) | organes/os, muscles moins complets | géométrie ancienne | archive zip vérifiable | 🟢 mais couverture insuffisante |
| ecorche | code MIT, modèle CC BY-SA 4.0 | os + muscles uniquement | excellent (miroir, règles de couche) | build byte-identique | 🔴 multi-sources |

**Retenir Z-Anatomy stock** : c'est le seul socle unique qui couvre les grandes familles demandées, malgré deux conditions ci-dessous.

## 2. Conditions bloquantes découvertes

1. **Licence du code** : dans l'issue officielle #6 (juillet 2026), le propriétaire écrit : « *An app that would be developed to read this model would have to be under the same license and to share its code openly* » et « *The whole code has to be released* ». Le code CORPS est actuellement **MIT**, les données CC BY-SA 4.0. Passer au socle Z-Anatomy impose donc une **décision produit/juridique** : relicencier le code en CC BY-SA 4.0, ou ne pas intégrer ce socle. À valider par toi.
2. **Version Blender** : le dépôt `moueza/Z-Anatomy` documente que le `Startup.blend` original est compatible avec **Blender 3.6 à 4.4**, et **incompatible avec Blender ≥ 4.5** (objets recentrés, script KO). La version disponible dans les dépôts Arch est **5.2.2** → il faut installer une version compatible (3.6/4.4, probablement via AUR) avant d'exporter le stock.
3. **Composants NC** : oreille interne CC BY-NC-SA 4.0, rein CC BY-NC 4.0, Brainder/White matter sans licence → exclusions obligatoires pour rester CC BY-SA 4.0.

## 3. Décision et attribution

Socle retenu : **Z-Anatomy amont**, commit à épingler, exports via Blender compatible, exclusions NC documentées.

Attribution à conserver :
> Z-Anatomy — Gauthier Kervyn et contributeurs, CC BY-SA 4.0. Models based on BodyParts3D, © Database Center for Life Science, CC BY-SA 2.1 Japan.

Blocs d'attribution 🟢 à générer uniquement si du code externe est réutilisé (Open3Dmodel/ecorche) ; aucun code copié dans cette session.

## 4. Limites

- Surface publique uniquement ; aucune tentative de contournement des liens Google Drive.
- Chiffres de couverture non re-mesurés ici : ils le seront par le harnais d'export.
- Ce rapport ne modifie aucun code ni jeu de données.
