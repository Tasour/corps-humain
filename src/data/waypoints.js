/* Waypoints d'exploration. Les positions sont des fractions (0..1) de la boîte
 * englobante de la structure, donc valables pour les deux côtés du corps. */

const W = (f, label, title, text) => ({ f, label, title, text });

const CURATED = {
  "organ:bp-heart": [
    W([0.55, 0.30, 0.55], "Ventricule gauche", "La pompe principale",
      "Ses parois sont trois fois plus épaisses que celles du droit : il envoie le sang dans toute la circulation systémique, contre la gravité quand tu es debout."),
    W([0.28, 0.34, 0.55], "Ventricule droit", "Vers les poumons",
      "Il ne propulse le sang que jusqu'aux poumons, sur une distance courte et à basse pression — d'où sa paroi plus fine."),
    W([0.55, 0.78, 0.45], "Oreillette gauche", "Le premier receveur",
      "Elle reçoit le sang oxygéné revenant des poumons par les veines pulmonaires, puis le transmet au ventricule gauche."),
    W([0.50, 0.95, 0.50], "Aorte", "L'artère la plus grosse",
      "Son diamètre approche celui d'une pièce de 2 €. La pression y est si forte que l'aorte se dilate à chaque battement."),
  ],
  "organ:kidney-l": [
    W([0.5, 0.5, 0.75], "Cortex rénal", "Le filtre",
      "Un million de néphrons par rein filtrent environ 180 litres de sang par jour, pour n'en restituer que 1 à 2 litres d'urine."),
    W([0.5, 0.5, 0.4], "Médulla et pyramides", "Le concentrateur",
      "Les pyramides de Malpighi concentrent l'urine grâce à une boucle de Henle qui plonge dans la médulla."),
    W([0.55, 0.35, 0.2], "Bassinet", "Le collecteur",
      "Il recueille l'urine des calices et la transmet à l'uretère — un canal d'à peine 3 mm de diamètre."),
  ],
  "organ:kidney-r": [
    W([0.5, 0.5, 0.75], "Cortex rénal", "Le filtre",
      "Chaque rein contient environ un million de néphrons. Ensemble, ils filtrent le sang toutes les 4 minutes."),
    W([0.5, 0.5, 0.4], "Médulla", "Le concentrateur",
      "La médulla crée un gradient osmotique qui permet de récupérer l'eau et d'économiser la soif."),
    W([0.55, 0.35, 0.2], "Bassinet", "Le collecteur",
      "Le bassinet se prolonge par l'uretère, long de 25 cm, qui amène l'urine jusqu'à la vessie."),
  ],
  "bone:femur-l": [
    W([0.5, 0.95, 0.5], "Tête du fémur", "La boule de la hanche",
      "La tête fémorale est recouverte de cartilage : c'est l'une des articulations les plus sollicitées du corps, jusqu'à 3 fois le poids du corps à chaque pas."),
    W([0.5, 0.78, 0.5], "Col du fémur", "Le point fragile",
      "C'est ici que se produisent la plupart des fractures de la hanche chez les personnes âgées, car le col est un col de pivot très sollicité."),
    W([0.5, 0.45, 0.5], "Diaphyse", "L'os le plus long",
      "Le fémur mesure environ 45 cm : c'est l'os le plus long et le plus résistant du corps humain."),
    W([0.5, 0.08, 0.5], "Condyles", "Le genou",
      "Les deux condyles forment l'articulation du genou avec le tibia, stabilisée par les ligaments croisés et les ménisques."),
  ],
  "bone:femur-r": [
    W([0.5, 0.95, 0.5], "Tête du fémur", "La boule de la hanche",
      "Elle s'emboîte dans le cotyle du bassin pour former une articulation sphérique capable de tourner dans presque toutes les directions."),
    W([0.5, 0.45, 0.5], "Diaphyse", "L'os le plus long",
      "Sa cavité médullaire produit des globules rouges tout au long de la vie — c'est un organe hématopoïétique actif."),
    W([0.5, 0.08, 0.5], "Condyles", "Le genou",
      "Ils répartissent la charge sur les ménisques, ces petits coussinets de cartilage qui amortissent chaque foulée."),
  ],
  /* Le manifeste ne contient pas de structure « poumon entier » : le contenu
   * est donc porté par les lobes, qui sont les seuls objets réels. */
  "organ:superior-lobe-of-left-lung": [
    W([0.5, 0.5, 0.5], "Lobe supérieur", "Le sommet",
      "Le poumon gauche est un peu plus petit que le droit : il laisse la place au cœur, qui occupe le milieu du thorax."),
    W([0.5, 0.15, 0.7], "Sommet pulmonaire", "Au-dessus de la clavicule",
      "Le sommet du poumon dépasse la première côte et s'élève au-dessus de la clavicule : c'est la zone où le poumon est le plus vulnérable."),
  ],
  "organ:inferior-lobe-of-left-lung": [
    W([0.5, 0.4, 0.5], "Lobe inférieur", "La base",
      "Le diaphragme, un muscle en forme de dôme, tire la base du poumon vers le bas à chaque inspiration."),
    W([0.5, 0.2, 0.7], "Plèvre", "L'enveloppe glissante",
      "Une fine couche de liquide entre les deux feuillets de la plèvre permet au poumon de glisser sans frottement contre la paroi thoracique."),
  ],
  "organ:bp-brain": [
    W([0.25, 0.7, 0.5], "Hémisphère gauche", "Le langage",
      "Chez la plupart des gens, l'aire de Broca et l'aire de Wernicke — essentielles au langage — se trouvent dans l'hémisphère gauche."),
    W([0.75, 0.7, 0.5], "Hémisphère droit", "L'espace et les émotions",
      "Il est spécialisé dans la perception spatiale, la reconnaissance des visages et la compréhension des émotions."),
    W([0.5, 0.2, 0.5], "Tronc cérébral", "Les fonctions vitales",
      "Il contrôle la respiration, le rythme cardiaque et la pression artérielle sans que tu aies à y penser."),
  ],
  "organ:bp-fibrous-layer-of-eyeball-r": [
    W([0.5, 0.5, 0.9], "Cornée", "La fenêtre transparente",
      "La cornée n'a aucun vaisseau sanguin : elle se nourrit du liquide lacrymal et de l'humeur aqueuse. C'est pourquoi elle peut être transparente."),
    W([0.5, 0.5, 0.5], "Sclère", "Le blanc de l'œil",
      "Le blanc de l'œil est une membrane résistante qui donne sa forme au globe oculaire et sert d'ancrage aux muscles oculomoteurs."),
    W([0.5, 0.5, 0.1], "Nerf optique", "Le câble",
      "Environ 1,2 million de fibres nerveuses quittent la rétine par le nerf optique pour rejoindre le cerveau."),
  ],
  "organ:stomach": [
    W([0.35, 0.78, 0.5], "Fundus", "La poche à air",
      "Le fundus est le dôme situé au-dessus de l'abouchement de l'œsophage. Il contient surtout l'air avalé en mangeant."),
    W([0.5, 0.5, 0.5], "Corps de l'estomac", "Le mélangeur",
      "Le corps brasse les aliments avec le suc gastrique, dont le pH acide (1,5 à 3,5) tue la plupart des bactéries ingérées."),
    W([0.85, 0.15, 0.5], "Pylore", "Le sas",
      "Le pylore s'ouvre par vagues pour laisser passer la bouillie alimentaire vers le duodénum, quelques millilitres à la fois."),
  ],
  "organ:pancreas": [
    W([0.1, 0.5, 0.5], "Tête", "Le carrefour",
      "La tête du pancréas est traversée par le cholédoque, le canal qui amène la bile du foie à l'intestin."),
    W([0.5, 0.5, 0.5], "Corps", "L'usine à enzymes",
      "Le pancréas produit chaque jour plus d'un litre de suc digestif, riche en enzymes qui décomposent protéines, graisses et sucres."),
    W([0.9, 0.5, 0.5], "Queue", "Les îlots",
      "Les îlots de Langerhans, dispersés dans tout le pancréas, sécrètent l'insuline et le glucagon qui régulent la glycémie."),
  ],
  "organ:spleen": [
    W([0.5, 0.85, 0.5], "Pôle supérieur", "Sous les côtes",
      "La rate se glisse sous les côtes gauches, en arrière de l'estomac. Elle mesure environ 12 cm et pèse 150 à 200 g."),
    W([0.1, 0.5, 0.5], "Hile", "Le filtre",
      "Par son hile entrent et sortent les vaisseaux : la rate filtre le sang et détruit les globules rouges arrivés en fin de vie."),
    W([0.5, 0.15, 0.5], "Pôle inférieur", "La réserve immunitaire",
      "La rate stocke des plaquettes et abrite des lymphocytes : elle participe à la défense contre les infections."),
  ],
  "organ:gallbladder": [
    W([0.5, 0.1, 0.9], "Fundus", "Le réservoir",
      "La vésicule stocke la bile produite par le foie, entre 30 et 50 ml, et la concentre jusqu'à dix fois."),
    W([0.5, 0.5, 0.5], "Corps", "La concentration",
      "Ses parois absorbent l'eau et les sels minéraux de la bile, qui devient plus épaisse et plus active."),
    W([0.5, 0.9, 0.3], "Col et canal cystique", "L'évacuation",
      "Après un repas gras, l'hormone cholécystokinine contracte la vésicule et pousse la bile vers le duodénum."),
  ],
  "organ:bp-small-intestine": [
    W([0.1, 0.8, 0.5], "Duodénum", "Le carrefour digestif",
      "Le duodénum reçoit la bile et le suc pancréatique, qui neutralisent l'acidité venue de l'estomac."),
    W([0.5, 0.6, 0.6], "Jéjunum", "L'absorption",
      "C'est dans le jéjunum que la majeure partie des nutriments passe dans le sang, à travers des villosités qui multiplient la surface d'échange."),
    W([0.4, 0.2, 0.5], "Iléon", "La vitamine B12",
      "L'iléon absorbe la vitamine B12 et les sels biliaires ; sa longueur totale, dépliée, atteint environ 6 mètres."),
  ],
  "organ:bp-large-intestine": [
    W([0.1, 0.6, 0.5], "Côlon ascendant", "La récupération d'eau",
      "Le côlon absorbe l'eau et les électrolytes qui restent dans les résidus alimentaires, ce qui compacte les selles."),
    W([0.5, 0.9, 0.5], "Côlon transverse", "Le transit lent",
      "Le côlon transverse traverse l'abdomen d'un côté à l'autre ; le transit y dure plusieurs heures, sous l'action du microbiote."),
    W([0.5, 0.05, 0.5], "Rectum", "Le stockage final",
      "Le rectum stocke les selles avant l'exonération ; sa distension déclenche le besoin d'aller aux toilettes."),
  ],
  "organ:trachea": [
    W([0.5, 0.9, 0.5], "Cartilages", "Les anneaux en C",
      "La trachée est maintenue ouverte par 16 à 20 anneaux de cartilage en forme de C, ouverts en arrière vers l'œsophage."),
    W([0.5, 0.5, 0.5], "Muqueuse ciliée", "L'escalator",
      "Les cils de sa muqueuse remontent le mucus chargé de poussières vers le pharynx : c'est l'escalator mucociliaire."),
    W([0.5, 0.1, 0.5], "Bifurcation", "Les deux bronches",
      "Longue de 10 à 12 cm, la trachée se divise en deux bronches principales, une pour chaque poumon."),
  ],
  "organ:urinary-bladder": [
    W([0.5, 0.9, 0.5], "Dôme", "Le réservoir",
      "À l'âge adulte, la vessie peut contenir 400 à 600 ml d'urine avant que la sensation de besoin ne devienne impérieuse."),
    W([0.5, 0.2, 0.5], "Trigone", "Les trois orifices",
      "Le trigone réunit les deux abouchements des uretères et le col de la vessie ; c'est la zone la plus sensible à l'infection."),
  ],
  "organ:bp-cerebellum": [
    W([0.5, 0.5, 0.5], "Hémisphère cérébelleux", "Le correcteur",
      "Le cervelet compare le mouvement voulu au mouvement réel et corrige l'écart : c'est lui qui rend un geste précis et fluide."),
    W([0.95, 0.5, 0.5], "Vermis", "L'équilibre",
      "Le vermis, situé sur la ligne médiane, coordonne la posture et l'équilibre avec les informations de l'oreille interne."),
    W([0.5, 0.9, 0.5], "Pédoncules", "Les câbles",
      "Trois paires de pédoncules cérébelleux relient le cervelet au tronc cérébral, par lesquels passent toutes ses entrées et sorties."),
  ],
  "muscle:diaphragm": [
    W([0.2, 0.8, 0.5], "Coupole droite", "Le moteur de la respiration",
      "Le diaphragme est le principal muscle inspiratoire : en s'abaissant, il agrandit la cage thoracique et fait entrer l'air."),
    W([0.5, 0.55, 0.5], "Hiatus œsophagien", "Le passage",
      "L'œsophage traverse le diaphragme par un orifice qui doit rester étanche, sous peine de reflux acide."),
    W([0.8, 0.8, 0.5], "Coupole gauche", "Le nerf phrénique",
      "Le diaphragme est commandé par le nerf phrénique, issu des racines cervicales C3 à C5 — d'où son rôle dans le hoquet."),
  ],
  "bone:mandible": [
    W([0.9, 0.95, 0.2], "Condyle", "L'articulation",
      "Le condyle mandibulaire s'articule avec l'os temporal : c'est l'articulation temporo-mandibulaire, qui permet d'ouvrir et de fermer la bouche."),
    W([0.85, 0.35, 0.2], "Angle", "Le point d'insertion",
      "L'angle de la mandibule donne insertion au muscle masséter, l'un des plus puissants du corps pour la mastication."),
    W([0.5, 0.05, 0.9], "Menton", "Le seul os mobile",
      "La mandibule est le seul os mobile de la tête ; elle porte les dents inférieures et se déplace à chaque parole et chaque bouchée."),
  ],
  "bone:humerus-l": [
    W([0.5, 0.95, 0.5], "Tête humérale", "L'épaule",
      "La tête de l'humérus s'articule avec la glène de la scapula, une cavité peu profonde qui autorise une grande amplitude mais rend l'épaule instable."),
    W([0.5, 0.45, 0.2], "Gouttière radiale", "Le nerf radial",
      "Le nerf radial contourne l'humérus dans une gouttière osseuse ; une fracture à cet endroit peut le léser et affaiblir l'extension du poignet."),
    W([0.5, 0.05, 0.5], "Épicondyles", "Le coude",
      "Les épicondyles servent d'ancrage aux muscles de l'avant-bras ; l'humérus mesure environ 30 cm chez l'adulte."),
  ],
  "bone:tibia-l": [
    W([0.5, 0.95, 0.5], "Plateau tibial", "Le genou",
      "Le plateau tibial reçoit les condyles fémoraux ; les ménisques, posés dessus, amortissent les chocs et répartissent la charge."),
    W([0.5, 0.8, 0.9], "Tubérosité tibiale", "Le ligament patellaire",
      "La tubérosité tibiale est le point d'insertion du ligament patellaire, qui transmet la force du quadriceps à la jambe."),
    W([0.5, 0.05, 0.5], "Malléole médiale", "La cheville",
      "Avec la fibula, le tibia forme la pince de la cheville ; il supporte la majeure partie du poids du corps."),
  ],
};

