import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";
import { useEffect } from "react";

export default () => {
  const { Content } = Layout;

  const { t } = useTranslation(["dictionnary"]);

  return (
    <div>
      <Layout>
        <Header />
        <Layout>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <Content>
              <Outlet />
              <Outlet />
              <Footer />
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};
