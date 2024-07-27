import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

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
              <div
                style={{
                  padding: "10px",
                  minHeight: "calc(100vh - 64px)",
                }}
              >
                <Outlet />
              </div>
              <Footer />
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};
