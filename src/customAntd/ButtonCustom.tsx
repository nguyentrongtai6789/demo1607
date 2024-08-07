import Button from "@mui/material/Button";
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
  startIcon?: React.ReactNode;
  className?: string;
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
  startIcon,
  className,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: color ? color : "rgb(30, 82, 203)",
        color: "white",
        borderRadius: radius ? radius : "none",
        height: height ? height : "25px",
        width: width ? width : "120px",
        fontSize: "14px",
      }}
      startIcon={startIcon}
      type={htmlType}
      {...rest}
      className={className}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
