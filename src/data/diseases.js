export const NORMAL_VITALS = {
  hr: 72,
  spo2: 98,
  rr: 14,
  sbp: 120,
  dbp: 80,
  temp: 36.8,
};

const v = (hr, spo2, rr, sbp, dbp, temp) => ({ hr, spo2, rr, sbp, dbp, temp });

export const DISEASES = [
  /* ─────────────────────────── RESPIRATOIRE ─────────────────────────── */
  {
    id: "asthme",
    name: "Asthme",
    system: "respiratoire",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "Des bronches qui se resserrent et s'enflamment par crises.",
    description:
      "L'asthme est une inflammation chronique des voies aériennes. Les bronches deviennent hyperréactives : au contact d'un déclencheur, leurs muscles se contractent, la muqueuse gonfle et le mucus s'accumule, ce qui gêne le passage de l'air.",
    mechanism:
      "La bronchoconstriction réduit fortement le calibre des bronchioles. L'air entre encore, mais ressort mal : les poumons se vident lentement, d'où le sifflement expiratoire et la sensation d'étouffement. L'inflammation chronique épaissit peu à peu la paroi bronchique.",
    symptoms: ["Sifflements expiratoires", "Essoufflement", "Toux sèche nocturne", "Oppression thoracique", "Réveils nocturnes", "Difficulté à finir d'expirer"],
    causes: ["Prédisposition génétique et allergie", "Acariens, pollens, poils d'animaux", "Pollution et tabagisme passif", "Infections virales respiratoires", "Effort à l'air froid"],
    treatments: ["Bronchodilatateurs de secours", "Corticoïdes inhalés de fond", "Plan d'action personnalisé", "Contrôle des allergènes"],
    prevention: ["Éviter les déclencheurs identifiés", "Suivre le traitement de fond", "Vaccination antigrippale", "Tabac strictement interdit"],
    fact:
      "L'asthme n'est pas une maladie « psychologique » : l'inflammation bronchique est bien réelle, même entre les crises.",
    vitals: v(104, 92, 26, 118, 76, 36.9),
    effects: [
      { target: "bronches", type: "obstruction", amount: 0.88, label: "Bronchoconstriction", note: "Les muscles lisses des bronchioles se contractent et le mucus obstrue la lumière : l'air circule mal." },
      { target: "poumons", type: "inflammation", amount: 0.42, label: "Inflammation des bronches", note: "Muqueuse gonflée et hypersensible : les crises se répètent au moindre déclencheur." },
    ],
    stages: [
      { label: "Gêne légère", text: "Sifflements discrets à l'effort, toux sèche. La bronche reste globalement ouverte." },
      { label: "Crise modérée", text: "Le calibre des bronchioles chute, l'expiration siffle et le souffle se raccourcit." },
      { label: "Crise sévère", text: "Obstruction majeure, respiration rapide et superficielle, SpO₂ en baisse : urgence médicale." },
    ],
  },
  {
    id: "bpco",
    name: "BPCO",
    system: "respiratoire",
    course: "Chronique",
    frequency: "Fréquente",
    tagline: "Le tabac détruit lentement les alvéoles et les bronches.",
    description:
      "La bronchopneumopathie chronique obstructive (BPCO) associe une obstruction bronchique fixe et une destruction des alvéoles (emphysème). Les poumons perdent leur élasticité et emprisonnent l'air.",
    mechanism:
      "Les alvéoles fusionnent et disparaissent : la surface d'échange chute. En parallèle, les bronches s'épaississent et produisent trop de mucus. Le patient « souffle » difficilement, surtout à l'effort.",
    symptoms: ["Essoufflement progressif", "Toux chronique", "Expectorations", "Sifflements", "Infections répétées", "Perte de poids"],
    causes: ["Tabagisme (85 % des cas)", "Exposition professionnelle aux poussières", "Pollution de l'air", "Déficit génétique en alpha-1-antitrypsine"],
    treatments: ["Arrêt du tabac", "Bronchodilatateurs de longue durée", "Réhabilitation respiratoire", "Oxygène à domicile si besoin"],
    prevention: ["Ne jamais fumer", "Protéger les voies respiratoires au travail", "Vaccinations", "Activité physique régulière"],
    fact:
      "Dans la BPCO, les poumons sont souvent plus grands qu'à la normale : ils sont distendus par l'air qui ne peut plus être expulsé.",
    vitals: v(96, 88, 24, 138, 86, 36.8),
    effects: [
      { target: "poumons", type: "destruction", amount: 0.85, label: "Emphysème", note: "Les parois alvéolaires se détruisent : moins de surface d'échange et des poumons hypergonflés." },
      { target: "bronches", type: "obstruction", amount: 0.55, label: "Obstruction fixe", note: "Bronches épaissies et encombrées de mucus : l'air reste piégé à l'expiration." },
    ],
    stages: [
      { label: "Stade précoce", text: "Toux et expectorations, essoufflement seulement à l'effort intense." },
      { label: "Stade modéré", text: "L'essoufflement limite la marche rapide ; les infections s'aggravent." },
      { label: "Stade sévère", text: "Dyspnée au moindre effort, hypoxémie chronique et exacerbations fréquentes." },
    ],
  },
  {
    id: "pneumonie",
    name: "Pneumonie",
    system: "respiratoire",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "Une infection remplit les alvéoles de liquide et de cellules.",
    description:
      "La pneumonie est une infection du poumon, le plus souvent bactérienne ou virale. Une zone du poumon s'enflamme et les alvéoles se remplissent d'exsudat, d'où une consolidation visible à la radio.",
    mechanism:
      "Les alvéoles remplies de liquide ne peuvent plus échanger les gaz : le sang est moins oxygéné. Fièvre, toux et respiration rapide traduisent la réponse immunitaire et le manque d'oxygène.",
    symptoms: ["Fièvre élevée", "Toux grasse", "Douleur thoracique", "Respiration rapide", "Frissons", "Fatigue intense", "Confusion chez la personne âgée"],
    causes: ["Pneumocoque et autres bactéries", "Virus respiratoires", "Fausse route chez la personne âgée", "Immunodépression"],
    treatments: ["Antibiotiques adaptés", "Hydratation et repos", "Oxygène si désaturation", "Hospitalisation si forme sévère"],
    prevention: ["Vaccination pneumocoque et grippe", "Arrêt du tabac", "Hygiène des mains", "Traiter rapidement une infection respiratoire"],
    fact:
      "La pneumonie est l'une des premières causes d'hospitalisation chez les personnes âgées, souvent révélée par une confusion plutôt que de la fièvre.",
    vitals: v(110, 90, 28, 104, 64, 39.2),
    effects: [
      { target: "poumons", type: "consolidation", amount: 0.85, label: "Consolidation", note: "Les alvéoles se remplissent de liquide et de globules blancs : la zone ne participe plus aux échanges gazeux." },
      { target: "poumons", type: "inflammation", amount: 0.7, label: "Inflammation infectieuse", note: "Le système immunitaire afflue dans le poumon, provoquant fièvre et douleur." },
    ],
    stages: [
      { label: "Début", text: "Fièvre et toux, foyer inflammatoire localisé dans un lobe." },
      { label: "Extension", text: "La consolidation s'étend, la saturation baisse, la respiration s'accélère." },
      { label: "Forme sévère", text: "Détresse respiratoire, hypoxémie profonde : oxygène et hospitalisation urgents." },
    ],
  },
  {
    id: "fibrose_pulmonaire",
    name: "Fibrose pulmonaire",
    system: "respiratoire",
    course: "Évolutive",
    frequency: "Rare",
    tagline: "Les poumons se cicatrisent de l'intérieur et deviennent rigides.",
    description:
      "La fibrose pulmonaire est une maladie évolutive dans laquelle du tissu cicatriciel remplace progressivement les alvéoles. Les poumons perdent leur souplesse et l'échange d'oxygène se dégrade.",
    mechanism:
      "Le collagène s'accumule dans les parois alvéolaires, qui s'épaississent. Les poumons deviennent rigides : ils se gonflent mal et se vident mal. La capacité vitale diminue et l'oxygène passe difficilement dans le sang.",
    symptoms: ["Essoufflement croissant", "Toux sèche persistante", "Fatigue", "Extrémités bleutées", "Doigts en baguette de tambour", "Perte d'appétit"],
    causes: ["Cause idiopathique (inconnue) dans la majorité des cas", "Exposition aux poussières (amiante, silice)", "Maladies auto-immunes", "Antécédents familiaux"],
    treatments: ["Antifibrotiques", "Oxygénothérapie", "Réhabilitation respiratoire", "Greffe pulmonaire dans certains cas"],
    prevention: ["Protéger les poumons au travail", "Arrêt du tabac", "Suivi médical régulier en cas de facteur de risque"],
    fact:
      "On parle de « poumons en nid d'abeille » : au scanner, les zones fibreuses dessinent de petites logettes.",
    vitals: v(94, 86, 26, 118, 78, 36.7),
    effects: [
      { target: "poumons", type: "fibrosis", amount: 0.9, label: "Fibrose", note: "Le tissu souple est remplacé par du collagène rigide : moins de volume, moins d'échanges." },
    ],
    stages: [
      { label: "Début", text: "Essoufflement à l'effort important, toux sèche, fibrose localisée." },
      { label: "Progression", text: "La capacité pulmonaire baisse ; la saturation chute à l'effort." },
      { label: "Stade avancé", text: "Le poumon est rigide et réduit : oxygène nécessaire, insuffisance respiratoire." },
    ],
  },

  /* ─────────────────────────── CARDIOVASCULAIRE ─────────────────────────── */
  {
    id: "infarctus",
    name: "Infarctus du myocarde",
    system: "cardiovasculaire",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "Une artère coronaire se bouche : le muscle cardiaque souffre.",
    description:
      "L'infarctus survient quand une artère coronaire est soudainement obstruée, le plus souvent par un caillot formé sur une plaque d'athérome. Une partie du muscle cardiaque n'est plus irriguée.",
    mechanism:
      "Privées d'oxygène, les cellules du myocarde meurent en quelques heures. Le cœur perd de sa force de contraction, ce qui peut provoquer des troubles du rythme, une chute de tension et une insuffisance cardiaque.",
    symptoms: ["Douleur thoracique serrant (comme un étau)", "Douleur irradiant au bras gauche et à la mâchoire", "Sueurs froides", "Nausées", "Essoufflement", "Angoisse", "Palpitations"],
    causes: ["Athérosclérose", "Tabagisme", "Diabète et hypertension", "Cholestérol élevé", "Antécédents familiaux"],
    treatments: ["Appel immédiat au 15", "Désobstruction de l'artère (angioplastie)", "Antiplaquettaires et anticoagulants", "Réadaptation cardiaque"],
    prevention: ["Contrôler la tension et le cholestérol", "Ne pas fumer", "Activité physique", "Alimentation équilibrée"],
    fact:
      "Chaque minute de retard à la prise en charge détruit environ 10 millions de cellules cardiaques : « time is muscle ».",
    vitals: v(116, 93, 24, 96, 62, 36.8),
    effects: [
      { target: "coronaires", type: "obstruction", amount: 0.95, label: "Occlusion coronaire", note: "Un caillot bloque l'artère : plus aucun sang n'arrive au muscle en aval." },
      { target: "coeur", type: "necrosis", amount: 0.85, label: "Nécrose du myocarde", note: "Les cellules privées d'oxygène meurent et sont remplacées par une cicatrice non contractile." },
    ],
    stages: [
      { label: "Ischémie", text: "L'artère se rétrécit ou se bouche : douleur et manque d'oxygène, muscle encore vivant." },
      { label: "Nécrose", text: "Les cellules meurent ; le cœur perd une partie de sa force de pompe." },
      { label: "Cicatrice", text: "Le tissu mort est remplacé par une cicatrice fibreuse : risque d'arythmie et d'insuffisance cardiaque." },
    ],
  },
  {
    id: "insuffisance_cardiaque",
    name: "Insuffisance cardiaque",
    system: "cardiovasculaire",
    course: "Chronique",
    frequency: "Fréquente",
    tagline: "Un cœur trop faible pour répondre à la demande du corps.",
    description:
      "L'insuffisance cardiaque désigne l'incapacité du cœur à éjecter suffisamment de sang. Le sang stagne en amont, dans les poumons ou les veines, et les organes sont moins bien perfusés.",
    mechanism:
      "Le débit cardiaque baisse. La pression remonte dans les poumons, où du liquide s'infiltre (œdème pulmonaire), et dans les jambes (œdèmes). Le corps compense en accélérant le cœur et en retenant du sel et de l'eau.",
    symptoms: ["Essoufflement à l'effort puis allongé", "Œdèmes des chevilles", "Fatigue", "Prise de poids rapide", "Toux nocturne", "Palpitations", "Besoin d'uriner la nuit"],
    causes: ["Infarctus ancien", "Hypertension non traitée", "Valvulopathies", "Cardiomyopathie", "Troubles du rythme"],
    treatments: ["Diurétiques", "Médicaments qui protègent le cœur", "Restriction de sel", "Suivi du poids quotidien"],
    prevention: ["Traiter l'hypertension", "Arrêt du tabac et de l'alcool", "Activité physique adaptée", "Surveiller les symptômes"],
    fact:
      "Un œdème pulmonaire aigu peut se manifester par une sensation d'étouffement la nuit : le patient doit s'asseoir pour respirer.",
    vitals: v(102, 91, 24, 104, 68, 36.6),
    effects: [
      { target: "coeur", type: "hypertrophy", amount: 0.7, label: "Dilatation & hypertrophie", note: "Le cœur se fatigue, se dilate et épaissit ses parois pour compenser, mais devient moins efficace." },
      { target: "poumons", type: "edema", amount: 0.8, label: "Œdème pulmonaire", note: "Le liquide s'accumule dans les alvéoles et gêne les échanges : le sang est mal oxygéné." },
    ],
    stages: [
      { label: "Compensé", text: "Le cœur compense, essoufflement seulement à l'effort soutenu." },
      { label: "Décompensé", text: "Œdèmes, fatigue, essoufflement dès la marche ; le sang stagne en amont." },
      { label: "Sévère", text: "Œdème pulmonaire, orthopnée, hypoxémie : hospitalisation nécessaire." },
    ],
  },
  {
    id: "hypertension",
    name: "Hypertension artérielle",
    system: "cardiovasculaire",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "Une pression trop élevée qui fatigue cœur, reins et cerveau.",
    description:
      "L'hypertension est une pression artérielle durablement supérieure à 140/90 mmHg. Elle reste souvent silencieuse, mais abîme progressivement les artères et les organes.",
    mechanism:
      "La paroi des artères subit une pression excessive : elle s'épaissit et perd son élasticité. Le cœur doit pomper plus fort, ce qui l'hypertrophie. Les petits vaisseaux des reins, de la rétine et du cerveau souffrent.",
    symptoms: ["Souvent aucune", "Maux de tête", "Vertiges", "Saignements de nez", "Fatigue", "Vision floue dans les formes sévères"],
    causes: ["Hérédité", "Sel excessif", "Surpoids", "Alcool et tabac", "Stress chronique", "Maladie rénale ou endocrinienne"],
    treatments: ["Antihypertenseurs", "Réduction du sel", "Perte de poids", "Activité physique"],
    prevention: ["Mesurer sa tension régulièrement", "Limiter le sel et l'alcool", "Bouger 30 minutes par jour", "Dormir suffisamment"],
    fact:
      "On l'appelle le « tueur silencieux » : elle peut rester sans symptôme pendant des années tout en endommageant les organes.",
    vitals: v(82, 98, 16, 172, 106, 36.7),
    effects: [
      { target: "coeur", type: "hypertrophy", amount: 0.65, label: "Hypertrophie cardiaque", note: "Le cœur pompe contre une pression élevée : ses parois s'épaississent et se raidissent." },
      { target: "aorte", type: "wear", amount: 0.6, label: "Artères rigidifiées", note: "Les artères perdent leur élasticité et s'abîment, favorisant l'athérosclérose et les anévrismes." },
    ],
    stages: [
      { label: "Silencieuse", text: "Pression élevée sans symptôme ; les artères commencent à s'épaissir." },
      { label: "Retentissement", text: "Hypertrophie du cœur, micro-lésions rénales et rétiniennes." },
      { label: "Complications", text: "Risque d'AVC, d'infarctus, d'insuffisance rénale et cardiaque." },
    ],
  },
  {
    id: "avc",
    name: "Accident vasculaire cérébral",
    system: "nerveux",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "Une artère du cerveau se bouche ou se rompt : des neurones meurent.",
    description:
      "L'AVC prive soudainement une région du cerveau de sang, soit par obstruction (85 %), soit par hémorragie. Les fonctions contrôlées par cette zone sont perdues en quelques minutes.",
    mechanism:
      "Sans oxygène, les neurones s'épuisent et meurent, ainsi que les cellules voisines. La région touchée ne peut plus commander les muscles ou recevoir les sensations. Plus la reperfusion est rapide, plus on limite les séquelles.",
    symptoms: ["Paralysie soudaine d'un côté du visage", "Faiblesse d'un bras ou d'une jambe", "Trouble de la parole", "Cécité d'un œil", "Maux de tête brutaux", "Déséquilibre"],
    causes: ["Hypertension", "Athérosclérose", "Fibrillation auriculaire", "Diabète", "Tabagisme", "Anévrisme rompu"],
    treatments: ["Urgence absolue : appel au 15", "Thrombolyse ou thrombectomie", "Hospitalisation en unité neurovasculaire", "Rééducation"],
    prevention: ["Contrôler la tension", "Traiter la fibrillation auriculaire", "Arrêter le tabac", "Bouger et équilibrer l'alimentation"],
    fact:
      "Chaque minute sans traitement, près de 2 millions de neurones sont détruits : c'est l'urgence vitale qui fait perdre le plus de temps.",
    vitals: v(92, 95, 18, 186, 112, 36.9),
    effects: [
      { target: "cerveau", type: "hemorrhage", amount: 0.9, label: "Lésion cérébrale", note: "Une zone du cerveau est privée de sang : les neurones meurent et la fonction correspondante est perdue." },
      { target: "aorte", type: "plaque", amount: 0.55, label: "Athérosclérose", note: "Des plaques fragilisent les artères cérébrales et carotidiennes, terrain de l'AVC." },
    ],
    stages: [
      { label: "Déficit aigu", text: "Paralysie et trouble du langage apparaissent brutalement ; les neurones souffrent." },
      { label: "Ischémie étendue", text: "Sans reperfusion, le cœur de la lésion meurt et le déficit s'installe." },
      { label: "Séquelles", text: "Une partie des fonctions est perdue ; la rééducation peut réorganiser les circuits." },
    ],
  },
  {
    id: "atherosclerose",
    name: "Athérosclérose",
    system: "cardiovasculaire",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "Des plaques de cholestérol rigidifient les artères.",
    description:
      "L'athérosclérose est une inflammation chronique de la paroi des artères. Des dépôts de cholestérol, de cellules immunitaires et de calcium forment des plaques qui réduisent la lumière du vaisseau.",
    mechanism:
      "L'endothélium lésé laisse pénétrer les LDL, qui s'oxydent et attirent les macrophages. La plaque grossit, se calcifie, et peut se rompre : un caillot se forme alors et bouche l'artère.",
    symptoms: ["Souvent aucun avant complication", "Douleur à l'effort (angine)", "Douleurs des jambes à la marche", "Tension élevée", "Troubles visuels"],
    causes: ["Cholestérol LDL élevé", "Tabagisme", "Diabète", "Hypertension", "Hérédité", "Mode de vie sédentaire"],
    treatments: ["Statines", "Antiplaquettaires", "Contrôle de la tension et du diabète", "Angioplastie si sténose serrée"],
    prevention: ["Alimentation méditerranéenne", "Activité physique régulière", "Arrêt du tabac", "Dépistage du cholestérol"],
    fact:
      "L'athérosclérose commence dès l'adolescence : les premières stries lipidiques apparaissent bien avant les symptômes.",
    vitals: v(78, 97, 14, 146, 92, 36.6),
    effects: [
      { target: "aorte", type: "plaque", amount: 0.9, label: "Plaques d'athérome", note: "Des dépôts de cholestérol et de calcium rétrécissent et rigidifient l'aorte." },
      { target: "coronaires", type: "plaque", amount: 0.7, label: "Coronaires sténosées", note: "Les artères du cœur sont rétrécies : le muscle manque d'oxygène à l'effort." },
    ],
    stages: [
      { label: "Stries lipidiques", text: "Dépôts naissants dans la paroi, sans rétrécissement ni symptôme." },
      { label: "Plaque constituée", text: "La lumière de l'artère se réduit, le flux baisse, l'effort devient limitant." },
      { label: "Plaque compliquée", text: "Rupture ou thrombose : infarctus, AVC ou ischémie des jambes." },
    ],
  },

  /* ─────────────────────────── NERVEUX ─────────────────────────── */
  {
    id: "parkinson",
    name: "Maladie de Parkinson",
    system: "nerveux",
    course: "Évolutive",
    frequency: "Fréquente",
    tagline: "La dopamine manque : le mouvement devient lent et tremblant.",
    description:
      "La maladie de Parkinson est une maladie neurodégénérative qui détruit progressivement les neurones producteurs de dopamine de la substance noire, dans le tronc cérébral.",
    mechanism:
      "Sans dopamine, les ganglions de la base ne régulent plus correctement les mouvements. Le cerveau compense un temps, puis apparaissent lenteur, rigidité et tremblements. Les circuits de la marche et de l'équilibre sont touchés.",
    symptoms: ["Tremblement de repos", "Lenteur des mouvements", "Rigidité musculaire", "Petits pas, posture voûtée", "Visage moins expressif", "Troubles du sommeil", "Constipation"],
    causes: ["Cause inconnue dans la majorité des cas", "Vieillissement et facteurs environnementaux", "Rares formes génétiques", "Exposition à certains pesticides"],
    treatments: ["Lévodopa", "Agonistes dopaminergiques", "Rééducation et orthophonie", "Stimulation cérébrale profonde dans certains cas"],
    prevention: ["Pas de prévention prouvée", "Activité physique régulière", "Suivi neurologique précoce"],
    fact:
      "Les premiers symptômes apparaissent quand environ 60 à 70 % des neurones dopaminergiques sont déjà détruits : le cerveau compense longtemps.",
    vitals: v(76, 97, 16, 128, 82, 36.6),
    global: { tremor: 0.35 },
    effects: [
      { target: "cerveau", type: "atrophy", amount: 0.55, label: "Perte de neurones dopaminergiques", note: "La substance noire dégénère : le circuit de contrôle du mouvement manque de dopamine." },
      { target: "tronc_cerebral", type: "atrophy", amount: 0.3, label: "Atteinte du tronc cérébral", note: "Les noyaux du tronc cérébral participent à la régulation du mouvement et de l'équilibre." },
    ],
    stages: [
      { label: "Début", text: "Tremblement d'un côté, lenteur discrète, perte de l'expression du visage." },
      { label: "Installation", text: "Rigidité, petits pas, troubles de l'équilibre et de l'écriture." },
      { label: "Stade avancé", text: "Chutes, blocages de la marche, troubles de la déglutition et de la parole." },
    ],
  },
  {
    id: "alzheimer",
    name: "Maladie d'Alzheimer",
    system: "nerveux",
    course: "Évolutive",
    frequency: "Fréquente",
    tagline: "Les souvenirs s'effacent à mesure que les neurones dégénèrent.",
    description:
      "Maladie neurodégénérative la plus fréquente, Alzheimer entraîne une perte progressive de la mémoire et des fonctions cognitives. Le cerveau s'atrophie, surtout dans les régions de la mémoire.",
    mechanism:
      "Des plaques de protéine bêta-amyloïde s'accumulent entre les neurones et la protéine tau s'agrège à l'intérieur. Les connexions synaptiques se perdent, puis les neurones meurent. L'hippocampe, siège de la mémoire, est touché très tôt.",
    symptoms: ["Oublis récents répétés", "Désorientation dans le temps", "Difficultés à trouver ses mots", "Perte d'initiative", "Changements d'humeur", "Difficultés à gérer les tâches quotidiennes"],
    causes: ["Âge avancé", "Prédisposition génétique (APOE4)", "Facteurs vasculaires", "Rares formes héréditaires précoces"],
    treatments: ["Médicaments symptomatiques", "Stimulation cognitive", "Accompagnement de l'entourage", "Adaptation de l'environnement"],
    prevention: ["Stimuler le cerveau et les liens sociaux", "Bouger régulièrement", "Contrôler tension, diabète et cholestérol", "Bien dormir"],
    fact:
      "L'atrophie cérébrale commence des années avant les premiers oublis : le cerveau compense longtemps avant que les symptômes n'apparaissent.",
    vitals: v(72, 97, 15, 132, 80, 36.5),
    effects: [
      { target: "cerveau", type: "atrophy", amount: 0.85, label: "Atrophie cérébrale", note: "Les neurones et les connexions disparaissent, surtout dans l'hippocampe et le cortex." },
      { target: "cerveau", type: "demyelination", amount: 0.4, label: "Plaques amyloïdes", note: "Des dépôts de bêta-amyloïde perturbent la communication entre neurones." },
    ],
    stages: [
      { label: "Troubles légers", text: "Oublis récents, difficultés d'organisation, encore compensées." },
      { label: "Stade modéré", text: "Désorientation, aide nécessaire pour les tâches complexes, changements de comportement." },
      { label: "Stade avancé", text: "Perte d'autonomie, troubles du langage et de la déglutition, dépendance importante." },
    ],
  },
  {
    id: "sep",
    name: "Sclérose en plaques",
    system: "nerveux",
    course: "Évolutive",
    frequency: "Rare",
    tagline: "La gaine protectrice des nerfs est attaquée par le système immunitaire.",
    description:
      "La sclérose en plaques (SEP) est une maladie auto-immune qui détruit la myéline, la gaine isolante des fibres nerveuses du cerveau et de la moelle épinière.",
    mechanism:
      "Sans myéline, les messages nerveux se propagent mal ou sont bloqués. Les zones démyélinisées forment des « plaques » visibles à l'IRM. Les symptômes dépendent des faisceaux touchés et évoluent par poussées.",
    symptoms: ["Fatigue intense", "Troubles de la sensibilité", "Faiblesse d'un membre", "Troubles visuels", "Troubles de l'équilibre", "Problèmes urinaires", "Fourmillements"],
    causes: ["Maladie auto-immune multifactorielle", "Prédisposition génétique", "Facteurs environnementaux (vitamine D, virus)", "Tabagisme"],
    treatments: ["Traitements de fond immunomodulateurs", "Corticoïdes lors des poussées", "Rééducation", "Traitement des symptômes"],
    prevention: ["Pas de prévention certaine", "Éviter le tabac", "Maintenir une activité physique adaptée", "Suivi spécialisé"],
    fact:
      "La SEP touche environ 2 à 3 fois plus de femmes que d'hommes et débute souvent entre 20 et 40 ans.",
    vitals: v(82, 97, 16, 122, 78, 36.8),
    effects: [
      { target: "moelle_epiniere", type: "demyelination", amount: 0.9, label: "Plaques de démyélinisation", note: "La gaine de myéline est détruite : les messages moteurs et sensitifs passent mal." },
      { target: "cerveau", type: "demyelination", amount: 0.45, label: "Lésions cérébrales", note: "Des plaques disséminées perturbent la vision, la coordination et la cognition." },
    ],
    stages: [
      { label: "Poussée", text: "Fourmillements, fatigue ou trouble visuel apparaissent puis régressent souvent." },
      { label: "Lésions accumulées", text: "Les plaques se multiplient ; la récupération est plus lente et incomplète." },
      { label: "Forme progressive", text: "Le handicap s'installe, avec troubles moteurs, urinaires et de l'équilibre." },
    ],
  },
  {
    id: "epilepsie",
    name: "Épilepsie",
    system: "nerveux",
    course: "Chronique",
    frequency: "Fréquente",
    tagline: "Une décharge électrique anormale envahit le cerveau.",
    description:
      "L'épilepsie est une affection neurologique caractérisée par des crises récurrentes, dues à une activité électrique excessive et désorganisée d'un groupe de neurones.",
    mechanism:
      "Les neurones s'activent de façon synchrone et incontrôlée. La décharge peut rester locale (crise focale) ou se propager aux deux hémisphères (crise généralisée). Le cerveau ne peut plus assumer ses fonctions pendant la crise.",
    symptoms: ["Crises convulsives", "Absences (regard vide)", "Perte de conscience", "Sensations étranges avant la crise", "Confusion après la crise", "Mouvements involontaires"],
    causes: ["Souvent inconnue", "Lésion cérébrale ou AVC ancien", "Prédisposition génétique", "Tumeur, infection ou traumatisme crânien", "Sevrage alcoolique"],
    treatments: ["Antiépileptiques", "Chirurgie dans certains cas", "Régime cétogène (formes particulières)", "Éviter les déclencheurs"],
    prevention: ["Pas de prévention universelle", "Protéger la tête (casque, sécurité routière)", "Traiter les infections du système nerveux", "Bien suivre le traitement"],
    fact:
      "Pendant une crise généralisée, le cerveau consomme énormément d'énergie : la fatigue qui suit peut durer plusieurs jours.",
    vitals: v(90, 96, 18, 126, 80, 37.0),
    effects: [
      { target: "cerveau", type: "hyperactivity", amount: 0.85, label: "Décharge électrique", note: "Des neurones s'emballent simultanément : l'activité électrique désorganisée perturbe tout le cerveau." },
    ],
    stages: [
      { label: "Crise focale", text: "Une zone cérébrale s'active anormalement : sensation étrange, mouvement involontaire." },
      { label: "Généralisation", text: "La décharge s'étend aux deux hémisphères avec perte de conscience et convulsions." },
      { label: "État de mal", text: "Les crises s'enchaînent sans récupération : urgence médicale." },
    ],
  },

  /* ─────────────────────────── DIGESTIF ─────────────────────────── */
  {
    id: "rgo",
    name: "Reflux gastro-œsophagien",
    system: "digestif",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "L'acide de l'estomac remonte et irrite l'œsophage.",
    description:
      "Le RGO survient quand le contenu acide de l'estomac remonte dans l'œsophage, le plus souvent à cause d'un sphincter cardiaque qui ferme mal.",
    mechanism:
      "L'œsophage n'a pas de protection contre l'acide. Les remontées répétées enflamment sa muqueuse (œsophagite), provoquent brûlures et toux. À long terme, l'acidité peut modifier les cellules (endobrachyœsophage).",
    symptoms: ["Brûlures derrière le sternum", "Régurgitations acides", "Toux chronique", "Enrouement", "Goût amer", "Aggravation couché"],
    causes: ["Relâchement du sphincter inférieur de l'œsophage", "Surpoids", "Repas copieux et gras", "Alcool, tabac, café", "Grossesse", "Hernie hiatale"],
    treatments: ["Inhibiteurs de la pompe à protons", "Antiacides", "Surélévation de la tête du lit", "Perte de poids", "Chirurgie antireflux si nécessaire"],
    prevention: ["Éviter les repas tardifs", "Limiter alcool, café et plats gras", "Ne pas fumer", "Manger lentement"],
    fact:
      "Le RGO touche environ 10 à 20 % de la population dans les pays occidentaux, mais tout le monde ne développe pas d'œsophagite.",
    vitals: v(78, 98, 14, 122, 80, 36.7),
    effects: [
      { target: "oesophage", type: "inflammation", amount: 0.8, label: "Œsophagite", note: "La muqueuse de l'œsophage est brûlée par l'acide : rougeur, douleur et parfois ulcération." },
      { target: "estomac", type: "inflammation", amount: 0.35, label: "Hyperacidité", note: "L'estomac produit trop d'acide ou se vide mal, entretenant les remontées." },
    ],
    stages: [
      { label: "Reflux simple", text: "Brûlures occasionnelles après les repas, muqueuse encore saine." },
      { label: "Œsophagite", text: "Inflammation visible de la muqueuse, douleurs plus fréquentes." },
      { label: "Complication", text: "Ulcération, rétrécissement ou modification des cellules (endobrachyœsophage)." },
    ],
  },
  {
    id: "ulcere",
    name: "Ulcère gastrique",
    system: "digestif",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "La paroi de l'estomac se creuse jusqu'à former une plaie.",
    description:
      "Un ulcère gastrique est une plaie profonde de la muqueuse de l'estomac. Il survient quand l'acidité et la pepsine dépassent les défenses de la paroi, souvent en lien avec Helicobacter pylori ou les anti-inflammatoires.",
    mechanism:
      "La muqueuse est fragilisée : l'acide creuse une lésion qui peut atteindre les vaisseaux. La douleur survient souvent à jeun et s'apaise en mangeant. Une perforation ou une hémorragie est une urgence.",
    symptoms: ["Douleur épigastrique à jeun", "Nausées", "Ballonnements", "Selles noires si saignement", "Vomissements de sang", "Perte d'appétit"],
    causes: ["Helicobacter pylori", "Anti-inflammatoires (AINS)", "Tabagisme", "Alcool", "Stress intense et jeûne prolongé"],
    treatments: ["Antibiotiques contre H. pylori", "Inhibiteurs de la pompe à protons", "Arrêt des AINS", "Endoscopie et traitement d'hémostase"],
    prevention: ["Limiter les AINS sans protection", "Ne pas fumer", "Dépister H. pylori", "Gérer le stress et l'alimentation"],
    fact:
      "On a longtemps cru que l'ulcère était causé par le stress seul. La découverte d'Helicobacter pylori a valu le prix Nobel de médecine en 2005.",
    vitals: v(94, 97, 16, 110, 70, 37.1),
    effects: [
      { target: "estomac", type: "necrosis", amount: 0.7, label: "Plaie de la muqueuse", note: "Une perte de substance creuse la paroi gastrique ; l'acide entretient la lésion." },
      { target: "estomac", type: "hemorrhage", amount: 0.4, label: "Risque hémorragique", note: "L'ulcère peut éroder un vaisseau et provoquer un saignement digestif." },
    ],
    stages: [
      { label: "Ulcération superficielle", text: "Douleurs à jeun, lésion limitée à la muqueuse." },
      { label: "Ulcère profond", text: "La plaie atteint la sous-muqueuse ; risque de saignement." },
      { label: "Complication", text: "Hémorragie ou perforation : douleur brutale, urgence chirurgicale." },
    ],
  },
  {
    id: "cirrhose",
    name: "Cirrhose",
    system: "digestif",
    course: "Évolutive",
    frequency: "Fréquente",
    tagline: "Le foie se fibrose, se déforme et perd ses fonctions.",
    description:
      "La cirrhose est le stade avancé de nombreuses maladies du foie (alcool, hépatites, stéatose). Le tissu hépatique est remplacé par de la fibrose et des nodules, ce qui déforme l'organe.",
    mechanism:
      "La fibrose comprime les vaisseaux et les canaux biliaires. Le foie ne filtre plus correctement, la bile stagne, la pression dans la veine porte augmente (varices, ascite). Les toxines s'accumulent.",
    symptoms: ["Fatigue", "Jaunisse", "Ventre gonflé (ascite)", "Œdèmes des jambes", "Confusion", "Saignements faciles", "Démangeaisons"],
    causes: ["Alcool chronique", "Hépatites virales B ou C", "Stéatose hépatique métabolique", "Maladies auto-immunes du foie", "Hémochromatose"],
    treatments: ["Arrêt total de l'alcool", "Traitement de la cause", "Diurétiques et régime adapté", "Surveillance des varices", "Greffe dans les formes avancées"],
    prevention: ["Limiter l'alcool", "Vaccination hépatite B", "Dépistage des hépatites", "Contrôler poids et diabète"],
    fact:
      "Le foie cicatrisé se déforme en nodules et devient dur ; à un stade avancé, il ne peut plus fabriquer assez de protéines ni filtrer les toxines.",
    vitals: v(88, 96, 16, 106, 64, 37.3),
    global: { skin: "#e8c65c" },
    effects: [
      { target: "foie", type: "fibrosis", amount: 0.92, label: "Fibrose hépatique", note: "Le tissu fonctionnel est remplacé par du tissu cicatriciel : filtration et synthèse s'effondrent." },
      { target: "foie", type: "atrophy", amount: 0.5, label: "Foie déformé", note: "L'architecture du foie est détruite par les nodules ; le sang portal circule mal." },
    ],
    stages: [
      { label: "Fibrose débutante", text: "Le foie se cicatrise discrètement, encore compensé, souvent sans symptôme." },
      { label: "Cirrhose constituée", text: "Nodules et fibrose déforment le foie ; fatigue et jaunisse apparaissent." },
      { label: "Décompensation", text: "Ascite, hémorragies digestives, confusion (encéphalopathie) : pronostic sévère." },
    ],
  },
  {
    id: "crohn",
    name: "Maladie de Crohn",
    system: "digestif",
    course: "Chronique",
    frequency: "Rare",
    tagline: "Une inflammation immunitaire attaque par plaques le tube digestif.",
    description:
      "La maladie de Crohn est une maladie inflammatoire chronique de l'intestin. Elle peut toucher n'importe quelle partie du tube digestif, souvent l'iléon terminal et le côlon, par segments séparés par des zones saines.",
    mechanism:
      "Le système immunitaire attaque la paroi intestinale, créant ulcères, œdème et épaississement. L'absorption des nutriments est altérée et des fistules peuvent se former entre anses intestinales.",
    symptoms: ["Douleurs abdominales", "Diarrhées chroniques", "Fatigue", "Perte de poids", "Fièvre", "Ulcères de la bouche", "Fissures anales"],
    causes: ["Prédisposition génétique", "Dysrégulation immunitaire", "Facteurs environnementaux", "Microbiote intestinal perturbé", "Tabagisme"],
    treatments: ["Anti-inflammatoires et immunosuppresseurs", "Biothérapies", "Nutrition adaptée", "Chirurgie si complications"],
    prevention: ["Pas de prévention certaine", "Arrêter le tabac", "Suivi gastro-entérologique régulier", "Alimentation personnalisée"],
    fact:
      "La maladie évolue par poussées et rémissions : on peut vivre des années sans symptôme entre deux épisodes.",
    vitals: v(98, 97, 16, 108, 68, 38.1),
    effects: [
      { target: "intestin_grele", type: "inflammation", amount: 0.9, label: "Iléite", note: "La paroi de l'intestin grêle s'enflamme, s'épaissit et s'ulcère : l'absorption diminue." },
      { target: "colon", type: "inflammation", amount: 0.45, label: "Colite segmentaire", note: "Des segments du côlon sont enflammés, avec diarrhées et douleurs." },
    ],
    stages: [
      { label: "Poussée légère", text: "Douleurs et diarrhées intermittentes, inflammation limitée." },
      { label: "Poussée modérée", text: "Ulcères et œdème de la paroi, perte de poids, fatigue importante." },
      { label: "Complication", text: "Sténose, fistule ou abcès : risque d'occlusion et de chirurgie." },
    ],
  },
  {
    id: "calculs_biliaires",
    name: "Calculs biliaires",
    system: "digestif",
    course: "Aiguë",
    frequency: "Très fréquente",
    tagline: "Des pierres de cholestérol bloquent la vésicule.",
    description:
      "Les calculs biliaires sont des cristaux de cholestérol ou de pigment qui se forment dans la vésicule. Souvent silencieux, ils peuvent bloquer le canal cystique et provoquer une crise de colique hépatique.",
    mechanism:
      "La bile trop concentrée en cholestérol cristallise. Un calcul coincé dans le collet de la vésicule provoque une douleur intense sous les côtes droites, surtout après un repas gras.",
    symptoms: ["Douleur sous les côtes droites", "Douleur après repas gras", "Nausées", "Vomissements", "Fièvre si infection", "Jaunisse si obstruction du canal"],
    causes: ["Sexe féminin et grossesse", "Âge et obésité", "Régime riche en graisses", "Perte de poids rapide", "Antécédents familiaux"],
    treatments: ["Antalgiques", "Ablation de la vésicule (cholécystectomie) si récidives", "Antibiotiques en cas de cholécystite", "Régime pauvre en graisses pendant la crise"],
    prevention: ["Alimentation équilibrée", "Activité physique", "Perte de poids progressive", "Hydratation suffisante"],
    fact:
      "Environ 10 à 15 % des adultes ont des calculs biliaires, mais la majorité ne ressentent jamais rien.",
    vitals: v(88, 98, 15, 120, 76, 37.2),
    effects: [
      { target: "vesicule", type: "stone", amount: 0.9, label: "Calculs", note: "Des pierres obstruent la vésicule ou le canal biliaire et bloquent l'écoulement de la bile." },
      { target: "vesicule", type: "inflammation", amount: 0.6, label: "Cholécystite", note: "La bile bloquée enflamme et infecte la paroi de la vésicule." },
    ],
    stages: [
      { label: "Calculs silencieux", text: "Les pierres sont présentes mais ne bloquent rien." },
      { label: "Colique hépatique", text: "Un calcul se coince : douleur violente et nausées." },
      { label: "Cholécystite", text: "L'inflammation s'installe avec fièvre ; risque de perforation." },
    ],
  },
  {
    id: "pancreatite",
    name: "Pancréatite aiguë",
    system: "digestif",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "Le pancréas s'autodigère et s'enflamme violemment.",
    description:
      "La pancréatite aiguë est une inflammation brutale du pancréas, souvent déclenchée par un calcul biliaire ou l'alcool. Les enzymes digestives s'activent dans la glande et attaquent ses propres tissus.",
    mechanism:
      "Les enzymes normalement libérées dans l'intestin s'activent trop tôt dans le pancréas. L'inflammation se propage, les vaisseaux fuient, et des complications locales (nécrose, kyste) peuvent survenir.",
    symptoms: ["Douleur abdominale intense en ceinture", "Nausées et vomissements", "Fièvre", "Ventre ballonné", "Arrêt du transit", "Douleur irradiant au dos"],
    causes: ["Calculs biliaires", "Alcool", "Hypertriglycéridémie", "Médicaments", "Traumatisme", "Causes génétiques"],
    treatments: ["Hospitalisation et jeûne", "Réhydratation intraveineuse", "Antalgiques puissants", "Traitement de la cause (bile, alcool)", "Chirurgie si nécrose infectée"],
    prevention: ["Limiter l'alcool", "Traiter les calculs biliaires", "Contrôler les triglycérides", "Éviter les médicaments à risque"],
    fact:
      "Le pancréas produit des enzymes capables de digérer les protéines : dans la pancréatite, elles digèrent l'organe lui-même.",
    vitals: v(106, 96, 20, 100, 62, 38.4),
    effects: [
      { target: "pancreas", type: "inflammation", amount: 0.9, label: "Pancréatite", note: "Le pancréas est le siège d'une inflammation majeure ; les enzymes digestives attaquent le tissu." },
      { target: "estomac", type: "inflammation", amount: 0.25, label: "Irritation digestive", note: "L'inflammation locale et l'arrêt du transit irritent l'estomac et le tube digestif." },
    ],
    stages: [
      { label: "Début", text: "Douleur brutale, vomissements, élévation des enzymes pancréatiques." },
      { label: "Inflammation étendue", text: "Œdème et fuite de liquide autour du pancréas, syndrome inflammatoire." },
      { label: "Nécrose", text: "Des zones du pancréas se nécrosent ; risque d'infection et de défaillance multiviscérale." },
    ],
  },

  /* ─────────────────────────── URINAIRE ─────────────────────────── */
  {
    id: "insuffisance_renale",
    name: "Insuffisance rénale",
    system: "urinaire",
    course: "Évolutive",
    frequency: "Fréquente",
    tagline: "Les reins filtrent de moins en moins : les toxines s'accumulent.",
    description:
      "L'insuffisance rénale chronique est la perte progressive des capacités de filtration des reins. Elle est souvent liée au diabète et à l'hypertension, et reste longtemps silencieuse.",
    mechanism:
      "Les néphrons sont détruits progressivement et remplacés par du tissu fibreux. Les reins ne peuvent plus éliminer l'urée et la créatinine, ni équilibrer l'eau, le potassium et la tension. L'anémie et l'atteinte osseuse s'installent.",
    symptoms: ["Fatigue", "Œdèmes", "Urines moins abondantes", "Démangeaisons", "Nausées", "Essoufflement", "Tension élevée"],
    causes: ["Diabète", "Hypertension", "Glomérulonéphrites", "Maladies génétiques (polykystose)", "Médicaments néphrotoxiques"],
    treatments: ["Contrôle de la tension et du diabète", "Régime adapté", "Médicaments protecteurs", "Dialyse ou greffe au stade terminal"],
    prevention: ["Dépister tôt le diabète et l'hypertension", "Ne pas abuser des anti-inflammatoires", "S'hydrater", "Suivi de la fonction rénale"],
    fact:
      "On peut vivre normalement avec un seul rein : la perte de fonction devient symptomatique quand il ne reste qu'environ 10 à 15 % de la capacité.",
    vitals: v(92, 96, 18, 158, 96, 36.7),
    effects: [
      { target: "reins", type: "atrophy", amount: 0.9, label: "Atrophie rénale", note: "Les néphrons sont détruits : les reins se rétractent et filtrent beaucoup moins." },
      { target: "reins", type: "fibrosis", amount: 0.5, label: "Fibrose interstitielle", note: "Le tissu cicatriciel remplace les unités fonctionnelles du rein." },
      { target: "coeur", type: "hypertrophy", amount: 0.3, label: "Retentissement cardiaque", note: "La tension et la rétention hydrosodée fatiguent le cœur." },
    ],
    stages: [
      { label: "Stade débutant", text: "Filtration légèrement réduite, sans symptôme ; biologie anormale." },
      { label: "Stade modéré", text: "Fatigue, tension, œdèmes ; l'anémie et les troubles osseux apparaissent." },
      { label: "Stade terminal", text: "Les toxines s'accumulent : dialyse ou greffe deviennent nécessaires." },
    ],
  },
  {
    id: "calculs_renaux",
    name: "Calculs rénaux",
    system: "urinaire",
    course: "Aiguë",
    frequency: "Très fréquente",
    tagline: "Un caillou bloque l'uretère et déclenche une douleur atroce.",
    description:
      "Les calculs rénaux sont des cristaux formés dans les voies urinaires, surtout à base de calcium. Lorsqu'un calcul migre dans l'uretère, il bloque l'urine et provoque une colique néphrétique.",
    mechanism:
      "En s'engageant dans l'uretère, le calcul crée un obstacle. La pression remonte dans le rein, l'uretère se contracte violemment : douleur en vague, sang dans les urines, parfois infection.",
    symptoms: ["Douleur lombaire intense", "Douleur irradiant vers l'aine", "Sang dans les urines", "Nausées", "Envies fréquentes d'uriner", "Fièvre si infection"],
    causes: ["Déshydratation", "Alimentation riche en sel et en oxalates", "Antécédents personnels ou familiaux", "Certaines maladies métaboliques", "Medicaments"],
    treatments: ["Antalgiques et anti-inflammatoires", "Hydratation", "Élimination spontanée souvent", "Lithotritie ou endoscopie si blocage", "Antibiotiques si infection"],
    prevention: ["Boire 2 litres d'eau par jour", "Limiter le sel", "Éviter les excès d'oxalates", "Suivre la composition du calcul"],
    fact:
      "La colique néphrétique est l'une des douleurs les plus intenses connues : certains patients la comparent à un accouchement.",
    vitals: v(100, 98, 16, 142, 88, 36.9),
    effects: [
      { target: "reins", type: "stone", amount: 0.9, label: "Calcul rénal", note: "Le calcul irrite le rein et peut bloquer l'écoulement de l'urine." },
      { target: "ureteres", type: "obstruction", amount: 0.5, label: "Obstruction de l'uretère", note: "Le calcul coince dans l'uretère : l'urine s'accumule en amont et distend le rein." },
    ],
    stages: [
      { label: "Calcul silencieux", text: "Le calcul reste dans le rein sans provoquer de douleur." },
      { label: "Migration", text: "Il s'engage dans l'uretère : colique néphrétique et sang dans les urines." },
      { label: "Obstruction", text: "L'urine bloquée dilate le rein ; risque d'infection et de perte de fonction." },
    ],
  },
  {
    id: "cystite",
    name: "Cystite",
    system: "urinaire",
    course: "Aiguë",
    frequency: "Très fréquente",
    tagline: "Une infection urinaire enflamme la vessie.",
    description:
      "La cystite est une inflammation de la vessie, le plus souvent causée par une bactérie intestinale remontant par l'urètre, surtout Escherichia coli.",
    mechanism:
      "Les bactéries adhèrent à la paroi de la vessie et déclenchent une inflammation. La muqueuse devient rouge et irritée, ce qui provoque brûlures et envies fréquentes. L'infection ne touche généralement pas les reins.",
    symptoms: ["Brûlures en urinant", "Envies fréquentes", "Urines troubles", "Douleur pelvienne", "Urines malodorantes", "Sang dans les urines"],
    causes: ["Bactéries intestinales", "Rapports sexuels", "Faible consommation d'eau", "Retention d'urine", "Ménopause", "Sonde urinaire"],
    treatments: ["Antibiotiques courts", "Hydratation", "Antalgiques", "Consultation si fièvre ou douleur lombaire"],
    prevention: ["Boire suffisamment", "Uriner après les rapports", "Essuyer d'avant en arrière", "Ne pas retenir ses urines"],
    fact:
      "La cystite est beaucoup plus fréquente chez la femme car l'urètre est court, ce qui facilite la remontée des bactéries.",
    vitals: v(86, 98, 15, 118, 74, 37.8),
    effects: [
      { target: "vessie", type: "inflammation", amount: 0.9, label: "Cystite", note: "La muqueuse vésicale est enflammée par les bactéries : brûlures et contractions douloureuses." },
    ],
    stages: [
      { label: "Début", text: "Brûlures et envies fréquentes, urines encore claires." },
      { label: "Cystite déclarée", text: "Inflammation marquée, urines troubles et douleurs pelviennes." },
      { label: "Extension", text: "Fièvre ou douleur lombaire : l'infection peut gagner les reins (pyélonéphrite)." },
    ],
  },

  /* ─────────────────────────── SQUELETTIQUE ─────────────────────────── */
  {
    id: "osteoporose",
    name: "Ostéoporose",
    system: "squelettique",
    course: "Évolutive",
    frequency: "Très fréquente",
    tagline: "L'os se creuse et devient fragile, souvent sans bruit.",
    description:
      "L'ostéoporose est une perte progressive de la densité osseuse. Les os deviennent poreux et fragiles, ce qui augmente le risque de fractures, notamment du col du fémur, des vertèbres et du poignet.",
    mechanism:
      "Après 30 ans, la destruction osseuse dépasse la formation. La trame osseuse s'amincit et se fragilise. Une chute banale peut alors casser une hanche ou tasser une vertèbre.",
    symptoms: ["Souvent aucun symptôme", "Perte de taille", "Dos voûté", "Douleurs dorsales", "Fractures faciles", "Fracture du poignet"],
    causes: ["Vieillissement et ménopause", "Carence en calcium et vitamine D", "Sédentarité", "Tabac et alcool", "Corticoïdes au long cours", "Antécédents familiaux"],
    treatments: ["Bisphosphonates et autres traitements", "Calcium et vitamine D", "Activité physique avec mise en charge", "Prévention des chutes"],
    prevention: ["Apports suffisants en calcium", "Vitamine D et exposition au soleil", "Exercice physique régulier", "Arrêter le tabac", "Densitométrie après 65 ans"],
    fact:
      "L'os est un tissu vivant : il se renouvelle en permanence. Avec l'âge, la balance penche vers la perte, surtout après la ménopause.",
    vitals: v(76, 98, 14, 126, 80, 36.6),
    effects: [
      { target: "femur", type: "porosity", amount: 0.85, label: "Fragilité fémorale", note: "La trame de l'os se raréfie : le col du fémur devient très vulnérable aux chutes." },
      { target: "colonne", type: "porosity", amount: 0.8, label: "Tassements vertébraux", note: "Les vertèbres perdent de la densité et peuvent s'écraser, entraînant une perte de taille." },
      { target: "bassin", type: "porosity", amount: 0.7, label: "Os iliaques fragilisés", note: "Le bassin devient plus fragile, avec un risque accru de fracture." },
    ],
    stages: [
      { label: "Ostéopénie", text: "Densité osseuse en baisse, sans fracture ; période d'action idéale." },
      { label: "Ostéoporose", text: "Os poreux, fractures vertébrales possibles, perte de taille." },
      { label: "Fractures sévères", text: "Fracture du col du fémur ou tassements multiples : perte d'autonomie." },
    ],
  },
  {
    id: "arthrose",
    name: "Arthrose",
    system: "squelettique",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "Le cartilage s'use et l'articulation s'enflamme.",
    description:
      "L'arthrose est une maladie dégénérative de l'articulation. Le cartilage qui recouvre les os s'amincit, puis l'os réagit et l'inflammation s'installe, surtout aux genoux, aux hanches et aux doigts.",
    mechanism:
      "Sous les contraintes répétées, le cartilage perd ses protéoglycanes et s'effrite. Les os frottent, se densifient et forment des ostéophytes (béances). La douleur apparaît à l'effort puis au repos.",
    symptoms: ["Douleur à l'effort", "Raideur matinale", "Craquements", "Gonflement articulaire", "Perte de mobilité", "Déformation des doigts"],
    causes: ["Âge et usure", "Surpoids", "Ancien traumatisme", "Prédisposition génétique", "Métiers physiques"],
    treatments: ["Activité physique adaptée", "Antalgiques et anti-inflammatoires", "Kinésithérapie", "Injections de corticoïdes", "Prothèse si handicap majeur"],
    prevention: ["Maintenir un poids santé", "Renforcer les muscles autour des articulations", "Éviter les gestes répétitifs", "Bouger sans excès"],
    fact:
      "Le cartilage n'a ni vaisseaux ni nerfs : il se nourrit par le mouvement. Une articulation immobile s'abîme plus vite.",
    vitals: v(78, 98, 14, 130, 82, 36.7),
    effects: [
      { target: "rotule", type: "wear", amount: 0.85, label: "Cartilage usé", note: "Le cartilage s'amincit derrière la rotule : le genou craque et fait mal en montant les escaliers." },
      { target: "femur", type: "wear", amount: 0.75, label: "Articulation de la hanche", note: "L'espace articulaire se réduit ; l'os réagit et la mobilité diminue." },
      { target: "colonne", type: "wear", amount: 0.5, label: "Arthrose vertébrale", note: "Les disques et articulations du dos s'usent, provoquant raideur et douleurs." },
    ],
    stages: [
      { label: "Gêne mécanique", text: "Douleurs à l'effort, cartilage encore présent, raideur légère." },
      { label: "Usure installée", text: "Cartilage aminci, craquements, douleurs plus fréquentes et gonflements." },
      { label: "Articulation détruite", text: "L'os frotte, la mobilité se limite fortement ; prothèse parfois nécessaire." },
    ],
  },
  {
    id: "scoliose",
    name: "Scoliose",
    system: "squelettique",
    course: "Évolutive",
    frequency: "Fréquente",
    tagline: "La colonne se courbe et tourne en trois dimensions.",
    description:
      "La scoliose est une déformation tridimensionnelle de la colonne vertébrale : elle se courbe latéralement et les vertèbres tournent. Elle apparaît souvent à l'adolescence.",
    mechanism:
      "La croissance asymétrique des vertèbres et des disques accentue la courbure. Les côtes suivent la rotation et le thorax se déforme. Selon l'ampleur, la fonction respiratoire peut être affectée.",
    symptoms: ["Épaules asymétriques", "Omoplate saillante", "Bassin décalé", "Douleurs dorsales", "Vêtements qui tombent mal", "Bosse costale"],
    causes: ["Scoliose idiopathique (la plus fréquente)", "Prédisposition familiale", "Malformation vertébrale", "Maladie neuromusculaire", "Inégalité de longueur des jambes"],
    treatments: ["Surveillance pendant la croissance", "Corset si courbure évolutive", "Kinésithérapie spécifique", "Chirurgie pour les courbures sévères"],
    prevention: ["Dépistage clinique à l'adolescence", "Activité physique régulière", "Suivi de la croissance", "Consulter si asymétrie visible"],
    fact:
      "Une scoliose n'est pas causée par une mauvaise posture ou un cartable trop lourd ; la majorité des cas sont idiopathiques.",
    vitals: v(74, 98, 15, 120, 76, 36.8),
    effects: [
      { target: "colonne", type: "scoliosis", amount: 0.75, label: "Courbure vertébrale", note: "La colonne se courbe et pivote : les côtes et le bassin se désalignent." },
    ],
    stages: [
      { label: "Courbure légère", text: "Asymétrie discrète des épaules, colonne légèrement déviée." },
      { label: "Courbure modérée", text: "La déformation progresse pendant la croissance ; un corset peut être proposé." },
      { label: "Courbure sévère", text: "Le thorax se déforme ; la respiration et la posture peuvent être affectées." },
    ],
  },
  {
    id: "fracture_femur",
    name: "Fracture du fémur",
    system: "squelettique",
    course: "Aiguë",
    frequency: "Fréquente",
    tagline: "L'os le plus solide cède : la hanche ne porte plus.",
    description:
      "La fracture du col du fémur touche surtout les personnes âgées après une chute, ou les sujets jeunes lors d'un traumatisme important. Le fémur ne peut alors plus transmettre le poids du corps.",
    mechanism:
      "La solution de continuité de l'os provoque douleur intense, impossibilité de poser le pied et raccourcissement du membre. La chirurgie (ostéosynthèse ou prothèse) est souvent nécessaire pour permettre la marche.",
    symptoms: ["Douleur vive à la hanche", "Impossibilité de marcher", "Jambe tournée vers l'extérieur", "Raccourcissement apparent", "Gonflement", "Hématome"],
    causes: ["Chute chez la personne âgée", "Ostéoporose", "Traumatisme de la route ou du sport", "Tumeur osseuse (rare)", "Fragilité osseuse"],
    treatments: ["Chirurgie rapide", "Antalgiques", "Prévention des phlébites", "Rééducation précoce", "Prise en charge de la chute"],
    prevention: ["Prévenir les chutes à domicile", "Traiter l'ostéoporose", "Renforcer l'équilibre et les muscles", "Corriger la vue"],
    fact:
      "Chez la personne âgée, une fracture du col du fémur est une urgence : l'alitement prolongé augmente fortement les complications.",
    vitals: v(102, 98, 18, 132, 86, 36.9),
    effects: [
      { target: "femur", type: "fracture", amount: 0.9, label: "Fracture du col", note: "L'os est rompu et déplacé : le membre ne peut plus supporter le poids du corps." },
    ],
    stages: [
      { label: "Fracture stable", text: "L'os est cassé mais les fragments restent alignés." },
      { label: "Déplacement", text: "Les fragments se décalent, la jambe se raccourcit et tourne." },
      { label: "Complication", text: "Risque de nécrose de la tête fémorale, de phlébite et de complications liées à l'alitement." },
    ],
  },

  /* ─────────────────────────── MUSCULAIRE ─────────────────────────── */
  {
    id: "dystrophie",
    name: "Dystrophie musculaire",
    system: "musculaire",
    course: "Évolutive",
    frequency: "Rare",
    tagline: "Les muscles s'atrophient à cause d'un défaut génétique.",
    description:
      "Les dystrophies musculaires regroupent des maladies génétiques qui fragilisent progressivement les fibres musculaires. La plus fréquente, Duchenne, touche les garçons dans la petite enfance.",
    mechanism:
      "Une protéine qui stabilise la membrane des fibres musculaires manque (dystrophine dans Duchenne). Les fibres se déchirent à chaque contraction, sont remplacées par du gras et du tissu fibreux, et le muscle fond.",
    symptoms: ["Faiblesse musculaire progressive", "Chutes fréquentes", "Difficulté à monter les escaliers", "Démarche dandinante", "Atrophie des cuisses", "Troubles respiratoires"],
    causes: ["Mutation génétique (souvent liée au chromosome X)", "Antécédents familiaux", "Formes sporadiques possibles"],
    treatments: ["Kinésithérapie et maintien de la mobilité", "Corticoïdes dans certaines formes", "Assistance respiratoire", "Appareillage, fauteuil", "Recherche génétique"],
    prevention: ["Conseil génétique familial", "Dépistage néonatal dans certaines formes", "Suivi pédiatrique précoce"],
    fact:
      "Dans la dystrophie de Duchenne, les muscles semblent parfois volumineux, mais ils sont remplacés par de la graisse et du tissu fibreux.",
    vitals: v(88, 97, 18, 118, 76, 36.8),
    effects: [
      { target: "quadriceps", type: "atrophy", amount: 0.85, label: "Atrophie des cuisses", note: "Les fibres musculaires dégénèrent : le muscle perd du volume et de la force." },
      { target: "fessiers", type: "atrophy", amount: 0.75, label: "Faiblesse du bassin", note: "Les muscles fessiers s'affaiblissent, ce qui rend la marche et le lever difficiles." },
      { target: "deltoides", type: "atrophy", amount: 0.7, label: "Atrophie des épaules", note: "Les bras perdent de la force ; lever les objets devient compliqué." },
      { target: "pectoraux", type: "atrophy", amount: 0.6, label: "Faiblesse du tronc", note: "Les muscles du tronc participent aussi à la respiration, d'où un risque respiratoire." },
    ],
    stages: [
      { label: "Début", text: "Faiblesse des jambes, chutes et difficultés à courir." },
      { label: "Perte de marche", text: "L'atrophie progresse ; la marche devient difficile et l'aide technique nécessaire." },
      { label: "Stade avancé", text: "Atteinte des bras et du tronc, insuffisance respiratoire possible." },
    ],
  },
  {
    id: "tendinite",
    name: "Tendinite de l'épaule",
    system: "musculaire",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "Le tendon s'enflamme et chaque mouvement devient douloureux.",
    description:
      "La tendinite est une inflammation ou une dégénérescence d'un tendon, ici celui de la coiffe des rotateurs à l'épaule. Elle survient après des gestes répétitifs ou un effort intense.",
    mechanism:
      "Les microtraumatismes répétés dépassent la capacité de réparation du tendon. Des fibres se désorganisent, l'inflammation s'installe et le tendon s'épaissit. Lever le bras devient douloureux, surtout entre 60° et 120°.",
    symptoms: ["Douleur à l'épaule", "Douleur en levant le bras", "Douleur nocturne", "Faiblesse du bras", "Craquements", "Gêne pour s'habiller"],
    causes: ["Gestes répétitifs", "Sport de lancer ou de force", "Mauvaise posture", "Vieillissement du tendon", "Épaule instable"],
    treatments: ["Repos relatif et glace", "Anti-inflammatoires", "Kinésithérapie et renforcement", "Infiltration de corticoïdes", "Chirurgie si rupture"],
    prevention: ["Échauffement avant l'effort", "Renforcer la coiffe des rotateurs", "Varier les gestes", "Corriger les postures"],
    fact:
      "La tendinite évolue souvent vers une tendinopathie : le tendon est abîmé sans inflammation majeure, ce qui change la prise en charge.",
    vitals: v(80, 98, 14, 124, 78, 36.7),
    effects: [
      { target: "deltoides", type: "inflammation", amount: 0.8, label: "Tendinopathie de l'épaule", note: "Le tendon de la coiffe des rotateurs est irrité et épaissi ; chaque élévation du bras réveille la douleur." },
    ],
    stages: [
      { label: "Irritation", text: "Douleur au mouvement, tendon encore peu modifié." },
      { label: "Tendinopathie", text: "Le tendon s'épaissit et perd son élasticité ; la douleur persiste au repos." },
      { label: "Rupture", text: "Une partie du tendon peut se rompre : la force de l'épaule chute." },
    ],
  },

  /* ─────────────────────────── ENDOCRINIEN ─────────────────────────── */
  {
    id: "diabete2",
    name: "Diabète de type 2",
    system: "endocrinien",
    course: "Chronique",
    frequency: "Très fréquente",
    tagline: "L'insuline agit mal : le sucre s'accumule dans le sang.",
    description:
      "Le diabète de type 2 est une maladie métabolique dans laquelle les cellules deviennent résistantes à l'insuline. Le pancréas s'épuise à en produire, et la glycémie reste élevée.",
    mechanism:
      "L'insuline ouvre normalement la porte du glucose aux cellules. Résistantes, elles laissent le sucre dans le sang. Le pancréas s'hypertrophie puis s'épuise. L'excès de glucose abîme les vaisseaux, les reins, les nerfs et la rétine.",
    symptoms: ["Soif intense", "Urines fréquentes", "Fatigue", "Perte de poids (parfois)", "Cicatrisation lente", "Troubles visuels", "Fourmillements"],
    causes: ["Surpoids et sédentarité", "Alimentation riche en sucres", "Prédisposition génétique", "Âge", "Antécédents de diabète gestationnel"],
    treatments: ["Metformine et autres antidiabétiques", "Changement d'alimentation", "Activité physique", "Insuline si nécessaire", "Suivi de la glycémie"],
    prevention: ["Maintenir un poids santé", "Bouger 30 minutes par jour", "Limiter les sucres rapides", "Dépistage si facteurs de risque"],
    fact:
      "Le diabète de type 2 peut rester silencieux pendant des années ; il est souvent découvert lors d'un bilan ou d'une complication.",
    vitals: v(86, 97, 16, 138, 88, 36.8),
    effects: [
      { target: "pancreas", type: "atrophy", amount: 0.75, label: "Épuisement pancréatique", note: "Les cellules productrices d'insuline s'épuisent : la glycémie ne peut plus être régulée." },
      { target: "reins", type: "atrophy", amount: 0.35, label: "Néphropathie diabétique", note: "L'excès de glucose abîme les petits vaisseaux des reins et leur filtre." },
      { target: "aorte", type: "plaque", amount: 0.45, label: "Artères fragilisées", note: "L'hyperglycémie accélère l'athérosclérose et rigidifie les artères." },
    ],
    stages: [
      { label: "Insulino-résistance", text: "La glycémie monte discrètement, le pancréas compense." },
      { label: "Diabète déclaré", text: "La glycémie reste élevée ; soif, fatigue et urines fréquentes." },
      { label: "Complications", text: "Atteinte des reins, des nerfs, de la rétine et des artères." },
    ],
  },
  {
    id: "hypothyroidie",
    name: "Hypothyroïdie",
    system: "endocrinien",
    course: "Chronique",
    frequency: "Fréquente",
    tagline: "La thyroïde paresseuse ralentit tout le métabolisme.",
    description:
      "L'hypothyroïdie est un déficit de production des hormones thyroïdiennes. Le métabolisme ralentit, ce qui retentit sur le cœur, la peau, le poids et l'humeur.",
    mechanism:
      "Sans T3 et T4, les cellules travaillent au ralenti. Le cœur bat plus lentement, la température baisse, la peau devient sèche, et l'organisme retient de l'eau. Le feedback augmente la TSH, qui stimule la thyroïde — souvent insuffisamment.",
    symptoms: ["Fatigue persistante", "Prise de poids", "Frilosité", "Peau sèche", "Constipation", "Ralentissement de la pensée", "Cheveux fragiles"],
    causes: ["Thyroïdite auto-immune de Hashimoto", "Carence en iode", "Traitement par iode radioactif ou chirurgie", "Médicaments", "Hypothyroïdie congénitale"],
    treatments: ["Lévothyroxine (hormone de substitution)", "Suivi régulier de la TSH", "Adaptation de la dose"],
    prevention: ["Apports suffisants en iode", "Dépistage en cas de symptômes", "Suivi après chirurgie ou traitement thyroïdien"],
    fact:
      "Un goitre peut apparaître quand la thyroïde grossit pour compenser un manque d'iode ou une production insuffisante.",
    vitals: v(58, 97, 12, 108, 70, 35.9),
    effects: [
      { target: "thyroide", type: "atrophy", amount: 0.85, label: "Thyroïde insuffisante", note: "La glande produit trop peu de T3 et T4 : tout le métabolisme ralentit." },
    ],
    stages: [
      { label: "Hypothyroïdie fruste", text: "Fatigue et frilosité discrètes, TSH légèrement élevée." },
      { label: "Hypothyroïdie déclarée", text: "Ralentissement net, prise de poids, peau sèche, bradycardie." },
      { label: "Forme sévère", text: "Ralentissement profond, œdème, risque de coma myxœdémateux (rare)." },
    ],
  },
];

export const DISEASE_MAP = Object.fromEntries(DISEASES.map((d) => [d.id, d]));

export const EFFECT_LABELS = {
  inflammation: "Inflammation",
  obstruction: "Obstruction",
  fibrosis: "Fibrose",
  necrosis: "Nécrose",
  edema: "Œdème",
  atrophy: "Atrophie",
  tumor: "Tumeur",
  plaque: "Plaque",
  stone: "Calcul",
  hemorrhage: "Hémorragie",
  demyelination: "Démyélinisation",
  fracture: "Fracture",
  wear: "Usure",
  hypertrophy: "Hypertrophie",
  destruction: "Destruction",
  consolidation: "Consolidation",
  hyperactivity: "Hyperactivité",
  porosity: "Porosité",
  scoliosis: "Déformation",
};
