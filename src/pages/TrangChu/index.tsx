import imageBgHome from "../../assets/images/backgroundHome.png";
export default () => {
  return (
    <img
      src={imageBgHome}
      style={{
        width: "100%",
        height: "calc(100vh - 68px)",
      }}
    />
  );
};
