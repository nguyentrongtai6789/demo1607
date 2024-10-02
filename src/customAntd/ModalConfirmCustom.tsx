import { Modal, Space } from "antd";
import React from "react";
import ButtonCustom from "./ButtonCustom";
import { useTranslation } from "react-i18next";

interface IProps {
  open: boolean;
  title: string;
  onCancel: () => void;
  onOk: () => void;
}

export const ModalConfirmCustom: React.FC<IProps> = ({
  open,
  onCancel,
  onOk,
  title,
}) => {
  const { t } = useTranslation(["translation"]);
  return (
    <Modal
      open={open}
      centered
      closeIcon={false}
      footer={false}
      className="modal-confirm-custom"
      onCancel={onCancel}
      onOk={onOk}
    >
      <div className="text-center mb-4">{title}</div>
      <div className="text-center">
        <Space size={50}>
          <ButtonCustom onClick={onCancel}>{t("huy")}</ButtonCustom>
          <ButtonCustom
            className="delete-button"
            color="rgb(248, 51, 51)"
            onClick={onOk}
          >
            {t("dongY")}
          </ButtonCustom>
        </Space>
      </div>
    </Modal>
  );
};
