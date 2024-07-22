import { Select } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ButtonCustom from "../../customAntd/ButtonCustom";
import { InputCustom } from "../../customAntd/InputCustom";
import { LanguageOptions } from "../../i18n/i18n";
import { handleLogin } from "../../redux/authActions";
import { handleChangeLanguage, handleLogout } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { ILoginValues } from "./interface";
import "./styles.scss";

export const Login: FunctionComponent = (props) => {
  const { loading, userInfo, userToken } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  const { t } = useTranslation("login");

  return (
    <div className="login-page" style={{ textAlign: "center" }}>
      <div className="login-form">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values: ILoginValues) => {
            dispatch(handleLogin(values));
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
                />
                <Field
                  component={InputCustom}
                  name={"password"}
                  disabled={false}
                  placeholder={t("password")}
                />
                <ButtonCustom htmlType="submit">{t("log in")}</ButtonCustom>
                <div>
                  <Select
                    options={LanguageOptions}
                    placeholder={t("select languague")}
                    style={{ width: 200 }}
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
