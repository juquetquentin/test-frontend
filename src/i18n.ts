import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      TO_DO: "To do",
      IN_PROGRESS: "In progress",
      DONE: "Done",
    },
  },
  fr: {
    translation: {
      TO_DO: "À faire",
      IN_PROGRESS: "En cours",
      DONE: "Fait",
    },
  },
  es: {
    translation: {
      TO_DO: "Por hacer",
      IN_PROGRESS: "En curso",
      DONE: "Terminado",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
