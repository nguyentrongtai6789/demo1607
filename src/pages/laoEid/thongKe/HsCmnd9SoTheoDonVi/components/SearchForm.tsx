import {
  ExportOutlined,
  PrinterOutlined,
  RetweetOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import ButtonCustom from "../../../../../customAntd/ButtonCustom";
import { DatePickerWithRangeCustom } from "../../../../../customAntd/DatePickerWithRangeCustom";
import { SelectCustom } from "../../../../../customAntd/SelectCustom";
import { SelectDanhMucByMa } from "../../../../../customAntd/SelectDanhMucByMa";
import { SelectDonViCustom } from "../../../../../customAntd/SelectDonViCustom";
import { validateSearchForm } from "./validation";

export interface ISearchValues {
  donViId: number | null;
  loaiBaoCao: string;
  loaiXuatFile: string;
  ngayDuyetCongDan: string[];
  ngayDuyetDoiTuong: string[];
  phamViTimKiem: string;
  loaiHopNhat: string;
}

export interface ISearchForm {
  setSearchValues: Dispatch<SetStateAction<ISearchValues | null>>;
  setLoaiBaoCao: Dispatch<SetStateAction<string>>;
}

export const SearchForm: React.FC<ISearchForm> = ({
  setSearchValues,
  setLoaiBaoCao,
}) => {
  const { t } = useTranslation();

  const initialValues: ISearchValues = {
    donViId: 11728,
    loaiBaoCao: "1",
    loaiXuatFile: "",
    ngayDuyetCongDan: ["", ""],
    ngayDuyetDoiTuong: ["", ""],
    phamViTimKiem: "DT",
    loaiHopNhat: "",
  };

  return (
    <div className="search-form-wrapper">
      <div className="search-form">
        <div className="search-from-title">{t("searchCondition")}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ISearchValues) => {
            const newValues = {
              ...values,
              ngayDuyetCongDanTu: values.ngayDuyetCongDan[0],
              ngayDuyetCongDanDen: values.ngayDuyetCongDan[1],
              ngayDuyetDoiTuongTu: values.ngayDuyetDoiTuong[0],
              ngayDuyetDoiTuongDen: values.ngayDuyetDoiTuong[1],
            };
            setSearchValues({ ...newValues });
          }}
          validationSchema={validateSearchForm}
        >
          {(propsFormik: FormikProps<any>) => {
            const { values, setValues, setFieldValue } = propsFormik;
            return (
              <Form>
                <Row>
                  <Col span={4}>
                    <Field
                      component={SelectDanhMucByMa}
                      label={t("loaiBaoCao")}
                      name={"loaiBaoCao"}
                      maDanhMuc={"LOAI-BAO-CAO"}
                      isRequired
                      onChange={(value: any) => {
                        if (value) {
                          setFieldValue("loaiBaoCao", value);
                          setLoaiBaoCao(value);
                        } else {
                          setFieldValue("loaiBaoCao", "");
                          setLoaiBaoCao("");
                        }
                      }}
                    />
                  </Col>
                  <Col span={10}>
                    <Field
                      component={SelectDonViCustom}
                      api={"ds-don-vi-tw-gioi-han-tinh-huyen"}
                      name={"donViId"}
                      label={t("donVi")}
                      isRequired
                      allowClear
                    />
                  </Col>
                  <Col span={10}>
                    <Field
                      isRequired
                      component={DatePickerWithRangeCustom}
                      label={t("ngayPheDuyetCd")}
                      name={"ngayDuyetCongDan"}
                      rangeTime={"1000"} // khoảng thời gian được phép chọn tính theo ngày
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    {values.loaiBaoCao === "2" && (
                      <Field
                        component={SelectDanhMucByMa}
                        label={t("loaiHopNhat")}
                        name={"loaiHopNhat"}
                        maDanhMuc={"LOAI-HOP-NHAT"}
                        isRequired
                      />
                    )}
                  </Col>
                  <Col span={5}>
                    <Field
                      component={SelectCustom}
                      api={"danh-muc-pham-vi-tim-kiem"}
                      label={t("phamViTimKiem")}
                      name={"phamViTimKiem"}
                      valueNeedOfOption={"giaTri"}
                      isRequired
                      allowClear
                    />
                  </Col>
                  <Col span={5}>
                    <Field
                      component={SelectDanhMucByMa}
                      label={t("loaiXuatFile")}
                      name={"loaiXuatFile"}
                      maDanhMuc={"LOAI-XUAT-FILE"}
                    />
                  </Col>
                  <Col span={10}>
                    <Field
                      isRequired
                      component={DatePickerWithRangeCustom}
                      label={t("ngayPheDuyetDt")}
                      name={"ngayDuyetDoiTuong"}
                      rangeTime={"1000"} // khoảng thời gian được phép chọn tính theo ngày
                    />
                  </Col>
                </Row>
                <Row>
                  <Space size={10} className="w-full justify-center">
                    <ButtonCustom
                      htmlType="submit"
                      startIcon={<SearchOutlined />}
                    >
                      {t("timKiem")}
                    </ButtonCustom>
                    <ButtonCustom
                      htmlType="reset"
                      color="rgb(248, 51, 51)"
                      startIcon={<RetweetOutlined />}
                      className="delete-button"
                      onClick={() => {
                        setLoaiBaoCao("1");
                      }}
                    >
                      {t("datLai")}
                    </ButtonCustom>
                    <ButtonCustom
                      htmlType="button"
                      startIcon={<PrinterOutlined />}
                    >
                      {t("inBaoCao")}
                    </ButtonCustom>
                    <ButtonCustom
                      htmlType="button"
                      startIcon={<ExportOutlined />}
                    >
                      {t("xuatFile")}
                    </ButtonCustom>
                  </Space>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
