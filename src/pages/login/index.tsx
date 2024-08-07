import { Select } from "antd";
import { AxiosError, AxiosResponse } from "axios";
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
import { useAppDispatch } from "../../redux/store";
import { authenticate, phanHeHeThong } from "./api";
import "./styles.scss";

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
              <Form
                onSubmit={(e) => {
                  e.preventDefault(); // Ngăn chặn hành vi mặc định của form
                  propsFormik.handleSubmit(); // Gọi hàm handleSubmit của Formik để xử lý submit
                }}
              >
                <Field
                  component={InputCustom}
                  name={"username"}
                  placeholder={t("username")}
                  size="middle"
                />
                <Field
                  component={InputCustom}
                  disabled={false}
                  placeholder={t("password")}
                  type="password"
                  size="middle"
                  name="password"
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
