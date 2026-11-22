# Fiche produit — Corps humain animé complet

## Public cible et usages
- Étudiants et enseignants d'anatomie : exploration des systèmes peau / muscles / squelette / organes.
- Artistes 3D : référence anatomique animée pour le rig de personnages.
- Développeurs de l'app `corps-humain` : intégration de corps réalistes et animés.

## Définition de « fini »
Un corps est considéré fini quand : la peau est étanche et lisse, les 4 systèmes sont présents et animés ensemble, le rig est contraint anatomiquement, les animations bouclent sans saut, les métriques de déformation sont vertes, et le GLB s'importe sans erreur dans l'app web.

## Livrables
- `docs/humain-femme-complet.blend`, `docs/humain-homme-complet.blend`
- `docs/videos/{femme,homme}-validation.mp4`
- `docs/analyses/verification-4-couches.json`, `docs/analyses/completude-couches.json`
- 2 GLB animés, `docs/PRODUIT-FINAL.md`, `docs/ANIMATION-COMPLETE.md`

## Critères d'acceptation chiffrés
- Étirement des arêtes > 10 mm : < 2× sur 10 frames de contrôle.
- 0 sommet orphelin ; 100 % des couches animées ensemble.
- Symétrie du rig : erreur max < 1 mm.
- Boucle continue (transition de 10 frames).
- GLB : < 25 Mo par corps, import three.js sans erreur.

## Cible de diffusion
Blender 3.6+ (scènes éditables) et application web `corps-humain` (`v2.html`).

## Budget géométrique
Peau ≤ 40 k sommets, squelette ≤ 25 k, muscles ≤ 180 k, organes ≤ 60 k, vaisseaux/nerfs ≤ 60 k par corps.

## Licence et attribution
Modèles CC BY 4.0 (open-anatomy-3d), mouvement CMU free-use (interdiction de revente des données).
Ligne de crédit obligatoire conservée dans `docs/ATTRIBUTION-OPEN-ANATOMY.md` et `docs/analyses/sources-licences-animation.md`.
