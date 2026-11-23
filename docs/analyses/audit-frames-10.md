# Audit salsa image par image (toutes les 10 frames) — 2026-11-23

Clip : `salsa`, 4,042 s, 121 frames à 30 fps. Hook déterministe `window.__corps.seekFrame(n)`.
Captures : `docs/harness/contact-male.png`, `docs/harness/contact-female.png` (frames 0, 10, …, 120).

## Grille homme

| Frame | Observation |
|---|---|
| 0–50 | Tapis de peau sain ; **aisselles en nappes partant des côtes** (héritage de l'ancien skin). Bras progressivement abaissés puis relevés. |
| 60–120 | Bras levés puis retour horizontal ; mêmes nappes aux aisselles. Aucun dépassement articulaire visible. |

## Grille femme

| Frame | Observation |
|---|---|
| 0–120 | Silhouette féminine cohérente, pas de nappe axillaire. Jambes écartées mais anatomiquement plausibles. |

## Défauts trouvés et traités

- **Clamp runtime corrompu** : le clamp par Euler puis par angle « identité » tordait la peau (jambes repliées, torse écrasé) aux frames 0–120 des deux sexes. Cause : les rotations des os sont relatives à leur pose de repos, pas à l'identité. Le clamp runtime est désactivé ; les amplitudes restent appliquées à l'export (`scripts/clamp-animations.py`).
- **FIX-32 aisselles homme** : peau masculine remplacée par `anatomy-male.glb` (CC BY 4.0) → capture `v6-male-skin.png`, nappes disparues.
- **FIX-33 muscles tête/visage** : six muscles faciaux nommés ajoutés (frontalis, orbiculaires des yeux, masséters, orbiculaire de la bouche) → capture `v6-muscles.png`.
- **FIX-34/35 organes** : couches reconstruites depuis la source CC BY 4.0, **41 couleurs distinctes** d'après `catalog.json` → capture `v6-organs.png`.
- **FIX-36 vaisseaux** : maillages source complets (22 structures), attachés aux organes.
- **FIX-24 nerfs** : la source ne fournit que 2 structures nerveuses (moelle épinière, nerfs crâniens/oculaires). Couche toujours limitée ; aucun nerf inventé.

## Reste à améliorer

- Les muscles du tronc restent partiels (certains maillages rigides se superposent en vue figée).
- La couche nerfs reste pauvre faute de source anatomique libre.
