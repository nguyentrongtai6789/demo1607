import { Tooltip } from "antd";
import Button, { ButtonHTMLType } from "antd/es/button";
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
  iCon: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tooltip?: string;
}

const IConCustom: React.FC<Props> = ({
  border,
  color,
  children,
  height,
  onClick,
  radius,
  width,
  htmlType,
  iCon,
  className,
  style,
  tooltip,
  ...rest
}) => {
  return (
    <Tooltip title={tooltip}>
      <Button
        onClick={onClick}
        style={style}
        icon={iCon}
        htmlType={htmlType}
        {...rest}
        className={className}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default IConCustom;
