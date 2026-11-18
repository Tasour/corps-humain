/* Arborescence anatomique construite à partir des collections Z-Anatomy.
 * Chaque niveau est un « bloc » cliquable qui isole et cadre ses membres.
 * Les feuilles sont les structures individuelles du manifeste. */

const IGNORE = /^(Bonus collection|Joints|Muscular insertions|Regions of human body|Reference|Cross section)/i;

/* Les chemins du manifeste viennent de Z-Anatomy / BodyParts3D et sont en
 * anglais. On les traduit ici, à la source, pour que l'arbre, le fil d'Ariane
 * et le panneau de détail parlent tous la même langue. */
const LABELS_FR = {
  '1: Skeletal system': 'Squelette',
  '4: Muscular system': 'Musculature',
  '5: Cardiovascular system': 'Système cardiovasculaire',
  '6: Lymphoid organs': 'Organes lymphoïdes',
  '7: Nervous system & Sense organs': 'Système nerveux et organes des sens',
  '8: Visceral systems': 'Systèmes viscéraux',
  'Abdomen': 'Abdomen',
  'Abdominal part of muscular system': 'Partie abdominale du système musculaire',
  'Accessory nerve (XI)': 'Nerf accessoire (XI)',
  'Accessory visual structures': 'Structures visuelles accessoires',
  'Amygdaloid body': 'Corps amygdaloïde',
  'Anterior commissure': 'Commissure antérieure',
  'Anterior compartment of arm': 'Loge antérieure du bras',
  'Anterior compartment of forearm': 'Loge antérieure de l’avant-bras',
  'Anterior compartment of leg': 'Loge antérieure de la jambe',
  'Anterior compartment of thigh': 'Loge antérieure de la cuisse',
  'Anterior horn of spinal cord': 'Corne antérieure de la moelle spinale',
  'Anterior teeth': 'Dents antérieures',
  'Appendicular skeleton': 'Squelette appendiculaire',
  'Auditory ossicles': 'Ossicules auditifs',
  'Axial skeleton': 'Squelette axial',
  'Axillary nerve': 'Nerf axillaire',
  'Back': 'Dos',
  'Basal forebrain': 'Cerveau antérieur basal',
  'BodyParts3D:arterial': 'Réseau artériel',
  'BodyParts3D:cardiac': 'Cœur et vaisseaux',
  'BodyParts3D:digestive': 'Appareil digestif',
  'BodyParts3D:endocrine': 'Système endocrinien',
  'BodyParts3D:integumentary': 'Système tégumentaire',
  'BodyParts3D:lymphatic': 'Système lymphatique',
  'BodyParts3D:muscular': 'Musculature (BodyParts3D)',
  'BodyParts3D:nervous': 'Système nerveux',
  'BodyParts3D:reproductive': 'Appareil reproducteur',
  'BodyParts3D:respiratory': 'Appareil respiratoire',
  'BodyParts3D:sensory': 'Organes des sens',
  'BodyParts3D:skeletal': 'Squelette (BodyParts3D)',
  'BodyParts3D:urinary': 'Appareil urinaire',
  'BodyParts3D:venous': 'Réseau veineux',
  'Bones of free lower limb': 'Os du membre inférieur libre',
  'Bones of lower limb': 'Os du membre inférieur',
  'Bones of pectoral girdle': 'Os de la ceinture scapulaire',
  'Bones of upper limb': 'Os du membre supérieur',
  'Bony pelvis': 'Bassin osseux',
  'Brain': 'Encéphale',
  'Brainstem': 'Tronc cérébral',
  'Bronchi': 'Bronches',
  'Bursae': 'Bourses séreuses',
  'Cartilages': 'Cartilages',
  'Caudate nucleus': 'Noyau caudé',
  'Central mesencephalic structures': 'Structures mésencéphaliques centrales',
  'Central nervous system': 'Système nerveux central',
  'Cerebellum': 'Cervelet',
  'Cerebral hemisphere': 'Hémisphère cérébral',
  'Cerebrum': 'Cerveau',
  'Cervical vertebrae': 'Vertèbres cervicales',
  'Cochlea': 'Cochlée',
  'Cochlear nerve': 'Nerf cochléaire',
  'Commissural fibres of telencephalon': 'Fibres commissurales du télencéphale',
  'Common fibular nerve': 'Nerf fibulaire commun',
  'Corpus callosum': 'Corps calleux',
  'Costal cartilages': 'Cartilages costaux',
  'Cranial dura': 'Dure-mère crânienne',
  'Cranial nerves': 'Nerfs crâniens',
  'Cranial pia': 'Pie-mère crânienne',
  'Cranium': 'Crâne',
  'Deep fibular nerve': 'Nerf fibulaire profond',
  'Deep gluteal muscles': 'Muscles fessiers profonds',
  'Deltoid muscle': 'Muscle deltoïde',
  'Diencephalon': 'Diencéphale',
  'Digestive canal': 'Tube digestif',
  'Digestive system': 'Appareil digestif',
  'Dorsal scapular nerve': 'Nerf dorsal scapulaire',
  'Dorsal striatum': 'Striatum dorsal',
  'Endocrine glands': 'Glandes endocrines',
  'Erector spinae': 'Muscles érecteurs du rachis',
  'Extracranial bones of head': 'Os extracrâniens de la tête',
  'Eye*': 'Œil',
  'Facial muscles': 'Muscles de la face',
  'Facial nerve (VII)': 'Nerf facial (VII)',
  'False ribs': 'Côtes fausses',
  'Fascia': 'Fascia',
  'Fascia of upper limb': 'Fascia du membre supérieur',
  'Femoral nerve': 'Nerf fémoral',
  'Floating ribs': 'Côtes flottantes',
  'Fornicate gyrus': 'Gyrus fornicatus',
  'Fornix': 'Fornix',
  'Fourth ventricle': 'Quatrième ventricule',
  'Frontal lobe': 'Lobe frontal',
  "Genital systems'": 'Appareils génitaux',
  'Globus pallidus': 'Globus pallidus',
  'Grey matter of medulla oblongata': 'Substance grise de la moelle allongée',
  'Grey matter of pontine tegmentum': 'Substance grise du tegmentum pontique',
  'Grey matter of tegmentum of midbrain': 'Substance grise du tegmentum mésencéphalique',
  'Habenula': 'Habenula',
  'Head': 'Tête',
  'Heart': 'Cœur',
  'Hippocampus': 'Hippocampe',
  'Hypaxial muscles of back': 'Muscles hypaxiaux du dos',
  'Hypoglossal nerve (XII)': 'Nerf hypoglosse (XII)',
  'Hypothalamus': 'Hypothalamus',
  'Inferior colliculus': 'Colliculus inférieur',
  'Inferior frontal gyrus': 'Gyrus frontal inférieur',
  'Inferior parietal lobe': 'Lobe pariétal inférieur',
  'Inferior teeth': 'Dents inférieures',
  'Insula': 'Insula',
  'Interlobular sulci': 'Sillons interlobulaires',
  'Internal capsule': 'Capsule interne',
  'Lacrimal apparatus': 'Appareil lacrymal',
  'Lacrimal canliculus': 'Canalicule lacrymal',
  'Lacrimal gland': 'Glande lacrymale',
  'Lacrimal sac': 'Sac lacrymal',
  'Laryngeal muscles': 'Muscles du larynx',
  'Lateral compartment of leg': 'Loge latérale de la jambe',
  'Lateral pectoral nerve': 'Nerf pectoral latéral',
  'Lateral plantar nerve': 'Nerf plantaire latéral',
  'Lateral ventricle': 'Ventricule latéral',
  'Left cerebral hemisphere': 'Hémisphère cérébral gauche',
  'Left lower limb': 'Membre inférieur gauche',
  'Left upper limb': 'Membre supérieur gauche',
  'Limbic lobe': 'Lobe limbique',
  'Liver': 'Foie',
  'Long thoracic nerve': 'Nerf thoracique long',
  'Lumbar vertebrae': 'Vertèbres lombaires',
  'Lungs': 'Poumons',
  'Lymphoid system': 'Système lymphoïde',
  'Mandible': 'Mandibule',
  'Medial compartment of thigh': 'Loge médiale de la cuisse',
  'Medial plantar nerve': 'Nerf plantaire médial',
  'Median nerve': 'Nerf médian',
  'Medulla oblongata': 'Moelle allongée',
  'Meninges': 'Méninges',
  'Midbrain': 'Mésencéphale',
  'Mouth': 'Bouche',
  'Muscles': 'Muscles',
  'Muscles of abdomen': 'Muscles de l’abdomen',
  'Muscles of foot': 'Muscles du pied',
  'Muscles of hand': 'Muscles de la main',
  'Muscles of head': 'Muscles de la tête',
  'Muscles of lower limb': 'Muscles du membre inférieur',
  'Muscles of neck': 'Muscles du cou',
  'Muscles of upper limb': 'Muscles du membre supérieur',
  'Musculocutaneous nerve': 'Nerf musculocutané',
  'Nasolacrimal duct': 'Conduit nasolacrymal',
  'Neck': 'Cou',
  'Neo-cortex': 'Néocortex',
  'Nerves': 'Nerfs',
  'Obturator nerve': 'Nerf obturateur',
  'Occipital lobe': 'Lobe occipital',
  'Occipitotemporal gyri': 'Gyrus occipito-temporaux',
  'Oculomotor complex': 'Complexe oculomoteur',
  'Oculomotor nerve (III)': 'Nerf oculomoteur (III)',
  'Optic tract': 'Tractus optique',
  'Parietal lobe': 'Lobe pariétal',
  'Pectoralis major muscle': 'Muscle grand pectoral',
  'Pelvis': 'Bassin',
  'Peripheral nervous system': 'Système nerveux périphérique',
  'Peritoneal structures': 'Structures péritonéales',
  'Pharyngeal muscles': 'Muscles du pharynx',
  'Pons': 'Pont',
  'Posterior compartment of arm': 'Loge postérieure du bras',
  'Posterior compartment of forearm': 'Loge postérieure de l’avant-bras',
  'Posterior compartment of leg': 'Loge postérieure de la jambe',
  'Posterior compartment of thigh': 'Loge postérieure de la cuisse',
  'Posterior teeth': 'Dents postérieures',
  'Pulmonary arteries': 'Artères pulmonaires',
  'Radial nerve': 'Nerf radial',
  'Respiratory system': 'Appareil respiratoire',
  'Ribs': 'Côtes',
  'Right cerebal hemisphere': 'Hémisphère cérébral droit',
  'Right foot': 'Pied droit',
  'Right hand': 'Main droite',
  'Right lower limb': 'Membre inférieur droit',
  'Right maxilla': 'Maxillaire droit',
  'Right upper limb': 'Membre supérieur droit',
  'Rotator cuff muscles': 'Muscles de la coiffe des rotateurs',
  'Rotatores': 'Muscles rotateurs',
  'Sciatic nerve': 'Nerf sciatique',
  'Sense organs': 'Organes des sens',
  'Sensory root of trigeminal nerve': 'Racine sensitive du nerf trijumeau',
  'Septum pellucidum': 'Septum pellucide',
  'Spinal dura': 'Dure-mère spinale',
  'Sternum': 'Sternum',
  'Subclavian nerve': 'Nerf sous-clavier',
  'Suboccipital muscles': 'Muscles sous-occipitaux',
  'Superficial fibular nerve': 'Nerf fibulaire superficiel',
  'Superficial gluteal muscles': 'Muscles fessiers superficiels',
  'Superficial muscles': 'Muscles superficiels',
  'Superior cerebellar peduncle': 'Pédoncule cérébelleux supérieur',
  'Superior colliculus': 'Colliculus supérieur',
  'Superior teeth': 'Dents supérieures',
  'Superior temporal gyrus': 'Gyrus temporal supérieur',
  'Suprascapular nerve': 'Nerf suprascapulaire',
  'Sympathetic trunk': 'Tronc sympathique',
  'Systemic arteries': 'Artères systémiques',
  'Systemic veins': 'Veines systémiques',
  'Teeth': 'Dents',
  'Telencephalon': 'Télencéphale',
  'Temporal lobe': 'Lobe temporal',
  'Tendon sheaths': 'Gaines tendineuses',
  'Tentorium cerebelli': 'Tente du cervelet',
  'Thalamus': 'Thalamus',
  'Third ventricle': 'Troisième ventricule',
  'Thoracic skeleton': 'Squelette thoracique',
  'Thoracic vertebrae': 'Vertèbres thoraciques',
  'Thorax': 'Thorax',
  'Tibial nerve': 'Nerf tibial',
  'Transversospinal muscles': 'Muscles transverso-spinaux',
  'Trapezius muscle': 'Muscle trapèze',
  'Trigeminal nerve (V)': 'Nerf trijumeau (V)',
  'Trunk': 'Tronc',
  'Tympanic membrane': 'Membrane tympanique',
  'Ulnar nerve': 'Nerf ulnaire',
  'Urinary system': 'Appareil urinaire',
  'Vertebral column': 'Colonne vertébrale',
  'Vestibular nuclei': 'Noyaux vestibulaires',
  'Vestibule': 'Vestibule',
  'White matter of diencephalon': 'Substance blanche du diencéphale',
  'White matter of telencephalon': 'Substance blanche du télencéphale',
};

