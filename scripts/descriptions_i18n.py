#!/usr/bin/env python3
"""Localisation déterministe des noms et descriptions anatomiques."""
import re

TERMS = {
    'artery': {'fr': 'artère', 'en': 'artery'},
    'arteries': {'fr': 'artères', 'en': 'arteries'},
    'vein': {'fr': 'veine', 'en': 'vein'},
    'veins': {'fr': 'veines', 'en': 'veins'},
    'muscle': {'fr': 'muscle', 'en': 'muscle'},
    'muscles': {'fr': 'muscles', 'en': 'muscles'},
    'bone': {'fr': 'os', 'en': 'bone'},
    'bones': {'fr': 'os', 'en': 'bones'},
    'nerve': {'fr': 'nerf', 'en': 'nerve'},
    'nerves': {'fr': 'nerfs', 'en': 'nerves'},
    'organ': {'fr': 'organe', 'en': 'organ'},
    'organs': {'fr': 'organes', 'en': 'organs'},
    'skin': {'fr': 'peau', 'en': 'skin'},
    'eyebrow': {'fr': 'sourcil', 'en': 'eyebrow'},
    'eyebrows': {'fr': 'sourcils', 'en': 'eyebrows'},
    'anatomique': {'fr': 'anatomique', 'en': 'anatomical'},
    'heart': {'fr': 'cœur', 'en': 'heart'},
    'lung': {'fr': 'poumon', 'en': 'lung'},
    'lungs': {'fr': 'poumons', 'en': 'lungs'},
    'liver': {'fr': 'foie', 'en': 'liver'},
    'kidney': {'fr': 'rein', 'en': 'kidney'},
    'kidneys': {'fr': 'reins', 'en': 'kidneys'},
    'brain': {'fr': 'cerveau', 'en': 'brain'},
    'stomach': {'fr': 'estomac', 'en': 'stomach'},
    'intestine': {'fr': 'intestin', 'en': 'intestine'},
    'colon': {'fr': 'côlon', 'en': 'colon'},
    'bladder': {'fr': 'vessie', 'en': 'bladder'},
    'uterus': {'fr': 'utérus', 'en': 'uterus'},
    'ovary': {'fr': 'ovaire', 'en': 'ovary'},
    'ovaries': {'fr': 'ovaires', 'en': 'ovaries'},
    'left': {'fr': 'gauche', 'en': 'left'},
    'right': {'fr': 'droit', 'en': 'right'},
    'superior': {'fr': 'supérieur', 'en': 'superior'},
    'inferior': {'fr': 'inférieur', 'en': 'inferior'},
    'anterior': {'fr': 'antérieur', 'en': 'anterior'},
    'posterior': {'fr': 'postérieur', 'en': 'posterior'},
    'medial': {'fr': 'médial', 'en': 'medial'},
    'lateral': {'fr': 'latéral', 'en': 'lateral'},
    'branch': {'fr': 'branche', 'en': 'branch'},
    'trunk': {'fr': 'tronc', 'en': 'trunk'},
    'head': {'fr': 'tête', 'en': 'head'},
    'neck': {'fr': 'cou', 'en': 'neck'},
    'spine': {'fr': 'colonne vertébrale', 'en': 'spine'},
    'rib': {'fr': 'côte', 'en': 'rib'},
    'pelvis': {'fr': 'bassin', 'en': 'pelvis'},
    'femur': {'fr': 'fémur', 'en': 'femur'},
    'tibia': {'fr': 'tibia', 'en': 'tibia'},
    'radius': {'fr': 'radius', 'en': 'radius'},
    'ulna': {'fr': 'ulna', 'en': 'ulna'},
    'humerus': {'fr': 'humérus', 'en': 'humerus'},
    'pleura': {'fr': 'plèvre', 'en': 'pleura'},
    'peritoneum': {'fr': 'péritoine', 'en': 'peritoneum'},
    'fascia': {'fr': 'fascia', 'en': 'fascia'},
    'cartilage': {'fr': 'cartilage', 'en': 'cartilage'},
    'ligament': {'fr': 'ligament', 'en': 'ligament'},
    'tendon': {'fr': 'tendon', 'en': 'tendon'},
    'joint': {'fr': 'articulation', 'en': 'joint'},
    'vertebra': {'fr': 'vertèbre', 'en': 'vertebra'},
    'lobe': {'fr': 'lobe', 'en': 'lobe'},
    'segment': {'fr': 'segment', 'en': 'segment'},
    'surface': {'fr': 'surface', 'en': 'surface'},
    'region': {'fr': 'région', 'en': 'region'},
    'pulmonary': {'fr': 'pulmonaire', 'en': 'pulmonary'},
    'body': {'fr': 'corps', 'en': 'body'},
    'common': {'fr': 'commun', 'en': 'common'},
    'proper': {'fr': 'propre', 'en': 'proper'},
    'deep': {'fr': 'profond', 'en': 'deep'},
    'superficial': {'fr': 'superficiel', 'en': 'superficial'},
    'small': {'fr': 'petit', 'en': 'small'},
    'great': {'fr': 'grand', 'en': 'great'},
    'major': {'fr': 'majeur', 'en': 'major'},
    'minor': {'fr': 'mineur', 'en': 'minor'},
    'arterial': {'fr': 'artériel', 'en': 'arterial'},
    'venous': {'fr': 'veineux', 'en': 'venous'},
    'muscular': {'fr': 'musculaire', 'en': 'muscular'},
    'skeletal': {'fr': 'squelettique', 'en': 'skeletal'},
    'nervous': {'fr': 'nerveux', 'en': 'nervous'},
    'respiratory': {'fr': 'respiratoire', 'en': 'respiratory'},
    'digestive': {'fr': 'digestif', 'en': 'digestive'},
    'urinary': {'fr': 'urinaire', 'en': 'urinary'},
    'reproductive': {'fr': 'reproducteur', 'en': 'reproductive'},
    'pregnancy': {'fr': 'grossesse', 'en': 'pregnancy'},
    'integumentary': {'fr': 'tégumentaire', 'en': 'integumentary'},
    'lymphatic': {'fr': 'lymphatique', 'en': 'lymphatic'},
    'endocrine': {'fr': 'endocrinien', 'en': 'endocrine'},
    'connective': {'fr': 'conjonctif', 'en': 'connective'},
}

