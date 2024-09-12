import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Tooltip } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import ButtonCustom from "../../customAntd/ButtonCustom";
import Header from "./header";
import Sidebar from "./sidebar";
const { Sider } = Layout;

export default () => {
  const { Content } = Layout;

  const [collapsed, setCollapsed] = useState<boolean>(true);

  const { t } = useTranslation("sidebarMenu");

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
            <Tooltip title={collapsed ? t("expandMenu") : t("collapseMenu")}>
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
