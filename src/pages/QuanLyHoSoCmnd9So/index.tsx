import { useTranslation } from "react-i18next";
import TableResults from "./components/TableResults";
import { SearchForm } from "./components/SearchForm";

export default () => {
  const { t } = useTranslation(["dictionnary"]);

  return (
    <div>
      <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
      <SearchForm />
      <div className="table-results">
        <div className="table-results-title">{t("Search Results")}</div>
        <TableResults />
      </div>
    </div>
  );
};
