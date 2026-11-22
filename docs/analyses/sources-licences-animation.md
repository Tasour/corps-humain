# Sources et licences — animation anatomique (22 novembre 2026)

## Modèles anatomiques

- **open-anatomy-3d** : modèles et catalogue sous **CC BY 4.0** (`LICENSE-MODELS.md` du paquet, https://creativecommons.org/licenses/by/4.0/legalcode).
- Adaptations : BodyParts3D © DBCLS (CC BY 4.0), Human Reference Atlas / HuBMAP (CC BY 4.0), MakeHuman female (CC0). Crédit complet dans `docs/ATTRIBUTION-OPEN-ANATOMY.md`.
- Paquet npm `open-anatomy-3d@0.1.0`, installé dans `/home/tasour/.cache/corps-sources/open-anatomy-3d`.

| Fichier | SHA-256 |
|---|---|
| `anatomy-female.glb` | `2eee011f8cb7a189af0757f5e287754e84276dd084faeb2daca45572942f4ce2` |
| `anatomy-male.glb` | `25248bef02f0ca43eedbd25231f8b6f9681865a57016f9d5e352d407407336c7` |
| `plain.glb` (femme décompressé) | `921b730b74245b2150dddc22f64af308c5ef9d7a755d62d1041a71a6939cb9db` |
| `plain-male.glb` (homme décompressé) | `f8d467d79f93ea16b0ddb15978b5e5608613ec5066de8c84b9e1118139377532` |

Décompression : `npx @gltf-transform/cli copy` puis `dequantize` (meshopt + quantification non lisibles directement par Blender).

## Mouvement

- **CMU Graphics Lab Motion Capture Database** (https://mocap.cs.cmu.edu/), 2 605 séquences réelles capturées en Vicon 12 caméras.
- Conditions vérifiées sur la fiche officielle du jeu nettoyé : **libre pour tous usages, y compris produits commerciaux** ; **interdiction de revendre les données elles-mêmes, même converties ou retargetées** ; attribution demandée en cas de publication.
- Jeu utilisé : `EntVista/metrixel-cmu-mocap-clean` (BVH dé-bruités et pieds verrouillés, licence `cmu-mocap-database-terms`, https://huggingface.co/datasets/EntVista/metrixel-cmu-mocap-clean).
- Mentions à conserver en cas de publication : « The data used in this project was obtained from mocap.cs.cmu.edu. The database was created with funding from NSF EIA-0196217. »

| Clip | SHA-256 |
|---|---|
| `60_10__salsa-dance__60fps.bvh` | `a387ca62d12ec2365cd67a7d2186d8fcf988159fb6983c84532707d100853fab` |
| `55_01__dance-whirl__120fps.bvh` | `80e6bf4c1174ee76832c1677b1f3abe559eeaf3d057caca1c816d414e7082ae0` |
| `82_08__stand-still-casual-walk-forward__120fps.bvh` | `9e3cb933f7e318024a3150807bd392593f3ece5d4f1a8057ace456b0e33b1784` |

Verdict licence : 🟢 pour les deux sources, avec attribution et interdiction de revente des données mocap.
