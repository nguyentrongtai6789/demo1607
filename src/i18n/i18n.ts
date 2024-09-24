import i18n from "i18next";
import HttpApi from "i18next-http-backend";
import _ from "lodash";
import { initReactI18next } from "react-i18next";
import httpMethod, { URL } from "../config/httpMethod";
import { JSONCommonFE } from "./commonJson/_index";
import { JSONPageFE } from "./pageJson/_index";

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
  const allJSONCommonFE = JSONCommonFE(language);
  const allJSONPageFE = JSONPageFE(language);
  //đoạn này là merge file JSON tự defined ở FE với JSON lấy ở BE
  //nếu trùng nhau thì sẽ lấy ở BE
  return {
    ..._.merge(
      {
        ...allJSONCommonFE,
        ...allJSONPageFE,
      },
      translationData // file JSON theo từng namespace mà BE trả ra, namespace thường sẽ là tên từng màn hoặc từng common
    ),
  };
};

const loadResources = async (url: string) => {
  const [lng] = url.split("/");
  return (
    httpMethod
      // .get(`http://localhost:8080/api/demo-translation/${url}`) //sau này đúng sẽ là api này
      .get(`${URL}/phan-he-he-thong`) // đây là demo vì chưa có api thật
      .then((res) => {
        // return combineTranslation(lng, res.data); //sau này đúng sẽ là cái này
        return combineTranslation(lng, {}); //đây là demo vì chưa có api thật
      })
      .catch(() => {
        return combineTranslation(lng, {});
      })
  );
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
    defaultNS: "translation", // nếu ko truyền name space nào vào thì mặc định sẽ truyền namespace này về BE
    backend: backendOptions,
  });

export default i18n;
