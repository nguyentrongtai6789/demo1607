import { Col, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { DatePickerWithRangeCustom } from "../../../customAntd/DatePickerWithRangeCustom";
import { DatePickerWithTypeCustom } from "../../../customAntd/DatePickerWithTypeCustom";
import { InputCustom } from "../../../customAntd/InputCustom";
import { SelectCustom } from "../../../customAntd/SelectCustom";
import { SelectDonViCustom } from "../../../customAntd/SelectDonViCustom";
import {
  DeleteOutlined,
  RetweetOutlined,
  SearchOutlined,
} from "@ant-design/icons";

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
    ngayNhapTu: null,
    ngayNhapDen: null,
    phamViTimKiem: "DV",
    soCmnd: "",
    ngaySinh: "",
    hoTenVoChong: "",
  };

  const { t } = useTranslation(["dictionnary"]);

  return (
    <div className="search-form-wrapper">
      <div className="search-form">
        <div className="search-from-title">{t("SEARCH CONDITIONS")}</div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: ISearchValues) => {
            setSearchValues({ ...values });
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
                      valueNeedOfOption={"id"}
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
                      valueNeedOfOption={"giaTri"}
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
                    <ButtonCustom
                      htmlType="submit"
                      startIcon={<SearchOutlined />}
                    >
                      {t("listed")}
                    </ButtonCustom>
                    <ButtonCustom
                      htmlType="reset"
                      color="rgb(248, 51, 51)"
                      startIcon={<RetweetOutlined />}
                      className="delete-button"
                    >
                      {t("Delete condition")}
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
