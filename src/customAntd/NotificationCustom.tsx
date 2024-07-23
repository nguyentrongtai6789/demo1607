import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";
import { useTranslation } from "react-i18next";
import LOGIN from "../pages/login/index.json";

const NotificationCustom = (
  description: keyof typeof LOGIN.en,
  type?: IconType,
  duration?: number
) => {
  return notification.open({
    message: false,
    description: description,
    type: type,
    closeIcon: false,
    duration: duration ? duration : 1,
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
