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
  "organ:bp-left-lung": [
    W([0.5, 0.8, 0.5], "Lobe supérieur", "Le sommet",
      "Le poumon gauche est un peu plus petit que le droit : il laisse la place au cœur, qui occupe le milieu du thorax."),
    W([0.5, 0.45, 0.5], "Lobe inférieur", "La base",
      "Le diaphragme, un muscle en forme de dôme, tire la base du poumon vers le bas à chaque inspiration."),
    W([0.5, 0.3, 0.7], "Plèvre", "L'enveloppe glissante",
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
