import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { handleChangeLanguage, handleLogout } from "../../../redux/authSlice";
import { RootState, useAppDispatch } from "../../../redux/store";
import "./styles.scss";
import { LanguageOptions, languages } from "../../../i18n/i18n";
import { useTranslation } from "react-i18next";

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
      label: <span>{t("unit")}</span>,
      key: "1",
      type: "group",
    },
    {
      label: (
        <span>
          {t("language")}: {currentLanguage}
        </span>
      ),
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
          {t("logOut")}
        </ButtonCustom>
      ),
      key: "3",
    },
  ];

  return (
    <Header>
      <img
        src="assets/images/logoHeader.png"
        alt=""
        style={{ height: "64px", width: 550 }}
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
