# Harnais Blender — voie officielle par socket

Le namespace MCP `blender-mcp` a disparu du catalogue d'outils de la session
OpenCode alors que sa configuration dans `~/.config/opencode/opencode.json`
reste valide. Ce n'est pas le harnais : c'est un binding client.

Le harnais réel est le serveur socket de l'addon Blender, sur
`127.0.0.1:9876`. Il a été vérifié avec succès :

- `get_scene_info` → scène, objets, positions ;
- `execute_code` → import du GLB, 140 maillages chargés.

## Protocole

Trame JSON sur TCP :

```json
{"type": "execute_code", "params": {"code": "import bpy\nprint(1)"}}
```

La réponse est un JSON contenant `status` et `result`.

## Client

`scripts/blender_socket.py <commande>` lit les paramètres sur stdin pour
`execute_code`, sinon envoie un dictionnaire vide.

Test de santé :

```bash
python3 scripts/blender_socket.py get_scene_info
printf 'import bpy\nprint(424242)\n' | python3 scripts/blender_socket.py execute_code
```

Le client refuse silence et troncature : une réponse incomplète lève une
exception. Aucun résultat n'est inventé.

## Démarrage

Blender 4.5.16 LTS + addon `blender_mcp.py`, déjà lancé dans cette session.
Le script `~/.config/opencode/scripts/blender-ensure.sh` reste le point
d'entrée historique. En cas d'absence du port, le travail de lecture peut
continuer avec `scripts/glb_geom.py`, sans Blender.

## État

- Namespace `blender-mcp` : indisponible dans cette session (catalogue outils).
- Socket : opérationnel et utilisé comme voie officielle.
- Aucune mesure n'a été effectuée « à la main » pour contourner un blocage.
