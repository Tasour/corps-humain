# ADR-0002 — Socle Z-Anatomy stock avec Blender compatible

- Statut : proposé
- Date : 2026-11-21
- Décideurs : à désigner
- Drivers : à préciser

## Contexte

Reprise à zéro du modèle 3D. Nécessite Blender 3.6-4.4 (Startup.blend incompatible >=4.5), exclusions NC et décision de relicencier le code en CC BY-SA 4.0 selon le propriétaire amont.

## Options envisagées

| Option | Avantages | Inconvénients | Coût | Réversibilité |
|---|---|---|---|---|
| Stock brut avec exclusions NC | undefined | undefined | élevé | moyenne |
| Garder l'assemblage actuel | undefined | undefined | nul | élevée |

## Décision

Passer au socle Z-Anatomy stock, exporter avec Blender compatible, exclure les composants NC et soumettre la licence du code à validation humaine avant bascule.

## Conséquences

- Positives : source unique ; provenance amont ; export reproductible
- Négatives acceptées : code à relicencier ; couverture à remesurer
- À surveiller : version Blender ; issues licence amont #6

## Preuves

- `docs/veille/2026-11-21-socle-propre-benchmark.md`
- `Z-Anatomy/Models-of-human-anatomy License.txt`
- `moueza/Z-Anatomy README (compatibilité Blender)`

## Révision

Condition de révision à définir (métrique ou date).
