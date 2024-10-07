import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";
import ButtonCustom from "../../customAntd/ButtonCustom";
import Header from "./header";
import Sidebar from "./sidebar";
import { useAppDispatch } from "../../redux/store";
import { handleCheckAuth } from "../../redux/authActions";
import queryString from "query-string";

const { Sider } = Layout;

export default () => {
  const { Content } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const { t } = useTranslation("translation");

  return (
    <div className="wrapper-all">
      <Header />
      <Layout>
        <Sider
          collapsible
          className="sider-menu"
          theme="light"
          onCollapse={(value) => setCollapsed(value)}
          collapsed={collapsed}
          trigger={
            <Tooltip title={collapsed ? t("moRongMenu") : t("thuGonMenu")}>
              <ButtonCustom
                width="100%"
                height="100%"
                radius="unset"
                className="button-collapse"
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </ButtonCustom>
            </Tooltip>
          }
        >
          <Sidebar />
        </Sider>
        <Layout className="layout-content">
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
