// import the original type declarations
import "i18next";
import { resources, defaultNS } from "../i18n/i18nFrontEnd";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
