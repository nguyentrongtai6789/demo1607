import { Input, Select } from "antd";
import { AxiosError } from "axios";
import { Field, Form, Formik, FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import httpMethod from "../../config/httpMethod";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { InputCustom } from "../../customAntd/InputCustom";
import NotificationCustom from "../../customAntd/NotificationCustom";
import { LanguageOptions, languages } from "../../i18n/i18n";
import {
  handleChangeLanguage,
  handleLoading,
  loadingCancel,
  loginSuccess,
} from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/store";
import { ILoginValues } from "./interface";
import "./styles.scss";

export const Login: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation("login");

  const navigate = useNavigate();

  const currentLanguage = languages[i18n.language as keyof typeof languages];

  const handleLogin = async (values: ILoginValues) => {
    dispatch(handleLoading());
    try {
      const res = await httpMethod.post(
        "http://localhost:8080/api/login",
        values
      );
      if (res.status === 200) {
        NotificationCustom(t("login successfully"), "success");
        dispatch(loginSuccess(res.data));
        navigate("/trang-chu");
      }
    } catch (error: any) {
      if (error?.response?.status === 401) {
        NotificationCustom(t("wrong password or username"), "error");
      }
      if (error?.code === AxiosError.ERR_NETWORK) {
        NotificationCustom(t("network error"), "error");
      }
    } finally {
      dispatch(loadingCancel());
    }
  };

  return (
    <div className="login-page" style={{ textAlign: "center" }}>
      <div className="login-form">
        <Formik
          initialValues={{
            username: "",
            password: "",
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
                      // height: "25px",
                      // position: "fixed",
                      // top: 10,
                      // right: 10,
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
