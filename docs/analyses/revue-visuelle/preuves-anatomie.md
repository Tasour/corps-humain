# Vague de preuves anatomiques — 20 novembre 2026

12 questions `anatomie_a_valider` ont ete instruites avec l'agent `anatomie-web` et la skill
`anatomie-web`, en croisant au moins deux sources par affirmation. Les preuves sont ecrites
dans `docs/analyses/preuves/VIS-xxxxx.json` et indexees dans `preuves/index.md`.

| ID | Structure | Verdict | Sources | Conclusion |
|---|---|---|---|---|
| VIS-01075 | bone:axis-c2 | a_valider | NCBI StatPearls, FMA12520 | Corps, dens et arc posterior attendus ; maillage trop grossier pour trancher |
| VIS-01081 | bone:body-of-sternum | infirme | IMAIOS, Kenhub | Ce sont des incisures costales, pas des foramens |
| VIS-01086 | bone:bp-bony-pelvis | confirme | NCBI StatPearls, Kenhub | Acetabulum et rami pubiens absents : structure non conforme |
| VIS-01173/1181 | bp-floating-rib-l/r | a_valider | NCBI StatPearls, Kenhub | Tete/gouttiere attendues, col variable selon les sources |
| VIS-01376 | bone:bp-sternum | a_valider | IMAIOS, Kenhub | Aspect de profil variable, pas de correction automatique |
| VIS-01388/1389 | calcaneus-l/r | confirme | NCBI StatPearls, FMA24496 | Tuberosite et sustentaculum devraient etre individualises |
| VIS-01424 | 7e cartilage costal D | a_valider | Wikipedia, IMAIOS | Morphologie variable des cartilages 6–8 |
| VIS-01438 | 10e cartilage costal D | a_valider | IMAIOS, NCBI | 10e cartilage s'unit au 9e, forme variable |
| VIS-01440/1442 | 3e cartilage costal G/D | a_valider | Wikipedia, IMAIOS | Le 3e cartilage monte legerement ; vue de bout trompeuse |

## Decision

**Aucune geometrie n'a ete modifiee.** Les preuves etablissent l'etat de reference ; elles ne
substituent pas une revue anatomique humaine. Les verdicts `confirme` signalent des ecarts
reels, pas des corrections a appliquer aveuglement.

## Vague 2 — 12 questions supplémentaires

Un deuxième lot de 12 preuves a été écrit le même jour (index `preuves/index.md`) :

- **1 infirmé** : `VIS-01377` — les « cupules ovales » du sternum sont des incisures costales normales.
- **1 à valider** : `VIS-01076` — l'épineuse de C2 est généralement bifide mais des variantes non bifides existent ; une seule vue ne suffit pas.
- **10 confirmés** : côtes flottantes non aplaties, cuboïdes sans rainure/surfaces articulaires, phalanges distales des pieds et mains sans tubérosité unguéale, cartilage costal 7 bifide attendu. Tous sont des **limites de résolution des sources**, pas des erreurs d'anatomie à corriger aveuglément.

**Aucune géométrie modifiée.** Les 24 preuves écrites à ce jour couvrent 24 des 1 052 questions `anatomie_a_valider`. Les autres restent dans `todolist-active.md`.

Le prochain lot peut être lancé avec `/source-anatomique` ou l'agent `anatomie-web`.

---

*Annexe ajoutée le 20 novembre 2026 (deuxième vague de preuves).*
