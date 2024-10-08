import {
  CheckOutlined,
  ExportOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Space, Table, TableColumnsType, TableProps } from "antd";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import httpMethod from "../../../../../services/httpMethod";
import ButtonCustom from "../../../../../customAntd/ButtonCustom";
import { ModalCustom } from "../../../../../customAntd/ModalCustom";
import PaginationCustom, {
  TableParams,
} from "../../../../../customAntd/PaginationCustom";
import useLoading from "../../../../../customHooks/UseLoading";
import { Action } from "./Action";
import { timKiem } from "./api";
import { ISearchValues } from "./SearchForm";

export interface IProps {
  searchValues: ISearchValues | null;
}

export interface IRecordTable {
  key: React.Key;
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

export const TableResults: FunctionComponent<IProps> = ({ searchValues }) => {
  const { t } = useTranslation(["translation"]); //translation là tên của namespace
  // có thể chia namespace theo từng màn, nhưng ở đây chúng ta dùng cách là gộp tất cả các JSON ở FE thành 1 file chung duy nhất
  // và ở BE cũng trả ra 1 file JSON duy nhất, như thế thì khi code sẽ được gợi ý các key trong file JSON mà ko cần tự mò
  // (cái này đã được config rồi)
  // còn nếu như chia theo namespace thì mình phải tìm đúng namespace mà chứa cái từ mình cần dịch, như vậy sẽ mất thời gian hơn

  const { setLoading } = useLoading(); //đây là hook để kiểm soát biến loading duy nhất của toàn bộ project

  const [data, setData] = useState<IRecordTable[]>();

  //các biến thông thường: pagination và sort
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1, //trang hiện tại
      pageSize: 10, // số bản ghi trên 1 trang
    },
    sortField: "soCmnd", // tên trường sort
    sortOrder: "asc", // giá trị sort
  });

  //tìm kiếm
  const fecthData = async () => {
    setLoading(true); // setLoading
    setIdsSelected([]); // đặt list ids về rỗng
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
          setData(
            res?.data?.data.map((item: IRecordTable, index: number) => ({
              ...item,
              key: item.id, // nếu cần checkbox thì cần phải có cái key này mới được
            }))
          );
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res.headers["x-total-count"],
            },
          });
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  //thay đổi khi click vào cột để sort
  const handleTableChange: TableProps["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    if (Array.isArray(sorter)) return;
    if (!sorter.column) return;
    setTableParams({
      ...tableParams,
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

  //define các cột (trong 1 dòng)
  const columns: TableColumnsType<IRecordTable> = [
    {
      title: t("soThuTu"),
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
      title: t("soCmnd"),
      dataIndex: "soCmnd",
      key: "soCmnd",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: t("hoVaTen"),
      dataIndex: "hoVaTen",
      key: "hoVaTen",
      width: 200,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("ngaySinh"),
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("gioiTinh"),
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      width: 150,
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: t("noiSinh"),
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
      width: 160,
      render: (record: IRecordTable) => <Action record={record} />, // truyền record vào Component <Action/>
    },
  ];

  //list id selected
  const [idsSelected, setIdsSelected] = useState<number[]>([]);

  //đóng mở modal thêm mới
  const [openModalThemMoi, setOpenModalThemMoi] = useState<boolean>(false);

  //các hàm thực hiện khi click chọn 1 record: (cần checkbox thì thêm cái này)
  const rowSelection: TableProps<IRecordTable>["rowSelection"] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IRecordTable[]) => {
      setIdsSelected(selectedRows.map((item) => item.id));
    },
  };

  return (
    <>
      <div className="p-4 mb-6">
        <div className="table-results">
          <div className="table-results-title">{t("ketQuaTimKiem")}</div>
          <Table
            title={() => (
              //đây là nút thêm mới
              <>
                <ButtonCustom
                  startIcon={<PlusCircleOutlined />}
                  width="145px"
                  onClick={() => setOpenModalThemMoi(true)}
                >
                  {t("themMoi")}
                </ButtonCustom>
              </>
            )}
            columns={columns}
            dataSource={data}
            scroll={{ x: "2500px", y: "500px" }}
            bordered
            pagination={false} // ko dùng phân trang mặc định của table
            onChange={handleTableChange}
            rowSelection={rowSelection} // cần checkbox thì thêm cái này
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
      <div className="button-bottom-wrapper">
        <Space className="space-button">
          <ButtonCustom
            startIcon={<CheckOutlined />}
            onClick={() => {
              console.log(idsSelected);
            }}
          >
            {t("pheDuyet")}
          </ButtonCustom>
          <ButtonCustom startIcon={<ExportOutlined />}>
            {t("xuatFile")}
          </ButtonCustom>
        </Space>
      </div>
      <ModalCustom open={openModalThemMoi} title="CẬP NHẬT HỒ SƠ CMND 9 SỐ">
        <div>ABC</div>
        <div>ABC</div>
        <div>ABC</div>
        <div>ABC</div>
        <div>ABC</div>
        <div>ABC</div>
        <div>ABC</div>
        <div className="button-bottom-wrapper">
          <Space className="space-button">
            <ButtonCustom onClick={() => setOpenModalThemMoi(false)}>
              Đóng
            </ButtonCustom>
            <ButtonCustom width="200px">Xem thông tin tại HT CCCD</ButtonCustom>
          </Space>
        </div>
      </ModalCustom>
    </>
  );
};

export default TableResults;
