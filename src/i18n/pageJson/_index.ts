import _ from "lodash";

import searchForm from "../pageJson/searchForm.json";
import header from "../pageJson/header.json";
import quanLyHoSoCmnd9So from "../pageJson/quanLyHoSoCmnd9So.json";
//chia ra từng file JSON của từng màn và từng common (để tìm kiếm và chỉnh sửa cho dễ)
//sau đó tiến hành merge lại thành 1 file chung ở FE:

export const JSONPageFE = (language: string) => {
  switch (language) {
    case "en":
      return {
        ..._.merge({
          ...header.en,
          ...searchForm.en,
          ...quanLyHoSoCmnd9So.en,
        }),
      };
    case "vi":
      return {
        ..._.merge({
          ...header.vi,
          ...searchForm.vi,
          ...quanLyHoSoCmnd9So.vi,
        }),
      };
    case "la":
      return {
        ..._.merge({
          ...header.la,
          ...searchForm.la,
          ...quanLyHoSoCmnd9So.la,
        }),
      };
  }
};
