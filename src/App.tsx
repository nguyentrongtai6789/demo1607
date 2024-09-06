import { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingCustom } from "./customAntd/LoadingCustom";
import { RootState } from "./redux/store";
import RoutesOfApp from "./routers/RoutesOfApp";

function App() {
  const { language, loading } = useSelector((state: RootState) => state.auth);

  const { i18n, t } = useTranslation();

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
