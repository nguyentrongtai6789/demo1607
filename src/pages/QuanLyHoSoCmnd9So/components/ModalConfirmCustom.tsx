import { Modal } from "antd";
import React from "react";

interface IProps {
  open: boolean;
  children?: React.ReactNode;
}

export const ModalConfirmCustom: React.FC<IProps> = ({ open, children }) => {
  return (
    <Modal open={open} centered closeIcon={false} footer={false}>
      {children}
    </Modal>
  );
};
