import { Layout } from "antd";
import Header from "./header";
import Footer from "./footer";

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

  return (
    <div>
      <Layout style={layoutStyle}>
        <Header />
        <Content style={contentStyle}>Content</Content>
        <Footer />
      </Layout>
    </div>
  );
};
