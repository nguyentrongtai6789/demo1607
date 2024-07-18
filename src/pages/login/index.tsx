import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Field, Form, Formik, FormikProps } from "formik";
import { FunctionComponent } from "react";
import { InputCustom } from "../../customFields/InputCustom";
import { ILoginValues } from "./interface";
import "./styles.scss";

export const Login: FunctionComponent = (props) => {
  return (
    <>
      <div className="login-page" style={{ textAlign: "center" }}>
        <div className="login-form">
          <Formik
            initialValues={{
              username: "",
              matKhau: "",
            }}
            onSubmit={(values: ILoginValues) => {
              console.log(values);
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
                    component={Input.Password}
                    name={"matKhau"}
                    placeholder={"Mật khẩu"}
                    isRequired
                    iconRender={(passwordVisible: boolean) =>
                      passwordVisible ? (
                        <EyeTwoTone />
                      ) : (
                        <EyeInvisibleOutlined />
                      )
                    }
                  />
                  <button type="submit">Đăng nhập</button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};
export default Login;
