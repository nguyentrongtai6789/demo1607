import { Header } from "antd/es/layout/layout";

export default () => {
  const headerStyle: React.CSSProperties = {
    // textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "none",
    background: "#b21909",
    display: "flex",
  };

  return (
    <Header style={headerStyle}>
      <img
        src="http://172.20.20.73:9100/assets/images/logo.svg"
        alt=""
        style={{ width: 199 }}
      />
    </Header>
  );
};