SYSTEM_LABELS = {
    'skeletal': {'fr': 'squelette', 'en': 'skeleton'},
    'muscular': {'fr': 'muscles', 'en': 'muscles'},
    'arterial': {'fr': 'artères', 'en': 'arteries'},
    'venous': {'fr': 'veines', 'en': 'veins'},
    'nervous': {'fr': 'nerfs', 'en': 'nerves'},
    'cardiac': {'fr': 'cœur', 'en': 'heart'},
    'respiratory': {'fr': 'respiration', 'en': 'respiration'},
    'digestive': {'fr': 'digestion', 'en': 'digestion'},
    'urinary': {'fr': 'appareil urinaire', 'en': 'urinary system'},
    'reproductive': {'fr': 'appareil reproducteur', 'en': 'reproductive system'},
    'pregnancy': {'fr': 'grossesse', 'en': 'pregnancy reference'},
    'sensory': {'fr': 'sensoriel', 'en': 'sensory'},
    'endocrine': {'fr': 'endocrinien', 'en': 'endocrine'},
    'lymphatic': {'fr': 'lymphatique', 'en': 'lymphatic'},
    'integumentary': {'fr': 'téguments', 'en': 'integument'},
    'connective': {'fr': 'tissu conjonctif', 'en': 'connective tissue'},
    'anatomique': {'fr': 'anatomique', 'en': 'anatomical'},
    'organs': {'fr': 'organes', 'en': 'organs'},
    'skin': {'fr': 'peau', 'en': 'skin'},
}

FR_SYSTEM_TO_KEY = {
    'squelette': 'skeletal', 'musculaire': 'muscular', 'artériel': 'arterial',
    'veineux': 'venous', 'nerveux': 'nervous', 'cardiaque': 'cardiac',
    'respiratoire': 'respiratory', 'digestif': 'digestive', 'urinaire': 'urinary',
    'reproducteur': 'reproductive', 'grossesse': 'pregnancy', 'sensoriel': 'sensory',
    'endocrinien': 'endocrine', 'lymphatique': 'lymphatic', 'tégumentaire': 'integumentary',
    'conjonctif': 'connective', 'organes': 'organs',
}

SOURCE_MAP = {
    'Visible Human Female (HRA)': {'fr': 'Femme visible (HRA)', 'en': 'Visible Human Female (HRA)'},
    'BodyParts3D 4.0 — miroir recalé sur la femelle': {
        'fr': 'BodyParts3D 4.0 — miroir recalé sur la femme',
        'en': 'BodyParts3D 4.0 — mirrored and fitted to the female body'},
    'BodyParts3D 4.0 — recalé sur la femelle': {
        'fr': 'BodyParts3D 4.0 — recalé sur la femme',
        'en': 'BodyParts3D 4.0 — fitted to the female body'},
    'Allen Human Reference Atlas': {'fr': 'Atlas de référence humain Allen', 'en': 'Allen Human Reference Atlas'},
    'Human Reference Atlas': {'fr': 'Atlas de référence humain', 'en': 'Human Reference Atlas'},
    'Z-Anatomy / BodyParts3D (référence masculine)': {
        'fr': 'Z-Anatomy / BodyParts3D (référence masculine)',
        'en': 'Z-Anatomy / BodyParts3D (male reference)'},
    'référence masculine adaptée': {'fr': 'référence masculine adaptée', 'en': 'adapted male reference'},
}