function translate(label) {
  if (LABELS_FR[label]) return LABELS_FR[label];
  /* Filet de sécurité : au minimum, on retire les préfixes de collection. */
  return label.replace(/^\d+:\s*/, '').replace(/^BodyParts3D:/, '').trim() || label;
}

/* ---------- Correction d'affichage de l'appareil respiratoire ----------
 * Les collections Z-Anatomy étiquettent poumons, lobes, trachée et plèvre
 * « 8: Visceral systems » (sous-système « Viscéral »), et BodyParts3D a pu
 * étiqueter le poumon droit « artériel ». Ces métadonnées sont laissées
 * telles quelles dans le manifeste : on corrige UNIQUEMENT le chemin de
 * l'arbre, donc le classement affiché et le fil d'Ariane. */
const RESPIRATORY_LABEL = LABELS_FR["Respiratory system"]; // « Appareil respiratoire »

/* Marqueurs excluant une structure respiratoire : vaisseaux, valves et
 * ganglions (p. ex. « paratracheal nodes », « pulmonary artery »). */
const NON_RESPIRATORY_HINT = /(arter|venous|vein|valve|semilunar|lymph|nodes?|trunk)/i;

/* Dictionnaire de correction : motif d'ID → appareil affiché.
 * Les organes des voies aériennes et du parenchyme pulmonaire sont toujours
 * respiratoires, quel que soit le sous-système brut du manifeste (y compris
 * un éventuel « artériel » erroné sur le poumon droit). */
