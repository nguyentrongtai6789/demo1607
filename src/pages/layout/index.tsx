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

  const disabled7DaysDate: DatePickerProps["disabledDate"] = (
    current,
    { from }
  ) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
  };

  const { RangePicker } = DatePicker;

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
                  <div className="search-from-title">Điều kiện tìm kiếm</div>
                  <Formik initialValues={{ gioiTinh: "" }} onSubmit={() => {}}>
                    {(propsFormik: FormikProps<any>) => {
                      const { values, setValues, setFieldValue } = propsFormik;
                      return (
                        <Form>
                          <Row>
                            <Col span={8}>
                              <Field
                                component={SelectDonViCustom}
                                api={"ds-don-vi-tw-gioi-han-tinh-huyen"}
                                label={"Đơn vị"}
                                name={"donViId"}
                                isRequired
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={InputCustom}
                                name={"soCmnd"}
                                label={"Số CMND"}
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={InputCustom}
                                name={"soCmnd"}
                                label={"Họ và tên"}
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={DatePickerWithTypeCustom}
                                name={"ngaySinh"}
                                label={"Ngày sinh"}
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={SelectCustom}
                                api={"danh-muc-gioi-tinh"}
                                label={"Giới tính"}
                                name={"gioiTinh"}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col span={4}>
                              <Field
                                component={SelectCustom}
                                api={"danh-muc-pham-vi-tim-kiem"}
                                label={"Phạm vi tìm kiếm"}
                                name={"phamViTimKiem"}
                                isRequired
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={InputCustom}
                                label={"Họ tên cha"}
                                name={"hoTenCha"}
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={InputCustom}
                                label={"Họ tên mẹ"}
                                name={"hoTenMe"}
                              />
                            </Col>
                            <Col span={4}>
                              <Field
                                component={InputCustom}
                                label={"Họ tên vợ chồng"}
                                name={"hoTenVoChong"}
                              />
                            </Col>
                            <Col span={8}>
                              <div>Ngày nhập hồ sơ</div>
                              <div style={{ width: "100%" }}>
                                <Space direction="vertical">
                                  <RangePicker
                                    picker="date"
                                    disabledDate={disabled7DaysDate}
                                    id={{
                                      start: "startInput",
                                      end: "endInput",
                                    }}
                                    onFocus={(_, info) => {
                                      console.log("Focus:", info.range);
                                    }}
                                    onBlur={(_, info) => {
                                      console.log("Blur:", info.range);
                                    }}
                                  />
                                </Space>
                              </div>
                            </Col>
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
