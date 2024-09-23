import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISearchValues, SearchForm } from "./components/SearchForm";
import { TableResultsTongHop } from "./components/TableResultsTongHop";
import { TableResultsDanhSach } from "./components/TableResultsDanhSach";

export default () => {
  const { t } = useTranslation(["dictionnary"]);

  const [searchValues, setSearchValues] = useState<ISearchValues | null>(null);

  const [loaiBaoCao, setLoaiBaoCao] = useState<string>("1");

  return (
    <Fragment>
      <div className="div-wrap-content">
        <div className="wrap-content-child">
          <div className="title-page">
            Thống kê hồ sơ cmnd 9 số hợp nhất theo đơn vị
          </div>
          <SearchForm
            setSearchValues={setSearchValues}
            setLoaiBaoCao={setLoaiBaoCao}
          />
          {loaiBaoCao !== "2" && (
            <TableResultsTongHop searchValues={searchValues} />
          )}
          {loaiBaoCao === "2" && (
            <TableResultsDanhSach searchValues={searchValues} />
          )}
        </div>
      </div>
    </Fragment>
  );
};
