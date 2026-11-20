# Pilote texture — proxy os

**Date : 20 novembre 2026 · Statut : asset produit, non encore branche dans le moteur.**

## Objectif

Verifier la chaine `textures-web` de bout en bout sur un tissu, sans toucher a la geometrie
ni au rendu de l'application. Ce texture est un **proxy visuel** (platre argileux neutre),
pas une image anatomique reelle.

## Provenance

- Source : Poly Haven, asset `clay_plaster` — <https://polyhaven.com/a/clay_plaster>
- Licence : **CC0** (<https://polyhaven.com/license>), verification du 20/11/2026.
- Maps 1K JPG telechargees via `https://api.polyhaven.com/files/clay_plaster` :
  `diff`, `rough`, `nor_gl`, `ao`.
- Empreintes des fichiers sources et assembles : `public/textures/os-proxy/manifest.json`.
- Graine du bruit procedure : **2039** (deterministe).

## Assemblage

- `albedo.jpg` : 1024², legerement desature puis melange a un bruit multi-echelle (8 %).
- `roughness.jpg`, `normal.jpg` (OpenGL), `ao.jpg` : redimensionnes a 1024².
- Taille totale : **336 Ko**, bien sous le budget de 8 Mo/tissu.

## Preuve visuelle

`os-proxy-preuve.jpg` montre cote a cote : source Poly Haven, albedo assemble, rugosite,
normal GL et AO. Aucun detail anatomique n'a ete ajoute.

## Limites et suite

- Aucune modification de `v2-engine.js` : le moteur utilise toujours ses couleurs procedales.
- Avant de brancher cette texture, il faut : choisir un tissu reel pertinent (os cortical),
  valider l'aspect sous 8 angles sur un sujet pilote, et comparer avec `test:visuel`.
- En l'etat, cette entree ne doit **pas** etre consideree comme une correction de la todolist.
