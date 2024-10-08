import { PlusCircleOutlined } from "@ant-design/icons";
import { Table, TableColumnsType, TableProps } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import httpMethod from "../../../../../services/httpMethod";
import ButtonCustom from "../../../../../customAntd/ButtonCustom";
import PaginationCustom, {
  TableParams,
} from "../../../../../customAntd/PaginationCustom";
import useLoading from "../../../../../customHooks/UseLoading";
import { Action } from "./Action";
import { timKiem } from "./api";
import { ISearchValues } from "./SearchForm";

export interface IProps {
  searchValues: ISearchValues | null;
  loaiBaoCao: string;
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

export const TableResultsDanhSach: FunctionComponent<IProps> = ({
  searchValues,
  loaiBaoCao,
}) => {
  const { t } = useTranslation(["translation"]);

  const { setLoading } = useLoading();

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
    setLoading(true);
    await httpMethod
      .post(
        `${timKiem}?page=${tableParams.pagination?.current}&size=${tableParams.pagination?.pageSize}&sort=${tableParams.sortField}:${tableParams.sortOrder}`,
        searchValues
      )
      .then((res: any) => {
        if (res?.data?.code === 200) {
          setData(res?.data?.data);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.headers["x-total-count"],
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
        setLoading(false);
      });
  };

  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    console.log(sorter);
    if (Array.isArray(sorter)) return;
    if (!sorter.column) return;
    setTableParams({
      pagination: {
        current: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      },
      filters,
      sortOrder: sorter.order === "ascend" ? "asc" : "desc",
      sortField: sorter.field,
    });
  };

  //tìm kiếm khi phân trang và sort table:
  useEffect(() => {
    if (searchValues) {
      fecthData();
    }
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
  ]);

  //tìm kiếm khi searchValues thay đổi:
  useEffect(() => {
    if (searchValues) {
      if (tableParams.pagination.current !== 1) {
        setTableParams({
          ...tableParams,
          pagination: {
            current: 1,
            pageSize: tableParams.pagination.pageSize,
          },
        });
      } else {
        fecthData();
      }
    }
  }, [searchValues]);

  useEffect(() => {
    setData([]);
  }, [loaiBaoCao]);

  const columns: TableColumnsType<IRecordTable> = [
    {
      title: "STT",
      width: 50,
      render: (value: any, record: IRecordTable, index: number) => {
        return (
          <span>
            {(tableParams.pagination.pageSize || 0) *
              ((tableParams.pagination.current || 1) - 1) +
              index +
              1}
          </span>
        );
      },
    },
    {
      title: "Đơn vị",
      dataIndex: "donVi",
      key: "donVi",
      width: 200,
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Số CMND",
      dataIndex: "tongHoSo",
      key: "tongHoSo",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ và tên",
      dataIndex: "hopNhatCongDan",
      key: "hopNhatCongDan",
      width: 120,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Ngày sinh",
      dataIndex: "hopNhatDoiTuong",
      key: "hopNhatDoiTuong",
      width: 120,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Giới tính",
      dataIndex: "hopNhatCongDanDoiTuong",
      key: "hopNhatCongDanDoiTuong",
      width: 120,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ tên cha",
      dataIndex: "khongHopNhatCongDanDoiTuong",
      key: "khongHopNhatCongDanDoiTuong",
      width: 130,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ tên mẹ",
      dataIndex: "khongHopNhatCongDanDoiTuong",
      key: "khongHopNhatCongDanDoiTuong",
      width: 130,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Họ tên vợ chồng",
      dataIndex: "khongHopNhatCongDanDoiTuong",
      key: "khongHopNhatCongDanDoiTuong",
      width: 130,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 60,
      render: (record: IRecordTable) => <Action record={record} />,
    },
  ];

  return (
    <>
      <div className="p-4 mb-6">
        <div className="table-results">
          <div className="table-results-title">{t("dieuKienTimKiem")}</div>
          <Table
            title={() => (
              <>
                <ButtonCustom startIcon={<PlusCircleOutlined />} width="145px">
                  {t("themMoi")}
                </ButtonCustom>
              </>
            )}
            columns={columns}
            dataSource={data}
            scroll={{ x: "1300px", y: "500px" }}
            bordered
            pagination={false}
            onChange={handleTableChange}
          />
          <PaginationCustom
            current={tableParams.pagination?.current}
            pageSize={tableParams.pagination?.pageSize}
            total={tableParams.pagination?.total}
            pageSizeOptions={["5", "10", "20", "50"]}
            showSizeChanger={false}
            onChange={(page, pageSize) => {
              setTableParams({
                ...tableParams,
                pagination: { pageSize: pageSize, current: page },
              });
            }}
            setTableParams={setTableParams}
          />
        </div>
      </div>
    </>
  );
};
