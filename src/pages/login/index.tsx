import { Field, Form, Formik, FormikProps } from "formik";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import ButtonCustom from "../../customFields/ButtonCustom";
import { InputCustom } from "../../customFields/InputCustom";
import { handleLogin } from "../../redux/authActions";
import { handleLogout } from "../../redux/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { ILoginValues } from "./interface";
import "./styles.scss";

export const Login: FunctionComponent = (props) => {
  const { loading, userInfo, userToken } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();

  return loading ? (
    <>
      <p>Loading....</p>
    </>
  ) : !userToken ? (
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
                  placeholder={"Tên đăng nhập"}
                />
                <Field
                  component={InputCustom}
                  name={"password"}
                  disabled={false}
                  placeholder={"Mật khẩu"}
                />
                <ButtonCustom htmlType="submit">Đăng nhập</ButtonCustom>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  ) : (
    <>
      <ButtonCustom
        htmlType="submit"
        onClick={() => {
          dispatch(handleLogout());
        }}
      >
        Đăng xuất
      </ButtonCustom>
    </>
  );
};
export default Login;
