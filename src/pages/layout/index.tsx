import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    if (!userToken) {
      navigate(`${process.env.PUBLIC_URL}/login`);
    }
  }, [userToken]);

  const [collapsed, setCollapsed] = useState<boolean>(false);

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
          trigger={
            <Tooltip title={collapsed ? t("expand menu") : t("collapse menu")}>
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
