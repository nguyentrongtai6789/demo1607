import { Col, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { SelectDonViCustom } from "../../customAntd/SelectDonViCustom";
import { InputCustom } from "../../customAntd/InputCustom";
import { DatePickerWithTypeCustom } from "../../customAntd/DatePickerWithTypeCustom";
import { SelectCustom } from "../../customAntd/SelectCustom";
import { DatePickerWithRangeCustom } from "../../customAntd/DatePickerWithRangeCustom";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { ISearchValues } from "./interface";
import httpMethod from "../../config/httpMethod";
import { timKiem } from "./api";
import { useAppDispatch } from "../../redux/store";
import { handleLoading, loadingCancel } from "../../redux/authSlice";
import TableResults from "./components/TableResults";

export default () => {
  const initialValues: ISearchValues = {
    donViId: 11728,
    gioiTinhId: null,
    hoVaTen: "",
    hoVaTenCha: "",
    hoVaTenMe: "",
    ngayNhapTu: null,
    ngayNhapDen: null,
    phamViTimKiem: "DV",
    soCmnd: "",
    ngaySinh: "",
    hoTenVoChong: "",
  };
  const { t } = useTranslation(["dictionnary"]);

  const dispatch = useAppDispatch();

  const handleSearch = async (values: ISearchValues) => {
    dispatch(handleLoading());
    await httpMethod
      .post(timKiem, values)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingCancel());
      });
  };

  return (
    <div>
      <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
      <div className="search-form">
        <div className="search-from-title">{t("SEARCH CONDITIONS")}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ISearchValues) => {
            handleSearch(values);
          }}
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
                      label={t("unit")}
                      name={"donViId"}
                      isRequired
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      name={"soCmnd"}
                      label={t("identity card number")}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      name={"hoVaTen"}
                      label={t("dictionnary:fullname")}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={DatePickerWithTypeCustom}
                      name={"ngaySinh"}
                      label={t("date of birth")}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={SelectCustom}
                      api={"danh-muc-gioi-tinh"}
                      label={t("gender")}
                      name={"gioiTinhId"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <Field
                      component={SelectCustom}
                      api={"danh-muc-pham-vi-tim-kiem"}
                      label={t("search range")}
                      name={"phamViTimKiem"}
                      isRequired
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("father's full name")}
                      name={"hoTenCha"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("mother's full name")}
                      name={"hoTenMe"}
                    />
                  </Col>
                  <Col span={4}>
                    <Field
                      component={InputCustom}
                      label={t("full name of husband or wife")}
                      name={"hoTenVoChong"}
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={DatePickerWithRangeCustom}
                      label={t("date of entry")}
                      fieldName1={"ngayNhapTu"}
                      fieldName2={"ngayNhapDen"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Space
                    size={100}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <ButtonCustom htmlType="submit">{t("listed")}</ButtonCustom>
                    <ButtonCustom htmlType="reset">
                      {t("Delete condition")}
                    </ButtonCustom>
                  </Space>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="table-results">
        <div className="table-results-title">{t("Search Results")}</div>
        <TableResults />
      </div>
    </div>
  );
};
