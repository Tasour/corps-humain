# Audit produit — 22 novembre 2026

## État mesuré

| Métrique | Femme | Homme | Cible |
|---|---|---|---|
| Structures | 133 | 128 | complètes |
| Os du rig | 31 | 31 | 31+ |
| Étirement arêtes >10 mm | 1,67× | 1,94× | <2× ✅ |
| Arêtes >2× | 0 | 0 | 0 ✅ |
| Sommets orphelins | 0 | 0 | 0 ✅ |
| Couches animées | 133/133 | 128/128 | 100 % ✅ |
| Peau manifold | oui | 2 bords / 41 442 faces | oui |
| GLB optimisé | 8,26 Mo | 7,87 Mo | <25 Mo ✅ |
| Animations | 1 (salsa) | 1 (salsa) | 6 |
| Couches internes | statiques? non, animées | animées | animées ✅ |
| Collisions inter-couches | non quantifiées | non quantifiées | 0 mesurée |
| Intégration web | non | non | faite |

## Défauts classés

### P0 — bloque le produit fini
1. Bibliothèque d'animations réduite à un seul clip (marche, course, geste calme, idle manquants).
2. Intégration des GLB dans `v2.html` absente.
3. Rythme scapulo-huméral non piloté séparément.
4. Peau homme non totalement manifold (2 arêtes).

### P1 — qualité
5. Auto-intersections de peau non corrigées.
6. Pénétrations inter-couches non quantifiées.
7. Matériaux PBR/SSS approximatifs.
8. Sous-division de peau non faite.
9. IK pieds/mains absent.

### P2 — finition
10. Caméras de dos et coupe sagittale absentes.
11. Tests de régression visuelle partiels.
12. Documentation d'intégration web absente.

## Ordre recommandé
P0.1 → P0.2 → P0.3 → P0.4 → P1.5 → P1.6 → P1.7 → P1.8 → P1.9 → P2.
