import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingCustom } from "./customAntd/LoadingCustom";
import { RootState, useAppDispatch } from "./redux/store";
import RoutesOfApp from "./routers/RoutesOfApp";
import { handleSetJsonFile, loginSuccess } from "./redux/authSlice";

function App() {
  const { language, loading } = useSelector((state: RootState) => state.auth);

  const { i18n, t } = useTranslation();

  const dispatch = useAppDispatch();

  const test = {
    en: {
      login: {
        buttonLogin: "Login",
        placeholder1: "Username",
        placeholder2: "Password",
        loginSuccess: "Login successfully",
        wrongPassOrUser: "Wrong password or username",
        selectSubsystem: "Select subsystem",
      },
    },
    vi: {
      login: {
        buttonLogin: "Đăng nhập",
        placeholder1: "Tài khoản",
        placeholder2: "Mật khẩu",
        loginSuccess: "Đăng nhập thành công",
        wrongPassOrUser: "Sai tài khoản hoặc mật khẩu",
        selectSubsystem: "Chọn phân hệ",
      },
    },
  };

  useEffect(() => {
    dispatch(
      language === "vi"
        ? handleSetJsonFile(test.vi)
        : handleSetJsonFile(test.en)
    );
  }, [language]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <Suspense fallback={<LoadingCustom />}>
      {loading && <LoadingCustom />}
      <BrowserRouter>
        <RoutesOfApp />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
