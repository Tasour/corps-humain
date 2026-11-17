# Inventaire anatomique 3D complet — CORPS

> Généré le 2026-11-17. Objectif : 100 % des organes, os et muscles, avec le meilleur modèle 3D disponible pour chacun.

## Sources

- **[Z-Anatomy](https://github.com/Z-Anatomy/Models-of-human-anatomy)** — CC BY-SA 4.0 : Maillages anatomiques principaux (dérivés de BodyParts3D), 2 910 maillages.
- **[BodyParts3D 4.0](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html)** — CC BY 4.0 : Source alternative / comparaison de densité de maillage.
- **[Terminologia Anatomica 2 (TA2)](https://www.ifaa.net/anatomy/terminologia-anatomica/)** : Noms normalisés anglais, latin et français (TA2.csv du dépôt Z-Anatomy).

## Méthode

- Seuls les objets MESH réels sont retenus (tris > 0, >= 8 sommets) ; les marqueurs .j/.i/.g et les points d'insertion/origine (.ol/.or/.el/.er) sont exclus.
- Les collections 'Bonus collection' sont prises en compte pour les os lorsqu'elles portent le seul maillage d'une structure (ex. os du carpe) ; elles n'apportent aucun muscle ni organe supplémentaire.
- Chaque objet est classé en os, muscle ou organe selon sa collection principale dans Z-Anatomy.
- Les noms TA2 sont appariés au nom Z-Anatomy (anglais puis latin, avec variantes sans 'muscle'/'bone'/'gland').
- Les concepts BodyParts3D sont appariés par nom normalisé ; le meilleur modèle est celui qui offre le plus de triangles (Z-Anatomy en cas d'égalité).

## Résultats

| Catégorie | Objets maillés | Structures canoniques | Triangles Z-Anatomy | Noms TA2 | Avec BodyParts3D | Meilleur Z-Anatomy | Meilleur BodyParts3D |
|---|---:|---:|---:|---:|---:|---:|---:|
| Os | 277 | 159 | 702 015 | 277 | 124 | 259 | 18 |
| Muscles | 683 | 344 | 2 323 599 | 671 | 309 | 632 | 51 |
| Organes | 595 | 386 | 2 068 831 | 547 | 122 | 554 | 41 |

**Total : 1555 maillages individuels** (889 structures canoniques). 1495 noms normalisés TA2 appariés, 555 concepts BodyParts3D appariés.

Le fichier `structures.json` contient l'intégralité des entrées, avec pour chacune : le nom français (TA2), le nom latin, l'identifiant TA2, les collections d'origine, le maillage Z-Anatomy, l'éventuel concept BodyParts3D, le **meilleur modèle** (source, objet, triangles, licence) et les alternatives.

## Os (277 maillages)

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| Cellules osseuses ethmoïdales antérieures | Cellulae anteriores ossis ethmoidei | G + D | Anterior cells of ethmoid bone.l | Z-Anatomy | 736 | — |
| Cartilage aryténoïde | Cartilago arytenoidea | G + D | Arytenoid cartilage.l | Z-Anatomy | 3 780 | BodyParts3D 4.0 (arytenoid cartilage) |
| Atlas (C1) | Atlas (C1) | — | Atlas (C1) | Z-Anatomy | 2 194 | — |
| Axis (C2) | Axis (C2) | — | Axis (C2) | Z-Anatomy | 2 334 | — |
| Corps du sternum | Corpus sterni | — | Body of sternum | Z-Anatomy | 4 466 | BodyParts3D 4.0 (body of sternum) |
| Calcaneus | Calcaneus | G + D | Calcaneus.l | Z-Anatomy | 1 448 | BodyParts3D 4.0 (calcaneus) |
| Grand os | Os capitatum | G + D | Capitate bone.l | Z-Anatomy | 472 | BodyParts3D 4.0 (capitate) |
| Clavicule | Clavicula | G + D | Clavicle.l | Z-Anatomy | 1 550 | BodyParts3D 4.0 (clavicle) |
| Coccyx | Os coccygis | — | Coccyx | Z-Anatomy | 1 166 | — |
| Cartilages corniculés | Cartilago corniculata | G + D | Corniculate cartilage.l | Z-Anatomy | 136 | BodyParts3D 4.0 (corniculate cartilage) |
| Cartilage costal de la huitième côte | Cartilago costae octavae costae | G + D | Costal cartilage of eighth rib.l | Z-Anatomy | 2 624 | — |
| Cartilage costal de la cinquième côte | Cartilago costae quinti costae | G + D | Costal cartilage of fifth rib.l | Z-Anatomy | 6 492 | — |
| Cartilage costal de la première côte | Cartilago costae primae costae | G + D | Costal cartilage of first rib.l | Z-Anatomy | 2 772 | — |
| Cartilage costal de la quatrième côte | Cartilago costae quarti costae | G + D | Costal cartilage of fourth rib.l | Z-Anatomy | 4 472 | — |
| Cartilage costal de la neuvième côte | Costa cartilago nonae costae | G + D | Costal cartilage of ninth rib.l | Z-Anatomy | 1 964 | — |
| Cartilage costal de la deuxième côte | Cartilago costae secundae costae | G + D | Costal cartilage of second rib.l | Z-Anatomy | 3 408 | — |
| Cartilage costal de la septième côte | Cartilago costae septimi costae | G + D | Costal cartilage of seventh rib.l | Z-Anatomy | 13 764 | — |
| Cartilage costal de la sixième côte | Cartilago costae sextae costae | G + D | Costal cartilage of sixth rib.l | Z-Anatomy | 8 120 | — |
| Cartilage costal de la dixième côte | Cartilago costae decimae costae | G + D | Costal cartilage of tenth rib.l | Z-Anatomy | 1 524 | — |
| Cartilage costal de la troisième côte | Cartilago costae tertiae costae | G + D | Costal cartilage of third rib.l | Z-Anatomy | 3 600 | — |
| Cartilage cricoïde | Cartilago cricoidea | — | cricoid cartilage | BodyParts3D 4.0 | 3 028 | Z-Anatomy (Cricoid cartilage) |
| Os cuboïde | Os cuboideum | G + D | Cuboid bone.l | Z-Anatomy | 998 | BodyParts3D 4.0 (cuboid bone) |
| Phalange distale du cinquième doigt de pied | Phalanx distalis quintum digitorum pedis | G + D | Distal phalanx of fifth finger of foot.l | Z-Anatomy | 236 | — |
| Phalange distale du cinquième doigt de la main | Phalanx distalis quintum digitorum manus | G + D | Distal phalanx of fifth finger of hand.l | Z-Anatomy | 192 | — |
| Phalange distale du premier doigt de pied | Phalanx distalis primum digitorum pedis | G + D | Distal phalanx of first finger of foot.l | Z-Anatomy | 466 | — |
| Phalange distale du premier doigt de la main | Phalanx distalis primum digitorum manus | G + D | Distal phalanx of first finger of hand.l | Z-Anatomy | 222 | — |
| Phalange distale du quatrième doigt de pied | Phalanx distalis quartum digitorum pedis | G + D | Distal phalanx of fourth finger of foot.l | Z-Anatomy | 278 | — |
| Phalange distale du quatrième doigt de la main | Phalanx distalis quartum digitorum manus | G + D | Distal phalanx of fourth finger of hand.l | Z-Anatomy | 134 | — |
| Phalange distale du deuxième doigt de pied | Phalanx distalis secundum digitorum pedis | G + D | Distal phalanx of second finger of foot.l | Z-Anatomy | 236 | — |
| Phalange distale du deuxième doigt de la main | Phalanx distalis secundum digitorum manus | G + D | Distal phalanx of second finger of hand.l | Z-Anatomy | 250 | — |
| Phalange distale du troisième doigt de pied | Phalanx distalis tertium digitorum pedis | G + D | Distal phalanx of third finger of foot.l | Z-Anatomy | 318 | — |
| Phalange distale du troisième doigt de la main | Phalanx distalis tertium digitorum manus | G + D | Distal phalanx of third finger of hand.l | Z-Anatomy | 192 | — |
| Huitième côte | Octava costa | G + D | Eighth rib.l | Z-Anatomy | 8 270 | BodyParts3D 4.0 (eighth rib) |
| Onzième côte | Undecima costa | G + D | Eleventh rib.l | Z-Anatomy | 5 034 | BodyParts3D 4.0 (eleventh rib) |
| Os ethmoïde | Os ethmoideum | — | Ethmoid bone | Z-Anatomy | 10 130 | BodyParts3D 4.0 (ethmoid) |
| Fémur | Os femoris | G + D | Femur.l | Z-Anatomy | 3 794 | BodyParts3D 4.0 (femur) |
| Fibula | Fibula | G + D | Fibula.l | Z-Anatomy | 1 264 | BodyParts3D 4.0 (fibula) |
| Cinquième métacarpien | Os quintum metacarpi | G + D | Fifth metacarpal bone.l | Z-Anatomy | 512 | BodyParts3D 4.0 (fifth metacarpal bone) |
| Cinquième métatarsien | Os quintum metatarsi | G + D | Fifth metatarsal bone.l | Z-Anatomy | 894 | BodyParts3D 4.0 (fifth metatarsal bone) |
| Cinquième côte | Quinta costa | G + D | Fifth rib.l | Z-Anatomy | 9 376 | BodyParts3D 4.0 (fifth rib) |
| Premier métacrapien | Os primum metarcapi | G + D | First metacarpal bone.l | Z-Anatomy | 682 | BodyParts3D 4.0 (first metacarpal bone) |
| Premier métatarsien | Os primum metatarsi | G + D | First metatarsal bone.l | Z-Anatomy | 1 088 | BodyParts3D 4.0 (first metatarsal bone) |
| Première côte | Costa prima | G + D | First rib.l | Z-Anatomy | 3 210 | BodyParts3D 4.0 (first rib) |
| Quatrième métacrapien | Os quartum metacarpi | G + D | Fourth metacarpal bone.l | Z-Anatomy | 642 | BodyParts3D 4.0 (fourth metacarpal bone) |
| Quatrième métatarsien | Os quatum metatarsi | G + D | Fourth metatarsal bone.l | Z-Anatomy | 834 | BodyParts3D 4.0 (fourth metatarsal bone) |
| Quatrième côte | Quarta costa | G + D | Fourth rib.l | Z-Anatomy | 8 646 | BodyParts3D 4.0 (fourth rib) |
| Os frontal | Os frontale | — | Frontal bone | Z-Anatomy | 7 776 | BodyParts3D 4.0 (frontal bone) |
| Os crochu | Os hamatum | G + D | Hamate bone.l | Z-Anatomy | 536 | BodyParts3D 4.0 (hamate) |
| Os coxal | Os coxae | G + D | Hip bone.l | Z-Anatomy | 3 788 | BodyParts3D 4.0 (hip bone) |
| Humérus | Humerus | G + D | Humerus.l | Z-Anatomy | 4 280 | BodyParts3D 4.0 (humerus) |
| Os hyoïde | Os hyoideum | — | hyoid bone | BodyParts3D 4.0 | 2 072 | Z-Anatomy (Hyoid bone) |
| Enclume | Incus | G + D | Incus.l | Z-Anatomy | 2 532 | — |
| Os cornet nasal inférieur | Concha nasalis inferior | G + D | inferior nasal concha | BodyParts3D 4.0 | 662 | Z-Anatomy (Inferior nasal concha bone.l) |
| Os cunéïforme intermédiaire | Os cuneiforme intermedium | G + D | Intermediate cuneiform bone.l | Z-Anatomy | 444 | BodyParts3D 4.0 (intermediate cuneiform bone) |
| Os lacrymal | Os lacrimale | G + D | lacrimal bone | BodyParts3D 4.0 | 604 | Z-Anatomy (Lacrimal bone.l) |
| Os cunéïforme latéral | Os cuneiforme laterale | G + D | lateral cuneiform bone | BodyParts3D 4.0 | 648 | Z-Anatomy (Lateral cuneiform bone.l) |
| Processus latéral du cartilage septal | Processus lateralis cartilaginis septi nasi | G + D | Lateral process of nasal septal cartilage.l | Z-Anatomy | 347 | — |
| Dent canine inférieure | Dens caninus inferioris | G + D | Lower canine.l | Z-Anatomy | 1 276 | — |
| Première molaire inférieure | Dens molaris primus inferioris | G + D | Lower first molar tooth.l | Z-Anatomy | 4 508 | — |
| Première prémolaire inférieure | Dens premolaris primus inferioris | G + D | Lower first premolar.l | Z-Anatomy | 1 222 | — |
| Dent incisive inférolatérale | Dens incisivus lateralis inferioris | G + D | Lower lateral incisor.l | Z-Anatomy | 1 040 | — |
| Dent incisive inféromédiale | Dens incisivus medialis inferioris | G + D | Lower medial incisor.l | Z-Anatomy | 984 | — |
| Deuxième molaire inférieure | Dens molaris secundus inferioris | G + D | Lower second molar tooth.l | Z-Anatomy | 1 676 | — |
| Deuxième prémolaire inférieure | Dens premolaris secundus inferioris | G + D | Lower second premolar.l | Z-Anatomy | 1 180 | — |
| Os semilunaire | Os lunatum | G + D | Lunate bone.l | Z-Anatomy | 2 088 | BodyParts3D 4.0 (lunate) |
| Grand cartilage alaire | Cartilago alaris major | G + D | major alar cartilage | BodyParts3D 4.0 | 388 | Z-Anatomy (Major alar cartilage.l) |
| Marteau | Malleus | G + D | Malleus.l | Z-Anatomy | 3 982 | — |
| Mandibule | Mandibula | — | Mandible | Z-Anatomy | 18 838 | BodyParts3D 4.0 (mandible) |
| Manubrium sternal | Manubrium sterni | — | Manubrium of sternum | Z-Anatomy | 2 662 | — |
| Os maxillaire | Maxilla | G + D | Maxilla.l | Z-Anatomy | 4 798 | BodyParts3D 4.0 (maxilla) |
| Os cunéïforme médial | Os cuneiforme mediale | G + D | Medial cuneiform bone.l | Z-Anatomy | 992 | BodyParts3D 4.0 (medial cuneiform bone) |
| Cellules osseuses ethmoïdales moyennes | Cellulae mediae ossis ethmoidei | G + D | Middle cells of ethmoid bone.l | Z-Anatomy | 960 | — |
| Phalange moyenne du cinquème doigt de pied | Phalanx media quintum digitorum pedis | G + D | Middle phalanx of fifth finger of foot.l | Z-Anatomy | 216 | — |
| Phalange moyenne du cinquième doigt de la main | Phalanx media quintum digitorum manus | G + D | Middle phalanx of fifth finger of hand.l | Z-Anatomy | 292 | — |
| Phalange moyenne du quatrième doigt de pied | Phalanx media quartum digitorum pedis | G + D | Middle phalanx of fourth finger of foot.l | Z-Anatomy | 448 | — |
| Phalange moyenne du quatrième doigt de la main | Phalanx media quartum digitorum manus | G + D | Middle phalanx of fourth finger of hand.l | Z-Anatomy | 446 | — |
| Phalange moyenne du deuxième doigt de pied | Phalanx media secundum digitorum pedis | G + D | Middle phalanx of second finger of foot.l | Z-Anatomy | 382 | — |
| Phalange moyenne du deuxième doigt de la main | Phalanx media scundum digitorum manus | G + D | Middle phalanx of second finger of hand.l | Z-Anatomy | 314 | — |
| Phalange moyenne du troisème doigt de pied | Phalanx media tertium digitorum pedis | G + D | Middle phalanx of third finger of foot.l | Z-Anatomy | 400 | — |
| Phalange moyenne du troisième doigt de la main | Phalanx media tertium digitorum manus | G + D | Middle phalanx of third finger of hand.l | Z-Anatomy | 360 | — |
| Os nasal | Os nasale | G + D | nasal bone | BodyParts3D 4.0 | 388 | Z-Anatomy (Nasal bone.l) |
| Cartilage septal nasal | Cartilago septi nasi | — | Nasal septal cartilage | Z-Anatomy | 360 | — |
| Os naviculaire | Os naviculare | G + D | Navicular bone.l | Z-Anatomy | 732 | — |
| Neuvième côte | Nona costa | G + D | Ninth rib.l | Z-Anatomy | 7 778 | BodyParts3D 4.0 (ninth rib) |
| Os occipital | Os occipitale | — | Occipital bone | Z-Anatomy | 7 531 | BodyParts3D 4.0 (occipital bone) |
| Os palatin | Os palatinum | G + D | palatine bone | BodyParts3D 4.0 | 1 606 | Z-Anatomy (Palatine bone.l) |
| Os pariétal | Os parietale | G + D | Parietal bone.l | Z-Anatomy | 6 886 | BodyParts3D 4.0 (parietal bone) |
| Patella | Patella | G + D | patella | BodyParts3D 4.0 | 304 | Z-Anatomy (Patella.l) |
| Os pisiforme | Os pisiforme | G + D | Pisiform bone.l | Z-Anatomy | 1 668 | BodyParts3D 4.0 (pisiform) |
| Cellules osseuses ethmoïdales postérieures | Cellulae posteriores ossis ethmoidei | G + D | Posterior cells of ethmoid bone.l | Z-Anatomy | 1 216 | — |
| Phalange proximale du cinquième doigt de pied | Phalanx proximalis quintum digitorum pedis | G + D | Proximal phalanx of fifth finger of foot.l | Z-Anatomy | 516 | — |
| Phalange proximale du cinquième doigt de la main | Phalanx proximalis quintum digitorum manus | G + D | Proximal phalanx of fifth finger of hand.l | Z-Anatomy | 560 | — |
| Phalange proximale du premier doigt de pied | Phalanx proximalis primum digitorum pedis | G + D | Proximal phalanx of first finger of foot.l | Z-Anatomy | 532 | — |
| Phalange proximale du premier doigt de la main | Phalanx proximalis primum digitorum manus | G + D | Proximal phalanx of first finger of hand.l | Z-Anatomy | 328 | — |
| Phalange proximale du quatrième doigt de pied | Phalanx proximalis quartum digitorum pedis | G + D | Proximal phalanx of fourth finger of foot.l | Z-Anatomy | 460 | — |
| Phalange proximale du quatrième doigt de la main | Phalanx proximalis quartum digitorum manus | G + D | Proximal phalanx of fourth finger of hand.l | Z-Anatomy | 368 | — |
| Phalange proximale du deuxième doigt de pied | Phalanx proximalis secundum digitorum pedis | G + D | Proximal phalanx of second finger of foot.l | Z-Anatomy | 426 | — |
| Phalange proximale du deuxième doigt de la main | Phalanx proximalis secundum digitorum manus | G + D | Proximal phalanx of second finger of hand.l | Z-Anatomy | 414 | — |
| Phalange proximale du troisième doigt de pied | Phalanx proximalis tertium digitorum pedis | G + D | Proximal phalanx of third finger of foot.l | Z-Anatomy | 460 | — |
| Phalange proximale du troisième doigt de la main | Phalanx proximalis tertium digitorum manus | G + D | Proximal phalanx of third finger of hand.l | Z-Anatomy | 440 | — |
| Radius | Radius | G + D | Radius.l | Z-Anatomy | 784 | BodyParts3D 4.0 (radius) |
| Sacrum | Os sacrum | — | Sacrum | Z-Anatomy | 11 676 | BodyParts3D 4.0 (sacrum) |
| Os scaphoîde | Os scaphoideum | G + D | Scaphoid bone.l | Z-Anatomy | 390 | BodyParts3D 4.0 (scaphoid) |
| Scapula | Scapula | G + D | Scapula.l | Z-Anatomy | 25 326 | BodyParts3D 4.0 (scapula) |
| Deuxième métacarpien | Os secundum metacarpi | G + D | Second metacarpal bone.l | Z-Anatomy | 764 | BodyParts3D 4.0 (second metacarpal bone) |
| Deuxième os métatarsien | Os secundum metatarsi | G + D | Second metatarsal bone.l | Z-Anatomy | 690 | BodyParts3D 4.0 (second metatarsal bone) |
| Deuxième côte | Costa secunda | G + D | Second rib.l | Z-Anatomy | 5 364 | BodyParts3D 4.0 (second rib) |
| Os sésamoïdes du pied | Ossa sesamoidea pedis | G + D | Sesamoid bones of foot.l | Z-Anatomy | 290 | — |
| Septième côte | Septima costa | G + D | Seventh rib.l | Z-Anatomy | 9 776 | BodyParts3D 4.0 (seventh rib) |
| Sinus de l'os frontal | Sinus ossis frontalis | — | Sinus of frontal bone | Z-Anatomy | 1 504 | — |
| Sinus de l'os sphénoïdal | Sinus ossis sphenoidei | — | Sinus of sphenoid bone | Z-Anatomy | 384 | — |
| Sixième côte | Sexta costa | G + D | Sixth rib.l | Z-Anatomy | 10 132 | BodyParts3D 4.0 (sixth rib) |
| Os sphénoïde | Os sphenoideum | — | Sphenoid bone | Z-Anatomy | 7 308 | BodyParts3D 4.0 (sphenoid bone) |
| Etrier | Stapes | G + D | Stapes.l | Z-Anatomy | 4 342 | — |
| Talus | Os tali | G + D | Talus.l | Z-Anatomy | 1 350 | BodyParts3D 4.0 (talus) |
| Os temporal | Os temporale | G + D | Temporal bone.l | Z-Anatomy | 14 094 | BodyParts3D 4.0 (temporal bone) |
| Dixième côte | Decima costa | G + D | Tenth rib.l | Z-Anatomy | 7 026 | BodyParts3D 4.0 (tenth rib) |
| Troisième métacarpien | Os tertium metacarpi | G + D | Third metacarpal bone.l | Z-Anatomy | 708 | BodyParts3D 4.0 (third metacarpal bone) |
| Troisième métatarsien | Os tertium metatarsi | G + D | Third metatarsal bone.l | Z-Anatomy | 814 | BodyParts3D 4.0 (third metatarsal bone) |
| Troisème côte | Tertia costa | G + D | Third rib.l | Z-Anatomy | 6 980 | BodyParts3D 4.0 (third rib) |
| Cartilage thyroïde | Cartilago thyreoidea | — | Thyroid cartilage | Z-Anatomy | 4 488 | BodyParts3D 4.0 (thyroid cartilage) |
| Tibia | Tibia | G + D | Tibia.l | Z-Anatomy | 1 670 | BodyParts3D 4.0 (tibia) |
| Os trapèze | Os trapezium | G + D | Trapezium bone.l | Z-Anatomy | 500 | BodyParts3D 4.0 (trapezium) |
| Os trapèzoïde | Os trapezoideum | G + D | trapezoid | BodyParts3D 4.0 | 396 | Z-Anatomy (Trapezoid bone.l) |
| Os pyramidal | Os triquetrum | G + D | Triquetrum bone.l | Z-Anatomy | 176 | — |
| Douzième côte | Duodecima costa | G + D | Twelfth rib.l | Z-Anatomy | 3 002 | BodyParts3D 4.0 (twelfth rib) |
| Ulna | Ulna | G + D | Ulna.l | Z-Anatomy | 904 | BodyParts3D 4.0 (ulna) |
| Dent canine supérieure | Dens caninus superioris | G + D | Upper canine.l | Z-Anatomy | 1 470 | — |
| Première molaire supérieure | Dens molaris primus suprioris | G + D | Upper first molar tooth.l | Z-Anatomy | 2 176 | — |
| Première prémolaire supérieure | Dens premolaris primus superioris | G + D | Upper first premolar.l | Z-Anatomy | 1 684 | — |
| Dent incisive supérolatérale | Dens incisivus lateralis superioris | G + D | Upper lateral incisor.l | Z-Anatomy | 1 454 | — |
| Dent incisive supéromédiale | Dens incisivus medialis superioris | G + D | Upper medial incisor.l | Z-Anatomy | 1 368 | — |
| Deuxième molaire supérieure | Dens molaris secundus superioris | G + D | Upper second molar tooth.l | Z-Anatomy | 1 844 | — |
| Deuxième prémolaire supérieure | Dens premolaris secundus superioris | G + D | Upper second premolar.l | Z-Anatomy | 1 554 | — |
| Vertèbre C3 | Vertebra cervicalis III | — | Vertebra C3 | Z-Anatomy | 2 440 | — |
| Vertèbre C4 | Vertebra cervicalis IV | — | Vertebra C4 | Z-Anatomy | 1 940 | — |
| Vertèbre C5 | Vertebra cervicalis V | — | Vertebra C5 | Z-Anatomy | 2 336 | — |
| Vertèbre C6 | Vertebra cervicalis VI | — | Vertebra C6 | Z-Anatomy | 2 304 | — |
| Vertèbre C7 | Vertebra cervicalis VII | — | Vertebra C7 | Z-Anatomy | 2 164 | — |
| Vertèbre L1 | Vertebra lumborum I | — | Vertebra L1 | Z-Anatomy | 3 162 | — |
| Vertèbre L2 | Vertebra lumborum II | — | Vertebra L2 | Z-Anatomy | 2 688 | — |
| Vertèbre L3 | Vertebra lumborum III | — | Vertebra L3 | Z-Anatomy | 3 160 | — |
| Vertèbre L4 | Vertebra lumborum IV | — | Vertebra L4 | Z-Anatomy | 3 804 | — |
| Vertèbre L5 | Vertebra lumborum V | — | Vertebra L5 | Z-Anatomy | 4 032 | — |
| Vertèbre T1 | Vertebra thoracis I | — | Vertebra T1 | Z-Anatomy | 1 946 | — |
| Vertèbre T10 | Vertebra thoracis X | — | Vertebra T10 | Z-Anatomy | 3 058 | — |
| Vertèbre T11 | Vertebra thoracis XI | — | Vertebra T11 | Z-Anatomy | 1 798 | — |
| Vertèbre T12 | Vertebra thoracis XII | — | Vertebra T12 | Z-Anatomy | 2 586 | — |
| Vertèbre T2 | Vertebra thoracis II | — | Vertebra T2 | Z-Anatomy | 2 142 | — |
| Vertèbre T3 | Vertebra thoracis III | — | Vertebra T3 | Z-Anatomy | 2 344 | — |
| Vertèbre T4 | Vertebra thoracis IV | — | Vertebra T4 | Z-Anatomy | 2 216 | — |
| Vertèbre T5 | Vertebra thoracis V | — | Vertebra T5 | Z-Anatomy | 2 152 | — |
| Vertèbre T6 | Vertebra thoracis VI | — | Vertebra T6 | Z-Anatomy | 1 780 | — |
| Vertèbre T7 | Vertebra thoracis VII | — | Vertebra T7 | Z-Anatomy | 2 794 | — |
| Vertèbre T8 | Vertebra thoracis VIII | — | Vertebra T8 | Z-Anatomy | 1 733 | — |
| Vertèbre T9 | Vertebra thoracis IX | — | Vertebra T9 | Z-Anatomy | 2 978 | — |
| Vomer | Vomer | — | vomer | BodyParts3D 4.0 | 1 586 | Z-Anatomy (Vomer) |
| Processus xiphoïde | Processus xiphoideus | — | Xiphoid process | Z-Anatomy | 913 | BodyParts3D 4.0 (xiphoid process) |
| Os zygomatique | Os zygomaticum | G + D | Zygomatic bone.l | Z-Anatomy | 1 328 | BodyParts3D 4.0 (zygomatic bone) |

## Muscles (683 maillages)

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| (Partie abdominale du grand pectoral) | (Abdominal part of pectoralis major muscle) / (Pars abdominalis musculi pectoralis majoris) | G + D | (Abdominal part of pectoralis major muscle).l | Z-Anatomy | 1 508 | BodyParts3D 4.0 (abdominal part of pectoralis major) |
| Abducteur du petit orteil | Abductor digiti minimi pedis | G + D | Abductor digiti minimi of foot.l | Z-Anatomy | 1 280 | BodyParts3D 4.0 (abductor digiti minimi of foot) |
| Muscle abducteur du petit doigt | Abductor digiti minimi manus | G + D | Abductor digiti minimi of hand.l | Z-Anatomy | 672 | BodyParts3D 4.0 (abductor digiti minimi of hand) |
| Abducteur de l'hallux | Abductor hallucis | G + D | Abductor hallucis.l | Z-Anatomy | 1 688 | BodyParts3D 4.0 (abductor hallucis) |
| Court abducteur du pouce | Abductor brevis pollicis | G + D | Abductor pollicis brevis.l | Z-Anatomy | 624 | BodyParts3D 4.0 (abductor pollicis brevis) |
| Long abducteur du pouce | Abductor longus pollicis | G + D | Abductor pollicis longus.l | Z-Anatomy | 2 462 | BodyParts3D 4.0 (abductor pollicis longus) |
| Partie acromiale du deltoïde | Pars acromialis musculi deltoidei | G + D | Acromial part of deltoid muscle.l | Z-Anatomy | 2 964 | BodyParts3D 4.0 (acromial part of deltoid) |
| Court adducteur | Adductor brevis | G + D | Adductor brevis.l | Z-Anatomy | 2 132 | BodyParts3D 4.0 (adductor brevis) |
| Long adducteur | Adductor longus | G + D | Adductor longus.l | Z-Anatomy | 3 714 | BodyParts3D 4.0 (adductor longus) |
| Grand adducteur | Adductor magnus | G + D | Adductor magnus.l | Z-Anatomy | 8 192 | BodyParts3D 4.0 (adductor magnus) |
| (Petit adducteur) | (Adductor minimus) / (Adductor minimus) | G + D | (Adductor minimus).l | Z-Anatomy | 948 | BodyParts3D 4.0 (adductor minimus) |
| Muscle anconé | Musculus anconeus | G + D | Anconeus muscle.l | Z-Anatomy | 1 442 | BodyParts3D 4.0 (anconeus) |
| Bourse ansérine | Bursa anserina | G + D | Anserine bursa.l | Z-Anatomy | 1 216 | — |
| Fascia antébrachial | Fascia antebrachii | G + D | Antebrachial fascia.l | Z-Anatomy | 4 460 | — |
| Ventre antérieur du muscle digastrique | Venter anterior musculi digastrici | G + D | Anterior belly of digastric muscle.l | Z-Anatomy | 392 | — |
| Septum intermusculaire antérieur de la jambe | Septum intermusculare anterius cruris | G + D | Anterior intermuscular septum of leg.l | Z-Anatomy | 208 | — |
| Lame antérieure du fascia thoracolombaire | Lamina anterior fasciae thoracolumbaris | G + D | Anterior layer of thoracolumbar fascia.l | Z-Anatomy | 176 | — |
| Partie ary-épiglottique du muscle aryténoïdien oblique | Pars aryepiglottica musculi arytenoidei obliqui | G + D | Ary-epiglottic part of oblique arytenoid muscle.l | Z-Anatomy | 1 022 | — |
| Partie ascendante du trapèze | Pars ascendens musculi trapezii | G + D | Ascending part of trapezius muscle.l | Z-Anatomy | 4 596 | BodyParts3D 4.0 (ascending part of trapezius) |
| Bourse bicipitoradiale | Bursa bicipitoradialis | G + D | Bicipitoradial bursa.l | Z-Anatomy | 1 472 | — |
| Facia brachial | Fascia brachii | G + D | Brachial fascia.l | Z-Anatomy | 3 018 | — |
| Muscle brachial | Musculus brachialis | G + D | Brachialis muscle.l | Z-Anatomy | 3 478 | BodyParts3D 4.0 (brachialis) |
| Muscle brachioradial | Musculus brachioradialis | G + D | Brachioradialis muscle.l | Z-Anatomy | 7 312 | BodyParts3D 4.0 (brachioradialis) |
| Muscle buccinateur | Bucinator | G + D | Bucinator.l | Z-Anatomy | 884 | — |
| Bourse du muscle piriforme | Bursa musculi piriformis | G + D | Bursa of piriformis muscle.l | Z-Anatomy | 1 472 | — |
| Tendon calcanéen | Tendo calcaneus | G + D | Calcaneal tendon.l | Z-Anatomy | 4 377 | BodyParts3D 4.0 (calcaneal tendon) |
| Chef claviculaire du grand pectoral | Pars clavicularis musculi pectoralis majoris | G + D | Clavicular head of pectoralis major muscle.l | Z-Anatomy | 850 | — |
| Partie claviculaire du deltoïde | Pars clavicularis musculi deltoidei | G + D | Clavicular part of deltoid muscle.l | Z-Anatomy | 2 902 | BodyParts3D 4.0 (clavicular part of deltoid) |
| Fascia clavipectoral | Fascia clavipectoralis | G + D | Clavipectoral fascia.l | Z-Anatomy | 1 280 | — |
| Muscle coccygien | Musculus coccygeus | G + D | coccygeus | BodyParts3D 4.0 | 2 772 | Z-Anatomy (Coccygeus muscle.l) |
| Gaine tendineuse commune des fléchisseurs | Vagina communis tendinum flexorum | G + D | Common flexor tendon sheath.l | Z-Anatomy | 864 | — |
| Anneau tendineux commun | Anulus tendineus communis | G + D | common tendinous ring | BodyParts3D 4.0 | 734 | Z-Anatomy (Common tendinous ring.l) |
| Gaine tendineuse commune des muscles fibulaires | Vagina communis tendinum musculorum fibularium | G + D | Common tendon sheath of fibularis muscles.l | Z-Anatomy | 1 536 | — |
| (Bourse coracobrachiale) | (Coracobrachial bursa) / (Bursa musculi coracobrachialis) | G + D | Coracobrachial bursa.l | Z-Anatomy | 1 472 | — |
| Muscle coracobrachial | Musculus coracobrachialis | G + D | Coracobrachialis muscle.l | Z-Anatomy | 1 160 | BodyParts3D 4.0 (coracobrachialis) |
| Muscle corrugateur du sourcil | Musculus corrugator supercilii | G + D | Corrugator supercilii.l | Z-Anatomy | 278 | — |
| Cruciform part of fibrous sheath of digit of hand | Cruciform part of fibrous sheath of digit of hand | G + D | Cruciform part of fibrous sheath of digit of hand.l | Z-Anatomy | 4 728 | — |
| Fascia crural | Fascia cruris | G + D | Crural fascia.l | Z-Anatomy | 10 875 | — |
| Chef profond du court fléchisseur du pouce | Caput profundum flexoris brevis pollicis | G + D | Deep head of flexor pollicis brevis.l | Z-Anatomy | 746 | — |
| Chef profond du rond pronateur | Caput profundum pronatoris teretis | G + D | Deep head of pronator teres.l | Z-Anatomy | 1 114 | — |
| Bourse infrapatellaire profonde | Bursa infrapatellaris profunda | G + D | Deep infrapatellar bursa.l | Z-Anatomy | 992 | — |
| Partie profonde du muscle masséter | Pars profunda masseteris | G + D | Deep part of masseter.l | Z-Anatomy | 994 | — |
| Fascia deltoïdien | Fascia deltoidea | G + D | Deltoid fascia.l | Z-Anatomy | 3 541 | — |
| Muscle abaisseur de l'angle de la bouche | Depressor anguli oris | G + D | Depressor anguli oris.l | Z-Anatomy | 594 | — |
| Muscle abaisseur de la lèvre inférieure | Depressor labii inferioris | G + D | Depressor labii inferioris.l | Z-Anatomy | 832 | — |
| Muscle abaisseur du septum nasal | Depressor septi nasi | G + D | Depressor septi nasi.l | Z-Anatomy | 276 | — |
| Partie descendante du trapèze | Pars descendens musculi trapezii | G + D | Descending part of trapezius muscle.l | Z-Anatomy | 6 760 | BodyParts3D 4.0 (descending part of trapezius) |
| Diaphragme | Diaphragma | — | Diaphragm | Z-Anatomy | 38 868 | BodyParts3D 4.0 (diaphragm) |
| Fascia diaphragmique | Fascia diaphragmatica | — | Diaphragmatic fascia | Z-Anatomy | 4 708 | — |
| Fascia dorsal de la main | Fascia dorsalis manus | G + D | Dorsal fascia of hand.l | Z-Anatomy | 1 445 | — |
| Muscles interosseux dorsaux du pied | Musculi interossei dorsales pedis | G + D | Dorsal interossei muscles of foot.l | Z-Anatomy | 1 946 | — |
| Muscles interosseux dorsaux de la main | Musculi interossei dorsales manus | G + D | Dorsal interossei muscles of hand.l | Z-Anatomy | 1 364 | — |
| Parties dorsales des muscles intertransv. lat. des lombes | Partes dors. musculorum intertransversariorum lat. lumborum | G + D | Dorsal parts of lateral intertransversarii lumborum muscles.l | Z-Anatomy | 720 | — |
| Aponévrose épicrânienne | Galea aponeurotica | G + D | Epicranial aponeurosis.l | Z-Anatomy | 20 118 | — |
| Court extenseur radial du carpe | Extensor radialis brevis carpi | G + D | Extensor carpi radialis brevis.l | Z-Anatomy | 3 142 | BodyParts3D 4.0 (extensor carpi radialis brevis) |
| Long extenseur radial du carpe | Extensor radialis longus carpi | G + D | Extensor carpi radialis longus.l | Z-Anatomy | 3 706 | BodyParts3D 4.0 (extensor carpi radialis longus) |
| Extenseur du petit doigt | Extensor digiti minimi | G + D | Extensor digiti minimi.l | Z-Anatomy | 2 152 | BodyParts3D 4.0 (extensor digiti minimi) |
| Extenseur des doigts | Extensor digitorum | G + D | Extensor digitorum.l | Z-Anatomy | 6 410 | BodyParts3D 4.0 (extensor digitorum) |
| Court extenseur des orteils | Extensor brevis digitorum | G + D | Extensor digitorum brevis.l | Z-Anatomy | 3 184 | — |
| Muscle long extenseur des orteils | Extensor longus digitorum | G + D | Extensor digitorum longus.l | Z-Anatomy | 3 176 | BodyParts3D 4.0 (extensor digitorum longus) |
| Court extenseur de l'hallux | Extensor brevis hallucis | G + D | Extensor hallucis brevis.l | Z-Anatomy | 1 118 | BodyParts3D 4.0 (extensor hallucis brevis) |
| Long extenseur de l'hallux | Extensor longus hallucis | G + D | Extensor hallucis longus.l | Z-Anatomy | 2 362 | BodyParts3D 4.0 (extensor hallucis longus) |
| Muscle extenseur de l'index | Extensor indicis | G + D | Extensor indicis.l | Z-Anatomy | 1 142 | BodyParts3D 4.0 (extensor indicis) |
| Court extenseur du pouce | Extensor brevis pollicis | G + D | Extensor pollicis brevis.l | Z-Anatomy | 1 176 | BodyParts3D 4.0 (extensor pollicis brevis) |
| Long extenseur du pouce | Extensor longus pollicis | G + D | Extensor pollicis longus.l | Z-Anatomy | 1 602 | BodyParts3D 4.0 (extensor pollicis longus) |
| Retinaculum des extenseurs du poignet | Retinaculum extensorium carpi | G + D | Extensor retinaculum of wrist.l | Z-Anatomy | 368 | — |
| Muscle oblique externe de l'abdomen | Musculus obliquus externus abdominis | G + D | External abdominal oblique muscle.l | Z-Anatomy | 29 622 | — |
| Sphincter anal externe | Sphincter externus ani | G + D | external anal sphincter | BodyParts3D 4.0 | 1 394 | Z-Anatomy (External anal sphincter.l) |
| Muscles intercostaux externes | Musculi intercostales externi | G + D | external intercostal muscle | BodyParts3D 4.0 | 52 950 | Z-Anatomy (External intercostal muscles.l) |
| Partie externe du muscle thyro-aryténoïdien | Pars externa musculi thyreoarytenoidei | G + D | External part of thyro-arytenoid muscle.l | Z-Anatomy | 2 236 | — |
| Fascia lata | Fascia lata | G + D | Fascia lata.l | Z-Anatomy | 12 907 | BodyParts3D 4.0 (zone of fascia lata) |
| Muscle court fibulaire | Musculus fibularis brevis | G + D | Fibularis brevis muscle.l | Z-Anatomy | 3 446 | BodyParts3D 4.0 (fibularis brevis) |
| Muscle long fibulaire | Musculus fibularis longus | G + D | Fibularis longus muscle.l | Z-Anatomy | 5 522 | BodyParts3D 4.0 (fibularis longus) |
| Muscle troisième fibulaire | Musculus fibularis tertius | G + D | fibularis tertius | BodyParts3D 4.0 | 716 | Z-Anatomy (Fibularis tertius muscle.l) |
| Fléchisseur radial du carpe | Flexor radialis carpi | G + D | Flexor carpi radialis.l | Z-Anatomy | 1 666 | BodyParts3D 4.0 (flexor carpi radialis) |
| Fléchisseur du petit doigt | Flexor digiti minimi pedis pedis | G + D | Flexor digiti minimi of foot.l | Z-Anatomy | 464 | — |
| Fléchisseur du petit doigt de la main | Flexor digiti minimi manus | G + D | Flexor digiti minimi of hand.l | Z-Anatomy | 308 | — |
| Court fléchisseur des orteils | Flexor brevis digitorum | G + D | Flexor digitorum brevis.l | Z-Anatomy | 3 224 | BodyParts3D 4.0 (flexor digitorum brevis) |
| Long fléchisseur des orteils | Musculus flexor digitorum longus | G + D | Flexor digitorum longus.l | Z-Anatomy | 6 836 | BodyParts3D 4.0 (flexor digitorum longus) |
| Fléchisseur profond des doigts | Flexor profundus digitorum | G + D | Flexor digitorum profundus.l | Z-Anatomy | 7 110 | BodyParts3D 4.0 (flexor digitorum profundus) |
| Long fléchisseur de l'hallux | Flexor longus hallucis | G + D | Flexor hallucis longus.l | Z-Anatomy | 5 878 | BodyParts3D 4.0 (flexor hallucis longus) |
| Long fléchisseur du pouce | Flexor longus pollicis | G + D | Flexor pollicis longus.l | Z-Anatomy | 1 666 | BodyParts3D 4.0 (flexor pollicis longus) |
| Rétinaculum des fléchisseurs | Retinaculum flexorium tali | G + D | Flexor retinaculum of ankle.l | Z-Anatomy | 696 | — |
| Rétinaculum des fléchisseurs du poignet | Retinaculum flexorium carpi | G + D | flexor retinaculum of wrist | BodyParts3D 4.0 | 1 412 | Z-Anatomy (Flexor retinaculum of wrist.l) |
| Muscle frontal | Musculus frontalis | G + D | Frontalis muscle.l | Z-Anatomy | 5 874 | — |
| Muscle génioglosse | Musculus genioglossus | G + D | Genioglossus muscle.l | Z-Anatomy | 3 746 | BodyParts3D 4.0 (genioglossus) |
| Muscle géniohyoïdien | Musculus geniohyoideus | G + D | Geniohyoid muscle.l | Z-Anatomy | 530 | BodyParts3D 4.0 (geniohyoid) |
| Muscle grand fessier | Musculus gluteus maximus | G + D | Gluteus maximus muscle.l | Z-Anatomy | 3 326 | BodyParts3D 4.0 (gluteus maximus) |
| Muscle moyen fessier | Musculus gluteus medius | G + D | Gluteus medius muscle.l | Z-Anatomy | 5 176 | BodyParts3D 4.0 (gluteus medius) |
| Muscle petit fessier | Musculus gluteus minimus | G + D | Gluteus minimus muscle.l | Z-Anatomy | 6 250 | BodyParts3D 4.0 (gluteus minimus) |
| Muscle gracile | Musculus gracilis | G + D | Gracilis muscle.l | Z-Anatomy | 4 812 | BodyParts3D 4.0 (gracilis) |
| Chef huméral de l'extenseur ulnaire du carpe | Caput humerale extensoris ulnaris carpi | G + D | Humeral head of extensor carpi ulnaris.l | Z-Anatomy | 830 | — |
| Chef huméral du fléchisseur ulnaire du carpe | Caput humerale flexoris ulnaris carpi | G + D | Humeral head of flexor carpi ulnaris.l | Z-Anatomy | 3 912 | BodyParts3D 4.0 (humeral head of flexor carpi ulnaris) |
| Chef huméro-ulnaire du fléchisseur superficiel des doigts | Caput humeroulnare flexoris superficialis digitorum | G + D | Humero-ulnar head of flexor digitorum superficialis.l | Z-Anatomy | 12 798 | — |
| Muscle hyoglosse | Musculus hyoglossus | G + D | Hyoglossus muscle.l | Z-Anatomy | 1 424 | BodyParts3D 4.0 (hyoglossus) |
| Muscle iliaque | Musculus iliacus | G + D | Iliacus muscle.l | Z-Anatomy | 4 354 | BodyParts3D 4.0 (iliacus) |
| Muscle iliococcygien | Musculus iliococcygeus | G + D | iliococcygeus | BodyParts3D 4.0 | 4 098 | Z-Anatomy (Iliococcygeus muscle.l) |
| Muscle iliocostal du cou | Musculus iliocostalis colli | D | Iliocostalis colli muscle | Z-Anatomy | 2 050 | — |
| Muscle iliocostal des lombes | Musculus iliocostalis lumborum | G + D | Iliocostalis lumborum muscle.l | Z-Anatomy | 10 038 | BodyParts3D 4.0 (iliocostalis lumborum) |
| Muscle iliocostal du thorax | Musculus iliocostalis thoracis | G + D | Iliocostalis thoracis muscle.l | Z-Anatomy | 5 772 | BodyParts3D 4.0 (iliocostalis thoracis) |
| Arcade iliopectinée | Arcus iliopectineus | G + D | Iliopectineal arch.l | Z-Anatomy | 26 | — |
| (Bourse iliopectinée) | (Iliopectineal bursa) / (Bursa iliopectinea) | G + D | (Iliopectineal bursa).l | Z-Anatomy | 1 472 | — |
| Fascia iliopsoas | Fascia iliopsoae | G + D | Iliopsoas fascia.l | Z-Anatomy | 1 602 | — |
| Tractus iliotibial | Tractus iliotibialis | G + D | Iliotibial tract.l | Z-Anatomy | 48 612 | BodyParts3D 4.0 (iliotibial tract) |
| Rétinaculum inférieur des extenseurs | Retinaculum extensorium inferius tali | G + D | Inferior extensor retinaculum of ankle.l | Z-Anatomy | 316 | — |
| Rétinaculum inférieur des fibulaires | Retinaculum fibulare inferius | G + D | Inferior fibular retinaculum.l | Z-Anatomy | 35 | — |
| Muscle jumeau inférieur | Musculus gemellus inferior | G + D | Inferior gemellus muscle.l | Z-Anatomy | 976 | — |
| Chef inférieur du muscle ptérygoïdien latéral | Caput inferius musculi pterygoidei lateralis | G + D | Inferior head of lateral pterygoid muscle.l | Z-Anatomy | 326 | — |
| Muscle oblique inférieur de l'œil | Musculus obliquus inferior bulbi oculi | G + D | Inferior oblique muscle.l | Z-Anatomy | 1 148 | BodyParts3D 4.0 (inferior oblique) |
| Constricteur inférieur du pharynx | Constrictor inferior pharyngis | G + D | Inferior pharyngeal constrictor.l | Z-Anatomy | 3 696 | BodyParts3D 4.0 (inferior pharyngeal constrictor) |
| Muscle droit inférieur de l'œil | Musculus rectus inferior | G + D | Inferior rectus muscle.l | Z-Anatomy | 1 736 | BodyParts3D 4.0 (inferior rectus) |
| Bourse subtendineuse inférieure du muscle biceps fémoral | Bursa subtendinea inferior musculi bicipitis femoris | G + D | Inferior subtendinous bursa of biceps femoris muscle.l | Z-Anatomy | 992 | — |
| Tarse inférieur | Tarsus inferior | G + D | Inferior tarsus.l | Z-Anatomy | 108 | — |
| Muscle infra-épineux | Musculus infraspinatus | G + D | Infraspinatus muscle.l | Z-Anatomy | 3 166 | BodyParts3D 4.0 (infraspinatus) |
| Ligament inguinal | Ligamentum inguinale | G + D | Inguinal ligament.l | Z-Anatomy | 1 056 | — |
| Muscles intercostaux intimes | Musculi intercostales intimi | G + D | innermost intercostal muscle | BodyParts3D 4.0 | 42 484 | Z-Anatomy (Innermost intercostal muscles.l) |
| Tendon intermédiaire du muscle digastrique | Tendo intermedius musculi digastrici | G + D | Intermediate tendon of digastric muscle.l | Z-Anatomy | 228 | — |
| Bourses glutéales intermusculaires | Bursae intermusculares gluteae | G + D | Intermuscular gluteal bursae.l | Z-Anatomy | 1 240 | — |
| Muscle oblique interne de l'abdomen | Musculus obliquus internus abdominis | G + D | Internal abdominal oblique muscle.l | Z-Anatomy | 28 869 | — |
| Muscles intercostaux internes | Musculi intercostales interni | G + D | Internal intercostal muscles.l | Z-Anatomy | 40 184 | BodyParts3D 4.0 (internal intercostal muscle) |
| Muscles interépineux du cou | Musculi interspinales colli | G + D | Interspinales colli muscles.l | Z-Anatomy | 444 | — |
| Muscles interépineux des lombes | Musculi interspinales lumborum | G + D | Interspinales lumborum muscles.l | Z-Anatomy | 562 | — |
| Muscles interépineux du thorax | Musculi interspinales thoracis | G + D | Interspinales thoracis muscles.l | Z-Anatomy | 198 | — |
| Gaine tendineuse intertuberculaire | Vagina tendinis intertubercularis | G + D | Intertubercular tendon sheath.l | Z-Anatomy | 832 | — |
| Fascia engainant de l'abdomen | Fascia investiens abdominis | G + D | Investing abdominal fascia.l | Z-Anatomy | 11 106 | — |
| Muscle crico-aryténoïdien latéral | Musculus cricoarytendoideus lateralis | G + D | lateral crico-arytenoid | BodyParts3D 4.0 | 2 266 | Z-Anatomy (Lateral crico-arytenoid muscle.l) |
| Septum intermusculaire latéral de la cuisse | Septum intermusculare laterale femoris | G + D | Lateral femoral intermuscular septum.l | Z-Anatomy | 588 | — |
| Chef latéral du court fléchisseur de l'hallux | Caput laterale flexoris brevis hallucis | G + D | lateral head of flexor hallucis brevis | BodyParts3D 4.0 | 1 182 | Z-Anatomy (Lateral head of flexor hallucis brevis.l) |
| Chef latéral du gastrocnémien | Caput laterale musculi gastrocnemii | G + D | Lateral head of gastrocnemius.l | Z-Anatomy | 4 908 | BodyParts3D 4.0 (lateral head of gastrocnemius) |
| Chef latéral du triceps brachial | Caput laterale musculi tricipitis brachii | G + D | Lateral head of triceps brachii.l | Z-Anatomy | 3 628 | BodyParts3D 4.0 (lateral head of triceps brachii) |
| Septum intermusculaire latéral du bras | Septum intermusculare laterale brachii | G + D | Lateral intermuscular septum of arm.l | Z-Anatomy | 160 | — |
| Rétinaculum patellaire latéral | Retinaculum laterale patellae | G + D | Lateral patellar retinaculum.l | Z-Anatomy | 148 | — |
| Muscle droit latéral de l'œil | Musculus rectus lateralis bulbi oculi | G + D | Lateral rectus muscle.l | Z-Anatomy | 1 600 | BodyParts3D 4.0 (lateral rectus) |
| Bourse subtendineuse latérale des muscles gastrocnémiens | Bursa subtendinea lateralis musculi gastrocnemii | G + D | Lateral subtendinous bursa of gastrocnemius muscle.l | Z-Anatomy | 992 | — |
| Muscle grand dorsal | Musculus latissimus dorsi | G + D | Latissimus dorsi muscle.l | Z-Anatomy | 21 580 | — |
| Muscle élévateur de l'angle de la bouche | Levator anguli oris | G + D | Levator anguli oris.l | Z-Anatomy | 330 | — |
| Muscle élévateur de la lèvre supérieure | Levator labii superioris | G + D | Levator labii superioris.l | Z-Anatomy | 540 | — |
| Musclé élévateur nasolabial | Levator nasolabialis | G + D | Levator nasolabialis.l | Z-Anatomy | 172 | — |
| Muscle élévateur de la paupière supérieure | Levator palpebrae superioris | G + D | Levator palpebrae superioris.l | Z-Anatomy | 2 152 | BodyParts3D 4.0 (levator palpebrae superioris) |
| Muscle élévateur de la scapula | Levator scapulae | G + D | Levator scapulae.l | Z-Anatomy | 3 082 | BodyParts3D 4.0 (levator scapulae) |
| Courts élévateurs des côtes | Levatores breves costarum | G + D | Levatores breves costarum.l | Z-Anatomy | 2 690 | — |
| Longs élévateurs des côtes | Levatores longi costarum | G + D | Levatores longi costarum.l | Z-Anatomy | 5 930 | — |
| Ligne blanche | Linea alba | — | linea alba | BodyParts3D 4.0 | 436 | Z-Anatomy (Linea alba) |
| Chef long du biceps brachial | Caput longum musculi bicipitis brachii | G + D | Long head of biceps brachii.l | Z-Anatomy | 3 218 | BodyParts3D 4.0 (long head of biceps brachii) |
| Chef long du biceps fémoral | Caput longum musculi bicipitis femoris | G + D | Long head of biceps femoris.l | Z-Anatomy | 7 258 | BodyParts3D 4.0 (long head of biceps femoris) |
| Chef long du triceps brachial | Caput longum musculi tricipitis brachii | G + D | Long head of triceps brachii.l | Z-Anatomy | 3 950 | BodyParts3D 4.0 (long head of triceps brachii) |
| Muscle longissimus de la tête | Musculus longissimus capitis | G + D | Longissimus capitis muscle.l | Z-Anatomy | 1 574 | BodyParts3D 4.0 (longissimus capitis) |
| Muscle longissimus du cou | Musculus longissimus colli | G + D | Longissimus colli muscle.l | Z-Anatomy | 1 826 | — |
| Muscle longissimus du thorax | Musculus longissimus thoracis | G + D | Longissimus thoracis muscle.l | Z-Anatomy | 9 652 | BodyParts3D 4.0 (longissimus thoracis) |
| Muscle long de la tête | Musculus longus capitis | G + D | Longus capitis muscle.l | Z-Anatomy | 1 980 | BodyParts3D 4.0 (longus capitis) |
| Muscle long du cou | Musculus longus colli | G + D | Longus colli muscle.l | Z-Anatomy | 6 294 | BodyParts3D 4.0 (zone of longus colli) |
| Muscles lombricaux du pied | Musculi lumbricales pedis | G + D | Lumbrical muscles of foot.l | Z-Anatomy | 418 | — |
| Muscles lombricaux de la main | Musculi lumbricales manus | G + D | Lumbrical muscles of hand.l | Z-Anatomy | 1 368 | — |
| Fascia massétérin | Fascia masseterica | G + D | Masseteric fascia.l | Z-Anatomy | 398 | — |
| Septum intermusculaire médial de la cuisse | Septum intermusculare mediale femoris | G + D | Medial femoral intermuscular septum.l | Z-Anatomy | 7 714 | — |
| Chef médial du court fléchisseur de l'hallux | Caput mediale flexoris brevis hallucis | G + D | medial head of flexor hallucis brevis | BodyParts3D 4.0 | 700 | Z-Anatomy (Medial head of flexor hallucis brevis.l) |
| Chef médial du gastrocnémien | Caput mediale musculi gastrocnemii | G + D | Medial head of gastrocnemius.l | Z-Anatomy | 6 462 | BodyParts3D 4.0 (medial head of gastrocnemius) |
| Chef médial du triceps brachial | Caput mediale musculi tricipitis caput brachii | G + D | Medial head of triceps brachii.l | Z-Anatomy | 2 686 | BodyParts3D 4.0 (medial head of triceps brachii) |
| Septum intermusculaire médial du bras | Septum intermusculare mediale brachii | G + D | Medial intermuscular septum of arm.l | Z-Anatomy | 312 | — |
| Rétinaculum patellaire médial | Retinaculum mediale patellae | G + D | Medial patellar retinaculum.l | Z-Anatomy | 184 | — |
| Muscle ptérygoïdien médial | Musculus pterygoideus medialis | G + D | Medial pterygoid muscle.l | Z-Anatomy | 496 | — |
| Muscle droit médial de l'œil | Musculus rectus medialis | G + D | Medial rectus muscle.l | Z-Anatomy | 1 252 | BodyParts3D 4.0 (medial rectus) |
| Bourse subtendineuse médiale | Bursa subtendinea medialis musculi gastrocnemii | G + D | Medial subtendinous bursa of gastrocnemius muscle.l | Z-Anatomy | 864 | — |
| Muscle mentonnier | Musculus mentalis | G + D | Mentalis muscle.l | Z-Anatomy | 166 | — |
| Lame moyenne du fascia thoracolombaire | Lamina media fasciae thoracolumbaris | G + D | Middle layer of thoracolumbar fascia.l | Z-Anatomy | 160 | — |
| Constricteur moyen du pharynx | Constrictor medius pharyngis | G + D | Middle pharyngeal constrictor.l | Z-Anatomy | 2 948 | BodyParts3D 4.0 (middle pharyngeal constrictor) |
| Muscles multifides du cou | Musculus multifidus colli | G + D | Multifidus colli muscle.l | Z-Anatomy | 1 390 | — |
| Muscles multifides lombaire | Musculus multifidus lumborum | G + D | Multifidus lumborum muscle.l | Z-Anatomy | 2 820 | — |
| Muscles multifides du thorax | Musculus multifidus thoracis | G + D | Multifidus thoracis muscle.l | Z-Anatomy | 3 902 | — |
| Muscle mylohyoïdien | Musculus mylohyoideus | G + D | mylohyoid | BodyParts3D 4.0 | 1 278 | Z-Anatomy (Mylohyoid muscle.l) |
| Muscle nasal | Musculus nasalis | G + D | Nasalis muscle.l | Z-Anatomy | 704 | — |
| Chef oblique de l'adducteur de l'hallux | Caput obliquum adductoris hallucis | G + D | Oblique head of adductor hallucis.l | Z-Anatomy | 904 | BodyParts3D 4.0 (oblique head of adductor hallucis) |
| Chef oblique de l'adducteur du pouce | Caput obliquum adductoris pollicis | G + D | oblique head of adductor pollicis | BodyParts3D 4.0 | 528 | Z-Anatomy (Oblique head of adductor pollicis.l) |
| Partie oblique du muscle cricothyroïdien | Pars obliqua musculi cricothyreoidei | G + D | oblique part of cricothyroid | BodyParts3D 4.0 | 2 498 | Z-Anatomy (Oblique part of cricothyroid muscle.l) |
| Muscle oblique inférieur de la tête | Musculus obliquus inferior capitis | G + D | Obliquus inferior capitis muscle.l | Z-Anatomy | 540 | — |
| Muscle oblique supérieur de la tête | Musculus obliquus superior capitis | G + D | Obliquus superior capitis muscle.l | Z-Anatomy | 654 | — |
| Obturateur externe | Obturator externus | G + D | Obturator externus.l | Z-Anatomy | 1 156 | BodyParts3D 4.0 (obturator externus) |
| Obturateur interne | Obturator internus | G + D | Obturator internus.l | Z-Anatomy | 3 760 | BodyParts3D 4.0 (obturator internus) |
| Muscle occipital | Musculus occipitalis | G + D | Occipitalis muscle.l | Z-Anatomy | 2 602 | — |
| Muscle omohyoïdien | Musculus omohyoideus | G + D | Omohyoid muscle.l | Z-Anatomy | 2 706 | BodyParts3D 4.0 (omohyoid) |
| (Opposant du petit doigt) | (Opponens digiti minimi muscle of foot) / (Musculus opponens digiti minimi pedis) | G + D | (Opponens digiti minimi muscle of foot).l | Z-Anatomy | 236 | BodyParts3D 4.0 (opponens digiti minimi of foot) |
| Muscle opposant du petit doigt | Musculus opponens digiti minimi manus | G + D | Opponens digiti minimi muscle of hand.l | Z-Anatomy | 420 | BodyParts3D 4.0 (opponens digiti minimi of hand) |
| Muscle opposant du pouce | Musculus opponens pollicis | G + D | opponens pollicis | BodyParts3D 4.0 | 680 | Z-Anatomy (Opponens pollicis muscle.l) |
| Muscle orbiculaire de la bouche | Musculus orbicularis oris | G + D | Orbicularis oris muscle.l | Z-Anatomy | 1 880 | — |
| Partie orbitaire du muscle orbiculaire de l'oeil | Pars orbitalis musculi orbicularis oculi | G + D | Orbital part of orbicularis oculi.l | Z-Anatomy | 2 390 | — |
| Muscle palatopharyngien | Musculus palatopharyngeus | G + D | Palatopharyngeus muscle.l | Z-Anatomy | 15 282 | BodyParts3D 4.0 (palatopharyngeus) |
| Aponévrose palmaire | Aponeurosis palmaris | G + D | Palmar aponeurosis.l | Z-Anatomy | 1 284 | — |
| Muscles interosseux palmaires | Musculi interossei palmares | G + D | Palmar interossei muscles.l | Z-Anatomy | 174 | — |
| Muscle long palmaire | Musculus palmaris longus | G + D | Palmaris longus muscle.l | Z-Anatomy | 4 374 | BodyParts3D 4.0 (palmaris longus) |
| Partie palpébrale du muscle orbiculaire de l'oeil | Pars palpebralis musculi orbicularis oculi | G + D | Palpebral part of orbicularis oculi.l | Z-Anatomy | 830 | — |
| Muscle pectiné | Musculus pectineus | G + D | Pectineus muscle.l | Z-Anatomy | 1 952 | BodyParts3D 4.0 (pectineus) |
| Fascia pectoral | Fascia pectoralis | G + D | Pectoral fascia.l | Z-Anatomy | 2 709 | — |
| Muscle petit pectoral | Musculus pectoralis minor | G + D | Pectoralis minor muscle.l | Z-Anatomy | 4 142 | BodyParts3D 4.0 (pectoralis minor) |
| Fascia du muscle piriforme | Fascia musculi piriformis | G + D | Piriformis fascia.l | Z-Anatomy | 926 | — |
| Muscle piriforme | Musculus piriformis | G + D | Piriformis muscle.l | Z-Anatomy | 1 500 | BodyParts3D 4.0 (piriformis) |
| Aponévrose plantaire | Aponeurosis plantaris | G + D | Plantar aponeurosis.l | Z-Anatomy | 406 | — |
| Muscles interosseux plantaires | Musculi interossei plantares | G + D | Plantar interossei muscles.l | Z-Anatomy | 1 242 | — |
| Gaine tendineuse plantaire du muscle long fibulaire | Vagina plantaris tendinis musculi fibularis longi | G + D | Plantar tendon sheath of fibularis longus muscle.l | Z-Anatomy | 640 | — |
| Muscle plantaire | Musculus plantaris | G + D | Plantaris muscle.l | Z-Anatomy | 4 698 | BodyParts3D 4.0 (plantaris) |
| Platysma | Platysma | G + D | Platysma.l | Z-Anatomy | 6 548 | BodyParts3D 4.0 (platysma) |
| Fascia poplité | Fascia poplitea | G + D | Popliteal fascia.l | Z-Anatomy | 488 | — |
| Muscle poplité | Musculus popliteus | G + D | Popliteus muscle.l | Z-Anatomy | 1 132 | BodyParts3D 4.0 (popliteus) |
| Ventre postérieur du muscle digastrique | Venter posterior musculi digastrici | G + D | Posterior belly of digastric muscle.l | Z-Anatomy | 1 276 | — |
| Muscle crico-aryténoïdien postérieur | Musculus cricoarytenoideus posterior | G + D | posterior crico-arytenoid | BodyParts3D 4.0 | 2 098 | Z-Anatomy (Posterior crico-arytenoid muscle.l) |
| Septum intermusculaire postérieur de la jambe | Septum intermusculare posterius cruris | G + D | Posterior intermuscular septum of leg.l | Z-Anatomy | 265 | — |
| Lame postérieure du fascia thoracolombaire | Lamina posterior fasciae thoracolumbaris | G + D | Posterior layer of thoracolumbar fascia.l | Z-Anatomy | 313 | — |
| Muscle procérus | Musculus procerus | G + D | Procerus muscle.l | Z-Anatomy | 546 | — |
| Carré pronateur | Pronator quadratus | G + D | pronator quadratus | BodyParts3D 4.0 | 1 292 | Z-Anatomy (Pronator quadratus.l) |
| Grand psoas | Psoas major | G + D | Psoas major.l | Z-Anatomy | 5 474 | BodyParts3D 4.0 (psoas major) |
| Muscle pubo-anal | Musculus puboanalis | G + D | Pubo-analis muscle.l | Z-Anatomy | 1 440 | — |
| Muscle pubococcygien | Musculus pubococcygeus | G + D | pubococcygeus | BodyParts3D 4.0 | 3 458 | Z-Anatomy (Pubococcygeus muscle.l) |
| Muscle pyramidal de l'abdomen | Musculus pyramidalis | G + D | Pyramidalis muscle.l | Z-Anatomy | 1 112 | — |
| Muscle carré fémoral | Musculus quadratus femoris | G + D | Quadratus femoris muscle.l | Z-Anatomy | 1 646 | BodyParts3D 4.0 (quadratus femoris) |
| Muscle carré des lombes | Musculus quadratus lumborum | G + D | Quadratus lumborum muscle.l | Z-Anatomy | 2 832 | — |
| Muscle carré plantaire | Musculus quadratus plantae | G + D | Quadratus plantae muscle.l | Z-Anatomy | 1 176 | — |
| Chef radial du fléchisseur superficiel des doigts | Caput radiale flexoris superficialis digitorum | G + D | Radial head of flexor digitorum superficialis.l | Z-Anatomy | 1 276 | — |
| Muscle droit de l'abdomen | Musculus rectus abdominis | G + D | Rectus abdominis muscle.l | Z-Anatomy | 20 604 | — |
| Muscle droit antérieur de la tête | Musculus rectus anterior capitis | G + D | Rectus anterior capitis muscle.l | Z-Anatomy | 396 | — |
| Muscle droit fémoral | Musculus rectus femoris | G + D | Rectus femoris muscle.l | Z-Anatomy | 8 276 | BodyParts3D 4.0 (rectus femoris) |
| Muscle droit latéral de la tête | Musculus rectus lateralis capitis | G + D | Rectus lateralis capitis muscle.l | Z-Anatomy | 360 | — |
| Muscle grand droit postérieur de la tête | Musculus rectus posterior major capitis | G + D | Rectus posterior major capitis muscle.l | Z-Anatomy | 788 | — |
| Muscle petit droit postérieur de la tête | Musculus rectus posterior minor capitis | G + D | Rectus posterior minor capitis muscle.l | Z-Anatomy | 432 | — |
| Muscle grand rhomboïde | Musculus rhomboideus major | G + D | Rhomboid major muscle.l | Z-Anatomy | 4 800 | BodyParts3D 4.0 (rhomboid major) |
| Muscle petit rhomboïde | Musculus rhomboideus minor | G + D | Rhomboid minor muscle.l | Z-Anatomy | 1 494 | BodyParts3D 4.0 (rhomboid minor) |
| Muscle risorius | Musculus risorius | G + D | Risorius muscle.l | Z-Anatomy | 592 | — |
| Muscles rotateurs | Rotatores | G + D | Rotatores.l | Z-Anatomy | 6 518 | — |
| Muscle sartorius | Musculus sartorius | G + D | Sartorius muscle.l | Z-Anatomy | 4 966 | BodyParts3D 4.0 (sartorius) |
| Muscle scalène antérieur | Musculus scalenus anterior | G + D | Scalenus anterior muscle.l | Z-Anatomy | 1 386 | BodyParts3D 4.0 (scalenus anterior) |
| Muscle scalène moyen | Musculus scalenus medius | G + D | Scalenus medius muscle.l | Z-Anatomy | 2 078 | BodyParts3D 4.0 (scalenus medius) |
| Muscle scalène postérieur | Musculus scalenus posterior | G + D | Scalenus posterior muscle.l | Z-Anatomy | 1 326 | BodyParts3D 4.0 (scalenus posterior) |
| Partie scapulaire épineuse du deltoïde | Pars spinalis scapularis musculi deltoidei | G + D | Scapular spinal part of deltoid muscle.l | Z-Anatomy | 4 378 | — |
| Bourse ischiatique du grand fessier | Bursa ischiadica musculi glutei maximi | G + D | Sciatic bursa of gluteus maximus muscle.l | Z-Anatomy | 1 472 | — |
| Bourse ischiatique de l'obturateur interne | Bursa ischiadica obturatoris interni | G + D | Sciatic bursa of obturator internus.l | Z-Anatomy | 1 472 | — |
| Bourse du muscle semimembraneux | Bursa musculi semimembranosi | G + D | Semimembranosus bursa.l | Z-Anatomy | 992 | — |
| Muscle semimembraneux | Musculus semimembranosus | G + D | Semimembranosus muscle.l | Z-Anatomy | 7 442 | BodyParts3D 4.0 (semimembranosus) |
| Muscle semi-épineux du cou | Musculus semispinalis colli | G + D | Semispinalis colli muscle.l | Z-Anatomy | 2 584 | — |
| Muscle semi-épineux du thorax | Musculus semispinalis thoracis | G + D | Semispinalis thoracis muscle.l | Z-Anatomy | 4 972 | BodyParts3D 4.0 (semispinalis thoracis) |
| Muscle semitendineux | Musculus semitendinosus | G + D | Semitendinosus muscle.l | Z-Anatomy | 4 316 | BodyParts3D 4.0 (semitendinosus) |
| Muscle dentelé antérieur | Musculus serratus anterior | G + D | Serratus anterior muscle.l | Z-Anatomy | 25 240 | BodyParts3D 4.0 (serratus anterior) |
| Muscle dentelé postéro-inférieur | Musculus serratus posterior inferior | G + D | Serratus posterior inferior muscle.l | Z-Anatomy | 8 958 | BodyParts3D 4.0 (serratus posterior inferior) |
| Muscle dentelé postéro-supérieur | Musculus serratus posterior superior | G + D | Serratus posterior superior muscle.l | Z-Anatomy | 5 518 | BodyParts3D 4.0 (serratus posterior superior) |
| Chef court du biceps brachial | Caput breve musculi bicipitis brachii | G + D | Short head of biceps brachii.l | Z-Anatomy | 2 696 | BodyParts3D 4.0 (short head of biceps brachii) |
| Chef court du biceps fémoral | Caput breve musculi bicipitis femoris | G + D | Short head of biceps femoris.l | Z-Anatomy | 2 476 | BodyParts3D 4.0 (short head of biceps femoris) |
| Muscle soléaire | Musculus soleus | G + D | Soleus muscle.l | Z-Anatomy | 6 774 | BodyParts3D 4.0 (soleus) |
| Muscle épineux de la tête | Musculus spinalis capitis | G + D | Spinalis capitis muscle.l | Z-Anatomy | 2 560 | — |
| Muscle épineux du cou | Musculus spinalis colli | G + D | Spinalis colli muscle.l | Z-Anatomy | 596 | — |
| Muscle épineux du thorax | Musculus spinalis thoracis | G + D | Spinalis thoracis muscle.l | Z-Anatomy | 5 532 | BodyParts3D 4.0 (spinalis thoracis) |
| Muscle splénius de la tête | Musculus splenius capitis | G + D | Splenius capitis muscle.l | Z-Anatomy | 5 262 | BodyParts3D 4.0 (splenius capitis) |
| Muscle splénius du cou | Musculus splenius colli | G + D | Splenius colli muscle.l | Z-Anatomy | 4 314 | — |
| Muscle sternocléïdomastoïdien | Musculus sternocleidomastoideus | G + D | Sternocleidomastoid muscle.l | Z-Anatomy | 4 952 | BodyParts3D 4.0 (sternocleidomastoid) |
| Chef sternocostal du grand pectoral | Pars sternocostalis musculi pectoralis majoris | G + D | Sternocostal head of pectoralis major muscle.l | Z-Anatomy | 3 222 | — |
| Muscle sternohyoïdien | Musculus sternohyoideus | G + D | Sternohyoid muscle.l | Z-Anatomy | 1 394 | BodyParts3D 4.0 (sternohyoid) |
| Muscle sternothyroïdien | Musculus sternothyreoideus | G + D | Sternothyroid muscle.l | Z-Anatomy | 1 088 | BodyParts3D 4.0 (sternothyroid) |
| Partie droite du muscle cricothyroïdien | Pars recta musculi cricothyreoidei | G + D | straight part of cricothyroid | BodyParts3D 4.0 | 2 096 | Z-Anatomy (Straight part of cricothyroid muscle.l) |
| Muscle stylohyoïdien | Musculus stylohyoideus | G + D | Stylohyoid muscle.l | Z-Anatomy | 694 | BodyParts3D 4.0 (stylohyoid) |
| Muscle stylopharyngien | Musculus stylopharyngeus | G + D | Stylopharyngeus muscle.l | Z-Anatomy | 9 478 | BodyParts3D 4.0 (stylopharyngeus) |
| Bourse subacromiale | Bursa subacromialis | G + D | Subacromial bursa.l | Z-Anatomy | 1 472 | — |
| Muscle subclavier | Musculus subclavius | G + D | subclavius | BodyParts3D 4.0 | 818 | Z-Anatomy (Subclavius muscle.l) |
| (Bourse acromiale sous-cutanée) | (Subcutaneous acromial bursa) / (Bursa subcutanea acromialis) | G + D | Subcutaneous acromial bursa.l | Z-Anatomy | 1 472 | — |
| Bourse sous-cutanée de la malléole latérale | Bursa subcutanea malleoli lateralis | G + D | Subcutaneous bursa of lateral malleolus.l | Z-Anatomy | 656 | — |
| Bourse sous-cutanée malléolaire | Bursa subcutanea malleoli | G + D | Subcutaneous bursa of medial malleolus.l | Z-Anatomy | 656 | — |
| Bourse sous-cutanée de la tubérosité tibiale | Bursa subcutanea tuberositatis tibiae | G + D | Subcutaneous bursa of tuberosity of tibia.l | Z-Anatomy | 1 472 | — |
| Bourse sous-cutanée calcanéenne | Bursa subcutanea calcanea | G + D | Subcutaneous calcaneal bursa.l | Z-Anatomy | 544 | — |
| Bourse sous-cutanée infrapatellaire | Bursa subcutanea infrapatellaris | G + D | Subcutaneous infrapatellar bursa.l | Z-Anatomy | 1 472 | — |
| Bourse prépatellaire sous-cutanée | Bursa subcutanea prepatellaris | G + D | Subcutaneous prepatellar bursa.l | Z-Anatomy | 992 | — |
| Bourse trochantérique sous-cutanée | Bursa subcutanea trochanterica | G + D | Subcutaneous trochanteric bursa.l | Z-Anatomy | 1 472 | — |
| Bourse subdeltoïdienne | Bursa subdeltoidea | G + D | Subdeltoid bursa.l | Z-Anatomy | 1 472 | — |
| Subfacial prepatellar bursa | Subfacial prepatellar bursa | G + D | Subfacial prepatellar bursa.l | Z-Anatomy | 992 | — |
| Muscle subscapulaire | Musculus subscapularis | G + D | Subscapularis muscle.l | Z-Anatomy | 2 954 | BodyParts3D 4.0 (subscapularis) |
| Bourse subtendineuse du muscle iliaque | Bursa subtendinea iliaca | G + D | Subtendinous bursa of iliacus muscle.l | Z-Anatomy | 352 | — |
| Bourse subtendineuse du muscle infra-épineux | Bursa subtendinea musculi infraspinati | G + D | Subtendinous bursa of infraspinatus muscle.l | Z-Anatomy | 1 472 | — |
| Bourse subtendineuse de l'obturateur interne | Bursa subtendinea obturatoris interni | G + D | Subtendinous bursa of obturator internus.l | Z-Anatomy | 1 472 | — |
| Bourse subtendineuse du muscle sartorius | Bursa subtendinea musculi sartorii | G + D | Subtendinous bursa of sartorius muscle.l | Z-Anatomy | 1 296 | — |
| Bourse subtendineuse du muscle grand rond | Bursa subtendinea musculi teretis majoris | G + D | Subtendinous bursa of teres major muscle.l | Z-Anatomy | 1 472 | — |
| Bourse subtendineuse du muscle tibial antérieur | Bursa subtendinea musculi tibialis anterioris | G + D | Subtendinous bursa of tibialis anterior.l | Z-Anatomy | 704 | — |
| Bourse sous-tendineuse du muscle trapèze | Bursa subtendinea musculi trapezii | G + D | Subtendinous bursa of trapezius muscle.l | Z-Anatomy | 5 888 | — |
| Bourse subtendineuse du muscle triceps brachial | Bursa subtendinea musculi tricipitis | G + D | Subtendinous bursa of triceps brachii muscle.l | Z-Anatomy | 1 472 | — |
| Bourse subtendineuse calcanéenne | Bursa subtendinea calcanea | G + D | Subtendinous calcaneal bursa.l | Z-Anatomy | 544 | — |
| Bourse subtendineuse prépatellaire | (Bursa subtendinea prepatellaris) | G + D | Subtendinous prepatellar bursa.l | Z-Anatomy | 992 | — |
| Chef superficiel du court fléchisseur du pouce | Caput superficiale flexoris brevis pollicis | G + D | superficial head of flexor pollicis brevis | BodyParts3D 4.0 | 540 | Z-Anatomy (Superficial head of flexor pollicis brevis.l) |
| Chef superficiel du rond pronateur | Caput superficiale pronatoris teretis | G + D | Superficial head of pronator teres.l | Z-Anatomy | 2 546 | — |
| Fascia engainant superficiel du cou | Fascia investiens superficialis colli lamina | G + D | Superficial investing cervical fascia.l | Z-Anatomy | 3 336 | — |
| Couche superficielle du fascia temporal | Lamina superficialis fasciae temporalis | G + D | Superficial layer of temporal fascia.l | Z-Anatomy | 685 | — |
| Partie superficielle du muscle masséter | Pars superficialis masseteris | G + D | Superficial part of masseter.l | Z-Anatomy | 1 404 | — |
| Ligament métacarpien transverse superficiel | Ligamentum metacarpeum transversum superficiale | G + D | Superficial transverse metacarpal ligament.l | Z-Anatomy | 192 | — |
| Ligament métatarsien superficiel transverse | Ligamentum metatarseum transversum superficiale | G + D | Superficial transverse metatarsal ligament.l | Z-Anatomy | 99 | — |
| Bourse supérieure du muscle biceps fémoral | Bursa superior musculi bicipitis femoris | G + D | Superior bursa of biceps femoris muscle.l | Z-Anatomy | 1 472 | — |
| Rétinaculum supérieur des extenseurs | Retinaculum extensorium superius tali | G + D | Superior extensor retinaculum of ankle.l | Z-Anatomy | 260 | — |
| Rétinaculum supérieur des fibulaires | Retinaculum fibulare superius | G + D | Superior fibular retinaculum.l | Z-Anatomy | 652 | — |
| Muscle jumeau supérieur | Musculus gemellus superior | G + D | Superior gemellus muscle.l | Z-Anatomy | 404 | — |
| Chef supérieur du muscle ptérygoïdien latéral | Caput superius musculi pterygoidei lateralis | G + D | Superior head of lateral pterygoid muscle.l | Z-Anatomy | 226 | — |
| Muscle oblique supérieur de l'œil | Musculus obliquus superior bulbi oculi | G + D | Superior oblique muscle.l | Z-Anatomy | 1 750 | BodyParts3D 4.0 (superior oblique) |
| Constricteur supérieur du pharynx | Constrictor superior pharyngis | G + D | Superior pharyngeal constrictor.l | Z-Anatomy | 5 334 | BodyParts3D 4.0 (superior pharyngeal constrictor) |
| Muscle droit supérieur de l'œil | Musculus rectus superior | G + D | Superior rectus muscle.l | Z-Anatomy | 1 284 | BodyParts3D 4.0 (superior rectus) |
| Tarse supérieur | Tarsus superior | G + D | Superior tarsus.l | Z-Anatomy | 178 | — |
| Supinateur | Supinator | G + D | Supinator.l | Z-Anatomy | 2 754 | BodyParts3D 4.0 (supinator) |
| Bourse suprapatellaire | Bursa suprapatellaris | G + D | Suprapatellar bursa.l | Z-Anatomy | 1 296 | — |
| Muscle supra-épineux | Musculus supraspinatus | G + D | Supraspinatus muscle.l | Z-Anatomy | 1 430 | BodyParts3D 4.0 (supraspinatus) |
| Gaines synoviales des doigts de la main | Vaginae synoviales digitorum | G + D | Synovial sheaths of digits of hand.l | Z-Anatomy | 6 976 | — |
| Muscle temporal | Musculus temporalis | G + D | Temporalis muscle.l | Z-Anatomy | 10 260 | — |
| Muscle temporopariétal | Musculus temporoparietalis | G + D | Temporoparietalis muscle.l | Z-Anatomy | 11 972 | — |
| Arcade tendineuse de l'élévateur de l'anus | Arcus tendineus levatoris ani | G + D | tendinous arch of levator ani | BodyParts3D 4.0 | 1 384 | Z-Anatomy (Tendinous arch of levator ani.l) |
| Tendon du long extenseur des orteils | Tendon extensoris digitorum longi | G + D | Tendon of extensor digitorum longus.l | Z-Anatomy | 5 184 | — |
| Gaine tend. du long abducteur et du court ext. du pouce | Vagina tendinum abd. longi et extensoris brevis pollicis | G + D | Tendon sheath - abd. pollicis longus - ext. pollicis brevis.l | Z-Anatomy | 680 | — |
| Gaine tendineuse de l'extenseur ulnaire du carpe | Vagina tendinis extensoris ulnaris carpi | G + D | Tendon sheath of extensor carpi ulnaris.l | Z-Anatomy | 960 | — |
| Tendon sheath of extensor digiti minimi manus | Tendon sheath of extensor digiti minimi manus | G + D | Tendon sheath of extensor digiti minimi manus.l | Z-Anatomy | 592 | — |
| Gaine tendineuse des m. extenseurs des doigts et de l'index | Vagina tendinum musc. ext. digitorum - extensoris indicis | G + D | Tendon sheath of extensor digitorum and extensor indicis.l | Z-Anatomy | 2 368 | — |
| Gaine tendineuse du long extenseur des doigts | Vagina tendinum extensoris longi digitorum | G + D | Tendon sheath of extensor digitorum longus.l | Z-Anatomy | 2 064 | — |
| Gaine tendineurse du long extenseur de l'hallux | Vagina tendinis extensoris longi hallucis | G + D | Tendon sheath of extensor hallucis longus.l | Z-Anatomy | 592 | — |
| Gaine tendineuse du muscle long extenseur du pouce | Vagina tendinis musculi extensoris pollicis longi | G + D | Tendon sheath of extensor pollicis longus.l | Z-Anatomy | 432 | — |
| Tendon sheath of extensors carpi radialis | Tendon sheath of extensors carpi radialis | G + D | Tendon sheath of extensors carpi radialis.l | Z-Anatomy | 2 304 | — |
| Gaine tendineuse du fléchisseur de radial du carpe | Vagina tendinis flexoris radialis carpi | G + D | Tendon sheath of flexor carpi radialis.l | Z-Anatomy | 1 088 | — |
| Gaine tendineurse du muscle long fléchisseur des orteils | Vagina tendinis flexoris digitorum longus | G + D | Tendon sheath of flexor digitorum longus.l | Z-Anatomy | 256 | — |
| Gaine tendineurse du muscle long fléchisseur de l'hallux | Vagina tendinis flexoris longi hallucis | G + D | Tendon sheath of flexor hallucis longus.l | Z-Anatomy | 1 728 | — |
| Gaine tendineuse du long fléchisseur du pouce | Vagina tendinis flexoris longi pollicis | G + D | Tendon sheath of flexor pollicis longus.l | Z-Anatomy | 3 136 | — |
| Tendon sheath of tibialis anterior | Tendon sheath of tibialis anterior | G + D | Tendon sheath of tibialis anterior.l | Z-Anatomy | 240 | — |
| Gaine tendineuse du muscle tibial postérieur | Vagina tendinis musculi tibialis posterioris | G + D | Tendon sheath of tibialis posterior muscle.l | Z-Anatomy | 286 | — |
| Muscle tenseur du fascia lata | Tensor fasciae latae | G + D | Tensor fasciae latae.l | Z-Anatomy | 1 862 | BodyParts3D 4.0 (tensor fasciae latae) |
| Muscle grand rond | Musculus teres major | G + D | Teres major muscle.l | Z-Anatomy | 1 154 | BodyParts3D 4.0 (teres major) |
| Muscle petit rond | Musculus teres minor | G + D | Teres minor muscle.l | Z-Anatomy | 1 522 | BodyParts3D 4.0 (teres minor) |
| Partie thyro-épiglottique du muscle thyro-aryténoïdien | Pars thyreoepiglottica musculi thyreoarytenoidei | G + D | Thyro-epiglottic part of thyro-arytenoid muscle.l | Z-Anatomy | 3 110 | — |
| Muscle thyrohyoïdien | Musculus thyreohyoideus | G + D | thyrohyoid | BodyParts3D 4.0 | 904 | Z-Anatomy (Thyrohyoid muscle.l) |
| Muscle tibial antérieur | Musculus tibialis anterior | G + D | Tibialis anterior muscle.l | Z-Anatomy | 3 526 | BodyParts3D 4.0 (tibialis anterior) |
| Muscle tibial postérieur | Musculus tibialis posterior | G + D | Tibialis posterior muscle.l | Z-Anatomy | 5 526 | BodyParts3D 4.0 (tibialis posterior) |
| Fascia transversalis | Fascia transversalis | — | Transversalis fascia | Z-Anatomy | 4 207 | — |
| Muscle aryténoïdien transverse | Musculus arytenoideus transversus | — | transverse arytenoid | BodyParts3D 4.0 | 2 914 | Z-Anatomy (Transverse arytenoid muscle) |
| Chef transverse de l'adducteur de l'hallux | Caput transversum adductoris hallucis | G + D | transverse head of adductor hallucis | BodyParts3D 4.0 | 656 | Z-Anatomy (Transverse head of adductor hallucis.l) |
| Chef transverse de l'adducteur du pouce | Caput transversum adductoris pollicis | G + D | Transverse head of adductor pollicis.l | Z-Anatomy | 1 014 | BodyParts3D 4.0 (transverse head of adductor pollicis) |
| Septum intermusculaire transverse de la jambe | Septum intermusculare transversum cruris | G + D | Transverse intermuscular septum of leg.l | Z-Anatomy | 495 | — |
| Partie transverse du trapèze | Pars transversa musculi trapezii | G + D | Transverse part of trapezius muscle.l | Z-Anatomy | 2 992 | BodyParts3D 4.0 (transverse part of trapezius) |
| Muscle transverse de l'abdomen | Musculus transversus abdominis | G + D | Transversus abdominis muscle.l | Z-Anatomy | 34 328 | — |
| Muscle transverse du thorax | Musculus transversus thoracis | G + D | transversus thoracis | BodyParts3D 4.0 | 2 448 | Z-Anatomy (Transversus thoracis muscle.l) |
| Bourse trochantérique du muscle grand fessier | Bursa trochanterica musculi glutei maximi | G + D | Trochanteric bursa of gluteus maximus muscle.l | Z-Anatomy | 1 472 | — |
| Trochanteric bursa of gluteus medius muscle | Trochanteric bursa of gluteus medius muscle | G + D | Trochanteric bursa of gluteus medius muscle.l | Z-Anatomy | 1 472 | — |
| Bourse trochantérique du muscle petit fessier | Bursa trochanterica musculi glutei minimi | G + D | Trochanteric bursa of gluteus minimus muscle.l | Z-Anatomy | 1 472 | — |
| Trochlée du muscle oblique supérieur | Trochlea musculi obliqui superioris | G + D | trochlea of superior oblique | BodyParts3D 4.0 | 422 | Z-Anatomy (Trochlea of superior oblique muscle.l) |
| Chef ulnaire de l'extenseur ulnaire du carpe | Caput ulnare extensoris ulnaris carpi | G + D | Ulnar head of extensor carpi ulnaris.l | Z-Anatomy | 582 | — |
| Chef ulnaire du fléchisseur ulnaire du carpe | Caput ulnare flexoris ulnaris carpi | G + D | Ulnar head of flexor carpi ulnaris.l | Z-Anatomy | 1 466 | BodyParts3D 4.0 (ulnar head of flexor carpi ulnaris) |
| Muscle vaste intermédiaire | Musculus vastus intermedius | G + D | Vastus intermedius muscle.l | Z-Anatomy | 6 164 | BodyParts3D 4.0 (vastus intermedius) |
| Muscle vaste latéral | Musculus vastus lateralis | G + D | Vastus lateralis muscle.l | Z-Anatomy | 9 356 | BodyParts3D 4.0 (vastus lateralis) |
| Muscle vaste médial | Musculus vastus medialis | G + D | Vastus medialis muscle.l | Z-Anatomy | 6 460 | BodyParts3D 4.0 (vastus medialis) |
| Parties ventrales des muscles intertransv. lat. des lombes | Partes vent. musculorum intertransversariorum lat. lumborum | G + D | Ventral parts of lateral intertransversarii lumborum muscles.l | Z-Anatomy | 996 | — |
| Muscle grand zygomatique | Musculus zygomaticus major | G + D | Zygomaticus major muscle.l | Z-Anatomy | 798 | — |
| Muscle petit zygomatique | Musculus zygomaticus minor | G + D | Zygomaticus minor muscle.l | Z-Anatomy | 432 | — |

## Organes (595 maillages)

### Nerveux et sens

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| Noyau accessoire du nerf oculomoteur | Nucleus accessorius nervi oculomotorii | G + D | Accessory nucleus of oculomotor nerve.l | Z-Anatomy | 768 | — |
| Ampoule du canalicule lacrymal | Ampulla canaliculi lacrimalis | G + D | Ampulla of lacrimal canaliculus.l | Z-Anatomy | 244 | — |
| Corps amygdaloïde | Corpus amygdaloideum | G + D | Amygdaloid body.l | Z-Anatomy | 384 | — |
| Gyrus angulaire | Gyrus angularis | G + D | angular gyrus | BodyParts3D 4.0 | 2 874 | Z-Anatomy (Angular gyrus.l) |
| Chambre antérieure du globe oculaire | Camera anterior bulbi oculi | G + D | Anterior chamber of eyeball.l | Z-Anatomy | 8 704 | BodyParts3D 4.0 (anterior chamber of eyeball) |
| Noyau cochléaire antérieur | Nucleus cochlearis anterior | G + D | Anterior cochlear nucleus.l | Z-Anatomy | 192 | — |
| Commissure antérieure | Commissura anterior | — | Anterior commissure | Z-Anatomy | 800 | BodyParts3D 4.0 (anterior commissure) |
| Tractus corticospinal antérieur | Tractus corticospinalis anterior | — | Anterior corticospinal tract | Z-Anatomy | 7 272 | — |
| Faisceau antérieur propre | Fasciculus proprius anterior | — | Anterior fasciculus proprius | Z-Anatomy | 9 292 | — |
| Corne antérieure de la moëlle épinière | Cornu anterius medullae spinalis | — | Anterior horn of spinal cord | Z-Anatomy | 8 888 | — |
| Anterior occipital sulcus | Anterior occipital sulcus | G + D | Anterior occipital sulcus*.l | Z-Anatomy | 364 | — |
| Lobule quadrangulaire antérieur | Lobulus quadrangularis anterior | G + D | Anterior quadrangular lobule.l | Z-Anatomy | 6 520 | — |
| Segment antérieur du globe occulaire | Segmentum anterius bulbi oculi | G + D | Anterior segment of eyeball.l | Z-Anatomy | 3 328 | — |
| Tractus spinocérébelleux antérieur | Tractus spinocerebellaris anterior | — | Anterior spinocerebellar tract | Z-Anatomy | 11 716 | — |
| Tractus spinothalamique antérieur | Tractus spinothalamicus anterior | — | Anterior spinothalamic tract | Z-Anatomy | 8 080 | — |
| Aqueduc du mésencéphale | Aquaeductus mesencephali | — | Aqueduct of midbrain | Z-Anatomy | 460 | — |
| Trompe auditive | Tuba auditiva | G + D | Auditory tube.l | Z-Anatomy | 1 840 | — |
| Base du pédoncule | Basis pedunculi | G + D | Base of peduncle.l | Z-Anatomy | 5 046 | — |
| Lobule biventral | Lobulus biventer | G + D | Biventral lobule.l | Z-Anatomy | 8 902 | — |
| Sillon calcarin | Sulcus calcarinus | G + D | Calcarine sulcus.l | Z-Anatomy | 872 | — |
| Noyau caudé | Nucleus caudatus | G + D | Caudate nucleus.l | Z-Anatomy | 2 570 | BodyParts3D 4.0 (caudate nucleus) |
| Canal central | Canalis centralis | — | Central canal | Z-Anatomy | 3 232 | — |
| Lobule central | Lobulus centralis vermis | — | Central lobule | Z-Anatomy | 1 006 | — |
| Sillon central | Sulcus centralis | G + D | Central sulcus.l | Z-Anatomy | 1 440 | — |
| Plexus choroïde | Plexus chorioideus | G + D | Choroid plexus.l | Z-Anatomy | 2 647 | — |
| Cingulate gyrus (Posteroventral part*) | Cingulate gyrus (Posteroventral part*) | G + D | Cingulate gyrus (Posteroventral part*).l | Z-Anatomy | 298 | — |
| Cingulate gyrus and sulcus (Middle anterior part) | Cingulate gyrus and sulcus (Middle anterior part) | G + D | Cingulate gyrus and sulcus (Middle anterior part).l | Z-Anatomy | 736 | — |
| Cingulate gyrus and sulcus (Middle posterior part) | Cingulate gyrus and sulcus (Middle posterior part) | G + D | Cingulate gyrus and sulcus (Middle posterior part).l | Z-Anatomy | 600 | — |
| Cingulate gyrus and sulcus (Posterior dorsal part) | Cingulate gyrus and sulcus (Posterior dorsal part) | G + D | Cingulate gyrus and sulcus (Posterior dorsal part).l | Z-Anatomy | 410 | — |
| Cingulate sulcus (Marginal part*) | Cingulate sulcus (Marginal part*) | G + D | Cingulate sulcus (Marginal part*).l | Z-Anatomy | 544 | — |
| Sillon circulaire de l'insula | Sulcus circularis insulae | G + D | Circular sulcus of insula.l | Z-Anatomy | 798 | — |
| Cochlée | Cochlea | G + D | Cochlea.l | Z-Anatomy | 6 168 | — |
| Nerf cochléaire | Nervus cochlearis | — | Cochlear nerve | Z-Anatomy | 1 758 | — |
| Scissure collatérale | Sulcus collateralis | G + D | Collateral sulcus.l | Z-Anatomy | 1 142 | — |
| Cornée | Cornea | G + D | Cornea.l | Z-Anatomy | 2 688 | BodyParts3D 4.0 (cornea) |
| Corps calleux | Corpus callosum | — | corpus callosum | BodyParts3D 4.0 | 6 650 | Z-Anatomy (Corpus callosum) |
| Culmen | Culmen | — | Culmen | Z-Anatomy | 2 378 | — |
| Faisceau cunéïforme | Fasciculus cuneatus | — | Cuneate fasciculus | Z-Anatomy | 3 024 | — |
| Cuneus | Cuneus | G + D | Cuneus.l | Z-Anatomy | 946 | — |
| Déclive | Declive | — | Declive | Z-Anatomy | 2 125 | — |
| Faux du cerveau | Falx cerebri | — | Falx cerebri | Z-Anatomy | 14 724 | — |
| Flocculus | Flocculus | G + D | Flocculus.l | Z-Anatomy | 3 660 | — |
| Folium vermis | Folium vermis | — | Folium of vermis | Z-Anatomy | 812 | — |
| Fornix | Fornix | G + D | Fornix.l | Z-Anatomy | 2 158 | — |
| Quatrième ventricule | Ventriculus quartus | — | Fourth ventricle | Z-Anatomy | 5 798 | BodyParts3D 4.0 (fourth ventricle) |
| Ganglions du tronc sympathique | Ganglia trunci sympathici | G + D | Ganglia of sympathetic trunk.l | Z-Anatomy | 25 344 | — |
| Globus pallidus | Globus pallidus | G + D | Globus pallidus.l | Z-Anatomy | 5 276 | BodyParts3D 4.0 (globus pallidus) |
| Faisceau gracile | Fasciculus gracilis | — | Gracile fasciculus | Z-Anatomy | 7 676 | — |
| Lobule gracile | Lobulus gracilis | G + D | Gracile lobule.l | Z-Anatomy | 6 961 | — |
| Habenula | Habenula | — | Habenula | Z-Anatomy | 398 | BodyParts3D 4.0 (habenula) |
| Commissure hippocampale | Commissura hippocampi | — | Hippocampal commissure | Z-Anatomy | 9 864 | — |
| Hippocampe | Hippocampus | G + D | Hippocampus.l | Z-Anatomy | 1 020 | BodyParts3D 4.0 (hippocampus) |
| Hypothalamus | Hypothalamus | — | Hypothalamus | Z-Anatomy | 4 258 | BodyParts3D 4.0 (hypothalamus) |
| Colliculus inférieur | Colliculus inferior | G + D | Inferior colliculus.l | Z-Anatomy | 464 | BodyParts3D 4.0 (inferior colliculus) |
| Sillon frontal inférieur | Sulcus frontalis inferior | G + D | Inferior frontal sulcus.l | Z-Anatomy | 742 | — |
| Inferior occipital gyrus and sulcus | Inferior occipital gyrus and sulcus | G + D | Inferior occipital gyrus and sulcus*.l | Z-Anatomy | 894 | — |
| Noyau salivaire inférieur | Nucleus salivatorius inferior | G + D | Inferior salivatory nucleus.l | Z-Anatomy | 768 | — |
| Lobule semilunaire inférieur | Lobulus semilunaris inferior | G + D | Inferior semilunar lobule.l | Z-Anatomy | 7 787 | — |
| Gyrus temporal inférieur | Gyrus temporalis inferior | G + D | inferior temporal gyrus | BodyParts3D 4.0 | 1 828 | Z-Anatomy (Inferior temporal gyrus.l) |
| Sillon temporal inférieur | Sulcus temporalis inferior | G + D | Inferior temporal sulcus.l | Z-Anatomy | 246 | — |
| Insula (Subcentral gyrus and ant. and post. sulci*) | Insula (Subcentral gyrus and ant. and post. sulci*) | G + D | Insula (Subcentral gyrus and ant. and post. sulci*).l | Z-Anatomy | 740 | — |
| Noyau intermédiolatéral | Nucleus intermediolateralis | — | Intermediolateral nucleus | Z-Anatomy | 5 656 | — |
| Noyau intermédiomédial | Nucleus intermediomedialis | — | Intermediomedial nucleus | Z-Anatomy | 6 464 | — |
| Fosse interpédonculaire | Fossa interpeduncularis | G + D | interpeduncular fossa | BodyParts3D 4.0 | 134 | Z-Anatomy (Interpeduncular fossa.l) |
| Sillon intrapariétal | Sulcus intraparietalis | G + D | Intraparietal sulcus.l | Z-Anatomy | 852 | — |
| Iris | Iris | G + D | Iris.l | Z-Anatomy | 3 248 | BodyParts3D 4.0 (iris) |
| Canalicule lacrymal | Canaliculus lacrimalis | G + D | lacrimal canaliculus | BodyParts3D 4.0 | 590 | Z-Anatomy (Lacrimal canaliculus.l) |
| Glande lacrymale | Glandula lacrimalis | G + D | Lacrimal gland.l | Z-Anatomy | 1 810 | BodyParts3D 4.0 (lacrimal gland) |
| Sac lacrymal | Saccus lacrimalis | G + D | Lacrimal sac.l | Z-Anatomy | 384 | BodyParts3D 4.0 (lacrimal sac) |
| Lat_Fis-ant-Horizont | Lat_Fis-ant-Horizont | G + D | Lat_Fis-ant-Horizont.l | Z-Anatomy | 174 | — |
| Lat_Fis-ant-Vertical | Lat_Fis-ant-Vertical | G + D | Lat_Fis-ant-Vertical.l | Z-Anatomy | 194 | — |
| Lat_Fis-post | Lat_Fis-post | G + D | Lat_Fis-post.l | Z-Anatomy | 480 | — |
| Faisceau corticospinal latéral | Tractus corticospinalis lateralis | — | Lateral corticospinal tract | Z-Anatomy | 7 676 | — |
| Faisceau latéral propre | Fasciculus proprius lateralis | — | Lateral fasciculus proprius | Z-Anatomy | 20 200 | — |
| Corps géniculé latéral | Corpus geniculatum laterale | G + D | Lateral geniculate body.l | Z-Anatomy | 604 | BodyParts3D 4.0 (lateral geniculate body) |
| Substance intermédiaire latérale | Substantia intermedia lateralis | — | Lateral intermediate substance | Z-Anatomy | 13 332 | — |
| Lateral occipital gyrus (Middle occipital gyrus*) | Lateral occipital gyrus (Middle occipital gyrus*) | G + D | Lateral occipital gyrus (Middle occipital gyrus*).l | Z-Anatomy | 854 | — |
| Gyrus occipitotemporal latéral | Gyrus occipitotemporalis lateralis | G + D | Lateral occipitotemporal gyrus.l | Z-Anatomy | 866 | — |
| Tractus réticulospinal latéral | Tractus reticulospinalis lateralis | — | Lateral reticulospinal tract | Z-Anatomy | 3 232 | — |
| Tractus spinothalamique latéral | Tractus spinothalamicus lateralis | — | Lateral spinothalamic tract | Z-Anatomy | 8 888 | — |
| Ventricule latéral | Ventriculus lateralis | G + D | lateral ventricle | BodyParts3D 4.0 | 3 952 | Z-Anatomy (Lateral ventricle.l) |
| Tractus vestibulospinal latéral | Tractus vestibulospinalis lateralis | — | Lateral vestibulospinal tract | Z-Anatomy | 9 696 | — |
| Cristalin | Lens | G + D | Lens.l | Z-Anatomy | 1 598 | BodyParts3D 4.0 (lens) |
| Noyau lenticulaire | Nucleus lentiformis | G + D | Lentiform nucleus.l | Z-Anatomy | 2 144 | — |
| Gyrus lingual | Gyrus lingualis | G + D | Lingual gyrus.l | Z-Anatomy | 1 658 | — |
| Lingula du cervelet | Lingula cerebelli | — | Lingula of cerebellum | Z-Anatomy | 1 028 | — |
| (Sillon lunaire) | (Lunate sulcus) / (Sulcus lunatus) | G + D | Lunate sulcus.l | Z-Anatomy | 382 | — |
| Corps mamillaire | Corpus mammillare | G + D | Mamillary body.l | Z-Anatomy | 220 | — |
| Corps géniculé médial | Corpus geniculatum mediale | G + D | Medial geniculate body.l | Z-Anatomy | 198 | BodyParts3D 4.0 (medial geniculate body) |
| Medial occipitotemporal gyrus (Parahippocampal*) | Medial occipitotemporal gyrus (Parahippocampal*) | G + D | Medial occipitotemporal gyrus (Parahippocampal*).l | Z-Anatomy | 858 | — |
| Tractus réticulospinal médial | Tractus reticulospinalis medialis tractus | — | Medial reticulospinal tract | Z-Anatomy | 8 080 | — |
| Tractus vestibulospinal médial | Tractus vestibulospinalis medialis | — | Medial vestibulospinal tract | Z-Anatomy | 3 232 | — |
| Moëlle allongée | Medulla oblongata | G + D | Medulla oblongata.l | Z-Anatomy | 6 080 | BodyParts3D 4.0 (medulla oblongata) |
| Mésencéphale | Mesencephalon | G + D | Midbrain.l | Z-Anatomy | 6 092 | BodyParts3D 4.0 (midbrain) |
| Gyrus frontal moyen | Gyrus frontalis medius | G + D | middle frontal gyrus | BodyParts3D 4.0 | 2 506 | Z-Anatomy (Middle frontal gyrus.l) |
| Gyrus temporal moyen | Gyrus temporalis medius | G + D | middle temporal gyrus | BodyParts3D 4.0 | 1 748 | Z-Anatomy (Middle temporal gyrus.l) |
| Noyau moteur du nef facial | Nucleus nervi facialis | G + D | Motor nucleus of facial nerve.l | Z-Anatomy | 768 | — |
| Racine motrice du nerf trijumeau | Radix motoria nervi trigemini | G + D | Motor root of trigeminal nerve.l | Z-Anatomy | 960 | — |
| Canal lacrymonasal | Ductus nasolacrimalis | G + D | Nasolacrimal duct.l | Z-Anatomy | 444 | BodyParts3D 4.0 (nasolacrimal duct) |
| Nodule du vermis | Nodulus vermis | — | Nodule of vermis | Z-Anatomy | 1 012 | — |
| Noyau ambigu | Nucleus ambiguus | G + D | Nucleus ambiguus.l | Z-Anatomy | 768 | — |
| Noyau du nerf abducens | Nucleus nervi abducentis | G + D | Nucleus of abducens nerve.l | Z-Anatomy | 768 | — |
| Noyau du nerf accessoire | Nucleus nervi accessorii | G + D | Nucleus of accessory nerve.l | Z-Anatomy | 1 792 | — |
| Noyau du nerf hypoglosse | Nucleus nervi hypoglossi | G + D | Nucleus of hypoglossal nerve.l | Z-Anatomy | 768 | — |
| Noyau du nerf oculomoteur | Nucleus nervi oculomotorius | G + D | Nucleus of oculomotor nerve.l | Z-Anatomy | 768 | — |
| Noyau du tractus solitaire | Nucleus tractus solitarii | G + D | Nucleus of solitary tract.l | Z-Anatomy | 1 344 | — |
| Noyau du nerf trochléaire | Nucleus nervi trochlearis | G + D | Nucleus of trochlear nerve.l | Z-Anatomy | 768 | — |
| Noyau propre | Nucleus proprius | — | Nucleus proprius | Z-Anatomy | 3 232 | — |
| Pôle occipital | Polus occipitalis | G + D | Occipital pole.l | Z-Anatomy | 954 | — |
| Occipitotemporal sulcus (Lateral part*) | Occipitotemporal sulcus (Lateral part*) | G + D | Occipitotemporal sulcus (Lateral part*).l | Z-Anatomy | 487 | — |
| Sillon olfactif | Sulcus olfactorius | G + D | Olfactory sulcus.l | Z-Anatomy | 548 | — |
| Olive | Oliva | G + D | Olive.l | Z-Anatomy | 960 | — |
| Partie operculaire du gyrus frontal inférieur | Pars opercularis gyri frontalis inferioris | G + D | Opercular part of inferior frontal gyrus.l | Z-Anatomy | 740 | — |
| Chiasma optique | Chiasma opticum | G + D | optic chiasm | BodyParts3D 4.0 | 1 712 | Z-Anatomy (Optic chiasm.l) |
| Tractus optique | Tractus opticus | G + D | Optic tract.l | Z-Anatomy | 2 332 | BodyParts3D 4.0 (optic tract) |
| Gyri orbitaires | Gyri orbitales | G + D | Orbital gyri.l | Z-Anatomy | 1 512 | — |
| Orbital gyri (Frontomarginal gyrus and sulcus*) | Orbital gyri (Frontomarginal gyrus and sulcus*) | G + D | Orbital gyri (Frontomarginal gyrus and sulcus*).l | Z-Anatomy | 656 | — |
| Partie orbitaire du gyrus frontal inférieur | Orbital part of inferior frontal gyrus / Pars orbitalis gyri frontalis inferioris | G + D | Orbital part of  inferior frontal gyrus.l | Z-Anatomy | 186 | — |
| Orbital sulci (H-shaped orbital sulci*) | Orbital sulci (H-shaped orbital sulci*) | G + D | Orbital sulci (H-shaped orbital sulci*).l | Z-Anatomy | 762 | — |
| Orbital sulci (Lateral Orbital sulcus*) | Orbital sulci (Lateral Orbital sulcus*) | G + D | Orbital sulci (Lateral Orbital sulcus*).l | Z-Anatomy | 200 | — |
| Paracentral gyrus and sulcus | Paracentral gyrus and sulcus | G + D | Paracentral gyrus and sulcus*.l | Z-Anatomy | 746 | — |
| Sillon paracentral | Sulcus paracentralis | G + D | Paracentral sulcus.l | Z-Anatomy | 668 | — |
| Sillon pariéto-occipital | Sulcus parietooccipitalis | G + D | Parieto-occipital sulcus.l | Z-Anatomy | 1 636 | — |
| Pédoncule du flocculus | Pedunculus flocculi | G + D | Peduncle of flocculus.l | Z-Anatomy | 2 368 | — |
| Pont | Pons | G + D | Pons.l | Z-Anatomy | 10 171 | BodyParts3D 4.0 (pons) |
| Gyrus postcentral | Gyrus postcentralis | G + D | postcentral gyrus | BodyParts3D 4.0 | 2 972 | Z-Anatomy (Postcentral gyrus.l) |
| Sillon postcentral | Sulcus postcentralis | G + D | Postcentral sulcus.l | Z-Anatomy | 1 189 | — |
| Noyau cochléaire postérieur | Nucleus cochlearis posterior | G + D | Posterior cochlear nucleus.l | Z-Anatomy | 960 | — |
| Commissure postérieure | Commissura posterior | — | Posterior commissure | Z-Anatomy | 866 | BodyParts3D 4.0 (posterior commissure) |
| Faisceau postérieur propre | Fasciculus proprius posterior | — | Posterior fasciculus proprius | Z-Anatomy | 12 928 | — |
| Corne postérieure de la moëlle épinière | Cornu posterius medullae spinalis | — | Posterior horn of spinal cord | Z-Anatomy | 12 928 | — |
| Noyau postérieur du nerf vague | Nucleus posterior nervi vagi | G + D | Posterior nucleus of vagus nerve.l | Z-Anatomy | 768 | — |
| Lobule quadrangulaire postérieur | Lobulus quadrangularis posterior | G + D | Posterior quadrangular lobule.l | Z-Anatomy | 3 618 | — |
| Segment postérieur du globe oculaire | Segmentum posterius bulbi oculi | G + D | Posterior segment of eyeball.l | Z-Anatomy | 6 528 | — |
| Tractus spinocérébelleux postérieur | Tractus spinocerebellaris posterior | — | Posterior spinocerebellar tract | Z-Anatomy | 11 716 | — |
| Posterior transverse collateral sulcus | Posterior transverse collateral sulcus | G + D |  Posterior transverse collateral sulcus.l | Z-Anatomy | 184 | — |
| Tractus postérolatéral | Fasciculus posterolateralis | — | Posterolateral tract | Z-Anatomy | 8 888 | — |
| Gyrus précentral | Gyrus precentralis | G + D | precentral gyrus | BodyParts3D 4.0 | 3 340 | Z-Anatomy (Precentral gyrus.l) |
| Precentral sulcus (inferior part) | Precentral sulcus (inferior part) | G + D | Precentral sulcus (inferior part)*.l | Z-Anatomy | 780 | — |
| Precentral sulcus (Superior part) | Precentral sulcus (Superior part) | G + D | Precentral sulcus (Superior part)*.l | Z-Anatomy | 568 | — |
| Précuneus | Precuneus | G + D | Precuneus.l | Z-Anatomy | 1 300 | — |
| Putamen | Putamen | G + D | putamen | BodyParts3D 4.0 | 1 552 | Z-Anatomy (Putamen.l) |
| Pyramide de la moëlle allongée | Pyramis medullae oblongatae | G + D | Pyramid of medulla oblongata.l | Z-Anatomy | 960 | — |
| Pyramide du vermis | Pyramis vermis | — | Pyramis of vermis | Z-Anatomy | 1 182 | — |
| Noyau rouge | Nucleus ruber | G + D | Red nucleus.l | Z-Anatomy | 704 | — |
| Rétine | Retina | G + D | Retina.l | Z-Anatomy | 6 304 | — |
| Faisceau rubrospinal | Tractus rubrospinalis | — | Rubrospinal tract | Z-Anatomy | 6 464 | — |
| Sclère | Sclera | G + D | sclera | BodyParts3D 4.0 | 8 690 | Z-Anatomy (Sclera.l) |
| Racine sensitive du nerf trijumeau | Radix sensoria nervi trigemini | G + D | Sensory root of trigeminal nerve.l | Z-Anatomy | 2 752 | — |
| Noyaux septaux | Nuclei septales | — | Septal nuclei | Z-Anatomy | 548 | — |
| Septum pellucidum | Septum pellucidum | — | Septum pellucidum | Z-Anatomy | 2 388 | — |
| Dure-mère spinale | Dura spinalis | — | Spinal dura | Z-Anatomy | 35 002 | — |
| Ganglion spinal | Ganglion spinale | G + D | Spinal ganglion.l | Z-Anatomy | 1 680 | — |
| Processus réticulaire spinal | Processus reticularis spinalis | — | Spinal reticular process | Z-Anatomy | 6 868 | — |
| Tractus spinotectal | Tractus spinotectalis | — | Spinotectal tract | Z-Anatomy | 3 232 | — |
| Straight gyrus (Gyrus rectus) | Straight gyrus (Gyrus rectus) | G + D | Straight gyrus (Gyrus rectus).l | Z-Anatomy | 508 | — |
| Strie médullaire thalamique | Stria medullaris thalami | G + D | Stria medullaris thalami.l | Z-Anatomy | 842 | — |
| Strie terminale | Stria terminalis | G + D | Stria terminalis.l | Z-Anatomy | 746 | BodyParts3D 4.0 (stria terminalis) |
| Sillon subpariétal | Sulcus subparietalis | G + D | Subparietal sulcus.l | Z-Anatomy | 561 | — |
| Sulcus interm_prim-Jensen | Sulcus interm_prim-Jensen | G + D | Sulcus interm_prim-Jensen.l | Z-Anatomy | 360 | — |
| Pédoncule cérébelleux supérieur | Pedunculus cerebellaris superior | G + D | Superior cerebellar peduncle.l | Z-Anatomy | 8 474 | — |
| Colliculus supérieur | Colliculus superior | G + D | Superior colliculus.l | Z-Anatomy | 458 | BodyParts3D 4.0 (superior colliculus) |
| Gyrus frontal supérieur | Gyrus frontalis superior | G + D | superior frontal gyrus | BodyParts3D 4.0 | 4 042 | Z-Anatomy (Superior frontal gyrus.l) |
| Sillon frontal supérieur | Sulcus frontalis superior | G + D | Superior frontal sulcus.l | Z-Anatomy | 1 290 | — |
| Gyri occipitaux supérieurs | Gyri occipitales superiores | G + D | Superior occipital gyri.l | Z-Anatomy | 670 | — |
| Lobule pariétal supérieur | Lobulus parietalis superior | G + D | superior parietal lobule | BodyParts3D 4.0 | 4 216 | Z-Anatomy (Superior parietal lobule.l) |
| Noyau salivaire supérieur | Nucleus salivatorius superior | G + D | Superior salivatory nucleus.l | Z-Anatomy | 768 | — |
| Lobule semilunaire supérieur | Lobulus semilunaris superior | G + D | Superior semilunar lobule.l | Z-Anatomy | 8 688 | — |
| Superior temporal gyrus (Lateral part) | Superior temporal gyrus (Lateral part) | G + D | Superior temporal gyrus (Lateral part).l | Z-Anatomy | 1 072 | — |
| Sillon temporal supérieur | Sulcus temporalis superior | G + D | Superior temporal sulcus.l | Z-Anatomy | 2 374 | — |
| Gyrus supramarginal | Gyrus supramarginalis | G + D | supramarginal gyrus | BodyParts3D 4.0 | 2 104 | Z-Anatomy (Supramarginal gyrus.l) |
| Ligament suspenseur du bulbe | Ligamentum suspensorium bulbi | G + D | Suspensory ligament of eyeball.l | Z-Anatomy | 5 502 | — |
| Tractus tectospinal | Tractus tectospinalis | — | Tectospinal tract | Z-Anatomy | 3 232 | — |
| Planum temporal | Planum temporale | G + D | Temporal plane.l | Z-Anatomy | 556 | — |
| Pôle temporal | Polus temporalis | G + D | Temporal pole.l | Z-Anatomy | 523 | — |
| Tente du cervelet | Tentorium cerebelli | G + D | tentorium cerebelli | BodyParts3D 4.0 | 4 822 | Z-Anatomy (Tentorium cerebelli.l) |
| Thalamus | Thalamus | G + D | thalamus | BodyParts3D 4.0 | 1 388 | Z-Anatomy (Thalamus.l) |
| Troisième ventricule | Ventriculus tertius | — | Third ventricle | Z-Anatomy | 4 315 | BodyParts3D 4.0 (third ventricle) |
| Tonsille du cervelet | Tonsilla cerebelli | G + D | Tonsil of cerebellum.l | Z-Anatomy | 3 638 | — |
| Gyrus et sillon frontopolaires transverses | Gyrus et sulcus transversus frontopolar | G + D | Transverse frontopolar gyrus and sulcus*.l | Z-Anatomy | 242 | — |
| Sillon occipital transverse | Sulcus occipitalis transversus | G + D | Transverse occipital sulcus.l | Z-Anatomy | 686 | — |
| Gyrus temporal transverse | Gyri temporales transversi | G + D | Transverse temporal gyri.l | Z-Anatomy | 234 | — |
| Partie triangulaire du gyrus frontal inférieur | Pars triangularis gyri frontalis inferioris | G + D | Triangular part of inferior frontal gyrus.l | Z-Anatomy | 504 | — |
| Tuber vermis | Tuber vermis | — | Tuber of vermis | Z-Anatomy | 1 178 | — |
| Membrane tympanique | Membrana tympanica | G + D | Tympanic membrane.l | Z-Anatomy | 1 572 | — |
| Uvule du vermis | Uvula vermis | — | Uvula of vermis | Z-Anatomy | 2 176 | — |
| Noyaux vestibulaires | Nuclei vestibulares | G + D | Vestibular nuclei.l | Z-Anatomy | 1 568 | — |
| Vestibule | Vestibulum | G + D | Vestibule.l | Z-Anatomy | 8 580 | — |
| Corps vitré | Corpus vitreum | G + D | Vitreous body.l | Z-Anatomy | 5 436 | BodyParts3D 4.0 (vitreous body) |
| Substance blanche de la moëlle épinière | Substantia alba medullae spinalis | — | White matter of spinal cord | Z-Anatomy | 15 554 | — |
| Substance blanche du télencéphale | Substantia alba telencephali | G + D | White matter of telencephalon.l | Z-Anatomy | 135 288 | BodyParts3D 4.0 (white matter of telencephalon) |
| Aile du lobule central | Ala lobuli centralis | G + D | Wing of central lobule.l | Z-Anatomy | 3 144 | — |
| Fibres zonulaires | Fibrae zonulares | G + D | Zonular fibres.l | Z-Anatomy | 704 | — |

### Viscéral

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| (Glande parotide accessoire) | (Accessory parotid gland) / (Glandula parotidea accessoria) | G + D | (Accessory parotid gland).l | Z-Anatomy | 212 | — |
| Adénohypophyse | Adenohypophysis | — | Adenohypophysis | Z-Anatomy | 680 | — |
| Segment antérolatéral droit (VI) | Segmentum anterius laterale dextrum hepatis (VI) | — | Anterior lateral segment of liver (VI) | Z-Anatomy | 3 352 | — |
| Segment antéromédial droit du foie (V) | Segmentum anterius mediale dextrum hepatis (V) | — | Anterior medial segment of liver (V) | Z-Anatomy | 3 538 | — |
| Côlon ascendant | Colon ascendens | — | Ascending colon | Z-Anatomy | 17 512 | BodyParts3D 4.0 (ascending colon) |
| Corps caverneux du pénis | Corpus cavernosum penis | — | Corpus cavernosum of penis | Z-Anatomy | 1 288 | BodyParts3D 4.0 (corpus cavernosum of penis) |
| Corps spongieux du pénis | Corpus spongiosum penis | — | Corpus spongiosum of penis | Z-Anatomy | 560 | BodyParts3D 4.0 (corpus spongiosum of penis) |
| Côlon descendant | Colon descendens | — | Descending colon | Z-Anatomy | 24 744 | BodyParts3D 4.0 (descending colon) |
| Duodénum | Duodenum | — | Duodenum | Z-Anatomy | 1 750 | BodyParts3D 4.0 (duodenum) |
| Epididyme | Epididymis | G + D | Epididymis.l | Z-Anatomy | 432 | BodyParts3D 4.0 (epididymis) |
| Epiglotte | Epiglottis | — | Epiglottis | Z-Anatomy | 3 376 | BodyParts3D 4.0 (epiglottis) |
| Ténia libre | Taenia libera | — | Free taenia | Z-Anatomy | 6 712 | — |
| Vésicule biliaire | Vesica biliaris | — | gallbladder | BodyParts3D 4.0 | 1 292 | Z-Anatomy (Gallbladder) |
| Gencive | Gingiva | — | Gingiva | Z-Anatomy | 24 596 | BodyParts3D 4.0 (gingiva) |
| Gland du pénis | Glans penis | — | Glans penis | Z-Anatomy | 1 391 | BodyParts3D 4.0 (glans penis) |
| Grand omentum | Omentum maius | — | Greater omentum | Z-Anatomy | 77 968 | — |
| Lobe inférieur du poumon gauche | Lobus inferior pulmonis sinistri | — | Inferior lobe of left lung | Z-Anatomy | 9 258 | — |
| Lobe inférieur du poumon droit | Lobus inferior pulmonis dextri | — | Inferior lobe of right lung | Z-Anatomy | 8 452 | — |
| Glande parathyroïde inférieure | Glandula parathyreoidea inferior | G + D | Inferior parathyroid gland.l | Z-Anatomy | 128 | — |
| Rein | Ren | G + D | Kidney.l | Z-Anatomy | 2 982 | BodyParts3D 4.0 (kidney) |
| Laryngopharynx | Pars laryngea pharyngis | — | Laryngopharynx | Z-Anatomy | 2 476 | — |
| Segment antérolatéral gauche du foie (III) | Segmentum anterius laterale sinistrum hepatis (III) | — | Left anterior lateral segment of liver (III) | Z-Anatomy | 3 444 | — |
| Segment médial gauche du foie (IV) | Segmentum mediale sinistrum hepatis (IV) | — | Left medial segment of liver (IV) | Z-Anatomy | 4 772 | — |
| Segment postérolatéral gauche du foie (II) | Segmentum posterius laterale sinistrum hepatis (II) | — | Left posterior lateral segment of liver (II) | Z-Anatomy | 3 316 | — |
| Petit omentum | Omentum minus | — | Lesser omentum | Z-Anatomy | 4 760 | — |
| Foie | Hepar | — | liver | BodyParts3D 4.0 | 59 642 | Z-Anatomy (Liver) |
| Méso-appendice | Mesoappendix | — | Meso-appendix | Z-Anatomy | 468 | — |
| Ténia mésocolique | Taenia mesocolica | — | Mesocolic taenia | Z-Anatomy | 6 792 | — |
| Mésocôlon | Mesocolon | — | Mesocolon | Z-Anatomy | 15 768 | — |
| Lobe moyen du poumon droit | Lobus medius pulmonis dextri | — | Middle lobe of right lung | Z-Anatomy | 7 396 | — |
| Muqueuse de la cavité nasale | Tunica mucosa nasi | — | Mucosa of nasal cavity | Z-Anatomy | 9 808 | — |
| Muqueuse de l'estomac | Tunica mucosa gastris | — | Mucosa of stomach | Z-Anatomy | 9 748 | — |
| Nasopharynx | Pars nasalis pharyngis | — | Nasopharynx | Z-Anatomy | 1 952 | — |
| Neurohypophyse | Neurohypophysis | — | Neurohypophysis | Z-Anatomy | 592 | — |
| Ténia omental | Taenia omentalis | — | Omental taenia | Z-Anatomy | 6 232 | — |
| Oropharynx | Pars oralis pharyngis | — | Oropharynx | Z-Anatomy | 2 544 | — |
| Pancréas | Pancreas | — | pancreas | BodyParts3D 4.0 | 8 564 | Z-Anatomy (Pancreas) |
| Glande parotide | Glandula parotidea | G + D | Parotid gland.l | Z-Anatomy | 1 704 | — |
| Glande pinéale | Glandula pinealis | — | Pineal gland | Z-Anatomy | 634 | — |
| Plèvre | Pleura | — | Pleura | Z-Anatomy | 112 288 | — |
| Segment postérolatéral droit (VII) | Segmentum posterius laterale dextrum hepatis (VII) | — | Posterior lateral segment of liver (VII) | Z-Anatomy | 2 388 | — |
| Segment postéromédial droit du foie (VIII) | Segmentum posterius mediale dextrum hepatis (VIII) | — | Posterior medial segment of liver (VIII) | Z-Anatomy | 3 560 | — |
| Segment postérieur du foie (I) | Segmentum posterius hepatis (I) | — | Posterior segment of liver (I) | Z-Anatomy | 2 608 | — |
| Prostate | Prostata | — | Prostate | Z-Anatomy | 468 | BodyParts3D 4.0 (prostate) |
| Bassinet/ pelvis rénal | Pelvis renalis | G + D | Renal pelvis.l | Z-Anatomy | 1 450 | — |
| Glande séminale | Glandula seminalis | G + D | Seminal gland.l | Z-Anatomy | 360 | — |
| Côlon sigmoïde | Colon sigmoideum | — | Sigmoid colon | Z-Anatomy | 3 432 | — |
| Palais mou | Palatum molle | — | soft palate | BodyParts3D 4.0 | 12 770 | Z-Anatomy (Soft palate) |
| Estomac | Gaster | — | Stomach | Z-Anatomy | 9 468 | BodyParts3D 4.0 (stomach) |
| Glande sublinguale | Glandula sublingualis | G + D | Sublingual gland.l | Z-Anatomy | 324 | BodyParts3D 4.0 (sublingual gland) |
| Glande submandibulaire | Glandula submandibularis | G + D | Submandibular gland.l | Z-Anatomy | 392 | BodyParts3D 4.0 (submandibular gland) |
| Lobe supérieur du poumon gauche | Lobus superior pulmonis sinistri | — | Superior lobe of left lung | Z-Anatomy | 9 290 | — |
| Lobe supérieur du poumon droit | Lobus superior pulmonis dextri | — | Superior lobe of right lung | Z-Anatomy | 7 748 | — |
| Glande parathyroïde supérieure | Glandula parathyreoidea superior | G + D | Superior parathyroid gland.l | Z-Anatomy | 128 | — |
| Glande surrénale | Glandula suprarenalis | G + D | Suprarenal gland.l | Z-Anatomy | 3 996 | — |
| Testicule | Testis | G + D | Testis.l | Z-Anatomy | 1 356 | BodyParts3D 4.0 (testis) |
| Glande thyroïde | Glandula thyreoidea | — | Thyroid gland | Z-Anatomy | 2 600 | — |
| Langue | Lingua | — | Tongue | Z-Anatomy | 682 | BodyParts3D 4.0 (tongue) |
| Trachée | Trachea | — | Trachea | Z-Anatomy | 4 756 | BodyParts3D 4.0 (trachea) |
| Côlon transverse | Colon transversum | — | Transverse colon | Z-Anatomy | 16 616 | BodyParts3D 4.0 (transverse colon) |
| Vessie urinaire | Vesica urinaria | — | Urinary bladder | Z-Anatomy | 3 036 | BodyParts3D 4.0 (urinary bladder) |
| Uvule du palais | Uvula palatina | — | Uvula of palate | Z-Anatomy | 1 502 | — |
| Appendice vermiforme | Appendix vermiformis | — | Vermiform appendix | Z-Anatomy | 442 | — |

### Lymphoïde

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| Lymphonoeuds axillaires antérieurs | Nodi axillares anteriores nodi pectorales | G + D | Anterior axillary nodes.l | Z-Anatomy | 1 008 | — |
| Lymphonoeuds jugulaires antéro-inférieurs | Nodi jugulares inferiores anteriores | G + D | Anterior inferior jugular nodes.l | Z-Anatomy | 1 008 | — |
| (Lymphonoeud tibial antérieur) | (Anterior tibial node) / (Nodus tibialis anterior) | G + D | (Anterior tibial node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds axillaires apicaux | Nodi axillares apicales | G + D | Apical axillary nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds appendiculaires | Nodi appendiculares | — | Appendicular nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds brachiaux | Nodi brachiales | G + D | Brachial nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeuds brachiocéphaliques | Nodi brachiocephalici | — | Brachiocephalic nodes | Z-Anatomy | 504 | — |
| Lymphonoeud buccinateur | Nodus bucinatorius | G + D | Bucinator node.l | Z-Anatomy | 504 | — |
| Lymphonoeuds axillaires centraux | Nodi axillares centrales | G + D | Central axillary nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds mésentériques supérieurs centraux | Nodi mesenterici superiores centrales | — | Central superior mesenteric nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds coeliaques | Nodi coeliaci | — | Coeliac nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds cubitaux | Nodi cubitales | G + D | Cubital nodes.l | Z-Anatomy | 1 008 | — |
| Lymphonoeud cystique | Nodus cysticus | — | Cystic node | Z-Anatomy | 168 | — |
| Lymphonoeuds poplités profonds | Nodi poplitei profundi | G + D | Deep popliteal nodes.l | Z-Anatomy | 336 | — |
| (Lymphonoeud fibulaire) | (Fibular node) / (Nodus fibularis) | G + D | (Fibular node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds iléocoliques | Nodi ileocolici | — | Ileocolic nodes | Z-Anatomy | 336 | — |
| Lymphonoeuds cervicaux latéraux profonds inférieurs | Nodi cervicales latérales profundi inferiores | G + D | Inferior deep lateral cervical nodes.l | Z-Anatomy | 672 | — |
| Lymphonoeuds phréniques inférieurs | Nodi phrenici inferiores | — | Inferior diaphragmatic nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds épigastriques inférieurs | Nodi epigastrici inferiores | G + D | Inferior epigastric nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds glutéaux inférieurs | Nodi glutei inferiores | G + D | Inferior gluteal nodes.l | Z-Anatomy | 672 | — |
| Lymphonoeuds pancréatiques inférieurs | Nodi pancreatici inferiores | — | Inferior pancreatic nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds inguinaux superficiels inférieurs | Nodi inguinales superficiales inferiores | G + D | Inferior superficial inguinal nodes.l | Z-Anatomy | 672 | — |
| Lymphonoeuds trachéobronchiques inférieurs | Nodi tracheobronchiales inferiores | — | Inferior tracheobronchial nodes | Z-Anatomy | 1 680 | — |
| Lymphonoeuds infra-auriculaires | Nodi infraauriculares | G + D | Infra-auricular nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds infraclaviculaires | Nodi infraclaviculares nodi deltopectorales | G + D | Infraclavicular nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeuds intercostaux | Nodi intercostales | G + D | Intercostal nodes.l | Z-Anatomy | 2 016 | — |
| Lymphonoeuds iliaques communs intermédiaires | Nodi iliaci communes intermedii | — | Intermediate common iliac nodes | Z-Anatomy | 672 | — |
| (Lymphonoeud inguinal profond intermédiaire) | (Intermediate deep inguinal node) / (Nodus inguinalis profundus intermedius) | G + D | (Intermediate deep inguinal node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds iliaques externes intermédiaires | Nodi iliaci externi intermedii | G + D | Intermediate external iliac nodes.l | Z-Anatomy | 1 176 | — |
| (Lymphonoeud lacunaire intermédiaire) | (Intermediate lacunar node) / (Nodus lacunaris intermedius) | G + D | (Intermediate lacunar node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds lombaux intermédiaires | Nodi lumbales intermedii | — | Intermediate lumbar nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds interpectoraux | Nodi interpectorales | G + D | Interpectoral nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeuds parotidiens infraglandulaires | Nodi parotidei intraglandulares | G + D | Intraglandular parotid nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds intrapulmonaires | Nodi intrapulmonales | — | Intrapulmonary nodes | Z-Anatomy | 3 864 | — |
| Lymphonoeud jugulodigastrique | Nodus jugulodigastricus | G + D | Jugulodigastric node.l | Z-Anatomy | 168 | — |
| Lymphonoeuds mésentériques juxta-intestinaux | Nodi juxtaintestinales | — | Juxta-intestinal mesenteric nodes | Z-Anatomy | 2 520 | — |
| Lymphonoeuds juxta-oesophagiens | Nodi juxtaoesophagei | — | Juxta-oesophageal nodes | Z-Anatomy | 1 680 | — |
| Lymphonoeuds aortiques latéraux | Nodi aortici latérales | — | Lateral aortic nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds axillaires latéraux | Nodi axillares latérales nodi humerales | G + D | Lateral axillary nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds caves latéraux | Nodi cavales latérales | — | Lateral caval nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds iliaques communs latéraux | Nodi iliaci communes latérales | — | Lateral common iliac nodes | Z-Anatomy | 1 344 | — |
| (Lymphonoeud lacunaire latéral) | (Lateral lacunar node) / (Nodus lacunaris lateralis) | G + D | (Lateral lacunar node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds péricardiques latéraux | Nodi pericardiaci latérales | — | Lateral pericardial nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds sacraux latéraux | Nodi sacrales latérales | G + D | Lateral sacral nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeud jugulaire latérosupérieur | Nodus jugularis superior lateralis | G + D | Lateral superior jugular node.l | Z-Anatomy | 840 | — |
| Lymphonoeuds vésicaux latéraux | Nodi vesicales latérales | G + D | Lateral vesical nodes.l | Z-Anatomy | 1 008 | — |
| Lymphonoeuds coliques gauches | Nodi colici sinistri | — | Left colic nodes | Z-Anatomy | 504 | — |
| Lobe gauche du thymus | Lobus thymi sinistri | — | Left lobe of thymus | Z-Anatomy | 9 188 | BodyParts3D 4.0 (left lobe of thymus) |
| Lymphonoeud mandibulaire | Nodus mandibularis | G + D | Mandibular node.l | Z-Anatomy | 504 | — |
| Lymphonoeuds mastoïdiens | Nodi mastoidei | G + D | Mastoid nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeuds iliaques communs médiaux | Nodi iliaci communes mediales | — | Medial common iliac nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds iliaques externes médiaux | Nodi iliaci externi mediales | G + D | Medial external iliac nodes.l | Z-Anatomy | 1 344 | — |
| (Lymphonoeud lacunaire médial) | (Medial lacunar node) / (Nodus lacunaris medialis) | G + D | (Medial lacunar node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds sacraux médians | Nodi sacrales mediani | — | Median sacral nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds coliques moyens | Nodi colici medii | — | Middle colic nodes | Z-Anatomy | 504 | — |
| Lymphonoeud nasolabial | Nodus nasolabialis | G + D | Nasolabial node.l | Z-Anatomy | 168 | — |
| (Lymphonoeud de l'arcade de la veine azygos) | (Node of arch of azygos vein) / (Nodus arcus venae azygae) | — | Node of arch of azygos vein | Z-Anatomy | 168 | — |
| (Lymphonoeud du ligament artérosum) | (Node of ligamentum arteriosum) / (Nodus ligamenti arteriosi) | — | Node of ligamentum arteriosum | Z-Anatomy | 168 | — |
| Lymphonoeuds obturateurs | Nodi obturatorii | G + D | Obturator nodes.l | Z-Anatomy | 672 | — |
| Lymphonoeuds occipitaux | Nodi occipitales | G + D | Occipital nodes.l | Z-Anatomy | 336 | — |
| Tonsille palatine | Tonsilla palatina | G + D | Palatine tonsil.l | Z-Anatomy | 168 | — |
| Lymphonoeuds mésentériques paracoliques supérieurs | Nodi mesenterici superiores paracolici | — | Paracolic superior mesenteric nodes | Z-Anatomy | 2 856 | — |
| Lymphonoeuds anorectaux | Nodi pararectales | — | Pararectal nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds parasternaux | Nodi parasternales | G + D | Parasternal nodes.l | Z-Anatomy | 1 344 | — |
| Lymphonoeuds cervicaux paratrachéaux | Nodi paratrachéales colli | — | Paratracheal cervical nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds thoraciques paratrachéaux | Nodi paratracheales thoracis | — | Paratracheal thoracic nodes | Z-Anatomy | 1 680 | — |
| Lymphonoeuds axillaires postérieurs | Nodi axillares posteriores nodi subscapulares | G + D | Posterior axillary nodes.l | Z-Anatomy | 1 008 | — |
| (Lymphonoeud tibial postérieur) | (Posterior tibial node) / (Nodus tibialis posterior) | G + D | (Posterior tibial node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds rétrovésicaux | Nodi postvesicales | — | Postvesical nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds pré-aortiques | Nodi preaortici | — | Pre-aortic nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds pré-auriculaires | Nodi preauriculares | G + D | Pre-auricular nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds précaecaux | Nodi precaecales | — | Precaecal nodes | Z-Anatomy | 336 | — |
| Lymphonoeuds précaves | Nodi precavales | — | Precaval nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds prépéricardiques | Nodi prepericadiaci | — | Prepericardial nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds prétrachéaux | Nodi pretracheales | G + D | Pretracheal nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds prévertébraux | Nodi prevertebrales | — | Prevertebral nodes | Z-Anatomy | 1 680 | — |
| Lymphonoeuds prévésicaux | Nodi prevesicales | — | Prevesical nodes | Z-Anatomy | 504 | — |
| (Lymphonoeud inguinal profond proximal) | (Proximal deep inguinal node) / (Nodus inguinalis profundus proximalis) | G + D | (Proximal deep inguinal node).l | Z-Anatomy | 168 | — |
| Lymphonoeuds rétro-aortiques | Nodi retroaortici | — | Retro-aortic nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds rétrocaecaux | Nodi retrocaecales | — | Retrocaecal nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds rétrocaves | Nodi retrocavales | — | Retrocaval nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds rétropharyngiens | Nodi retropharyngei | G + D | Retropharyngeal nodes.l | Z-Anatomy | 336 | — |
| (Lymphonoeuds rétropyloriques) | (Retropyloric nodes) / (Nodi retropylorici) | — | (Retropyloric nodes) | Z-Anatomy | 168 | — |
| Lymphonoeuds coliques droits | Nodi colici dextri | — | Right colic nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds gastriques droits | Nodi gastrici dextri caudales | — | Right gastric nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds gastro-omentaux droits | Nodi gastroomentales dextri | — | Right gastro-omental nodes | Z-Anatomy | 1 176 | — |
| Lobe droit du thymus | Lobus thymi dextri | — | Right lobe of thymus | Z-Anatomy | 6 452 | BodyParts3D 4.0 (right lobe of thymus) |
| Lymphonoeuds sigmoïdiens | Nodi sigmoidei | — | Sigmoid nodes | Z-Anatomy | 1 008 | — |
| Rate | Lien | — | Spleen | Z-Anatomy | 1 330 | BodyParts3D 4.0 (spleen) |
| Lymphonoeuds spléniques | Nodi splenici | — | Splenic nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds subaortiques | Nodi subaortici | — | Subaortic nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds submandibulaires | Nodi submandibulares | G + D | Submandibular nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds submentaux | Nodi submentales | G + D | Submental nodes.l | Z-Anatomy | 672 | — |
| (Lymphonoeuds subpyloriques) | (Subpyloric nodes) / (Nodi subpylorici) | — | (Subpyloric nodes) | Z-Anatomy | 336 | — |
| Lymphonoeuds cervicaux antérieurs superficiels | Nodi cervicales anteriores superficiales | — | Superficial anterior cervical nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds cervicaux latéraux superficiels | Nodi cervicales latérales superficiales | G + D | Superficial lateral cervical nodes.l | Z-Anatomy | 1 008 | — |
| Lymphonoeuds parotidiens superficiels | Nodi parotidei superficiales | G + D | Superficial parotid nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds poplités superficiels | Nodi poplitei superficiales | G + D | Superficial popliteal nodes.l | Z-Anatomy | 336 | — |
| Lymphonoeuds diaphragmatiques supérieurs | Nodi phrenici superiores | — | Superior diaphragmatic nodes | Z-Anatomy | 1 008 | — |
| Lymphonoeuds glutéaux supérieurs | Nodi glutei superiores | G + D | Superior gluteal nodes.l | Z-Anatomy | 672 | — |
| Lymphonoeuds pancréatiques supérieurs | Nodi pancreatici superiores | — | Superior pancreatic nodes | Z-Anatomy | 672 | — |
| Lymphonoeuds pancréaticoduodénaux supérieurs | Nodi pancreaticoduodenales superiores | — | Superior pancreaticoduodenal nodes | Z-Anatomy | 504 | — |
| Lymphonoeuds trachéobronchiques supérieurs | Nodi tracheobronchiales superiores | — | Superior tracheobronchial nodes | Z-Anatomy | 840 | — |
| Lymphonoeuds inguinaux superficiels supérolatéraux | Nodi inguinales superficiales superolaterales | G + D | Superolateral superficial inguinal nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds inguinaux superficiels supéromédiaux | Nodi inguinales superficiales superomediales | G + D | Superomedial superficial inguinal nodes.l | Z-Anatomy | 504 | — |
| Lymphonoeuds supraclaviculaires | Nodi supraclaviculares | G + D | Supraclavicular nodes.l | Z-Anatomy | 672 | — |
| (Lymphonoeud suprapylorique) | (Suprapyloric node) / (Nodus suprapyloricus) | — | (Suprapyloric node) | Z-Anatomy | 168 | — |
| Lymphonoeuds supratrochléaires | Nodi supratrochleares | G + D | Supratrochlear nodes.l | Z-Anatomy | 840 | — |
| Lymphonoeuds thyroïdiens | Nodi thyreoidei | G + D | Thyroid nodes.l | Z-Anatomy | 336 | — |

### Cardiovasculaire

| Structure (français) | Nom TA2 / latin | Côté | Meilleur modèle | Source | Triangles | Alternative |
|---|---|:--:|---|---|---:|---|
| Artère communiquante antérieure | Arteria communicans anterior | — | Anterior communicating artery | Z-Anatomy | 106 | BodyParts3D 4.0 (anterior communicating artery) |
| Muscle papillaire antérieur du ventricule droit | Musculus papillaris anterior ventriculi dextri | — | Anterior papillary muscle of right ventricle | Z-Anatomy | 1 544 | BodyParts3D 4.0 (anterior papillary muscle of right ventricle) |
| Valvule semilunaire antérieure de la valve pulmonaire | Valvula semilunaris anterior valvae trunci pulmonalis | — | Anterior semilunar leaflet of pulmonary valve | Z-Anatomy | 2 546 | — |
| Plexus veineux basilaire | Plexus venosus basilaris | — | Basilar venous plexus | Z-Anatomy | 56 192 | — |
| Sinus caverneux | Sinus cavernosus | G + D | Cavernous sinus.l | Z-Anatomy | 9 728 | — |
| Cuspide inféfieure de la valve atrioventriculaire droite | Cuspis inferior valvae atrioventricularis dextrae | — | Inferior leaflet of right atrioventricular valve | Z-Anatomy | 9 852 | — |
| Muscle papillaire inférieur du ventricule gauche | Musculus papillaris inferior ventriculi sinistri | — | Inferior papillary muscle of left ventricle | Z-Anatomy | 1 560 | — |
| Muscle papillaire inférieur du ventricule droit | Musculus papillaris inferior ventriculi dextri | — | Inferior papillary muscle of right ventricle | Z-Anatomy | 1 090 | — |
| Atrium gauche | Atrium sinistrum | — | left atrium | BodyParts3D 4.0 | 11 026 | Z-Anatomy (Left atrium) |
| Valvule coronaire aortique gauche | Valvula coronaria sinistra aortae | — | Left coronary leaflet | Z-Anatomy | 914 | — |
| Valvule semilunaire gauche de la valve pulmonaire | Valvula semilunaris sinistra valvae trunci pulmonalis | — | Left semilunar leaflet of pulmonary valve | Z-Anatomy | 1 992 | — |
| Ventricule gauche | Ventriculus sinister | — | Left ventricle | Z-Anatomy | 22 252 | BodyParts3D 4.0 (left ventricle) |
| Valvule non-coronaire de la valve aortique | Valvula noncoronaria valvae aortae | — | Non-coronary leaflet | Z-Anatomy | 316 | — |
| Cuspide postérieure de la valve atrioventriculaire gauche | Cuspis posterior valvae atrioventricularis sinistrae | — | Posterior leaflet of left atrioventricular valve | Z-Anatomy | 7 640 | — |
| Tronc pulmonaire | Truncus pulmonalis | — | pulmonary trunk | BodyParts3D 4.0 | 958 | Z-Anatomy (Pulmonary trunk) |
| Atrium droit | Atrium dextrum | — | Right atrium | Z-Anatomy | 22 682 | BodyParts3D 4.0 (right atrium) |
| Valvule coronaire aortique droite | Valvula coronaria dextra aortae | — | Right coronary leaflet | Z-Anatomy | 918 | — |
| Valvule semilunaire droite de la valve pulmonaire | Valvula semilunaris dextra valvae trunci pulmonalis | — | Right semilunar leaflet of pulmonary valve | Z-Anatomy | 2 735 | — |
| Ventricule droit | Ventriculus dexter | — | Right ventricle | Z-Anatomy | 22 322 | BodyParts3D 4.0 (right ventricle) |
| Cuspide septale de la valve atrioventriculaire droite | Cuspis septalis valvae atrioventricularis dextrae | — | Septal leaflet of right atrioventricular valve | Z-Anatomy | 9 040 | — |
| Muscle papillaire septal du ventricule droit | Musculus papillaris septalis ventriculi dextri | — | Septal papillary muscle of right ventricle | Z-Anatomy | 844 | BodyParts3D 4.0 (septal papillary muscle of right ventricle) |
