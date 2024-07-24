import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import "./styles.scss";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { handleLogout } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default () => {
  const menuQuanLy: MenuProps["items"] = [
    {
      label: (
        <a href="https://www.antgroup.com">Tạo yêu cầu đối sánh sinh trắc</a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="https://www.aliyun.com">Nhận kết quả đối sánh sinh trắc</a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          Gửi kết quả đối sánh sinh trắc sang phần mềm Quản lý, xử lý hồ sơ số
          hoá
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a href="https://www.aliyun.com">Quản lý yêu cầu đối sánh sinh trắc</a>
      ),
      key: "4",
    },
  ];

  const menuXuLy: MenuProps["items"] = [
    {
      label: (
        <a href="https://www.antgroup.com">
          ĐỐI SOÁT LẠI THÔNG TIN CÔNG DÂN VỚI HỆ THỐNG căn cước công dân
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          ĐỐI SOÁT THÔNG TIN ĐỐI TƯỢNG VỚI HỆ THỐNG căn cước công dân
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          ĐỐI SOÁT THÔNG TIN CÔNG DÂN VỚI HỆ THỐNG CƠ SỞ DỮ LIỆU QUỐC GIA VỀ DÂN
          CƯ
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          GỬI HỒ SƠ CMND 9 SỐ SAU KHI PHÊ DUYỆT HỢP NHẤT SANG PHẦM MỀM KHAI THÁC
          DỮ LIỆU
        </a>
      ),
      key: "4",
    },
  ];

  //thông tin user:

  const { language, userInfo } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const menuAvatar: MenuProps["items"] = [
    {
      label: `Tên cán bộ: ${userInfo.username}`,
      key: "0",
    },
    {
      label: `Nhóm quyền:`,
      key: "1",
    },
    {
      label: `Ngôn ngữ: ${language}`,
      key: "2",
    },
    {
      label: (
        <ButtonCustom
          onClick={() => {
            dispatch(handleLogout());
            navigate("/login");
          }}
        >
          Đăng xuất
        </ButtonCustom>
      ),
      key: "3",
    },
  ];

  //   const handleDropdownVisibleChange = (dropdownId: number) => {
  //     const dropdownElements = document.querySelectorAll(
  //       `[class*="header-menu-"]`
  //     ) as NodeListOf<HTMLElement>;

  //     console.log(dropdownElements.length);

  //     dropdownElements.forEach((element) => {
  //       if (!element.classList.contains(`header-menu-${dropdownId}`)) {
  //         element.style.color = "aliceblue";
  //         element.style.textDecoration = "unset";
  //       }
  //     });

  //     const dropdownElement = document.getElementsByClassName(
  //       `header-menu-${dropdownId}`
  //     )[0] as HTMLElement;
  //     if (dropdownElement) {
  //       dropdownElement.style.color = "yellow";
  //       dropdownElement.style.textDecoration = "underline";
  //     }
  //   };

  return (
    <Header>
      <Space size={50}>
        <img
          src="http://172.20.20.73:9100/assets/images/logo.svg"
          alt=""
          style={{ height: "64px" }}
        />
        <Dropdown
          menu={{ items: menuQuanLy }}
          trigger={["click"]}
          arrow={true}
          className=""
        >
          <span className="header-menu-1">
            Quản lý yêu cầu đối sánh sinh trắc
          </span>
        </Dropdown>
        <Dropdown menu={{ items: menuXuLy }} trigger={["click"]} arrow={true}>
          <span className="header-menu-2">Xử lý hồ sơ</span>
        </Dropdown>
      </Space>
      <Dropdown
        menu={{ items: menuAvatar }}
        trigger={["click"]}
        arrow={true}
        className="avatar-dropdown"
      >
        <Avatar size="large" icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
};
