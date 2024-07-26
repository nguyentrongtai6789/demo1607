import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { RootState } from "./redux/store";
import RoutesOfApp from "./routers/RoutesOfApp";
import { ClimbingBoxLoader } from "react-spinners";

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
        <ClimbingBoxLoader />
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
