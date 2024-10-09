import { RetweetOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import ButtonCustom from "../../../../../customAntd/ButtonCustom";
import { DatePickerWithRangeCustom } from "../../../../../customAntd/DatePickerWithRangeCustom";
import { DatePickerWithTypeCustom } from "../../../../../customAntd/DatePickerWithTypeCustom";
import { InputCustom } from "../../../../../customAntd/InputCustom";
import { SelectCustom } from "../../../../../customAntd/SelectCustom";
import { SelectDonViCustom } from "../../../../../customAntd/SelectDonViCustom";
import httpMethod from "../../../../../services/httpMethod";
import { DatepickerCustom } from "../../../../../customAntd/DatePickerCustom";
import { validateSearchForm } from "./validation";

export interface ISearchValues {
  donViId: number | null;
  gioiTinhId: number | null;
  hoVaTen: string | null;
  hoVaTenCha: string | null;
  hoVaTenMe: string | null;
  ngayNhapTu: string | null;
  ngayNhapDen: string | null;
  phamViTimKiem: string | null;
  soCmnd: string | null;
  ngaySinh: string | null;
  hoTenVoChong: string | null;
}

export interface ISearchForm {
  setSearchValues: Dispatch<SetStateAction<ISearchValues | null>>;
}

export const SearchForm: React.FC<ISearchForm> = ({ setSearchValues }) => {
  const initialValues: ISearchValues = {
    donViId: 11728,
    gioiTinhId: null,
    hoVaTen: "",
    hoVaTenCha: "",
    hoVaTenMe: "",
    ngayNhapTu: "",
    ngayNhapDen: null,
    phamViTimKiem: "DV",
    soCmnd: "",
    ngaySinh: "",
    hoTenVoChong: "",
  };

  const { t } = useTranslation("translation");

  const handleTest = async () => {
    const res = await httpMethod.get(
      "http://localhost:8088/cccdApp/api/danh-muc-gioi-tinh"
    );
    console.log(res);
  };

  return (
    <div className="search-form-wrapper">
      <div className="search-form">
        <div className="search-from-title">{t("dieuKienTimKiem")}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ISearchValues) => {
            console.log(values);
            return;
            setSearchValues({ ...values });
          }}
          validationSchema={validateSearchForm}
        >
          {(propsFormik: FormikProps<any>) => {
            const { values, setValues, setFieldValue } = propsFormik;
            return (
              <Form>
                <Row>
                  <Col span={8}>
                    <Field
                      component={SelectDonViCustom}
                      api={"ds-don-vi-tw-gioi-han-tinh-huyen"}
                      label={t("donVi")}
                      name={"donViId"}
                      isRequired
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      name={"soCmnd"}
                      label={t("soCmnd")}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      name={"hoVaTen"}
                      label={t("hoVaTen")}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={SelectCustom}
                      api={"danh-muc-gioi-tinh"}
                      label={t("gioiTinh")}
                      name={"gioiTinhId"}
                      valueNeedOfOption={"id"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={DatePickerWithTypeCustom}
                      name={"ngaySinh"}
                      label={t("ngaySinh")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <Field
                      component={SelectCustom}
                      api={"danh-muc-pham-vi-tim-kiem"}
                      label={t("phamViTimKiem")}
                      name={"phamViTimKiem"}
                      valueNeedOfOption={"giaTri"}
                      isRequired
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("hoTenCha")}
                      name={"hoTenCha"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("hoTenMe")}
                      name={"hoTenMe"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("hoTenVoChong")}
                      name={"hoTenVoChong"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={DatepickerCustom}
                      label={"Ngày nhập từ"}
                      name={"ngayNhapTu"}
                      isRequired
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={DatepickerCustom}
                      label={"Ngày nhập đến"}
                      name={"ngayNhapDen"}
                      isRequired
                    />
                  </Col>
                </Row>
                <Row>
                  <Space size={100} className="w-full justify-center">
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
                    >
                      {t("datLai")}
                    </ButtonCustom>
                    <ButtonCustom
                      htmlType="button"
                      width="200px"
                      onClick={() => {
                        handleTest();
                      }}
                    >
                      Test Access token
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