FR_PHRASES = {
    'auricle (pinna)': 'oreille externe (pavillon)',
    'frontal lobe': 'lobe frontal', 'middle cerebral artery': 'artère cérébrale moyenne',
    'cerebellum': 'cervelet', 'maxillary artery': 'artère maxillaire',
    'bronchi (main, lobar and segmental)': 'bronches (principales, lobaires et segmentaires)',
    'phalanges of foot': 'phalanges du pied', 'phalanges of hand': 'phalanges de la main',
    'intrinsic muscles of the sole of the foot': 'muscles intrinsèques de la plante du pied',
    'temporal lobe': 'lobe temporal', 'lobar and segmental pulmonary arteries': 'artères pulmonaires lobaires et segmentaires',
    'internal iliac artery': 'artère iliaque interne', 'ophthalmic artery': 'artère ophtalmique',
    'brachial plexus': 'plexus brachial', 'occipital lobe': 'lobe occipital',
    'renal papilla': 'papille rénale', 'renal pyramid': 'pyramide rénale',
    'costal cartilages': 'cartilages costaux', 'pulmonary veins': 'veines pulmonaires',
    'minor calyx': 'calice mineur', 'major calyx': 'calice majeur',
    'extraocular muscles': 'muscles extraoculaires',
    'erector spinae muscle': 'muscle érecteur du rachis',
    'ulnar nerve': 'nerf ulnaire', 'tibial nerve': 'nerf tibial',
    'common fibular nerve': 'nerf fibulaire commun',
    'sole of foot (plantar region)': 'plante du pied (région plantaire)',
    'plantar arteries and plantar arch': 'artères plantaires et arche plantaire',
    'trigeminal nerve (cn v)': 'nerf trijumeau (V)',
    'radial nerve': 'nerf radial', 'parietal lobe': 'lobe pariétal',
    'intrinsic laryngeal muscles': 'muscles intrinsèques du larynx',
    'popliteal artery': 'artère poplitée', 'median nerve': 'nerf médian',
    'true ribs (ribs 1-7)': 'vraies côtes (1 à 7)',
    'carpal bones (lunate, triquetrum, pisiform, trapezium, trapezoid, capitate, hamate)':
        'os du carpe (lunaire, triquètre, pisiforme, trapèze, trapézoïde, capitatum, hamatum)',
    'axillary vein': 'veine axillaire',
    'right posterior inferior cerebellar artery': 'artère cérébelleuse postéro-inférieure droite',
    'left posterior inferior cerebellar artery': 'artère cérébelleuse postéro-inférieure gauche',
    'thyrocervical trunk': 'tronc thyrocervical', 'axillary artery': 'artère axillaire',
    'ulnar artery': 'artère ulnaire', 'dorsalis pedis artery': 'artère dorsale du pied',
    'transversospinales muscles (semispinalis, multifidus, rotatores)':
        'muscles transverso-épineux (épineux, multifide, rotateurs)',
    'thoracic vertebrae t1-t12': 'vertèbres thoraciques T1 à T12',
    'regions of the abdomen (nine-region scheme)': 'régions de l’abdomen (neuf régions)',
    'facial vein': 'veine faciale', 'renal artery': 'artère rénale',
    'facial artery': 'artère faciale', 'anterior cerebral artery': 'artère cérébrale antérieure',
    'radial artery': 'artère radiale', 'superficial and deep palmar arches': 'arches palmaires superficielle et profonde',
    'deep femoral artery': 'artère fémorale profonde',
    'pharyngeal muscles (constrictors, stylopharyngeus, palatopharyngeus)':
        'muscles pharyngiens (constricteurs, stylopharyngien, palatopharyngien)',
    'suprahyoid muscles (digastric, mylohyoid, geniohyoid, stylohyoid)':
        'muscles supra-hyoïdiens (digastrique, mylo-hyoïdien, génio-hyoïdien, stylo-hyoïdien)',
    'deep lateral rotators of the hip (obturator internus, gemelli, quadratus femoris, obturator externus)':
        'rotateurs latéraux profonds de la hanche (obturateur interne, jumeaux, carré fémoral, obturateur externe)',
    'femoral nerve': 'nerf fémoral', 'cingulate gyrus': 'gyrus cingulaire',
    'navicular, cuboid and cuneiform bones': 'os scaphoïde, cuboïde et cunéiformes',
    'metatarsal bones': 'os métatarsiens', 'metacarpal bones': 'os métacarpiens',
    'pulmonary trunk': 'tronc pulmonaire', 'transverse colon': 'côlon transverse',
    'skin of body': 'peau du corps', 'skin of head': 'peau de la tête',
    'hair of head': 'cheveux', 'hairs of head': 'cheveux',
    'vagina': 'vagin', 'body of uterus': 'corps de l’utérus',
    'fundus of uterus': 'fundus de l’utérus', 'left ovary': 'ovaire gauche',
    'right ovary': 'ovaire droit', 'prostate': 'prostate',
    'glans penis': 'gland du pénis', 'left testis': 'testicule gauche',
    'right testis': 'testicule droit', 'corpus cavernosum of penis': 'corps caverneux du pénis',
    'corpus spongiosum of penis': 'corps spongieux du pénis',
    'ascending colon': 'côlon ascendant', 'descending colon': 'côlon descendant',
    'sigmoid colon': 'côlon sigmoïde', 'hepatic flexure of colon': 'angle colique droit',
    'splenic flexure of colon': 'angle colique gauche',
    'brain': 'encéphale', 'heart': 'cœur', 'liver': 'foie',
    'left lung': 'poumon gauche', 'right lung': 'poumon droit',
    'stomach': 'estomac', 'kidney': 'rein', 'kidneys': 'reins',
    'urinary bladder': 'vessie', 'small intestine': 'intestin grêle',
    'large intestine': 'gros intestin', 'spinal cord': 'moelle épinière',
    'scalp (regions of epicranium)': 'cuir chevelu (régions de l’épicrâne)',
    'levator ani muscle': 'muscle élévateur de l’anus',
    'occipitofrontalis muscle': 'muscle occipito-frontal',
    'trapezius muscle': 'muscle trapèze', 'pectoralis major muscle': 'muscle grand pectoral',
    'pectoralis minor muscle': 'muscle petit pectoral', 'deltoid muscle': 'muscle deltoïde',
    'triceps brachii muscle': 'muscle triceps brachial', 'biceps brachii muscle': 'muscle biceps brachial',
    'pronator teres muscle': 'muscle pronateur rond',
    'flexor carpi ulnaris muscle': 'muscle fléchisseur ulnaire du carpe',
    'flexor carpi radialis muscle': 'muscle fléchisseur radial du carpe',
    'flexor digitorum superficialis muscle': 'muscle fléchisseur superficiel des doigts',
    'flexor digitorum profundus muscle': 'muscle fléchisseur profond des doigts',
    'extensor carpi ulnaris muscle': 'muscle extenseur ulnaire du carpe',
    'extensor carpi radialis longus muscle': 'muscle long extenseur radial du carpe',
    'extensor digitorum muscle': 'muscle extenseur des doigts',
    'extensor digitorum longus muscle': 'muscle long extenseur des doigts',
    'adductor pollicis muscle': 'muscle adducteur du pouce',
    'adductor magnus muscle': 'muscle grand adducteur',
    'iliopsoas muscle': 'muscle iliopsoas', 'biceps femoris muscle': 'muscle biceps fémoral',
    'gastrocnemius muscle': 'muscle gastrocnémien',
    'orbicularis oculi muscle': 'muscle orbiculaire de l’œil',
    'masseter muscle': 'muscle masséter', 'lateral pterygoid muscle': 'muscle ptérygoïdien latéral',
    'medial pterygoid muscle': 'muscle ptérygoïdien médial',
    'trabecular bone tissue': 'tissu osseux trabéculaire',
    'compact bone tissue': 'tissu osseux compact',
    'insula (insular lobe)': 'insula (lobe insulaire)',
    'palm of hand (palmar region)': 'paume de la main (région palmaire)',
    'gluteal region': 'région glutéale',
    'temporoparietalis muscle': 'muscle temporo-pariétal',
    'orbicularis oris muscle': 'muscle orbiculaire de la bouche',
    'risorius muscle': 'muscle risorius', 'buccinator muscle': 'muscle buccinateur',
    'temporalis muscle': 'muscle temporal',
    'sternocleidomastoid muscle': 'muscle sternocléidomastoïdien',
    'levator scapulae muscle': 'muscle élévateur de la scapula',
    'latissimus dorsi muscle': 'muscle grand dorsal',
    'serratus anterior muscle': 'muscle dentelé antérieur',
    'subclavius muscle': 'muscle sous-clavier',
    'transversus thoracis muscle': 'muscle transverse du thorax',
    'rectus abdominis muscle': 'muscle droit de l’abdomen',
    'external oblique muscle': 'muscle oblique externe',
    'internal oblique muscle': 'muscle oblique interne',
    'transversus abdominis muscle': 'muscle transverse de l’abdomen',
    'pyramidalis muscle': 'muscle pyramidal',
    'quadratus lumborum muscle': 'muscle carré des lombes',
    'coccygeus muscle': 'muscle coccygien',
    'subscapularis muscle': 'muscle sous-scapulaire',
    'supraspinatus muscle': 'muscle sus-épineux',
    'infraspinatus muscle': 'muscle sous-épineux',
    'teres minor muscle': 'muscle petit rond', 'teres major muscle': 'muscle grand rond',
    'brachialis muscle': 'muscle brachial', 'coracobrachialis muscle': 'muscle coracobrachial',
    'palmaris longus muscle': 'muscle long palmaire',
    'pronator quadratus muscle': 'muscle carré pronateur',
    'brachioradialis muscle': 'muscle brachioradial',
    'areolar tubercle': 'tubercule aréolaire', 'left nipple': 'mamelon gauche',
    'right nipple': 'mamelon droit', 'left female areola': 'aréole gauche',
    'right female areola': 'aréole droite', 'mammary lobe': 'lobe mammaire',
    'lactiferous sinus': 'sinus lactifère', 'main lactiferous duct': 'canal lactifère principal',
}

