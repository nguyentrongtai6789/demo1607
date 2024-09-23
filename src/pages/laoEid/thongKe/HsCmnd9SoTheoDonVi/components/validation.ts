import moment from "moment";
import * as Yup from "yup";

export const validateSearchForm = Yup.object().shape({
  donViId: Yup.string().required("Bắt buộc nhập").nullable(),
  phamViTimKiem: Yup.string().required("Bắt buộc nhập").nullable(),
  loaiBaoCao: Yup.string().required("Bắt buộc nhập").nullable(),
  ngayDuyetCongDan: Yup.array()
    .nullable()
    .test("ngayDuyetCongDan", "xxx", function (value) {
      if (!value || !value.length) {
        return this.createError({
          path: "ngayDuyetCongDan",
          message: "Bắt buộc nhập khoảng thời gian Ngày duyệt Công dân",
        });
      }
      // Kiểm tra từng phần tử trong mảng xem có đối tượng rỗng hay không
      for (let i = 0; i < value.length; i++) {
        if (!value[i]) {
          return this.createError({
            path: `ngayDuyetCongDan`,
            message: "Bắt buộc nhập khoảng thời gian Ngày duyệt Công dân",
          });
        }
      }
      return true;
    }),
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
