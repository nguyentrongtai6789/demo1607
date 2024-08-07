import {
  Button,
  GetProp,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { SorterResult } from "antd/es/table/interface";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import httpMethod from "../../../config/httpMethod";
import { handleLoading, loadingCancel } from "../../../redux/authSlice";
import { RootState, useAppDispatch } from "../../../redux/store";
import { timKiem } from "./api";
import { ISearchValues } from "./SearchForm";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import ButtonCustom from "../../../customAntd/ButtonCustom";
import { Action } from "./Action";

export interface IProps {
  searchValues: ISearchValues | null;
}

export interface IRecordTable {
  id: number;
  soCmnd: string;
  soDinhDanh: string;
  hoVaTen: string;
  ngaySinh: string;
  gioiTinh: string;
  noiSinh: string;
  thuongTru: string;
  hoVaTenCha: string;
  hoVaTenMe: string;
  hoVaTenVoChong: string;
  ngayNhap: string;
  donVi: string;
  congViec: string;
  ketQuaCongViec: string;
  congViecTiepTheo: string;
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: "asc" | "desc";
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

export const TableResults: FunctionComponent<IProps> = ({ searchValues }) => {
  const { t } = useTranslation(["dictionnary"]);
  const { language } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<IRecordTable[]>();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sortField: "soCmnd",
    sortOrder: "asc",
  });

  const fecthData = async () => {
    dispatch(handleLoading());
    await httpMethod
      .post(
        `${timKiem}?page=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}`,
        {
          ...searchValues,
          sortDirection: tableParams.sortOrder,
          sortField: tableParams.sortField,
        }
      )
      .then((res: any) => {
        if (res?.data?.code === 200) {
          setData(res?.data?.data);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: 200,
              // 200 is mock data, you should read it from server
              // total: data.totalCount,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(loadingCancel());
        }, 500);
      });
  };

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log(sorter);
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter)
        ? undefined
        : sorter.order === "ascend"
        ? "asc"
        : "desc",
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  useEffect(() => {
    fecthData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    searchValues,
  ]);

  const columns: TableColumnsType<IRecordTable> = [
    {
      title: "STT",
      width: 50,
      render: (value: any, record: IRecordTable, index: number) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Số CMND",
      dataIndex: "soCmnd",
      key: "soCmnd",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      key: "hoVaTen",
      width: 200,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Nơi sinh",
      dataIndex: "noiSinh",
      key: "noiSinh",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Thường trú",
      dataIndex: "thuongTru",
      key: "thuongTru",
      width: 300,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ và tên cha",
      dataIndex: "hoVaTenCha",
      key: "hoVaTenCha",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ và tên mẹ",
      dataIndex: "hoVaTenMe",
      key: "hoVaTenMe",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ và tên vợ chồng",
      dataIndex: "hoVaTenVoChong",
      key: "hoVaTenVoChong",
      width: 200,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Ngày nhập",
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Đơn vị",
      dataIndex: "donVi",
      key: "donVi",
      width: 300,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Công việc đã thực hiện",
      dataIndex: "congViec",
      key: "congViec",
      width: 300,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Kết quả",
      dataIndex: "ketQuaCongViec",
      key: "ketQuaCongViec",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Công việc thực hiện tiếp theo",
      dataIndex: "congViecTiepTheo",
      key: "congViecTiepTheo",
      width: 300,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Công việc thực hiện tiếp theo",
      dataIndex: "congViecTiepTheo",
      key: "congViecTiepTheo",
      width: 300,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 120,
      render: (record: IRecordTable) => <Action record={record} />,
    },
  ];

  return (
    <>
      <div style={{ padding: "15px" }}>
        <div className="table-results">
          <div className="table-results-title">{t("Search Results")}</div>
          <Table
            title={() => (
              <>
                <ButtonCustom startIcon={<PlusCircleOutlined />} width="145px">
                  Thêm mới
                </ButtonCustom>
              </>
            )}
            columns={columns}
            dataSource={data}
            scroll={{ x: "2500px", y: "500px" }}
            bordered
            pagination={{
              current: tableParams.pagination?.current,
              pageSize: tableParams.pagination?.pageSize,
              total: data?.length || 0,
              showTotal: (total, range) => (
                <>
                  Từ {range[0]} đến {range[1]} trên tổng số {total} bản ghi
                </>
              ),
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
          />
        </div>
      </div>
      {/* <Handle /> */}
    </>
  );
};

export default TableResults;
