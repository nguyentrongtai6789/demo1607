import { Pagination, PaginationProps, Select, SelectProps } from "antd";
import React, { Dispatch, SetStateAction } from "react";
import { TableParams } from "../pages/QuanLyHoSoCmnd9So/components/TableResults";

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

  const optionsPageSize: SelectProps["options"] = [
    {
      value: 5,
      label: "5 bản ghi / trang",
    },
    {
      value: 10,
      label: "10 bản ghi / trang",
    },
    {
      value: 20,
      label: "20 bản ghi / trang",
    },
    {
      value: 50,
      label: "50 bản ghi / trang",
    },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <Pagination
        style={style || { marginTop: "5px" }}
        align="end"
        current={current}
        pageSize={pageSize}
        total={total}
        showTotal={
          showTotal
            ? showTotal
            : (total, range) => (
                <>
                  Từ {range[0]} đến {range[1]} trên tổng số {total} bản ghi
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
          padding: "0px 10px",
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
