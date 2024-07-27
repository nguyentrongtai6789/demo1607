import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import "./App.css";
import { RootState } from "./redux/store";
import RoutesOfApp from "./routers/RoutesOfApp";

function App() {
  const { language, loading } = useSelector((state: RootState) => state.auth);

  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  const renderLoading = () => {
    return (
      <div className="loading-wrapper">
        <MoonLoader color="rgb(5 129 105)" speedMultiplier={0.5} size={50} />
      </div>
    );
  };

  return (
    <Suspense fallback={renderLoading()}>
      {loading && renderLoading()}
      <BrowserRouter>
        <RoutesOfApp />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
