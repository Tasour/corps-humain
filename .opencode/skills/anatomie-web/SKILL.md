---
name: Anatomie web — preuve et sourcing
description: Prouver une affirmation anatomique ou preparer une modification 3D avec des sources en ligne citees (FMA, TA2, NCBI, licence et date).
---

# Anatomie web — protocole de preuve

Utiliser cette skill avant toute affirmation anatomique ou correction 3D sur l'atlas CORPS.

## Ordre des sources

1. **FMA / OLS4 / BioPortal** — identifiant `FMAxxxxx`, version 5.1.0, licence CC BY 4.0
   (GitHub `uw-sig/FMA`, BioPortal). Attribution obligatoire si du contenu est redistribue.
   On cite les identifiants, on ne redistribue pas l'ontologie.
2. **Terminologia Anatomica (TA2)** — nomenclature de reference.
3. **AnatomyTOOL** — constructions anatomiques, quiz et Figures par systeme.
4. **NCBI Bookshelf / PubMed** — articles et livres avec DOI/PPMID.
5. **Z-Anatomy / BodyParts3D** — sources de maillages de l'atlas, pour la geometrie.

Toute autre source (Wikipedia, blogs, forums) est **secondaires** : elle ne suffit jamais seule.

## Protocole en 6 temps

1. **Question** : ecrire precisement ce qui doit etre prouve (ex. « le muscle X a-t-il
   trois chefs ? »).
2. **Identifier** : trouver le FMAID et le libelle canonique.
3. **Croiser** : chercher au moins DEUX sources independantes. Une seule source = confiance
   moyenne maximum.
4. **Extraire** : noter l'URL exacte, la licence, la date d'acces, un extrait court (1 phrase).
5. **Decider** : `confirme`, `infirme` ou `a_valider`. En cas de contradiction entre sources,
   le verdict est `a_valider` et les deux citations sont conservees.
6. **Tracer** : ecrire la preuve via l'outil `corps_evidence_add` du plugin `corps-research`,
   puis lier l'entree `VIS-xxxxx` de la todolist.

## Regles

- Ne jamais confondre un nom de structure avec une geometry : une structure peut avoir un
  FMAID et etre absente des maillages disponibles.
- Ne jamais inventer une structure pour "combler un trou" anatomique.
- Ne jamais deduire une fonction clinique d'une forme 3D.
- Toujours separer « fait source » et « suggestion de correction 3D ».

## Mode d'emploi de l'agent

L'agent `anatomie-web` applique cette skill et retourne un JSON de preuve. L'agent principal
ne modifie la geometrie qu'apres avoir recu ce JSON et l'avoir lie a une paire avant/apres.
Voir `references/sources.md` pour les URLs et licences verifiees.
