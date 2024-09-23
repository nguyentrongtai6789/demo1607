import moment from "moment";
import * as Yup from "yup";

export const validateSearchForm = Yup.object().shape({
  donViId: Yup.string().required("Bắt buộc nhập").nullable(),
  phamViTimKiem: Yup.string().required("Bắt buộc nhập").nullable(),
  loaiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
  // ngayDuyetCongDanTu: Yup.string()
  //   // .nullable()
  //   .required("Bắt buộc nhập khoảng thời gian phê duyệt Công dân"),
  // .test("ngayDuyetCongDanTu", "xxx", function (value) {
  //   if (!value) {
  //     return this.createError({
  //       path: "ngayDuyetCongDanTu",
  //       message: "Bắt buộc nhập khoảng thời gian phê duyệt Công dân ssss",
  //     });
  //   }
  //   return true;
  // }),
  // ngayDuyetCongDanDen: Yup.string()
  //   .nullable()
  //   // .required("Bắt buộc nhập")
  //   .test("ngayDuyetCongDanDen", "xxx", function (value) {
  //     const ngayDuyetCongDanTu = this.parent.ngayDuyetCongDanTu;
  //     if (value && ngayDuyetCongDanTu) {
  //       const startDateMoment = moment(ngayDuyetCongDanTu, "DD-MM-YYYY");
  //       const endDateMoment = moment(value, "DD-MM-YYYY");
  //       const startDateValidMoment = moment(
  //         endDateMoment.subtract(3, "months").format("DD-MM-YYYY"),
  //         "DD-MM-YYYY"
  //       );
  //       if (startDateMoment.isBefore(startDateValidMoment)) {
  //         return this.createError({
  //           path: "ngayDuyetCongDanDen",
  //           message: "Chỉ được phép tìm kiếm trong vòng 3 tháng",
  //         });
  //       }
  //       if (
  //         moment(value, "DD-MM-YYYY").isBefore(
  //           moment(ngayDuyetCongDanTu, "DD-MM-YYYY")
  //         )
  //       ) {
  //         return this.createError({
  //           path: "ngayDuyetCongDanDen",
  //           message: "Đến ngày phải sau từ ngày",
  //         });
  //       }
  //     }
  //     return true;
  //   }),
});
