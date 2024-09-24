import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
// import httpMethod from "../../config/httpMethod";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { InputCustom } from "../../customAntd/InputCustom";
import NotificationCustom from "../../customAntd/NotificationCustom";
import { SelectCustom } from "../../customAntd/SelectCustom";
import { LanguageOptions, languages } from "../../i18n/i18n";
import {
  handleChangeLanguage,
  handleLoading,
  loadingCancel,
  loginSuccess,
} from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { authenticate, phanHeHeThong } from "./api";
import "./styles.scss";
import { useSelector } from "react-redux";
import httpMethod from "../../config/httpMethod";
import { useEffect } from "react";

interface ILoginValues {
  username: string;
  password: string;
  loginOption: string;
}

export const Login: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const { i18n, t } = useTranslation(["login"]);

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  let location = useLocation();

  let params = new URLSearchParams(location.search);

  let from = params.get("from") || `${process.env.PUBLIC_URL}/`;

  const handleLogin = async (values: ILoginValues) => {
    dispatch(handleLoading());
    httpMethod
      .post(`${authenticate}`, values)
      .then((res: AxiosResponse) => {
        if (res.headers.authorization) {
          dispatch(loginSuccess(res.data));
          NotificationCustom(t("loginSuccess"), "success");
          window.location.href = `${from}`;
        }
        if (res.data.error === "201") {
          return NotificationCustom(t("wrongPasswordOrUsername"), "error");
        }
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        dispatch(loadingCancel());
      });
  };

  return (
    <div className="login-page" style={{ textAlign: "center" }}>
      <div className="login-form">
        <Formik
          initialValues={{
            username: "",
            password: "",
            loginOption: "KHAITHAC_SOHOA",
          }}
          onSubmit={(values: ILoginValues) => {
            handleLogin(values);
          }}
        >
          {(propsFormik: FormikProps<ILoginValues>) => {
            const { values, setValues, setFieldValue } = propsFormik;
            return (
              <Form>
                <Field
                  component={InputCustom}
                  name={"username"}
                  placeholder={t("tenDangNhap")}
                  size="middle"
                  prefix={<UserOutlined />}
                  styleInput={{ border: "1px solid rgb(41, 38, 152)" }}
                />
                <Field
                  component={InputCustom}
                  disabled={false}
                  placeholder={t("matKhau")}
                  type="password"
                  size="middle"
                  name="password"
                  style={{ marginBottom: "5px" }}
                  prefix={<LockOutlined />}
                  styleInput={{ border: "1px solid rgb(41, 38, 152)" }}
                />
                <Field
                  component={SelectCustom}
                  name={"loginOption"}
                  placeholder={t("selectSubsystem")}
                  size="middle"
                  api={phanHeHeThong}
                  valueNeedOfOption={"giaTri"}
                  style={{
                    width: "100%",
                  }}
                />
                <ButtonCustom htmlType="submit" width="100px">
                  {t("dangNhap")}
                </ButtonCustom>
                <div>
                  <Select
                    options={LanguageOptions}
                    placeholder={currentLanguage}
                    style={{
                      width: 150,
                      marginTop: "5px",
                    }}
                    size="small"
                    // dropdownStyle={{ height: "25px" }}
                    onChange={(value: string) => {
                      dispatch(handleChangeLanguage(value));
                      i18n.changeLanguage(value);
                    }}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
