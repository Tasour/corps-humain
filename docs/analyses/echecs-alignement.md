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

Rapports chiffrés : `docs/analyses/alignement-female.json`,
`docs/analyses/alignement-male.json`.
