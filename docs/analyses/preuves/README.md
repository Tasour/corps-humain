# Preuves anatomiques et textures

Ce dossier contient les preuves produites par le plugin `corps-research` et l'agent
`anatomie-web`, une par entree `VIS-xxxxx` de la todolist.

Chaque fichier JSON consigne :

- l'affirmation prouvee (`claim`) ;
- le verdict (`confirme`, `infirme`, `a_valider`) et la confiance ;
- les sources avec URL, identifiant (FMAID), licence, date d'acces et extrait court ;
- la date d'enregistrement.

Aucune preuve ne suffit a elle seule pour modifier la geometrie : la paire avant/apres et le
verdict dans `todolist-fait-a-verifier` restent obligatoires.
