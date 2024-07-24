import { Footer } from "antd/es/layout/layout";

export default () => {
  const footerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#4096ff",
    height: 64,
  };
  return <Footer style={footerStyle}>Footer</Footer>;
};
