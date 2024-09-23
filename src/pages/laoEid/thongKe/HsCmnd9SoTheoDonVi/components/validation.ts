import * as Yup from "yup";
import { isArrayAllUndefined } from "../../../../../customhHelperFunction";

export const validateSearchForm = Yup.object().shape({
  donViId: Yup.string().required("Bắt buộc nhập").nullable(),
  phamViTimKiem: Yup.string().required("Bắt buộc nhập").nullable(),
  loaiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
  ngayDuyetDoiTuong: Yup.array()
    .nullable()
    .test("ngayDuyetDoiTuong", "xxx", function (value) {
      const ngayDuyetCongDan = this.parent.ngayDuyetCongDan;
      if (isArrayAllUndefined(ngayDuyetCongDan) && isArrayAllUndefined(value)) {
        return this.createError({
          path: "ngayDuyetDoiTuong",
          message:
            "Bắt buộc nhập khoảng thời gian Ngày duyệt Công dân hoặc Ngày duyệt đối tượng",
        });
      }
      return true;
    }),
  loaiHopNhat: Yup.string()
    .nullable()
    .test("loaiHopNhat", "xxx", function (value) {
      const loaiBaoCao = this.parent.loaiBaoCao;
      if (loaiBaoCao === "2" && !value) {
        return this.createError({
          path: "loaiHopNhat",
          message: "Bắt buộc nhập",
        });
      }
      return true;
    }),
});
