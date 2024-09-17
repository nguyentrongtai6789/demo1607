import { Pagination, PaginationProps, Select, SelectProps } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { TableParams } from "../pages/QuanLyHoSoCmnd9So/components/TableResults";
import { useTranslation } from "react-i18next";

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
      label: `5 ${t("record")} / ${t("page")}`,
    },
    {
      value: 10,
      label: `10 ${t("record")} / ${t("page")}`,
    },
    {
      value: 20,
      label: `20 ${t("record")} / ${t("page")}`,
    },
    {
      value: 50,
      label: `50 ${t("record")} / ${t("page")}`,
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
                  {t("from")} {range[0]} {t("to")} {range[1]} {t("of")}
                  {total} {t("record")}
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
