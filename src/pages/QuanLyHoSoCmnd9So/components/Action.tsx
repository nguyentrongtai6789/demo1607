import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { IRecordTable } from "./TableResults";
import React, { useState } from "react";
import { ModalConfirmCustom } from "./ModalConfirmCustom";

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
      {openModalConfirm && (
        <ModalConfirmCustom open={openModalConfirm}>
          <div style={{ textAlign: "center" }}>Bạn có chắc chắn xoá</div>
        </ModalConfirmCustom>
      )}
    </>
  );
};