FR_EXTRA = {
    'infrahyoid muscles (omohyoid, sternohyoid, sternothyroid, thyrohyoid)':
        'muscles infra-hyoïdiens (omo-hyoïdien, sterno-hyoïdien, sterno-thyroïdien, thyro-hyoïdien)',
    'prevertebral muscles (longus colli, longus capitis, rectus capitis anterior and lateralis)':
        'muscles prévertébraux (long du cou, long de la tête, droit antérieur et latéral de la tête)',
    'suboccipital muscles': 'muscles sous-occipitaux',
    'thenar muscles (abductor pollicis brevis, flexor pollicis brevis, opponens pollicis)':
        'muscles thénariens (court abducteur, court fléchisseur et opposant du pouce)',
    'incisor teeth': 'dents incisives', 'premolar teeth': 'dents prémolaires',
    'molar teeth': 'dents molaires', 'canine teeth': 'dents canines',
    'scalene muscles (anterior, middle and posterior)': 'muscles scalènes (antérieur, moyen et postérieur)',
    'intercostal muscles': 'muscles intercostaux',
    'hypothenar muscles (abductor, flexor and opponens digiti minimi)':
        'muscles hypothénariens (abducteur, fléchisseur et opposant du petit doigt)',
    'midbrain (mesencephalon)': 'mésencéphale',
    'auditory ossicles (malleus, incus, stapes)': 'ossicules auditifs (marteau, enclume, étrier)',
    'vertebrochondral ribs (ribs 8-10; upper false ribs)':
        'côtes vertébrochondrales (8 à 10 ; fausses côtes supérieures)',
    'external anal sphincter': 'sphincter anal externe',
    'levatores costarum muscles': 'muscles élévateurs des côtes',
    'cavernous sinus': 'sinus caverneux', 'eyeball (bulbus oculi)': 'bulbe oculaire',
    'iris': 'iris', 'cornea': 'cornée', 'floating ribs (ribs 11-12)': 'côtes flottantes (11 et 12)',
    'eyebrow (supercilium)': 'sourcil', 'intermediate orbital gyrus': 'gyrus orbitaire intermédiaire',
    'pancreas': 'pancréas', 'pharynx': 'pharynx', 'cricoid cartilage': 'cartilage cricoïde',
    'abdominal aorta': 'aorte abdominale', 'platysma': 'platysma', 'diaphragm': 'diaphragme',
    'flexor pollicis longus muscle': 'muscle long fléchisseur du pouce',
    'extensor carpi radialis brevis muscle': 'muscle court extenseur radial du carpe',
    'anconeus muscle': 'muscle anconé', 'extensor digiti minimi muscle': 'muscle extenseur du petit doigt',
    'supinator muscle': 'muscle supinateur', 'extensor indicis muscle': 'muscle extenseur de l’index',
    'gluteus medius muscle': 'muscle moyen fessier', 'gluteus maximus muscle': 'muscle grand fessier',
    'gluteus minimus muscle': 'muscle petit fessier',
    'tensor fasciae latae muscle': 'muscle tenseur du fascia lata',
    'piriformis muscle': 'muscle piriforme',
}
FR_EXTRA.update({
    'ciliary processes': 'procès ciliaires', 'eye trabecular meshwork': 'trabéculum de l’œil',
    'dura mater': 'dure-mère', 'corpus callosum': 'corps calleux',
    'optic tract': 'tractus optique', 'precentral gyrus': 'gyrus précentral',
    'gyrus rectus': 'gyrus droit', 'frontal operculum': 'opercule frontal',
    'postcentral gyrus': 'gyrus postcentral', 'precuneus cortex': 'cortex du précunéus',
    'planum temporale': 'planum temporale', 'temporal pole': 'pôle temporal',
    'planum polare': 'planum polaire', 'occipital pole': 'pôle occipital',
    'cuneus cortex': 'cortex du cunéus', 'lingual gyrus': 'gyrus lingual',
    'occipital fusiform gyrus': 'gyrus fusiforme occipital',
    'subcallosal area': 'aire sous-calleuse', 'substantia nigra': 'substance noire',
    'pontine nuclear group': 'groupe nucléaire pontique',
    'pontine tegmentum': 'tegmentum pontique', 'fourth ventricle': 'quatrième ventricule',
    'optic radiation': 'radiation optique', 'red nucleus': 'noyau rouge',
    'hypothalamus': 'hypothalamus', 'cardinal ligament': 'ligament cardinal',
    'interpeduncular fossa': 'fosse interpédonculaire', 'lamina terminalis': 'lame terminale',
    'optic chiasm': 'chiasma optique', 'optic chiasma': 'chiasma optique',
    'hepatovenous segment viii': 'segment hépatoveineux VIII',
    'olfactory bulb': 'bulbe olfactif', 'piriform cortex': 'cortex piriforme',
    'tête de caudate (left)': 'tête du noyau caudé (gauche)',
    'corps de caudate (left)': 'corps du noyau caudé (gauche)',
    'tail de caudate (left)': 'queue du noyau caudé (gauche)',
    'nucleus accumbens (left)': 'noyau accumbens (gauche)',
    'externe segment de globus pallidus (left)': 'segment externe du globus pallidus (gauche)',
    'interne segment de globus pallidus (left)': 'segment interne du globus pallidus (gauche)',
    'claustrum (left)': 'claustrum (gauche)', 'basal forebrain (left)': 'prosencéphale basal (gauche)',
    'septal nuclei (left)': 'noyaux septaux (gauche)',
    'amygdaloid complex (left)': 'complexe amygdalien (gauche)',
    'antérieur amygdaloid area (left)': 'aire amygdalienne antérieure (gauche)',
    'central nuclear group (left)': 'groupe nucléaire central (gauche)',
    'latéral nucleus (left)': 'noyau latéral (gauche)',
    'basolateral nucleus basal nucleus (left)': 'noyau basolatéral, noyau basal (gauche)',
    'basomedial nucleus accessory basal nucleus (left)': 'noyau basomédial, noyau basal accessoire (gauche)',
})
FR_EXTRA.update({
    'frontalis muscle': 'muscle frontal', 'nasalis muscle': 'muscle nasal',
    'orbital part of orbicularis oculi': 'partie orbitaire du muscle orbiculaire de l’œil',
    'palpebral part of orbicularis oculi': 'partie palpébrale du muscle orbiculaire de l’œil',
    'orbicularis oris muscle': 'muscle orbiculaire de la bouche',
    'zygomaticus major muscle': 'muscle grand zygomatique',
    'zygomaticus minor muscle': 'muscle petit zygomatique',
    'corrugator supercilii': 'muscle corrugateur du sourcil',
    'depressor anguli oris': 'muscle abaisseur de l’angle de la bouche',
    'depressor labii inferioris': 'muscle abaisseur de la lèvre inférieure',
    'procerus muscle': 'muscle procerus', 'risorius muscle': 'muscle risorius',
    'levator labii superioris': 'muscle élévateur de la lèvre supérieure',
    'mentalis muscle': 'muscle mentonnier',
    'superficial part of masseter': 'partie superficielle du muscle masséter',
    'deep part of masseter': 'partie profonde du muscle masséter',
    'temporalis muscle': 'muscle temporal',
    'latissimus dorsi muscle': 'muscle grand dorsal',
    'rectus abdominis muscle': 'muscle droit de l’abdomen',
    'quadratus lumborum muscle': 'muscle carré des lombes',
    'rectus femoris muscle': 'muscle droit fémoral',
    'vastus lateralis muscle': 'muscle vaste latéral',
    'vastus medialis muscle': 'muscle vaste médial',
    'vastus intermedius muscle': 'muscle vaste intermédiaire',
    'sartorius muscle': 'muscle couturier', 'adductor longus muscle': 'muscle long adducteur',
    'pectineus muscle': 'muscle pectiné', 'adductor brevis muscle': 'muscle court adducteur',
    'gracilis muscle': 'muscle gracile', 'semimembranosus muscle': 'muscle semi-membraneux',
    'semitendinosus muscle': 'muscle semi-tendineux',
    'fibularis tertius muscle': 'muscle fibulaire tiers',
    'fibularis longus muscle': 'muscle long fibulaire',
    'fibularis brevis muscle': 'muscle court fibulaire',
    'extensor hallucis longus muscle': 'muscle long extenseur de l’hallux',
    'calcaneal tendon': 'tendon calcanéen', 'soleus muscle': 'muscle soléaire',
    'plantaris muscle': 'muscle plantaire', 'popliteus muscle': 'muscle poplité',
    'flexor digitorum longus muscle': 'muscle long fléchisseur des orteils',
    'flexor hallucis longus muscle': 'muscle long fléchisseur de l’hallux',
    'iliotibial tract': 'tractus iliotibial', 'ureter': 'uretère',
    'hypophysis (pituitary gland)': 'hypophyse (glande pituitaire)',
    'nerve to subclavius (subclavian nerve)': 'nerf du subclavier (nerf sous-clavier)',
    'uterovesical pouch': 'cul-de-sac vésico-utérin', 'lower uterine segment': 'segment inférieur de l’utérus',
    'uterine cervix': 'col de l’utérus', 'vermiform appendix': 'appendice vermiforme',
    'ileocecal valve': 'valve iléocæcale', 'duodenal ampulla': 'ampoule duodénale',
    'hepatopancreatic ampulla': 'ampoule hépato-pancréatique',
    'porta hepatis': 'hile du foie', 'falciform ligament': 'ligament falciforme',
    'ligamentum venosum': 'ligament veineux', 'hepatoduodenal ligament': 'ligament hépato-duodénal',
    'gallbladder': 'vésicule biliaire', 'umbilical cord': 'cordon ombilical',
    'placenta vessels': 'vaisseaux placentaires', 'chorionic plate': 'plaque chorionique',
    'basal plate': 'plaque basale', 'cervicovaginal junction': 'jonction cervico-vaginale',
    'caecum': 'cæcum', 'jejunum': 'jéjunum', 'ileum': 'iléum',
    'jejunum (and ileum)': 'jéjunum (et iléum)',
})
FR_PHRASES.update(FR_EXTRA)

