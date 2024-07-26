import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./pages/layout";
import { RootState } from "./redux/store";

function App() {
  const { language, loading } = useSelector((state: RootState) => state.auth);

  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  useEffect(() => {
    changeLanguage(language);
  }, [language]);

  return <Layout />;
}

export default App;
