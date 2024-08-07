import { Input, Select } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import httpMethod from "../../config/httpMethod";
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
import { AxiosError, AxiosResponse } from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ILoginValues {
  username: string;
  password: string;
  loginOption: string;
}

export const Login: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation("login");

  const navigate = useNavigate();

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const { loading } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (values: ILoginValues) => {
    dispatch(handleLoading());
    httpMethod
      .post(`${authenticate}`, values)
      .then((res: AxiosResponse) => {
        if (res.headers.authorization) {
          NotificationCustom(t("login successfully"), "success");
          dispatch(loginSuccess(res.data));
          navigate(`${process.env.PUBLIC_URL}/trang-chu`);
        }
        if (res.data.error === "201") {
          return NotificationCustom(t("wrong password or username"), "error");
        }
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        dispatch(loadingCancel());
      });
  };

  const [language, setLanguage] = useState<any>();

  useEffect(() => {
    dispatch(handleLoading());

    const fetchData = async () => {
      try {
        const res = await httpMethod.get(
          "http://localhost:8080/api/demo-translation"
        );
        console.log(res.data.translations);
        setLanguage(res.data.translations);
      } catch {
      } finally {
      }
      dispatch(loadingCancel());
    };
    fetchData();
  }, []);

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
                  placeholder={t("username")}
                  size="middle"
                />
                <Field
                  component={Input.Password}
                  disabled={false}
                  placeholder={t("password")}
                  size="middle"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("password", event.target.value);
                  }}
                  style={{ marginBottom: "5px" }}
                />
                <Field
                  component={SelectCustom}
                  name={"loginOption"}
                  placeholder={t("select subsystem")}
                  size="middle"
                  api={phanHeHeThong}
                  valueNeedOfOption={"giaTri"}
                  style={{ width: "100%" }}
                />
                <ButtonCustom htmlType="submit" width="100px">
                  {t("log in")}
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
                    onChange={(value: string) =>
                      dispatch(handleChangeLanguage(value))
                    }
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
