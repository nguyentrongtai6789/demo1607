import { Button } from "antd";
import { ButtonHTMLType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
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
  size?: SizeType;
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
  size,
  ...rest
}) => {
  return (
    <Button
      size={size ? size : "small"}
      onClick={onClick}
      style={{
        backgroundColor: color ? color : "#e7dfab ",
        border: border ? border : "1px solid grey",
        borderRadius: radius ? radius : "none",
        height: height ? height : "25px",
        width: width ? width : "120px",
        fontWeight: "600",
      }}
      htmlType={htmlType}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
