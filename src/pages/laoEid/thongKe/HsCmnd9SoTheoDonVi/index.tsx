import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISearchValues, SearchForm } from "./components/SearchForm";
import { TableResultsTongHop } from "./components/TableResultsTongHop";
import { TableResultsDanhSach } from "./components/TableResultsDanhSach";
import { Space } from "antd";
import ButtonCustom from "../../../../customAntd/ButtonCustom";
import { CheckOutlined, ExportOutlined } from "@ant-design/icons";

export default () => {
  const { t } = useTranslation(["translation"]);

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
            <TableResultsTongHop
              searchValues={searchValues}
              loaiBaoCao={loaiBaoCao}
            />
          )}
          {loaiBaoCao === "2" && (
            <TableResultsDanhSach
              searchValues={searchValues}
              loaiBaoCao={loaiBaoCao}
            />
          )}
        </div>
      </div>
    </Fragment>
  );
};
