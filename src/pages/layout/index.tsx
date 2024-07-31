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
    <div className="wrapper-all">
      {userToken && (
        <>
          <Header />
          <div className="wrapper-content-sidebar">
            <Sidebar />
            <Content>
              <Outlet />
            </Content>
          </div>
        </>
      )}
    </div>
  );
};
