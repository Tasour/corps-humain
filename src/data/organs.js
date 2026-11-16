export const ORGANS = [
  {
    id: "cerveau",
    kind: "organ",
    name: "Cerveau",
    latin: "Encephalon",
    system: "nerveux",
    color: "#e09bb8",
    region: "Boîte crânienne",
    description:
      "Chef d'orchestre du corps, le cerveau traite les sens, la mémoire, les émotions et les mouvements. Ses deux hémisphères communiquent par le corps calleux.",
    function:
      "Reçoit et interprète les informations sensorielles, décide, commande les muscles, régule les fonctions vitales avec l'hypothalamus et le tronc cérébral.",
    funFact:
      "Il représente environ 2 % du poids du corps mais consomme près de 20 % de l'oxygène et du glucose que nous utilisons.",
  },
  {
    id: "cervelet",
    kind: "organ",
    name: "Cervelet",
    latin: "Cerebellum",
    system: "nerveux",
    color: "#c97f9e",
    region: "Arrière du crâne",
    description:
      "Petit cerveau bosselé situé sous les hémisphères, le cervelet ajuste la précision des gestes et stabilise le regard.",
    function:
      "Coordonne les mouvements volontaires, l'équilibre, la posture et l'apprentissage moteur — comme faire du vélo.",
    funFact:
      "Bien plus petit que le cerveau, il contient pourtant la majorité des neurones de l'encéphale, environ 69 milliards.",
  },
  {
    id: "tronc_cerebral",
    kind: "organ",
    name: "Tronc cérébral",
    latin: "Truncus encephali",
    system: "nerveux",
    color: "#b06a8a",
    region: "Base du crâne",
    description:
      "Pont entre le cerveau et la moelle épinière, il abrite des centres vitaux indispensables et le passage de tous les grands faisceaux nerveux.",
    function:
      "Contrôle automatiquement la respiration, le rythme cardiaque, la déglutition, la vigilance et le sommeil.",
    funFact:
      "Une lésion très localisée du tronc cérébral peut être mortelle car les centres respiratoires y sont concentrés.",
  },
  {
    id: "moelle_epiniere",
    kind: "organ",
    name: "Moelle épinière",
    latin: "Medulla spinalis",
    system: "nerveux",
    color: "#f4d06f",
    region: "Dos, dans la colonne",
    description:
      "Long cordon nerveux logé dans le canal vertébral, la moelle épinière transmet les messages entre le cerveau et le reste du corps.",
    function:
      "Conduit les informations motrices et sensorielles, et organise des réflexes rapides sans passer par le cerveau.",
    funFact:
      "Elle mesure environ 45 cm et s'arrête vers la première ou deuxième vertèbre lombaire, bien avant la fin de la colonne.",
  },
  {
    id: "coeur",
    kind: "organ",
    name: "Cœur",
    latin: "Cor",
    system: "cardiovasculaire",
    color: "#d6455d",
    region: "Thorax, à gauche",
    description:
      "Pompe musculaire de la taille d'un poing, le cœur possède quatre cavités : deux oreillettes en haut, deux ventricules en bas.",
    function:
      "Propulse le sang oxygéné dans l'aorte vers les organes et envoie le sang veineux vers les poumons pour qu'il soit réoxygéné.",
    funFact:
      "Il bat environ 100 000 fois par jour à 70 bpm, soit près de 2,5 milliards de battements au cours d'une vie.",
  },
  {
    id: "coronaires",
    kind: "organ",
    name: "Artères coronaires",
    latin: "Arteriae coronariae",
    system: "cardiovasculaire",
    color: "#ff7b8a",
    region: "Surface du cœur",
    description:
      "Deux fines artères et leurs branches descendent de l'aorte pour irriguer le muscle cardiaque lui-même.",
    function:
      "Apportent l'oxygène et les nutriments au myocarde, qui ne peut pas s'arrêter de travailler.",
    funFact:
      "Le cœur ne consomme que 5 % du sang qu'il éjecte, mais il extrait jusqu'à 70 % de l'oxygène de ce sang.",
  },
  {
    id: "aorte",
    kind: "organ",
    name: "Aorte",
    latin: "Aorta",
    system: "cardiovasculaire",
    color: "#c0392b",
    region: "Thorax et abdomen",
    description:
      "La plus grande artère du corps quitte le ventricule gauche en formant une crosse, puis descend le long de la colonne jusqu'à l'abdomen.",
    function:
      "Distribue le sang oxygéné à toutes les régions du corps, dont le cerveau, les reins et les jambes.",
    funFact:
      "Son diamètre atteint 2,5 à 3 cm chez l'adulte ; sa paroi élastique amortit chaque jet de sang du cœur.",
  },
  {
    id: "poumons",
    kind: "organ",
    name: "Poumons",
    latin: "Pulmones",
    system: "respiratoire",
    color: "#e58a95",
    region: "Thorax",
    description:
      "Deux organes spongieux, le droit en trois lobes et le gauche en deux, autour du cœur. Ils contiennent des centaines de millions d'alvéoles.",
    function:
      "Échangent les gaz : l'oxygène entre dans le sang et le dioxyde de carbone est expiré.",
    funFact:
      "Dépliée, la surface d'échange des alvéoles atteindrait 70 m², soit environ la moitié d'un court de tennis.",
  },
  {
    id: "bronches",
    kind: "organ",
    name: "Voies aériennes",
    latin: "Trachea et bronchi",
    system: "respiratoire",
    color: "#e8a0ac",
    region: "Cou et thorax",
    description:
      "La trachée, renforcée d'anneaux de cartilage, se divise en deux bronches principales puis en un arbre de bronchioles de plus en plus fines.",
    function:
      "Conduit l'air jusqu'aux alvéoles, réchauffe et humidifie l'air, et piège les poussières grâce au mucus et aux cils.",
    funFact:
      "L'arbre bronchique compte environ 23 niveaux de division ; les bronchioles terminales sont plus fines qu'un cheveu.",
  },
  {
    id: "oesophage",
    kind: "organ",
    name: "Œsophage",
    latin: "Oesophagus",
    system: "digestif",
    color: "#cf8b72",
    region: "Cou et thorax",
    description:
      "Conduit musculeux d'environ 25 cm, l'œsophage traverse le thorax derrière la trachée pour rejoindre l'estomac.",
    function:
      "Fait progresser les aliments par des ondes de contraction, le péristaltisme, et empêche le reflux grâce à deux sphincters.",
    funFact:
      "Il peut propulser un bol alimentaire en quelques secondes, même la tête en bas, grâce à ses contractions.",
  },
  {
    id: "estomac",
    kind: "organ",
    name: "Estomac",
    latin: "Gaster",
    system: "digestif",
    color: "#c98b6b",
    region: "Abdomen supérieur gauche",
    description:
      "Poche musculeuse en forme de J, l'estomac brasse les aliments et sécrète un acide très puissant.",
    function:
      "Stocke temporairement les aliments, les réduit en bouillie (chyme) grâce aux sucs gastriques et commence la digestion des protéines.",
    funFact:
      "Son pH peut descendre autour de 1,5 : assez acide pour dissoudre du métal, mais sa muqueuse se renouvelle en permanence.",
  },
  {
    id: "foie",
    kind: "organ",
    name: "Foie",
    latin: "Hepar",
    system: "digestif",
    color: "#94483c",
    region: "Abdomen supérieur droit",
    description:
      "Le plus gros organe interne, brun-rouge, occupe la partie droite de l'abdomen sous les côtes. Il est organisé en lobules et en canaux biliaires.",
    function:
      "Filtre le sang, stocke le glycogène et les vitamines, transforme les toxines, fabrique l'albumine et la bile.",
    funFact:
      "Le foie assure plus de 500 fonctions et peut se régénérer : on peut retirer jusqu'à 70 % de son volume, il repousse.",
  },
  {
    id: "vesicule",
    kind: "organ",
    name: "Vésicule biliaire",
    latin: "Vesica biliaris",
    system: "digestif",
    color: "#6fae6a",
    region: "Sous le foie",
    description:
      "Petit sac vert en forme de poire, collé sous le foie, la vésicule concentre la bile produite par celui-ci.",
    function:
      "Stocke la bile et la libère dans l'intestin après un repas gras pour aider à digérer les lipides.",
    funFact:
      "Elle peut contenir 30 à 50 ml de bile. On peut vivre normalement sans elle : la bile s'écoule alors en continu dans l'intestin.",
  },
  {
    id: "pancreas",
    kind: "organ",
    name: "Pancréas",
    latin: "Pancreas",
    system: "digestif",
    color: "#d9b06a",
    region: "Derrière l'estomac",
    description:
      "Glande allongée et feuilletée, le pancréas est à la fois digestif et hormonal. Sa tête est logée dans la courbure du duodénum.",
    function:
      "Libère des enzymes digestives dans l'intestin et sécrète l'insuline et le glucagon pour réguler la glycémie.",
    funFact:
      "Seule une petite partie de son volume, les îlots de Langerhans, produit l'insuline — mais leur rôle est vital.",
  },
  {
    id: "intestin_grele",
    kind: "organ",
    name: "Intestin grêle",
    latin: "Intestinum tenue",
    system: "digestif",
    color: "#e08f8a",
    region: "Abdomen central",
    description:
      "Long tube de 6 à 7 m enroulé au centre de l'abdomen, composé du duodénum, du jéjunum et de l'iléon.",
    function:
      "Achève la digestion et absorbe l'essentiel des nutriments grâce à ses villosités et microvillosités.",
    funFact:
      "Ses replis augmentent la surface d'absorption à environ 30 m², soit la taille d'un studio parisien.",
  },
  {
    id: "colon",
    kind: "organ",
    name: "Côlon",
    latin: "Colon",
    system: "digestif",
    color: "#b98062",
    region: "Cadre de l'abdomen",
    description:
      "Le gros intestin, long d'environ 1,5 m, encadre l'intestin grêle : côlon ascendant à droite, transverse, descendant à gauche puis sigmoïde.",
    function:
      "Absorbe l'eau et les électrolytes, héberge le microbiote et forme les selles avant le rectum.",
    funFact:
      "Le côlon abrite des dizaines de milliers de milliards de bactéries, soit à peu près autant de cellules que notre corps.",
  },
  {
    id: "reins",
    kind: "organ",
    name: "Reins",
    latin: "Renes",
    system: "urinaire",
    color: "#8e3b46",
    region: "Arrière de l'abdomen",
    description:
      "Deux organes en forme de haricot, positionnés de part et d'autre de la colonne, derrière le péritoine.",
    function:
      "Filtrent le sang, éliminent les déchets dans l'urine, équilibrent l'eau et les sels, régulent la tension et fabriquent l'érythropoïétine.",
    funFact:
      "Chaque rein contient environ 1 million de néphrons et filtre près de 180 litres de liquide par jour… pour 1,5 L d'urine.",
  },
  {
    id: "ureteres",
    kind: "organ",
    name: "Uretères",
    latin: "Ureteres",
    system: "urinaire",
    color: "#c9a27a",
    region: "Abdomen et bassin",
    description:
      "Deux fins tubes de 25 à 30 cm relient le bassinet de chaque rein à la vessie.",
    function:
      "Transportent l'urine par péristaltisme vers la vessie, sans clapet : la pression et l'orientation préviennent le reflux.",
    funFact:
      "Un uretère peut se bloquer par un calcul de quelques millimètres, provoquant une douleur rénale intense, la colique néphrétique.",
  },
  {
    id: "vessie",
    kind: "organ",
    name: "Vessie",
    latin: "Vesica urinaria",
    system: "urinaire",
    color: "#d8c47a",
    region: "Bassin",
    description:
      "Réservoir musculeux extensible situé derrière le pubis, la vessie stocke l'urine grâce à son muscle détrusor.",
    function:
      "Stocke l'urine jusqu'à 300 à 500 ml et l'évacue lors de la miction, sous contrôle nerveux volontaire.",
    funFact:
      "Elle peut se distendre et remonter dans l'abdomen lorsqu'elle est pleine ; ses capteurs envoient alors le besoin d'uriner.",
  },
  {
    id: "rate",
    kind: "organ",
    name: "Rate",
    latin: "Splen",
    system: "immunitaire",
    color: "#7b4e86",
    region: "Abdomen supérieur gauche",
    description:
      "Organe violet en forme de poing, la rate est le plus gros organe lymphoïde du corps, cachée sous les côtes gauches.",
    function:
      "Filtre le sang, détruit les globules rouges usés, stocke des plaquettes et participe à la défense immunitaire.",
    funFact:
      "On peut vivre sans rate, mais le risque d'infections graves augmente : les vaccins sont alors particulièrement importants.",
  },
  {
    id: "thyroide",
    kind: "organ",
    name: "Thyroïde",
    latin: "Glandula thyroidea",
    system: "endocrinien",
    color: "#d98f4a",
    region: "Base du cou",
    description:
      "Glande en forme de papillon posée sur la trachée, la thyroïde produit les hormones T3 et T4 à partir de l'iode alimentaire.",
    function:
      "Régule le métabolisme de base, la température, le rythme cardiaque, la croissance et le développement.",
    funFact:
      "Elle ne pèse que 20 à 30 g, mais ses hormones influencent chaque cellule du corps, du cerveau au tissu graisseux.",
  },
  {
    id: "surrenales",
    kind: "organ",
    name: "Glandes surrénales",
    latin: "Glandulae suprarenales",
    system: "endocrinien",
    color: "#d9a441",
    region: "Au-dessus des reins",
    description:
      "Deux petites glandes coiffant les reins, chacune composée d'une corticosurrénale et d'une médullosurrénale.",
    function:
      "Produisent le cortisol (stress, métabolisme), l'aldostérone (sels et tension) et l'adrénaline (alerte, fuite).",
    funFact:
      "L'adrénaline libérée en une fraction de seconde peut doubler le débit cardiaque et décupler la force musculaire.",
  },
];

export const ORGAN_MAP = Object.fromEntries(ORGANS.map((o) => [o.id, o]));
