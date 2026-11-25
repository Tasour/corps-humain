import { getLang } from './settings.js';

const DICT = {
  fr: {
    documentTitle: 'CORPS — Anatomie en position croix',
    documentDescription: 'Corps humain 3D interactif : peau, muscles, squelette, organes, vaisseaux et nerfs.',
    skip: 'Aller au corps 3D',
    sourceLabel: 'Anatomie 3D',
    toolbarLabel: 'Outils d’interface',
    layers: 'COUCH',
    info: 'INFO',
    settings: 'REGL',
    layersTitle: 'Couches anatomiques',
    showHide: 'Afficher / masquer',
    allLayers: 'Toutes les couches',
    skin: 'Peau',
    muscles: 'Muscles',
    skeleton: 'Squelette',
    organs: 'Organes',
    vessels: 'Vaisseaux',
    nerves: 'Nerfs',
    cosmetic: 'Cheveux et sourcils',
    pregnancy: 'Grossesse',
    presets: 'Préréglages d’affichage',
    presetSkin: 'Peau',
    presetMuscles: 'Muscles',
    presetSkeleton: 'Squelette',
    presetOrgans: 'Organes',
    presetXray: 'Rayon X',
    titleLayers: 'Couches anatomiques',
    titleInfo: 'Information',
    titleSettings: 'Réglages de l’application',
    titleSkin: 'N’afficher que la peau et les cheveux',
    titleMuscles: 'N’afficher que les muscles',
    titleSkeleton: 'N’afficher que le squelette',
    titleOrgans: 'N’afficher que les organes',
    titleXray: 'Afficher tous les calques en transparence',
    titleSex: 'Changer de sexe',
    infoTitle: 'Information',
    loading: 'Chargement…',
    warning: 'Usage pédagogique uniquement. Ne remplace ni un diagnostic ni un avis médical.',
    canvasLabel: 'Vue 3D interactive du corps humain',
    pivotBoth: 'Pivot : ensemble',
    pivotMale: 'Pivot : homme',
    pivotFemale: 'Pivot : femme',
    pivotItem: 'Pivot : structure',
    popupLabel: 'Détails de la structure',
    closeSelection: 'Fermer la sélection',
    fallbackDescription: 'Structure anatomique référencée dans la source.',
    meshesVisible: '{n} maillage(s) visible(s)',
    modelError: 'Erreur de chargement du modèle',
    hint: 'Glissez pour tourner · double-tap pour zoomer',
    champions: 'Champions ♂/♀',
    sourceNote: 'Homme : {male} ({maleLicense}) · Femme : {female} ({femaleLicense}) — {note}. Compléments : muscles faciaux, muscles du tronc, cheveux et réseau nerveux périphérique issus de la référence masculine Z-Anatomy, recalés sur la femme et étiquetés comme adaptations. Le clic sélectionne le premier maillage touché par le rayon.',
    femaleNote: '2 534 pièces, peau Visible Human Female, apports masculins recalés et documentés.',
    settingsTitle: 'Réglages',
    themeLabel: 'Thème',
    themeSystem: 'Suivre le système',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    languageLabel: 'Langue',
    languageFr: 'Français',
    languageEn: 'English',
    activeMale: 'Sexe actif : homme. Cliquer pour afficher la femme',
    activeFemale: 'Sexe actif : femme. Cliquer pour afficher l’homme',
    showFemale: 'Afficher la femme',
    showMale: 'Afficher l’homme',
    loadingModel: 'Chargement du modèle…',
  },
  en: {
    documentTitle: 'CORPS — Interactive human anatomy',
    documentDescription: 'Interactive 3D human body: skin, muscles, skeleton, organs, vessels and nerves.',
    skip: 'Go to the 3D body',
    sourceLabel: '3D anatomy',
    toolbarLabel: 'Interface tools',
    layers: 'LAYERS',
    info: 'INFO',
    settings: 'SET',
    layersTitle: 'Anatomical layers',
    showHide: 'Show / hide',
    allLayers: 'All layers',
    skin: 'Skin',
    muscles: 'Muscles',
    skeleton: 'Skeleton',
    organs: 'Organs',
    vessels: 'Vessels',
    nerves: 'Nerves',
    cosmetic: 'Hair and eyebrows',
    pregnancy: 'Pregnancy',
    presets: 'Display presets',
    presetSkin: 'Skin',
    presetMuscles: 'Muscles',
    presetSkeleton: 'Skeleton',
    presetOrgans: 'Organs',
    presetXray: 'X-ray',
    titleLayers: 'Anatomical layers',
    titleInfo: 'Information',
    titleSettings: 'Application settings',
    titleSkin: 'Show only skin and hair',
    titleMuscles: 'Show only muscles',
    titleSkeleton: 'Show only the skeleton',
    titleOrgans: 'Show only organs',
    titleXray: 'Show all layers as translucent',
    titleSex: 'Switch sex',
    infoTitle: 'Information',
    loading: 'Loading…',
    warning: 'For education only. Not a substitute for diagnosis or medical advice.',
    canvasLabel: 'Interactive 3D view of the human body',
    pivotBoth: 'Pivot: both',
    pivotMale: 'Pivot: male',
    pivotFemale: 'Pivot: female',
    pivotItem: 'Pivot: structure',
    popupLabel: 'Structure details',
    closeSelection: 'Close selection',
    fallbackDescription: 'Anatomical structure referenced in the source.',
    meshesVisible: '{n} visible mesh(es)',
    modelError: 'Model loading error',
    hint: 'Drag to rotate · double-tap to zoom',
    champions: 'Champions ♂/♀',
    sourceNote: 'Male: {male} ({maleLicense}) · Female: {female} ({femaleLicense}) — {note}. Additions: facial muscles, trunk muscles, hair and peripheral nerves from the Z-Anatomy male reference, fitted to the female body and labelled as adaptations. Click selects the first mesh hit by the ray.',
    femaleNote: '2,534 parts, Visible Human Female skin, documented and fitted male contributions.',
    settingsTitle: 'Settings',
    themeLabel: 'Theme',
    themeSystem: 'Follow system',
    themeLight: 'Light',
    themeDark: 'Dark',
    languageLabel: 'Language',
    languageFr: 'Français',
    languageEn: 'English',
    activeMale: 'Active sex: male. Click to show the female body',
    activeFemale: 'Active sex: female. Click to show the male body',
    showFemale: 'Show the female body',
    showMale: 'Show the male body',
    loadingModel: 'Loading model…',
  },
};

let currentLang = getLang();

export function t(key, params) {
  let value = DICT[currentLang]?.[key] ?? DICT.fr[key] ?? key;
  if (params) {
    for (const [name, replacement] of Object.entries(params)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
  }
  return value;
}

export function setI18nLang(lang) {
  currentLang = lang === 'en' ? 'en' : 'fr';
  applyI18n(currentLang);
  return currentLang;
}

export function getI18nLang() {
  return currentLang;
}

export function applyI18n(lang = currentLang) {
  currentLang = lang === 'en' ? 'en' : 'fr';
  const dict = DICT[currentLang];
  document.documentElement.lang = currentLang;
  document.title = dict.documentTitle;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', dict.documentDescription);
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-attrs]').forEach((el) => {
    for (const item of el.dataset.i18nAttrs.split(',')) {
      const [attr, key] = item.split(':').map((part) => part.trim());
      const value = dict[key];
      if (attr && value !== undefined) el.setAttribute(attr, value);
    }
  });
}

export const languages = ['fr', 'en'];
