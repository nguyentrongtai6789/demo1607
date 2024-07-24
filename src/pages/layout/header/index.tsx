import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import "./styles.scss";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../redux/store";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { handleChangeLanguage, handleLogout } from "../../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { spawn } from "child_process";
import { LanguageOptions, languages } from "../../../i18n/i18n";

export default () => {
  const { t, i18n } = useTranslation("header");

  const menuQuanLy: MenuProps["items"] = [
    {
      label: (
        <a href="https://www.antgroup.com">
          {t("Create a biometric match request")}
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="https://www.aliyun.com">{t("Get biometric match results")}</a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          {t(
            "Send biometric matching results to digital document management and processing software"
          )}
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          {t("MANAGING BIOMETRIC MATCHING REQUESTS")}
        </a>
      ),
      key: "4",
    },
  ];

  const menuXuLy: MenuProps["items"] = [
    {
      label: (
        <a href="https://www.antgroup.com">
          {t(
            "RECONTROLLING CITIZEN INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
          )}
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          {t(
            "CONTROL OF SUBJECT INFORMATION WITH THE CITIZEN IDENTIFICATION SYSTEM"
          )}
        </a>
      ),
      key: "1",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          {t(
            "CONTROL CITIZEN INFORMATION WITH THE NATIONAL POPULATION DATABASE SYSTEM"
          )}
        </a>
      ),
      key: "3",
    },
    {
      label: (
        <a href="https://www.aliyun.com">
          {t(
            "SENDING 9-NUMBER ID CARD PROFILE AFTER APPROVAL OF CONSOLIDATION TO DATA MINING SOFTWARE"
          )}
        </a>
      ),
      key: "4",
    },
  ];

  //thông tin user:

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const menuAvatar: MenuProps["items"] = [
    {
      label: (
        <span>
          {t("username")}: {userInfo.username}
        </span>
      ),
      key: "0",
      type: "group",
    },
    {
      label: `${t("author")}:`,
      key: "1",
      type: "group",
    },
    {
      label: `${t("language")}: ${currentLanguage}`,
      key: "2",
      children: [
        {
          key: "2-1",
          label: (
            <span
              onClick={() =>
                dispatch(handleChangeLanguage(LanguageOptions[0].value))
              }
            >
              {LanguageOptions[0].label}
            </span>
          ),
        },
        {
          key: "2-2",
          label: (
            <span
              onClick={() =>
                dispatch(handleChangeLanguage(LanguageOptions[1].value))
              }
            >
              {LanguageOptions[1].label}
            </span>
          ),
        },
      ],
    },
    {
      label: (
        <ButtonCustom
          onClick={() => {
            dispatch(handleLogout());
            navigate("/login");
          }}
          width="100%"
        >
          {t("log out")}
        </ButtonCustom>
      ),
      key: "3",
    },
  ];

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
            {t("MANAGING BIOMETRIC MATCHING REQUESTS")}
          </span>
        </Dropdown>
        <Dropdown menu={{ items: menuXuLy }} trigger={["click"]} arrow={true}>
          <span className="header-menu-2">{t("PROCESSING OF DOCUMENTS")}</span>
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
