import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";
import { useTranslation } from "react-i18next";

const NotificationCustom = (
  description: string,
  type?: IconType,
  duration?: number
) => {
  notification.open({
    message: description,
    description: false,
    type: type,
    closeIcon: false,
    duration: duration ? duration : 3,
    showProgress: true,
    pauseOnHover: true,
    icon:
      type === "error" ? (
        <ExclamationCircleOutlined />
      ) : type === "success" ? (
        <CheckCircleOutlined />
      ) : type === "info" ? (
        <InfoOutlined />
      ) : (
        <WarningOutlined />
      ),
    style: {
      color:
        type === "error"
          ? "red"
          : type === "warning"
          ? "yellow"
          : type === "info"
          ? "blue"
          : "green",
    },
  });
};

export default NotificationCustom;
