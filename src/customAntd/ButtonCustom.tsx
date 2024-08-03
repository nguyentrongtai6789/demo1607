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
  // size?: string;
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
  // size,
  ...rest
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      style={{
        backgroundColor: color ? color : "rgb(239, 248, 172)",
        color: "black",
        borderRadius: radius ? radius : "none",
        height: height ? height : "25px",
        width: width ? width : "120px",
        fontWeight: "550",
      }}
      type={htmlType}
      // size={size ? size : "small"}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;
