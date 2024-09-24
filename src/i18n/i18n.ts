import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import _ from "lodash";
import { initReactI18next } from "react-i18next";
import httpMethod from "../config/httpMethod";
import login from "./commonJson/login.json";
import button from "./commonJson/button.json";
import tooltip from "./commonJson/tooltip.json";
import pagination from "./commonJson/pagination.json";
import datePicker from "./commonJson/datePicker.json";
import searchForm from "./pageJson/searchForm.json";
import { JSONFE } from "./commonJson/_index";

export enum ELanguages {
  English = "English",
  Vietnamese = "Tiếng Việt",
  Laos = "ພາສາລາວ",
}

export const languages = {
  en: ELanguages.English,
  vi: ELanguages.Vietnamese,
  la: ELanguages.Laos,
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
  {
    value: "la",
    label: ELanguages.Laos,
  },
];

export const combineTranslation = (language: string, translationData: any) => {
  const allJSONFE = JSONFE(language);
  //đoạn này là merge file JSON tự defined ở FE với JSON lấy ở BE
  //nếu trùng nhau thì sẽ lấy ở BE
  return {
    ..._.merge(
      {
        ...allJSONFE,
      },
      translationData // file JSON theo từng namespace mà BE trả ra, namespace thường sẽ là tên từng màn hoặc từng common
    ),
  };
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
    fallbackLng: localStorage.getItem("language") || "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    defaultNS: "translation",
    backend: backendOptions,
  });

export default i18n;
