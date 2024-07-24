import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routers from "./routers/Routers";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

function App() {
  const { language, loading } = useSelector((state: RootState) => state.auth);

  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return (
    <BrowserRouter>
      <Routers />
      {loading && (
        <div className="loading-wrapper">
          <HashLoader size={35} color="red" />
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