const CATEGORY_CORRECTIONS = [
  {
    match: /(lung|bronch|trachea|alveol|pleura)/i,
    label: RESPIRATORY_LABEL,
    unless: NON_RESPIRATORY_HINT,
  },
  {
    /* « pulmon » / « diaphragm » sont ambigus : artères, veines, valves et
     * ganglions pulmonaires ou diaphragmatiques ne sont pas respiratoires.
     * Les structures musculaires (category 'muscle') sont exclues plus bas :
     * le diaphragme reste dans la musculature. */
    match: /(pulmon|diaphragm)/i,
    label: RESPIRATORY_LABEL,
    unless: NON_RESPIRATORY_HINT,
  },
];

/* Sous-groupes conservés sous l'Appareil respiratoire (déjà traduits). */
const RESPIRATORY_SUBGROUPS = [LABELS_FR["Lungs"], LABELS_FR["Bronchi"]].filter(Boolean);

/* Renvoie le chemin corrigé (sans la racine de catégorie), ou null si la
 * structure ne nécessite aucune correction. */
function normalizeCategory(structure) {
  if (structure.category !== "organ") return null;
  const id = structure.id || "";
  const rule = CATEGORY_CORRECTIONS.find(
    (r) => r.match.test(id) && !(r.unless && r.unless.test(id)),
  );
  if (!rule) return null;

  const corrected = [rule.label];
  const translated = (structure.path || [])
    .filter((p) => p && !IGNORE.test(p))
    .map(translate);
  const subgroup = translated.find((p) => RESPIRATORY_SUBGROUPS.includes(p));
  if (subgroup) corrected.push(subgroup);
  return corrected;
}

