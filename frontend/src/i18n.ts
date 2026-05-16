import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ro from "./locales/ro.json";
import ru from "./locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    ro: {
      translation: ro,
    },
    ru: {
      translation: ru,
    },
  },
  lng: localStorage.getItem("lang") || "ro",
  fallbackLng: "ro",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
