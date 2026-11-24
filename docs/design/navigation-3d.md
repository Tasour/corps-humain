# Navigation 3D — règles universelles appliquées

Consulté le 2026-11-24.

## Sources

- Apple HIG — Gestures : gestes standard partout, alternatives obligatoires.
  https://developer.apple.com/design/human-interface-guidelines/gestures
- Apple HIG — Accessibility : cibles ≥ 44 pt, espacement, gestes simples.
  https://developer.apple.com/design/human-interface-guidelines/accessibility
- Nielsen Norman Group — Touch targets : ≥ 1 cm, Fitts’ Law.
  https://www.nngroup.com/articles/touch-target-size/
- Nielsen Norman Group — Fitts’ Law : cibles grandes et proches.
  https://www.nngroup.com/articles/fitts-law
- Marchal et al., INTERACT 2013 — multi-touch 3D navigation : réduire la distance
  sémantique et articulatoire, boucle visuelle continue.
  https://gery.casiez.net/publications/Interact2013-marchal.pdf
- ArcGIS Scene Viewer, BIMx, MeshInspector, Nira, Stitch3D : conventions
  3D desktop et tactile (orbite, pan, zoom, recadrage).

## Règles appliquées

| Action | Souris / clavier | Tactile |
|---|---|---|
| Orbiter | clic gauche glissé | 1 doigt |
| Pan | clic droit ou molette glissé, flèches | 2 doigts |
| Zoom | molette, `+`/`-` | pincement, boutons |
| Recadrer | double-clic, `F` | double-tap, bouton |
| Vue initiale | `R` | bouton Reset |
| Vues prédéfinies | `1`–`6` | — |
| Rotation / inclinaison | `A`/`D`, `W`/`S` | 1 doigt |

Cibles tactiles : 44×44 px, espacement 8 px. Curseur `grab`/`grabbing`.
Focus clavier visible. Amortissement activé sauf `prefers-reduced-motion`.
Rendu à la demande avec pause sur `document.hidden`. DPR plafonné à 2.

## Pivot appliqué

Le pivot d'orbite est le centre de la boîte englobante du modèle, jamais le
centre du viewport. Le double-clic et le double-tap déplacent le pivot sur le
point touché (ArcGIS Scene Viewer, Nira). Les carrés du sol ne participent pas
au calcul du pivot mais restent dans le cadrage.
