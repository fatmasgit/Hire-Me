
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend"; 


//the json files in public folders


i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(Backend) 
  .init({
    fallbackLng: "en", 
    detection: {
      order: ["navigator", "cookie", "localStorage", "querystring"], 
      caches: ["localStorage", "cookie"],
   
    },
    debug: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", 
    },
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
