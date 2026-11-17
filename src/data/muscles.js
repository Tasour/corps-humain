export const MUSCLES = [
  {
    id: "trapezes",
    kind: "muscle",
    name: "Trapèzes",
    latin: "Musculus trapezius",
    system: "musculaire",
    color: "#b83a4b",
    region: "Nuque et haut du dos",
    description:
      "Grand muscle triangulaire qui relie la nuque aux épaules et descend le long du dos, en forme de cerf-volant.",
    role:
      "Élève, abaisse et rapproche les omoplates ; aide à incliner et tourner la tête. Il est souvent contracté par le stress.",
    funFact:
      "Le trapèze est l'un des rares muscles à être innervé par trois nerfs différents.",
  },
  {
    id: "deltoides",
    kind: "muscle",
    name: "Deltoïdes",
    latin: "Musculus deltoideus",
    system: "musculaire",
    color: "#c4454f",
    region: "Épaules",
    description:
      "Muscle arrondi coiffant l'épaule, le deltoïde possède trois faisceaux : antérieur, moyen et postérieur.",
    role:
      "Lève le bras sur le côté, vers l'avant et vers l'arrière ; stabilise l'articulation de l'épaule.",
    funFact:
      "Son nom vient de la lettre grecque delta (Δ), car sa forme ressemble à un triangle renversé.",
  },
  {
    id: "pectoraux",
    kind: "muscle",
    name: "Pectoraux",
    latin: "Musculus pectoralis major",
    system: "musculaire",
    color: "#a82f3f",
    region: "Poitrine",
    description:
      "Le grand pectoral est un large muscle en éventail qui relie le sternum, les côtes et la clavicule à l'humérus.",
    role:
      "Ramène le bras vers le corps, le fait tourner en dedans et participe à l'inspiration forcée.",
    funFact:
      "Chez certains mammifères, les pectoraux sont si puissants qu'ils permettent le vol battu — chez l'humain, ils poussent.",
  },
  {
    id: "dorsaux",
    kind: "muscle",
    name: "Grand dorsal",
    latin: "Musculus latissimus dorsi",
    system: "musculaire",
    color: "#963342",
    region: "Bas du dos",
    description:
      "Le plus large muscle du corps, il part du bas du dos et du bassin pour s'insérer sur l'humérus.",
    role:
      "Tire le bras vers le bas et en arrière, participe aux tractions et à la respiration forcée.",
    funFact:
      "C'est le muscle qui donne au dos sa forme en V chez les nageurs et les grimpeurs.",
  },
  {
    id: "abdominaux",
    kind: "muscle",
    name: "Abdominaux",
    latin: "Rectus abdominis",
    system: "musculaire",
    color: "#c04a54",
    region: "Abdomen",
    description:
      "Le grand droit de l'abdomen s'étend du pubis aux côtes, divisé par des intersections tendineuses qui dessinent les « tablettes ».",
    role:
      "Fléchit le tronc, stabilise le bassin et comprime les viscères ; avec les obliques, il protège la colonne.",
    funFact:
      "Les « abdos » ne se dessinent pas en faisant des séries interminables : la visibilité dépend surtout du taux de masse grasse.",
  },
  {
    id: "obliques",
    kind: "muscle",
    name: "Obliques",
    latin: "Musculus obliquus externus abdominis",
    system: "musculaire",
    color: "#b84452",
    region: "Côtés de l'abdomen",
    description:
      "Le grand oblique est une large nappe musculaire qui recouvre les côtés de l'abdomen, des côtes basses au bassin.",
    role:
      "Fait tourner et incliner le tronc, comprime les viscères et participe à l'expiration forcée ; il stabilise la colonne avec les autres abdominaux.",
    funFact:
      "Ses fibres descendent en diagonale, comme les mains dans les poches : c'est le muscle qui travaille quand on tourne le buste.",
  },
  {
    id: "biceps",
    kind: "muscle",
    name: "Biceps brachial",
    latin: "Musculus biceps brachii",
    system: "musculaire",
    color: "#b93c4a",
    region: "Bras",
    description:
      "Muscle à deux chefs du bras, le biceps s'insère sur l'omoplate et le radius ; son tendon passe dans la gouttière du coude.",
    role:
      "Fléchit le coude et tourne l'avant-bras (supination), par exemple pour porter une tasse à la bouche.",
    funFact:
      "Le biceps a deux chefs, mais aussi un rôle de supinateur plus puissant que de fléchisseur : il permet de visser un bouchon.",
  },
  {
    id: "triceps",
    kind: "muscle",
    name: "Triceps brachial",
    latin: "Musculus triceps brachii",
    system: "musculaire",
    color: "#a33240",
    region: "Arrière du bras",
    description:
      "Trois chefs musculaires à l'arrière du bras, réunis sur un tendon unique qui s'insère sur l'olécrane du coude.",
    role:
      "Étend le coude, permet de pousser et stabilise l'épaule ; antagoniste du biceps.",
    funFact:
      "C'est le triceps qui travaille quand vous faites une pompe : sans lui, impossible de repousser le sol.",
  },
  {
    id: "fessiers",
    kind: "muscle",
    name: "Fessiers",
    latin: "Musculus gluteus maximus",
    system: "musculaire",
    color: "#a52f3e",
    region: "Bassin",
    description:
      "Le grand fessier est le muscle le plus volumineux du corps, épais et puissant, qui recouvre l'arrière du bassin.",
    role:
      "Étend et stabilise la hanche, permet de se lever, de monter les escaliers et de courir ; soutient le bassin.",
    funFact:
      "Son développement est un trait typiquement humain, lié à la station debout et à la course d'endurance.",
  },
  {
    id: "quadriceps",
    kind: "muscle",
    name: "Quadriceps",
    latin: "Musculus quadriceps femoris",
    system: "musculaire",
    color: "#b83a48",
    region: "Avant de la cuisse",
    description:
      "Quatre muscles fusionnent sur un tendon commun qui englobe la rotule : droit fémoral, vastes intermédiaire, médial et latéral.",
    role:
      "Étend le genou et fléchit la hanche ; c'est le muscle essentiel de la marche, du saut et de la montée d'escalier.",
    funFact:
      "C'est le muscle le plus fort du corps humain ; son tendon peut transmettre plusieurs centaines de kilos de force.",
  },
  {
    id: "ischio_jambiers",
    kind: "muscle",
    name: "Ischio-jambiers",
    latin: "Musculi ischiocrurales",
    system: "musculaire",
    color: "#963342",
    region: "Arrière de la cuisse",
    description:
      "Groupe de trois muscles à l'arrière de la cuisse, du bassin au tibia et au péroné.",
    role:
      "Fléchissent le genou et étendent la hanche, indispensables à la course et au freinage ; souvent victimes de claquages.",
    funFact:
      "Lors d'un sprint, les ischio-jambiers peuvent être étirés à plus de 130 % de leur longueur de repos.",
  },
  {
    id: "mollets",
    kind: "muscle",
    name: "Mollets",
    latin: "Gastrocnemius et soleus",
    system: "musculaire",
    color: "#a83242",
    region: "Arrière de la jambe",
    description:
      "Le triceps sural réunit les deux gastrocnémiens et le soléaire, qui se terminent sur le tendon d'Achille.",
    role:
      "Pointent le pied et permettent de se tenir debout sur la pointe des pieds, de marcher et de sauter.",
    funFact:
      "Le tendon d'Achille est le plus épais du corps et supporte jusqu'à 4 kN, soit environ 400 kg de traction.",
  },
];
