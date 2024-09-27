import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import IConCustom from "../../../../../customAntd/IConCustom";
import { ModalConfirmCustom } from "../../../../../customAntd/ModalConfirmCustom";
import NotificationCustom from "../../../../../customAntd/NotificationCustom";
import { IRecordTable } from "./TableResultsTongHop";

interface IProps {
  record: IRecordTable;
}

export const Action: React.FC<IProps> = ({ record }) => {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const { t } = useTranslation(["translation"]);

  return (
    <>
      <Space size={20} className="space-button-table-action">
        <IConCustom
          iCon={<EyeOutlined />}
          className="border-none bg-transparent"
          tooltip={t("xemChiTiet")}
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
