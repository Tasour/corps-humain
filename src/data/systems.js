export const SYSTEMS = [
  {
    id: "respiratoire",
    name: "Respiratoire",
    color: "#22d3ee",
    short: "Respirer, échanger l'oxygène",
    description:
      "Le nez, la trachée, les bronches et les poumons apportent l'oxygène au sang et évacuent le CO₂.",
  },
  {
    id: "cardiovasculaire",
    name: "Cardiovasculaire",
    color: "#fb7185",
    short: "Faire circuler le sang",
    description:
      "Le cœur, les artères et les veines propulsent le sang, l'oxygène et les nutriments dans tout le corps.",
  },
  {
    id: "digestif",
    name: "Digestif",
    color: "#fbbf24",
    short: "Décomposer, absorber, éliminer",
    description:
      "De la bouche au côlon, le tube digestif transforme les aliments et absorbe les nutriments.",
  },
  {
    id: "nerveux",
    name: "Nerveux",
    color: "#a78bfa",
    short: "Penser, sentir, commander",
    description:
      "Le cerveau, la moelle épinière et les nerfs traitent l'information et commandent les mouvements.",
  },
  {
    id: "urinaire",
    name: "Urinaire",
    color: "#60a5fa",
    short: "Filtrer et évacuer",
    description:
      "Les reins filtrent le sang, les uretères transportent l'urine et la vessie la stocke.",
  },
  {
    id: "immunitaire",
    name: "Immunitaire",
    color: "#34d399",
    short: "Défendre l'organisme",
    description:
      "La rate, les ganglions et les cellules immunitaires surveillent et défendent le corps.",
  },
  {
    id: "endocrinien",
    name: "Endocrinien",
    color: "#f472b6",
    short: "Réguler par les hormones",
    description:
      "Les glandes sécrètent des hormones qui pilotent la croissance, le sucre sanguin, le stress…",
  },
  {
    id: "squelettique",
    name: "Squelettique",
    color: "#e5ddc8",
    short: "Soutenir et protéger",
    description:
      "Les 206 os forment la charpente du corps, protègent les organes et fabriquent les cellules du sang.",
  },
  {
    id: "musculaire",
    name: "Musculaire",
    color: "#ef4444",
    short: "Bouger et produire de la chaleur",
    description:
      "Les muscles squelettiques, attachés aux os par les tendons, produisent les mouvements volontaires.",
  },
];

export const SYSTEM_MAP = Object.fromEntries(SYSTEMS.map((s) => [s.id, s]));