FR_WORDS = {
    'of': 'de', 'the': 'le', 'and': 'et', 'with': 'avec', 'by': 'par',
    'from': 'de', 'to': 'à', 'in': 'dans', 'on': 'sur', 'or': 'ou',
    'left': 'gauche', 'right': 'droit', 'superior': 'supérieur',
    'inferior': 'inférieur', 'anterior': 'antérieur', 'posterior': 'postérieur',
    'medial': 'médial', 'lateral': 'latéral', 'deep': 'profond',
    'superficial': 'superficiel', 'common': 'commun', 'proper': 'propre',
    'small': 'petit', 'great': 'grand', 'major': 'majeur', 'minor': 'mineur',
    'muscle': 'muscle', 'muscles': 'muscles', 'artery': 'artère', 'arteries': 'artères',
    'vein': 'veine', 'veins': 'veines', 'nerve': 'nerf', 'nerves': 'nerfs',
    'bone': 'os', 'bones': 'os', 'organ': 'organe', 'organs': 'organes',
    'ligament': 'ligament', 'ligaments': 'ligaments', 'cartilage': 'cartilage',
    'tendon': 'tendon', 'fascia': 'fascia', 'gland': 'glande', 'glands': 'glandes',
    'duct': 'canal', 'branch': 'branche', 'branches': 'branches',
    'part': 'partie', 'parts': 'parties', 'surface': 'surface',
    'head': 'tête', 'neck': 'cou', 'body': 'corps', 'trunk': 'tronc',
    'heart': 'cœur', 'lung': 'poumon', 'lungs': 'poumons', 'liver': 'foie',
    'kidney': 'rein', 'kidneys': 'reins', 'brain': 'encéphale',
    'stomach': 'estomac', 'intestine': 'intestin', 'colon': 'côlon',
    'bladder': 'vessie', 'uterus': 'utérus', 'ovary': 'ovaire', 'ovaries': 'ovaires',
    'pulmonary': 'pulmonaire', 'renal': 'rénal', 'renal': 'rénal',
    'cardiac': 'cardiaque', 'cerebral': 'cérébral', 'cerebellar': 'cérébelleux',
    'femoral': 'fémoral', 'brachial': 'brachial', 'radial': 'radial',
    'ulnar': 'ulnaire', 'tibial': 'tibial', 'facial': 'facial',
    'maxillary': 'maxillaire', 'ophthalmic': 'ophtalmique',
    'popliteal': 'poplité', 'axillary': 'axillaire', 'iliac': 'iliaque',
    'coronary': 'coronaires', 'aortic': 'aortique', 'portal': 'portale',
    'spinal': 'rachidien', 'cranial': 'crânien', 'intercostal': 'intercostal',
    'lumbar': 'lombaire', 'thoracic': 'thoracique', 'sacral': 'sacral',
    'cervical': 'cervical', 'abdominal': 'abdominal', 'pelvic': 'pelvien',
    'plantar': 'plantaire', 'palmar': 'palmaire', 'dorsal': 'dorsal',
    'temporal': 'temporal', 'frontal': 'frontal', 'parietal': 'pariétal',
    'occipital': 'occipital', 'stellar': 'stellaire', 'central': 'central',
    'teeth': 'dents', 'tooth': 'dent', 'incisor': 'incisive', 'premolar': 'prémolaire',
    'molar': 'molaire', 'canine': 'canine', 'midbrain': 'mésencéphale',
    'auditory': 'auditive', 'ossicles': 'ossicules', 'malleus': 'marteau',
    'incus': 'enclume', 'stapes': 'étrier', 'suboccipital': 'sous-occipital',
    'infrahyoid': 'infra-hyoïdien', 'thenar': 'thénarien', 'hypothenar': 'hypothénarien',
    'sphincter': 'sphincter', 'anal': 'anal', 'external': 'externe', 'internal': 'interne',
    'cavernous': 'caverneux', 'sinus': 'sinus', 'eyeball': 'bulbe oculaire',
    'iris': 'iris', 'cornea': 'cornée', 'floating': 'flottant', 'eyebrow': 'sourcil',
    'supercilium': 'sourcil', 'intermediate': 'intermédiaire', 'orbital': 'orbitaire',
    'gyrus': 'gyrus', 'pancreas': 'pancréas', 'pharynx': 'pharynx',
    'cricoid': 'cricoïde', 'aorta': 'aorte', 'platysma': 'platysma',
    'diaphragm': 'diaphragme', 'ribs': 'côtes', 'rib': 'côte',
    'costal': 'costal', 'false': 'fausse', 'upper': 'supérieur',
    'levator': 'élévateur', 'levatores': 'élévateurs', 'scalene': 'scalène',
    'middle': 'moyen', 'omohyoid': 'omo-hyoïdien', 'sternohyoid': 'sterno-hyoïdien',
    'sternothyroid': 'sterno-thyroïdien', 'thyrohyoid': 'thyro-hyoïdien',
    'true': 'vraie', 'nine': 'neuf', 'scheme': 'schéma',
}

