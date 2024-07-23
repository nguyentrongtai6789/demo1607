import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./routers/Routers";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { language } = useSelector((state: RootState) => state.auth);

  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return (
    <BrowserRouter>
      {loading ? <div>loading....</div> : <Routers />}
    </BrowserRouter>
  );
}

export default App;
