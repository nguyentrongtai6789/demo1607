import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Space } from "antd";
import React, { useState } from "react";
import { IRecordTable } from "./TableResults";
import { useTranslation } from "react-i18next";
import IConCustom from "../../../../../customAntd/IConCustom";
import { ModalConfirmCustom } from "../../../../../customAntd/ModalConfirmCustom";
import NotificationCustom from "../../../../../customAntd/NotificationCustom";

interface IProps {
  record: IRecordTable;
}

export const Action: React.FC<IProps> = ({ record }) => {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);
  const { t } = useTranslation(["tooltip"]); // sau này nếu cần lấy json của màn nào thì truyền tên vào mảng này
  // và cái tên đó là quy ước của BE và FE phải giống nhau

  return (
    <>
      <Space size={20} className="space-button-table-action">
        <IConCustom
          iCon={<EyeOutlined />}
          style={{
            background: "unset",
            border: "unset",
          }}
          tooltip={t("xemChiTiet")}
        />
        <IConCustom
          iCon={<EditOutlined />}
          style={{
            background: "unset",
            border: "unset",
          }}
          tooltip={t("sua")}
        />
        <IConCustom
          iCon={<DeleteOutlined />}
          style={{
            background: "unset",
            border: "unset",
          }}
          onClick={() => {
            setOpenModalConfirm(true);
          }}
          tooltip={t("xoa")}
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
