import {
  GetProp,
  Pagination,
  PaginationProps,
  Select,
  SelectProps,
  TableProps,
} from "antd";
import { SorterResult } from "antd/es/table/interface";
import React, { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

export type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export interface TableParams {
  pagination: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: "asc" | "desc";
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

interface IProps extends PaginationProps {
  setTableParams: Dispatch<SetStateAction<TableParams>>;
}

const PaginationCustom: React.FC<IProps> = (props: IProps) => {
  const {
    current,
    pageSize,
    total,
    showSizeChanger,
    style,
    showTotal,
    onChange,
    setTableParams,
  } = props;

  const { t } = useTranslation(["pagination"]);

  const optionsPageSize: SelectProps["options"] = [
    {
      value: 5,
      label: `5 ${t("banGhi")} / ${t("trang")}`,
    },
    {
      value: 10,
      label: `10 ${t("banGhi")} / ${t("trang")}`,
    },
    {
      value: 20,
      label: `20 ${t("banGhi")} / ${t("trang")}`,
    },
    {
      value: 50,
      label: `50 ${t("banGhi")} / ${t("trang")}`,
    },
  ];

  return (
    <div
      style={{ display: "flex", justifyContent: "end", fontStyle: "italic" }}
    >
      <Pagination
        style={style || { marginTop: "5px" }}
        current={current}
        pageSize={pageSize}
        total={total}
        showTotal={
          showTotal
            ? showTotal
            : (total, range) => (
                <>
                  {t("tu")} {range[0]} {t("den")} {range[1]} {t("trongTongSo")}
                  {total} {t("banGhi")}
                </>
              )
        }
        showSizeChanger={showSizeChanger || false}
        onChange={onChange}
      />
      <div
        style={{
          alignItems: "center",
          display: "flex",
          marginTop: "5px",
        }}
      >
        <Select
          value={pageSize}
          options={optionsPageSize}
          size="middle"
          onChange={(value: number) => {
            setTableParams((prevState) => ({
              ...prevState,
              pagination: { pageSize: value, current: 1 },
            }));
          }}
        />
      </div>
    </div>
  );
};

export default PaginationCustom;