const GENERIC = [
  W([0.5, 0.85, 0.5], "Pôle supérieur", "Pôle supérieur", "Cette zone se trouve à l'extrémité haute de la structure. Les vaisseaux et nerfs y pénètrent souvent par le pôle supérieur."),
  W([0.5, 0.5, 0.5], "Partie centrale", "Partie centrale", "Le centre de la structure concentre l'essentiel de sa masse fonctionnelle et de sa vascularisation."),
  W([0.5, 0.15, 0.5], "Pôle inférieur", "Pôle inférieur", "L'extrémité basse est souvent le site d'insertion ou de continuation vers les structures voisines."),
];

export function getWaypoints(structure) {
  const b = structure.bounds;
  const min = b?.min || [-0.1, 0, -0.1];
  const max = b?.max || [0.1, 0.1, 0.1];
  const curated = CURATED[structure.id];
  const source = curated || GENERIC;
  return source.map((w, i) => ({
    position: [
      min[0] + w.f[0] * (max[0] - min[0]),
      min[1] + w.f[1] * (max[1] - min[1]),
      min[2] + w.f[2] * (max[2] - min[2]),
    ],
    label: w.label,
    title: w.title || w.label,
    text: curated
      ? w.text
      : `${structure.fr || structure.en} : ${w.text} Code TA2 ${structure.ta2 || '—'}, système ${structure.category}.`,
    index: i,
  }));
}

export const CURATED_IDS = Object.keys(CURATED);

/* Tours guidés BENCH-011 : séquences de waypoints déjà curés. Aucune étape
 * n'invente d'anatomie : elle référence une structure du manifeste et un
 * index vérifiable par getWaypoints(). */
export const TOURS = [
  {
    id: 'circulation',
    label: 'Cœur et circulation',
    steps: [
      { id: 'organ:bp-heart', wp: 0 },
      { id: 'organ:bp-heart', wp: 1 },
      { id: 'organ:bp-heart', wp: 3 },
    ],
  },
  {
    id: 'filtration',
    label: 'Rein et filtration',
    steps: [
      { id: 'organ:kidney-l', wp: 0 },
      { id: 'organ:kidney-l', wp: 1 },
      { id: 'organ:kidney-l', wp: 2 },
    ],
  },
  {
    id: 'appui',
    label: 'Hanche et genou',
    steps: [
      { id: 'bone:femur-l', wp: 0 },
      { id: 'bone:femur-l', wp: 2 },
      { id: 'bone:femur-l', wp: 3 },
    ],
  },
];
