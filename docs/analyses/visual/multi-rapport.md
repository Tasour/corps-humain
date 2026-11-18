# Analyse visuelle multi-angles — collisions de cadrage

Généré le 2026-11-18T05:19:06.430Z · base `http://localhost:5199` · seuil **2 %** par bord.

Caméra positionnée directement via `window.__renderer` / `window.__scene` (`window.__v2.camera`), cible OrbitControls `(0, 1, 0)`.
Fond de scène : `#f2ece2` · bande de bord : 1 % de la plus petite dimension.

## Comptage des pixels

| Angle | Position caméra | Pixels non-fond | % de l'image | Bande (px) |
|---|---|---:|---:|---:|
| face | (0, 1.2, 2.5) | 67 841 | 7,553 % | 9 |
| dos | (0, 1.2, -2.5) | 70 219 | 7,818 % | 9 |
| profil-gauche | (2.5, 1.2, 0) | 45 633 | 5,080 % | 9 |
| profil-droit | (-2.5, 1.2, 0) | 46 464 | 5,173 % | 9 |
| zoom-thorax | (0, 1.35, 0.9) | 291 044 | 32,402 % | 9 |

## Débordements par bord (% de la bande couverte par le modèle)

| Angle | Haut | Bas | Gauche | Droite | Pire bord | Verdict |
|---|---:|---:|---:|---:|---|---|
| face | 0,000 % | 2,245 % | 0,000 % | 0,000 % | bas (2,245 %) | FAIL |
| dos | 0,000 % | 2,532 % | 0,000 % | 0,000 % | bas (2,532 %) | FAIL |
| profil-gauche | 0,000 % | 1,982 % | 0,000 % | 0,000 % | bas (1,982 %) | PASS |
| profil-droit | 0,000 % | 2,073 % | 0,000 % | 0,000 % | bas (2,073 %) | FAIL |
| zoom-thorax | 33,058 % | 8,007 % | 0,000 % | 0,000 % | haut (33,058 %) | FAIL |

## Verdict

**FAIL** — 1/5 angles sans débordement.

Captures : `multi-{angle}.png` dans ce dossier.
