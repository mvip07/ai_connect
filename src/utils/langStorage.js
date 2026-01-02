import { LANG_STORAGE_KEY, DEFAULT_LANG, SUPPORTED_LANGS } from '../constants/lang';

export const getStoredLang = () => {
  const lang = localStorage.getItem(LANG_STORAGE_KEY);
  if (SUPPORTED_LANGS.includes(lang)) return lang;

  localStorage.setItem(LANG_STORAGE_KEY, DEFAULT_LANG);
  return DEFAULT_LANG;
};

export const setStoredLang = (lang) => {
  if (SUPPORTED_LANGS.includes(lang)) {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }
};
