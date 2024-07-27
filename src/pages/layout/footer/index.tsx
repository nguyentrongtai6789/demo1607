import { Footer } from "antd/es/layout/layout";
import "./styles.scss";
export default () => {
  return (
    <Footer>
      <div
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        <span>
          Bản quyền 2016 thuộc về Công ty TNHH MTV Ứng dụng Kỹ thuật và Sản
          xuất. Địa chỉ : 18A - Đường Cộng Hoà, Phường 12, Quận Tân Bình, TP.Hồ
          Chí Minh. Điện thoại : (84-8)-3811.0181, (84-8)-3811.0718
        </span>
        <br />
        <span>
          Fax: (84-8)-3811.0688 - Email : tecapro@tecapro.com.vn - Web :
          www.tecapro.com.vn
        </span>
      </div>
    </Footer>
  );
};
