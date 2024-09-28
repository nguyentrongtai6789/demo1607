import moment from "moment";
import httpMethod from "../services/httpMethod";
import DownloadFile from "../services/dowloadFile";

export function isArrayAllUndefined(arr: any) {
  if (!arr) return false;
  const newArr = arr as string[];
  return newArr.every((item) => item === undefined);
}

export const getDateTimeNow = () => {
  const dateNow = moment().format("DD-MM-YYYY");
  return dateNow;
};

export const handleExport = async (
  values: any,
  loaiXuatFile: string,
  tenFile: string,
  url: string
) => {
  // lấy về blob:
  const res = await httpMethod.post(`${url}`, values, {
    responseType: "blob",
  });

  //gen blob ra file
  let typeFile;
  switch (loaiXuatFile) {
    case "1":
      typeFile = "pdf";
      break;
    case "2":
      typeFile = "xlsx";
      break;
    case "3":
      typeFile = "docx";
      break;
  }

  if (res?.status === 200) {
    DownloadFile.getDownloadBinaryFile(
      res.data,
      `${tenFile}_${getDateTimeNow()}.${typeFile}`
    );
  }
};
