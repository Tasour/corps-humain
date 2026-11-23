# Échecs constatés et causes — 2026-11-24

1. **Handshake MCP sous Blender 4.5.16** : le port 9876 écoute, le serveur
   démarre, mais le client MCP répond « Communication error with Blender:
   Connection closed before receiving any data ». Le addon déclare pourtant
   `ADDON_PROTOCOL_VERSION = 16`, identique au client. Contournement actuel :
   Blender 4.5 en CLI (`blender -b --python ...`) pour les opérations.
2. **MPFB non installé** : validation GPL v3 obtenue, installation à faire.
3. **Table de repères incomplète** : `landmark_align.py` ne mesure que 3 à 10
   repères par couche ; nerfs = `notMeasured`, muscles/vaisseaux/organs hors
   tolérance avec l'ancien seuil de 1 mm mesuré depuis la peau.
4. **Règles spéciales non appliquées** : enveloppe peau/muscle, yeux/orbites,
   testicules/scrotum, doigts/orteils, couloirs vaisseaux/nerfs.
5. **Vérification partielle** : pas de reproductibilité bit à bit, pas de
   mesure homologuée homme/femme, pas de gate bloquant.
6. **Namespace `blender-mcp` retiré du catalog d'outils** malgré une config
   MCP valide (`opencode.json` ligne 147). Le rechargement d'outils ne peut pas
   être fait depuis la session ; fallback Blender 4.5 CLI retenu.
7. **MPFB (GPL v3 validé)** : le ZIP officiel renvoie du HTML. Clonage depuis
   GitHub réussi, mais l'activation comme extension Blender 4.5 échoue
   (`ModuleNotFoundError`). Outil non opérationnel malgré les tentatives.
8. **Mesures par centroïdes** : 0/11 ratios conformes ; les centroïdes de
   maillages ne sont pas des centres articulaires. Les os du rig donnent les
   bonnes coordonnées (têtes/queues), mais la peau a été tournée sans les os.

Rapports chiffrés : `docs/analyses/alignement-female.json`,
`docs/analyses/alignement-male.json`.
