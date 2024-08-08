import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HEADER from "../pages/layout/header/index.json";
import SIDEBAR_MENU from "../pages/layout/sidebar/index.json";
import DICTIONARY from "./i18n.json";

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

export const resources = {
  en: {
    header: HEADER.en,
    sidebarMenu: SIDEBAR_MENU.en,
    dictionnary: DICTIONARY.en,
  },
  vi: {
    header: HEADER.vi,
    sidebarMenu: SIDEBAR_MENU.vi,
    dictionnary: DICTIONARY.vi,
  },
};

export const defaultNS = "login";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources,
    ns: ["header", "sidebarMenu", "dictionnary"],
    defaultNS: defaultNS,
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  });
