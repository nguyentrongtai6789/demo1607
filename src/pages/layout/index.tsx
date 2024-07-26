import { Col, DatePicker, DatePickerProps, Layout, Row, Space } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import React from "react";
import { DatePickerWithTypeCustom } from "../../customAntd/DatePickerWithTypeCustom";
import { InputCustom } from "../../customAntd/InputCustom";
import { SelectCustom } from "../../customAntd/SelectCustom";
import { SelectDonViCustom } from "../../customAntd/SelectDonViCustom";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";
import { DatePickerWithRangeCustom } from "../../customAntd/DatePickerWithRangeCustom";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { useTranslation } from "react-i18next";

export default () => {
  const { Content } = Layout;

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#0958d9",
    // minHeight: "calc(100vh - 64 - 64)",
    minHeight: "calc(100vh - 64px - 64px)",
  };

  const layoutStyle: React.CSSProperties = {
    overflow: "hidden",
    width: "100%",
    height: "100%",
  };

  const { t } = useTranslation(["dictionnary"]);

  return (
    <div>
      <Layout style={layoutStyle}>
        <Header />
        <Layout>
          <div
            className="layout-custom"
            style={{ display: "flex", width: "100%" }}
          >
            <Sidebar />
            <div className="content-custom" style={{ width: "100%" }}>
              <Content style={contentStyle}>
                <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
                <div className="search-form">
                  <div className="search-from-title">
                    {t("SEARCH CONDITIONS")}
                  </div>
                  <Formik
                    initialValues={{ gioiTinh: "" }}
                    onSubmit={(values: any) => {
                      console.log(values);
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
                                name={"gioiTinh"}
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
                                fieldName1={"ngayNhapHoSoTu"}
                                fieldName2={"ngayNhapHoSoDen"}
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
                              <ButtonCustom htmlType="submit">
                                {t("listed")}
                              </ButtonCustom>
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
              </Content>
            </div>
          </div>
        </Layout>

        <Footer />
      </Layout>
    </div>
  );
};
