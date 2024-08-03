import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnsType,
  TableColumnType,
} from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { FunctionComponent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export interface IProps {
  data: IRecordTable[];
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

export const TableResults: FunctionComponent<IProps> = ({ data }) => {
  const { t } = useTranslation(["dictionnary"]);
  const { language, loading } = useSelector((state: RootState) => state.auth);

  type DataIndex = keyof IRecordTable;

  // const data: DataType[] = [
  //   {
  //     key: "1",
  //     name: "a",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "abc",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "sda",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Sgd",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<IRecordTable> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  const columns: TableColumnsType<IRecordTable> = [
    {
      title: "Số CMND",
      dataIndex: "soCmnd",
      key: "soCmnd",
      width: "fit-content",
      // ...getColumnSearchProps("name"),
      sortDirections: ["descend", "ascend"],
      // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Họ và tên",
      dataIndex: "hoVaTen",
      key: "hoVaTen",
      width: "fit-content",
      // ...getColumnSearchProps("age"),
      sortDirections: ["descend", "ascend"],
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Ngày sinh",
      dataIndex: "ngaySinh",
      key: "ngaySinh",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Giới tính",
      dataIndex: "gioiTinh",
      key: "gioiTinh",
      width: "100px",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nơi sinh",
      dataIndex: "noiSinh",
      key: "noiSinh",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thường trú",
      dataIndex: "thuongTru",
      key: "thuongTru",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Họ và tên cha",
      dataIndex: "hoVaTenCha",
      key: "hoVaTenCha",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Họ và tên mẹ",
      dataIndex: "hoVaTenMe",
      key: "hoVaTenMe",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Họ và tên vợ chồng",
      dataIndex: "hoVaTenVoChong",
      key: "hoVaTenVoChong",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày nhập",
      dataIndex: "ngayNhap",
      key: "ngayNhap",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Đơn vị",
      dataIndex: "donVi",
      key: "donVi",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Công việc đã thực hiện",
      dataIndex: "congViec",
      key: "congViec",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Kết quả",
      dataIndex: "ketQuaCongViec",
      key: "ketQuaCongViec",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Công việc thực hiện tiếp theo",
      dataIndex: "congViecTiepTheo",
      key: "congViecTiepTheo",
      width: "fit-content",
      // ...getColumnSearchProps("address"),
      // sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
  ];

  return (
    <>
      <div style={{ padding: "5px 5px 50px 5px" }}>
        <div className="table-results">
          <div className="table-results-title">{t("Search Results")}</div>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: "max-content", y: 500 }}
            pagination={false}
            bordered
            // rowSelection={}
            rowHoverable
          />
        </div>
      </div>
    </>
  );
};

export default TableResults;
