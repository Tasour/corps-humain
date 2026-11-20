---
name: Textures web — assemblage CC0
description: Construire des textures tissulaires pour l'atlas CORPS a partir de sources CC0 verifiees (Poly Haven, ambientCG), avec provenance et validation visuelle.
---

# Textures web — assemblage CC0

Utiliser quand une correction de la todolist porte sur `materiau` ou quand on veut remplacer
l'aspect plastique par une reponse tissulaire crédible.

## Sources autorisees

- **Poly Haven** — CC0, API `https://api.polyhaven.com`, telechargement sans compte.
- **ambientCG** — CC0 1.0, API `https://ambientcg.com/api/v2`, telechargement sans compte.
- **3DTextures.me / cgbookcase / Kenney** — CC0, verify la page de licence a chaque usage.

## Sources interdites

- **ShareTextures** — licence « Custom CC0 » qui interdit la redistribution des fichiers.
- **FreePBR** — licence propre, usage commercial payant.
- Toute image trouvee par recherche d'images sans licence explicite verifiee.

La licence CC0 permet modifier, redistribuer et utiliser commercialement sans attribution.
L'attribution reste recommandee et tracee dans le manifeste.

## Chaine d'assemblage

1. **Tissu cible** : os cortical, os spongieux, muscle, foie, poumon, graisse, cartilage,
   vaisseau, nerf, peau. Un seul tissu par passe.
2. **Acquisition** : via le plugin `corps-research` (`corps_texture_fetch`) ou directement
   l'API, telecharger 1K ou 2K : albédo, rugosite, normal (GL), AO, deplacement si present.
3. **Licence** : `corps_license_check` avant integration ; consigner URL, auteur, licence,
   date d'acces et empreinte SHA-256.
4. **Assemblage** : recadrage tuile (Pillow), normalisation colorimetrique vers la palette de
   l'atlas, melange multi-echelle avec un bruit procede deterministe (graine affichee).
   Aucune texture ne doit inventer un detail anatomique absent de la geometrie.
5. **Ecriture** : `public/textures/<tissu>/` avec `manifest.json` (provenance, licence, graine,
   empreintes, resolution) et images optimisees (JPEG/PNG/WebP selon le canal).
6. **Validation** : recapturer 8 angles avec `npm run captures:revue`, comparer avant/apres avec
   `npm run test:visuel`, verifier que la geometrie et les metriques d'audit sont inchangees.

## Budget

- 1K pour les petits objets, 2K maximum pour les gros ; au plus 4 cartes par tissu.
- Cible ≤ 8 Mo de textures additionnelles par tissu, ≤ 60 Mo au total.
- Si le budget est depasse : reduire la resolution ou rester au procedural documente.

## Regles

- Ne jamais remplacer une correction topologique par une texture.
- Ne jamais presenter une texture CC0 comme une image anatomique reelle.
- Toujours fournir la paire avant/apres et le verdict dans `todolist-fait-a-verifier`.

Voir `references/licences.md` pour les URLs verifiees et `scripts/assemble-texture.py` pour
l'outil d'assemblage.
