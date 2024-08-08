import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";
import httpMethod from "../config/httpMethod";
import { initReactI18next } from "react-i18next";

const loadResources = async (locale: string) => {
  return httpMethod
    .get("http://localhost:8080/api/demo-translation")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const backendOptions = {
  loadPath: "{{lng}}|{{ns}}",
  request: (options: any, url: any, payload: any, callback: any) => {
    try {
      const [lng] = url.split("|");
      loadResources(lng).then((response) => {
        callback(null, {
          data: response,
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(backend)
  .init({
    backend: backendOptions,
    // ns: ["translations"],
    fallbackLng: "en",
    debug: false,
    load: "languageOnly",
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
