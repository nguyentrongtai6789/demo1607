import { Layout } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./sidebar";

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
    <div>
      {userToken && (
        <>
          <Header />
          <div style={{ display: "flex" }}>
            <Sidebar />
            <div style={{ width: "100%" }}>
              <Content>
                <div
                  style={{
                    minHeight: "calc(100vh - 64px - 64px)",
                    padding: "0px  5px",
                  }}
                >
                  <Outlet />
                </div>
                <Footer />
              </Content>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