FR_ADJECTIVES = {
    'gauche', 'droit', 'droite', 'supérieur', 'inférieur', 'antérieur', 'postérieur',
    'médial', 'latéral', 'profond', 'superficiel', 'commun', 'propre', 'petit',
    'grand', 'majeur', 'mineur', 'pulmonaire', 'rénal', 'cardiaque', 'cérébral',
    'cérébelleux', 'fémoral', 'brachial', 'radial', 'ulnaire', 'tibial', 'facial',
    'maxillaire', 'ophtalmique', 'poplité', 'axillaire', 'iliaque', 'aortique',
    'rachidien', 'crânien', 'intercostal', 'lombaire', 'thoracique', 'sacral',
    'cervical', 'abdominal', 'pelvien', 'plantaire', 'palmaire', 'dorsal',
    'temporal', 'frontal', 'pariétal', 'occipital', 'central',
}


def localize_name(name, lang):
    text = re.sub(r'\.\d+$', '', str(name or ''))
    text = ' '.join(text.replace('_', ' ').split())
    if lang != 'fr':
        return text
    def side(match):
        value = match.group(1).lower()
        return ' droit' if value == 'r' else ' gauche'
    text = re.sub(r'\.(r|l)\b', side, text, flags=re.I)
    text = re.sub(r'\((?:left|right)\)', lambda m: '(gauche)' if 'left' in m.group(0).lower() else '(droit)', text, flags=re.I)
    key = text.lower().strip()
    if key in FR_PHRASES:
        return FR_PHRASES[key]
    # Les noms entre parenthèses sont localisés séparément.
    def paren(match):
        inner = match.group(1)
        if inner.strip() == text.strip() or len(inner) > 120:
            return match.group(0)
        return '(' + localize_name(inner, 'fr') + ')'
    text = re.sub(r'\(([^()]+)\)', paren, text)
    tokens = re.findall(r'[A-Za-zÀ-ÿ]+|\d+|\([^)]*\)', text)
    words = []
    for tok in tokens:
        low = tok.lower()
        if low in FR_PHRASES:
            words.append(FR_PHRASES[low])
        elif low in FR_WORDS:
            value = FR_WORDS[low]
            words.append(value[0].upper() + value[1:] if tok[:1].isupper() else value)
        else:
            words.append(tok)
    # Adjectifs après le nom : « pulmonary artery » → « artère pulmonaire ».
    out = []
    for word in words:
        if word.lower() in FR_ADJECTIVES and out and out[-1].lower() not in ('de', 'd'):
            nouns = [w for w in out if w not in ('de', 'et', 'du', 'des')]
            if nouns:
                idx = len(out) - 1
                while idx >= 0 and out[idx].lower() in ('de', 'du', 'des'):
                    idx -= 1
                if idx >= 0:
                    out.insert(idx + 1, word)
                    continue
        out.append(word)
    result = ' '.join(out)
    result = re.sub(r'\bde (a|e|i|o|u|y|é|è|\')\b', r'd\1', result, flags=re.I)
    return result


