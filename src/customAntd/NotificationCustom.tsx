import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

const NotificationCustom = (
  description: string,
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
