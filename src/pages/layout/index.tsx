import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import Sidebar from "./sidebar";
import React from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Header from "./header";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

export default () => {
  const { Content } = Layout;

  const { userToken } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken]);

  return (
    <div className="wrapper-all">
      <Header />
      <Layout>
        <Sider collapsible className="sider-menu">
          <Sidebar />
        </Sider>
        <Layout className="layout-content">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      {/* {userToken && (
        <>
          <Header />
          <div className="wrapper-content-sidebar">
            <Sidebar />
            <Content>
              <Outlet />
            </Content>
          </div>
        </>
      )} */}
    </div>
  );
};
