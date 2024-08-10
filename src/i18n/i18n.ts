import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

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
    backend: {
      loadPath: "http://localhost:8080/api/demo-translation/{{lng}}/{{ns}}",
    },
  });

export default i18n;
