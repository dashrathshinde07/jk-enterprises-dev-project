import en from "./en.json";
import mr from "./mr.json";

const translations = { en, mr };

export const translate = (lang, key) => {
  return translations[lang]?.[key] || key;
};
