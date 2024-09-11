import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import _ from "lodash";
import { initReactI18next } from "react-i18next";
import httpMethod from "../config/httpMethod";
import dictionary from "./dictionary.json";

export enum ELanguages {
  English = "English",
  Vietnamese = "Tiếng Việt",
}

export const languages = {
  en: ELanguages.English,
  vi: ELanguages.Vietnamese,
};

interface ILanguageOptions {
  value: keyof typeof languages;
  label: ELanguages;
}

export const LanguageOptions: ILanguageOptions[] = [
  {
    value: "en",
    label: ELanguages.English,
  },
  {
    value: "vi",
    label: ELanguages.Vietnamese,
  },
];

const combineTranslation = (language: string, translationData: any) => {
  switch (language) {
    case "en":
      return { ..._.merge({ ...dictionary.en }, translationData) };
    case "vi":
      return { ..._.merge({ ...dictionary.vi }, translationData) };
  }
};

const loadResources = async (url: string) => {
  const [lng] = url.split("/");
  return httpMethod
    .get(`http://localhost:8080/api/demo-translation/${url}`)
    .then((res) => {
      return combineTranslation(lng, res.data);
    })
    .catch(() => {
      return combineTranslation(lng, {});
    });
};

const backendOptions = {
  loadPath: "{{lng}}/{{ns}}",
  request: (options: any, url: any, payload: any, callback: any) => {
    try {
      loadResources(url).then((response: any) => {
        callback(null, {
          data: response,
          status: 200,
        });
      });
    } catch (e) {
      console.log(e, "error from language");
      callback(null, {
        status: 500,
      });
    }
  },
};

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "translation",
    backend: backendOptions,
  });

export default i18n;
