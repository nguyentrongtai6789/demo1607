import * as Yup from "yup";
import { isArrayAllUndefined } from "../../../../../customhHelperFunction";

export const validateSearchForm = Yup.object().shape({
  donViId: Yup.string().required("Bắt buộc nhập").nullable(),
  hoVaTen: Yup.string().required("Bắt buộc nhập").nullable(),
  ngayNhapTu: Yup.string().required("Bắt buộc nhập").nullable(),
});
