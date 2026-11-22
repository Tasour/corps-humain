# Animation anatomique complète — homme et femme

Deux scènes Blender autonomes, une par sexe, avec peau, squelette, muscles, organes,
vaisseaux et nerfs animés ensemble par un vrai mouvement de danse.

## Scènes

- `docs/humain-femme-complet.blend` — 133 structures, 31 os
- `docs/humain-homme-complet.blend` — 128 structures, 31 os

## Sources et licences

Voir `docs/analyses/sources-licences-animation.md` et `docs/ATTRIBUTION-OPEN-ANATOMY.md`.
Modèles CC BY 4.0, mouvement CMU free-use (interdiction de revente des données).

## Pipeline reproductible

Dans une session Blender MCP (`~/.config/opencode/scripts/blender-ensure.sh`) :

```python
HUMAIN_SEX = 'female'   # ou 'male'
exec(open('scripts/build-humain-rig.py').read())
# homme uniquement : transfer-male-skin.py + 18× smooth-male-skin.py
exec(open('scripts/procedural-internal-weights.py').read())
exec(open('scripts/fix-orphans.py').read())
MOCAP_CLIP = '/home/tasour/.cache/corps-sources/mocap-cmu/60_10__salsa-dance__60fps.bvh'
exec(open('scripts/retarget-mocap.py').read())
```

Puis, selon le sexe : `clamp-mocap.py` (femme) ou `soften-mocap.py` (homme), et
`fix-neck-weights.py` si nécessaire.

## Vérification

```python
exec(open('scripts/check-orphans.py').read())
exec(open('scripts/verify-10mm.py').read())           # étirement des arêtes > 10 mm
exec(open('scripts/check_all_layers_move.py').read()) # couches animées ensemble
```

Vidéos : `VIDEO_PREFIX='femme'` puis `exec(open('scripts/render-final-video.py').read())`.

## Résultats mesurés

Voir `docs/analyses/verification-4-couches.json`.

## Limites

- Le jeu de données open-anatomy-3d regroupe les structures (145 au maximum) : ce n'est pas un atlas clinique.
- La peau est ouverte aux extrémités, ce qui rend les tests d'étanchéité BVH non fiables sur les membres.
- Les collisions inter-couches ne sont pas quantifiées.
- Le rythme scapulo-huméral n'est pas piloté séparément : les clavicules sont animées par le mocap.

## État final (23 novembre 2026)
- 66 os par corps (62 + 4 contrôles IK), influence IK 0,02.
- 6 animations NLA par corps et dans les GLB optimisés (8,27 Mo chacun).
- Peau PBR/SSS avec pores et variation de teinte ; coupes frontale et sagittale.
- Collisions : 381 paires mesurées, 0 pathologique.
- Mouvements secondaires : respiration, poumons, cœur, seins.
- Tests : `npm run test:produit`, `npm run test:web-anime`, CI dédiée.
- Limite résiduelle : glissement des pieds de 1,37 m/frame mesuré, non corrigé.
