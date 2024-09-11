import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISearchValues, SearchForm } from "./components/SearchForm";
import TableResults from "./components/TableResults";

export default () => {
  const { t } = useTranslation(["dictionnary"]);
  const [searchValues, setSearchValues] = useState<ISearchValues | null>(null);

  return (
    <Fragment>
      <div className="div-wrap-content">
        <div className="wrap-content-child">
          <div className="title-page">quản lý hồ sơ cmnd 9 số</div>
          <SearchForm setSearchValues={setSearchValues} />
          <TableResults searchValues={searchValues} />
        </div>
      </div>
    </Fragment>
  );
};
