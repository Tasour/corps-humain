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


def localize_name(name, lang):
    text = re.sub(r'\.\d+$', '', str(name or ''))
    if lang == 'fr':
        text = re.sub(r'\bpulmonary trunk\b', 'tronc pulmonaire', text, flags=re.I)
        text = re.sub(r'\bof body\b', 'du corps', text, flags=re.I)
        text = re.sub(r'\bof the\b', 'du', text, flags=re.I)
        text = re.sub(r'\bof\b', 'de', text, flags=re.I)
    def side(match):
        value = match.group(1).lower()
        if lang == 'fr':
            return ' droit' if value == 'r' else ' gauche'
        return ' right' if value == 'r' else ' left'
    text = re.sub(r'\.(r|l)\b', side, text, flags=re.I)
    for term, forms in sorted(TERMS.items(), key=lambda item: -len(item[0])):
        def replace(match, value=forms[lang]):
            result = value
            if match.group(0)[:1].isupper():
                result = result[:1].upper() + result[1:]
            return result
        text = re.sub(r'\b' + re.escape(term) + r'\b', replace, text, flags=re.I)
    return ' '.join(text.replace('_', ' ').split())


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
    entry['name_fr'] = localize_name(entry.get('name'), 'fr')
    entry['name_en'] = localize_name(entry.get('name'), 'en')
    entry['origin_fr'] = localize_origin(entry.get('origin'), 'fr')
    entry['origin_en'] = localize_origin(entry.get('origin'), 'en')
    entry['description_fr'] = localized_description(entry, 'fr')
    entry['description_en'] = localized_description(entry, 'en')
    return entry
