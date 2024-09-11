import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { RootState } from "../../redux/store";
import Header from "./header";
import Sidebar from "./sidebar";
import { useTranslation } from "react-i18next";
const { Sider } = Layout;

export default () => {
  const { Content } = Layout;

  const { userToken } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (!userToken) {
      location.state = location.pathname;
      navigate(`${process.env.PUBLIC_URL}/login`, { state: location.pathname });
    }
  }, [userToken]);

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
