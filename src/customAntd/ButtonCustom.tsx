import { Button } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import React from "react";
interface Props {
  border?: string;
  color?: string;
  children?: React.ReactNode;
  height?: string;
  onClick?: () => void;
  radius?: string;
  width?: string;
  htmlType?: ButtonHTMLType;
}

const ButtonCustom: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  htmlType,
}) => {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: color,
        border,
        borderRadius: radius,
        height,
        width,
      }}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
