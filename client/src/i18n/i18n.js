import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import mr from "./mr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    mr: { translation: mr },
  },
  lng: "mr", // Default language Marathi
  fallbackLng: "mr",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18n;
