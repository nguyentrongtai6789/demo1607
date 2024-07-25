import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Input,
  Layout,
  Menu,
  MenuProps,
  Row,
  Select,
  SelectProps,
  TimePicker,
  TimePickerProps,
} from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
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

  const options: SelectProps["options"] = [];

  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  type PickerType = "time" | "date";

  const [type, setType] = useState<PickerType>("date");

  const { Option } = Select;

  const PickerWithType = ({
    type,
    onChange,
  }: {
    type: PickerType;
    onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
  }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date")
      return <DatePicker onChange={onChange} format={"DD/MM/YYYY"} />;
    if (type === "month")
      return <DatePicker onChange={onChange} format={"MM/YYYY"} />;

    return <DatePicker picker={type} onChange={onChange} />;
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
                  <Row>
                    <Col span={6}>
                      <div>Đơn vị</div>
                      <Select
                        mode="multiple"
                        placeholder="Chọn đơn vị"
                        // defaultValue={["a10", "c12"]}
                        onChange={handleChange}
                        style={{ width: "100%" }}
                        options={options}
                        size="small"
                        allowClear={true}
                      />
                    </Col>
                    <Col span={4}>
                      <div>Số CMND</div>
                      <Input placeholder="" size="small" title="abcd" />
                    </Col>
                    <Col span={4}>
                      <div>Họ và tên</div>
                      <Input size="small" />
                    </Col>
                    <Col span={4}>
                      <div>Ngày sinh</div>
                      <div style={{ width: "100%", display: "flex" }}>
                        <div style={{ width: "40%" }}>
                          <Select value={type} onChange={setType} size="small">
                            <Option value="date">Date</Option>
                            <Option value="week">Week</Option>
                            <Option value="month">Month</Option>
                            <Option value="quarter">Quarter</Option>
                            <Option value="year">Year</Option>
                          </Select>
                        </div>
                        <div style={{ width: "60%", marginLeft: "3px" }}>
                          <PickerWithType
                            type={type}
                            onChange={(value) => console.log(value)}
                          />
                        </div>
                      </div>
                    </Col>
                    <Col span={4}>
                      <div>Ngày nhận hồ sơ</div>
                      <div>
                        <RangePicker
                          disabledDate={disabled7DaysDate}
                          picker="date"
                          format="DD/MM/YYYY"
                        />
                      </div>
                    </Col>
                    <Col span={2}>
                      <div>Giới tính</div>
                      <div>
                        <Select
                          size="small"
                          allowClear={true}
                          options={[
                            { value: 1, label: "Nam" },
                            { value: 2, label: "Nữ" },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
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
