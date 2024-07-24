import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { HashLoader } from "react-spinners";
import "./App.css";
import { RootState } from "./redux/store";
import Routers from "./routers/Routers";

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