def localize_origin(origin, lang):
    text = str(origin or '')
    for source, forms in SOURCE_MAP.items():
        text = text.replace(source, forms[lang])
    return text


def system_label(system, lang):
    if not system:
        return ''
    return SYSTEM_LABELS.get(system, {}).get(lang, str(system))


def localized_description(entry, lang):
    name = entry.get(f'name_{lang}') or localize_name(entry.get('name'), lang)
    description = str(entry.get('description') or '')
    system = entry.get('system')
    found = re.search(r'système\s+([a-zà-ÿ]+)', description, flags=re.I)
    if found and (not system or system == 'organs'):
        system = FR_SYSTEM_TO_KEY.get(found.group(1).lower()) or system
    system_text = system_label(system, lang)
    origin = localize_origin(entry.get('origin'), lang)
    source = entry.get('source') or ''
    french_markers = r'\b(système|du|identifiée|référencée|présente|issues?)\b'
    if lang == 'en' and description and not re.search(french_markers, description, flags=re.I):
        return description
    if lang == 'fr' and description and not re.match(r'^[A-Za-z]', description):
        return description
    if system_text:
        if lang == 'fr':
            return f'{name} — Structure du système {system_text} identifiée dans {origin}.'
        return f'{name} — Structure of the {system_text} identified in {origin}.'
    if lang == 'fr':
        return f'{name} — Structure anatomique référencée dans {source}.'
    return f'{name} — Anatomical structure referenced in {source}.'


def add_localization(entry):
    entry['name_latin'] = re.sub(r'\.\d+$', '', str(entry.get('name') or ''))
    entry['name_fr'] = localize_name(entry.get('name'), 'fr')
    entry['name_en'] = localize_name(entry.get('name'), 'en')
    entry['origin_fr'] = localize_origin(entry.get('origin'), 'fr')
    entry['origin_en'] = localize_origin(entry.get('origin'), 'en')
    entry['description_fr'] = localized_description(entry, 'fr')
    entry['description_en'] = localized_description(entry, 'en')
    return entry
