export const BONES = [
  {
    id: "crane",
    kind: "bone",
    name: "Crâne",
    latin: "Cranium",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Tête",
    description:
      "Le crâne réunit 22 os soudés par des sutures, dont 8 forment la boîte crânienne qui protège le cerveau.",
    role:
      "Protège l'encéphale et les organes des sens, soutient le visage et abrite les sinus.",
    funFact:
      "Les os du crâne d'un nouveau-né ne sont pas totalement fusionnés : les fontanelles permettent la croissance du cerveau.",
  },
  {
    id: "colonne",
    kind: "bone",
    name: "Colonne vertébrale",
    latin: "Columna vertebralis",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Dos",
    description:
      "Empilement de 33 vertèbres (7 cervicales, 12 thoraciques, 5 lombaires, 5 sacrées, 4 coccygiennes), séparées par des disques.",
    role:
      "Soutient la tête et le tronc, protège la moelle épinière et permet de se pencher, tourner et fléchir.",
    funFact:
      "Vue de côté, la colonne dessine un S : ces courbures naturelles amortissent les chocs comme un ressort.",
  },
  {
    id: "cotes",
    kind: "bone",
    name: "Côtes & sternum",
    latin: "Costae et sternum",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Thorax",
    description:
      "Douze paires de côtes s'articulent à la colonne, les dix premières rejoignent le sternum par des cartilages.",
    role:
      "Forment une cage élastique qui protège le cœur, les poumons et les gros vaisseaux, et participent à la respiration.",
    funFact:
      "Les côtes bougent à chaque respiration : elles se soulèvent comme les anses d'un seau, augmentant le volume du thorax.",
  },
  {
    id: "bassin",
    kind: "bone",
    name: "Bassin",
    latin: "Pelvis",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Bassin",
    description:
      "Anneau osseux formé par les deux os iliaques, le sacrum et le coccyx, il relie la colonne aux membres inférieurs.",
    role:
      "Transmet le poids du corps aux jambes, protège la vessie et les organes pelviens, sert d'ancrage aux muscles.",
    funFact:
      "Le bassin féminin est plus large et plus bas que le masculin, une adaptation à l'accouchement.",
  },
  {
    id: "omoplate",
    kind: "bone",
    name: "Omoplate",
    latin: "Scapula",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Haut du dos",
    description:
      "Os plat et triangulaire, l'omoplate glisse sur le gril costal à l'arrière de chaque épaule.",
    role:
      "Offre une grande surface d'insertion aux muscles de l'épaule et forme, avec la clavicule, l'articulation de l'épaule.",
    funFact:
      "L'omoplate est très mobile : elle suit les mouvements du bras et permet de lever le membre au-dessus de la tête.",
  },
  {
    id: "clavicule",
    kind: "bone",
    name: "Clavicule",
    latin: "Clavicula",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Haut du thorax",
    description:
      "Os allongé en forme de S, horizontal, entre le sternum et l'omoplate. C'est l'os le plus souvent fracturé chez l'enfant.",
    role:
      "Maintient l'épaule écartée du thorax et transmet les forces du bras au squelette axial.",
    funFact:
      "La clavicule est le premier os à commencer son ossification chez l'embryon, dès la 5e semaine.",
  },
  {
    id: "humerus",
    kind: "bone",
    name: "Humérus",
    latin: "Humerus",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Bras",
    description:
      "Os long du bras, articulé à l'omoplate en haut et au radius/ulna en bas.",
    role:
      "Sert de levier pour les muscles de l'épaule et du bras ; son extrémité inférieure forme la charnière du coude.",
    funFact:
      "Le « petit juif » que l'on cogne au coude est en réalité le nerf ulnaire, qui passe dans une gouttière de l'humérus.",
  },
  {
    id: "avant_bras",
    kind: "bone",
    name: "Radius & ulna",
    latin: "Radius et ulna",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Avant-bras",
    description:
      "Deux os parallèles de l'avant-bras. Le radius est du côté du pouce, l'ulna (cubitus) du côté du petit doigt.",
    role:
      "Permettent la flexion du coude et surtout la rotation de l'avant-bras, qui retourne la paume vers le haut ou le bas.",
    funFact:
      "Quand vous tournez la main, le radius pivote autour de l'ulna : c'est la prono-supination.",
  },
  {
    id: "main",
    kind: "bone",
    name: "Main",
    latin: "Manus",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Membre supérieur",
    description:
      "La main compte 27 os : 8 du carpe, 5 métacarpiens et 14 phalanges, plus des dizaines de ligaments et tendons.",
    role:
      "Permet la préhension fine, le toucher et la manipulation d'objets avec une précision extrême.",
    funFact:
      "La main a une densité de récepteurs tactiles si élevée que le cortex lui consacre une zone disproportionnée.",
  },
  {
    id: "femur",
    kind: "bone",
    name: "Fémur",
    latin: "Femur",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Cuisse",
    description:
      "Le plus long et le plus solide des os, il s'articule avec le bassin par la hanche et avec le tibia par le genou.",
    role:
      "Transmet le poids du corps et sert de levier puissant pour la marche, la course et le saut.",
    funFact:
      "Il peut supporter 30 fois le poids du corps en compression ; sa fracture est pourtant fréquente après 65 ans.",
  },
  {
    id: "rotule",
    kind: "bone",
    name: "Rotule",
    latin: "Patella",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Genou",
    description:
      "Petit os sésamoïde aplati, la rotule est enchâssée dans le tendon du quadriceps, devant le genou.",
    role:
      "Protège l'articulation du genou et augmente l'efficacité du muscle quadriceps en agissant comme une poulie.",
    funFact:
      "La rotule est le plus gros os sésamoïde du corps ; elle n'est pas présente à la naissance, elle ossifie vers 3 ans.",
  },
  {
    id: "tibia",
    kind: "bone",
    name: "Tibia & péroné",
    latin: "Tibia et fibula",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Jambe",
    description:
      "Le tibia est l'os porteur de la jambe ; le péroné (fibula), plus fin, est latéral et sert d'insertion musculaire.",
    role:
      "Soutiennent le poids du corps et forment la cheville avec le talus ; le tibia est le deuxième os le plus long.",
    funFact:
      "Le tibia est très exposé : sa face antérieure est juste sous la peau, d'où les douleurs du « périoste » chez les coureurs.",
  },
  {
    id: "pied",
    kind: "bone",
    name: "Pied",
    latin: "Pes",
    system: "squelettique",
    color: "#e9e2cf",
    region: "Membre inférieur",
    description:
      "Le pied compte 26 os, 33 articulations et une vingtaine de muscles intrinsèques, organisés en voûte.",
    role:
      "Supporte le poids, amortit les impacts et propulse le corps lors de la marche.",
    funFact:
      "La voûte plantaire répartit les charges comme un arc de pont ; à chaque pas, le pied encaisse plusieurs fois le poids du corps.",
  },
];