function cleanPath(structure) {
  const categoryRoot = {
    bone: "Système squelettique",
    muscle: "Système musculaire",
    organ: "Organes et systèmes",
  }[structure.category] || "Corps humain";
  const corrected = normalizeCategory(structure);
  if (corrected) return [categoryRoot, ...corrected];
  const raw = structure.path || [];
  const parts = raw.filter((p) => p && !IGNORE.test(p)).map(translate);
  return [categoryRoot, ...parts];
}

export class AnatomyTree {
  constructor(structures) {
    this.root = { id: "root", label: "Corps humain", count: 0, children: [], ids: [], depth: 0, parent: null };
    const map = new Map([["root", this.root]]);

    for (const structure of structures) {
      const path = cleanPath(structure);
      let parent = this.root;
      let key = "root";
      /* La racine porte aussi toutes les structures : remonter jusqu'à elle
       * doit réafficher le corps entier, et non un atlas vide. */
      this.root.ids.push(structure.id);
      this.root.count++;
      for (let i = 0; i < path.length; i++) {
        const label = path[i];
        key = `${key}/${label}`;
        let node = map.get(key);
        if (!node) {
          node = {
            id: key,
            label,
            count: 0,
            children: [],
            ids: [],
            depth: i + 1,
            path: path.slice(0, i + 1),
            parent,
          };
          map.set(key, node);
          parent.children.push(node);
        }
        node.ids.push(structure.id);
        node.count++;
        parent = node;
      }
    }
    this.sort(this.root);
    this.flatten = [];
    this._collect(this.root, 0);
  }

