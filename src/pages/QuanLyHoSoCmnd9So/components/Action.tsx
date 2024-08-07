import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import { ModalConfirmCustom } from "../../../customAntd/ModalConfirmCustom";
import NotificationCustom from "../../../customAntd/NotificationCustom";
import { IRecordTable } from "./TableResults";

interface IProps {
  record: IRecordTable;
}

export const Action: React.FC<IProps> = ({ record }) => {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  return (
    <>
      <Space size={20} className="space-button-table-action">
        <EyeOutlined />
        <EditOutlined />
        <DeleteOutlined
          onClick={() => {
            setOpenModalConfirm(true);
          }}
        />
      </Space>
      <ModalConfirmCustom
        open={openModalConfirm}
        title="Bạn có chắc chắn xoá?"
        onCancel={() => {
          setOpenModalConfirm(false);
        }}
        onOk={() => {
          NotificationCustom("Xoá thành công!", "success");
          setOpenModalConfirm(false);
        }}
      />
    </>
  );
};
