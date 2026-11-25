const THEME_KEY = 'corps-theme';
const LANG_KEY = 'corps-lang';

export const getTheme = () => localStorage.getItem(THEME_KEY) || 'system';
export const setTheme = (value) => {
  const theme = ['system', 'light', 'dark'].includes(value) ? value : 'system';
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
  window.dispatchEvent(new CustomEvent('corps:theme', { detail: { theme } }));
  return theme;
};

export const applyTheme = (value = getTheme()) => {
  const root = document.documentElement;
  const theme = ['system', 'light', 'dark'].includes(value) ? value : 'system';
  const dark = theme === 'dark' || (theme === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.themePref = theme;
  root.dataset.theme = dark ? 'dark' : 'light';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', dark ? '#10151b' : '#f5f6f7');
  return dark;
};

export const getLang = () => localStorage.getItem(LANG_KEY) || 'fr';
export const setLang = (value) => {
  const lang = value === 'en' ? 'en' : 'fr';
  localStorage.setItem(LANG_KEY, lang);
  window.dispatchEvent(new CustomEvent('corps:lang', { detail: { lang } }));
  return lang;
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (getTheme() === 'system') applyTheme('system');
});
