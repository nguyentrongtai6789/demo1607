import { Modal } from "antd";
import header from "../../layout/header";

interface IProps {
  open: boolean;
  children?: React.ReactNode;
  title?: string;
  width?: number;
}
export const ModalCustom: React.FC<IProps> = ({
  children,
  open,
  title,
  width,
}) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      width={width || 1000}
      closeIcon={false}
      footer={false}
      className="modal-custom"
    >
      {children}
    </Modal>
  );
};
