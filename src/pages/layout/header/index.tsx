import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoLAeID from "../../../assets/images/logoLAeID.png";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { LanguageOptions, languages } from "../../../i18n/i18n";
import { handleChangeLanguage, handleLogout } from "../../../redux/authSlice";
import { RootState, useAppDispatch } from "../../../redux/store";
import "./styles.scss";
export default () => {
  const { t, i18n } = useTranslation(["translation"]);

  const { username } = useSelector((state: RootState) => state.auth);

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const menuAvatar: MenuProps["items"] = [
    {
      label: (
        <span>
          {t("tenDangNhap")}: {username}
        </span>
      ),
      key: "0",
      type: "group",
    },
    {
      label: <span>{t("donVi")}:</span>,
      key: "1",
      type: "group",
    },
    {
      label: (
        <span>
          {t("ngonNgu")}: {currentLanguage}
        </span>
      ),
      key: "2",
      children: [
        {
          key: "2-1",
          label: (
            <span
              onClick={() => {
                dispatch(handleChangeLanguage(LanguageOptions[0].value));
                i18n.changeLanguage(LanguageOptions[0].value);
              }}
            >
              {LanguageOptions[0].label}
            </span>
          ),
        },
        {
          key: "2-2",
          label: (
            <span
              onClick={() => {
                dispatch(handleChangeLanguage(LanguageOptions[1].value));
                i18n.changeLanguage(LanguageOptions[1].value);
              }}
            >
              {LanguageOptions[1].label}
            </span>
          ),
        },
        {
          key: "2-3",
          label: (
            <span
              onClick={() => {
                dispatch(handleChangeLanguage(LanguageOptions[2].value));
                i18n.changeLanguage(LanguageOptions[2].value);
              }}
            >
              {LanguageOptions[2].label}
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
            window.location.href = "https://laeid3a.teca.vn/dang-nhap";
          }}
          width="100%"
        >
          {t("dangXuat")}
        </ButtonCustom>
      ),
      key: "3",
    },
  ];

  return (
    <Header>
      <img src={logoLAeID} alt="" className="h-16 w-max" />
      <h1 className="text-white text-2xl font-semibold flex items-center ml-5 uppercase">
        {t("headerTittle")}
      </h1>
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
