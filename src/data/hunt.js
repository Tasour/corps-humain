/* Cibles de la « Chasse aux organes ».
 *
 * Chaque entrée est une structure réelle du manifeste v2 : la catégorie est
 * relue dans les données au démarrage, jamais devinée depuis l'identifiant.
 * `label` s'insère dans une phrase (« Trouvez le cœur »), `hint` donne un
 * repère anatomique sans nommer la structure.
 */
export const HUNT_TARGETS = [
  /* Organes thoraciques et abdominaux */
  { id: "organ:bp-heart", label: "le cœur", hint: "Thorax, un peu à gauche, entre les poumons" },
  { id: "organ:stomach", label: "l'estomac", hint: "Sous le diaphragme, à gauche" },
  { id: "organ:bp-right-lobe-of-liver", label: "le lobe hépatique droit", hint: "Sous les côtes, à droite" },
  { id: "organ:bp-left-lobe-of-liver", label: "le lobe hépatique gauche", hint: "Sous les côtes, à gauche" },
  { id: "organ:pancreas", label: "le pancréas", hint: "Allongé derrière l'estomac" },
  { id: "organ:spleen", label: "la rate", hint: "Sous les côtes gauches, en arrière" },
  { id: "organ:gallbladder", label: "la vésicule biliaire", hint: "Petit sac sous le foie" },
  { id: "organ:bp-small-intestine", label: "l'intestin grêle", hint: "Au centre de l'abdomen" },
  { id: "organ:bp-large-intestine", label: "le gros intestin", hint: "Il encadre l'abdomen" },
  { id: "organ:trachea", label: "la trachée", hint: "Dans le cou, sous le larynx" },
  { id: "organ:bp-left-main-bronchus-l", label: "la bronche principale gauche", hint: "Entre la trachée et le poumon gauche" },
  { id: "organ:superior-lobe-of-left-lung", label: "le lobe supérieur du poumon gauche", hint: "Partie haute du poumon gauche" },
  { id: "organ:inferior-lobe-of-left-lung", label: "le lobe inférieur du poumon gauche", hint: "Partie basse du poumon gauche" },
  { id: "organ:superior-lobe-of-right-lung", label: "le lobe supérieur du poumon droit", hint: "Partie haute du poumon droit" },
  { id: "organ:middle-lobe-of-right-lung", label: "le lobe moyen du poumon droit", hint: "Le poumon droit en a trois" },
  { id: "organ:inferior-lobe-of-right-lung", label: "le lobe inférieur du poumon droit", hint: "Partie basse du poumon droit" },
  { id: "organ:kidney-l", label: "le rein gauche", hint: "Arrière de l'abdomen, à gauche" },
  { id: "organ:kidney-r", label: "le rein droit", hint: "Arrière de l'abdomen, à droite" },
  { id: "organ:urinary-bladder", label: "la vessie", hint: "Dans le bassin, derrière le pubis" },
  /* Système nerveux */
  { id: "organ:bp-brain", label: "l'encéphale", hint: "Dans la boîte crânienne" },
  { id: "organ:bp-cerebellum", label: "le cervelet", hint: "À l'arrière du crâne, sous le cerveau" },
  { id: "organ:bp-brainstem", label: "le tronc cérébral", hint: "Sous le cerveau, au-dessus de la moelle" },
  /* Squelette */
  { id: "bone:mandible", label: "la mandibule", hint: "Seul os mobile de la tête" },
  { id: "bone:femur-l", label: "le fémur gauche", hint: "Dans la cuisse, l'os le plus long" },
  { id: "bone:humerus-l", label: "l'humérus gauche", hint: "Dans le bras, entre l'épaule et le coude" },
  { id: "bone:tibia-l", label: "le tibia gauche", hint: "Dans la jambe, sous le genou" },
  /* Muscle */
  { id: "muscle:diaphragm", label: "le diaphragme", hint: "Le dôme sous les poumons" },
];
