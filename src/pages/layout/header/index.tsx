import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { LanguageOptions, languages } from "../../../i18n/i18nFrontEnd";
import { handleChangeLanguage, handleLogout } from "../../../redux/authSlice";
import { RootState, useAppDispatch } from "../../../redux/store";
import "./styles.scss";

export default () => {
  const { t, i18n } = useTranslation("header");

  //thông tin user:

  const { username } = useSelector((state: RootState) => state.auth);

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const menuAvatar: MenuProps["items"] = [
    {
      label: (
        <span>
          {t("username")}: {username}
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
            navigate(`${process.env.PUBLIC_URL}/login`);
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
      <img
        src="http://172.20.20.73:9100/assets/images/logo.svg"
        alt=""
        style={{ height: "64px" }}
      />
      <div>
        <Dropdown
          menu={{ items: menuAvatar }}
          trigger={["click"]}
          arrow={true}
          className="avatar-dropdown"
        >
          <Avatar size="large" icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};