  sort(node) {
    node.children.sort((a, b) => a.label.localeCompare(b.label, "fr"));
    node.ids.sort();
    for (const child of node.children) this.sort(child);
  }

  _collect(node, depth) {
    this.flatten.push(node);
    for (const child of node.children) this._collect(child, depth + 1);
  }

  get(id) {
    return this.flatten.find((n) => n.id === id) || null;
  }

  /* Boîte englobante d'un nœud (moyenne des centres, rayon max). */
  bounds(node, byId) {
    if (!node || !node.ids.length) return null;
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (const id of node.ids) {
      const s = byId.get(id);
      if (!s) continue;
      for (let i = 0; i < 3; i++) {
        min[i] = Math.min(min[i], s.bounds.min[i]);
        max[i] = Math.max(max[i], s.bounds.max[i]);
      }
    }
    if (!Number.isFinite(min[0])) return null;
    const center = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2, (min[2] + max[2]) / 2];
    const radius = Math.max(
      (max[0] - min[0]) / 2,
      (max[1] - min[1]) / 2,
      (max[2] - min[2]) / 2,
      0.02,
    );
    return { min, max, center, radius };
  }

  /* Chaîne de nœuds de la racine jusqu'à `node` (racine incluse). */
  breadcrumbNodes(node) {
    const chain = [];
    let cur = node || null;
    while (cur) {
      chain.unshift(cur);
      cur = cur.parent || null;
    }
    return chain.length ? chain : [this.root];
  }

  /* Libellés du fil d'Ariane (déjà traduits, car issus des nœuds). */
  breadcrumb(node) {
    return this.breadcrumbNodes(node).map((n) => n.label);
  }
}
