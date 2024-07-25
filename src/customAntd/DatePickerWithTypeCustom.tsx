import { DatePicker, DatePickerProps, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { FieldProps } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export interface DatePickerCustomProps
  extends FieldProps,
    Omit<DatePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
}
export const DatePickerWithTypeCustom: React.FC<DatePickerCustomProps> = ({
  form: { errors, touched },
  field,
  isRequired,
  label,
  styleWrapper,
  size,
  onChange,
  ...rest
}) => {
  type PickerType = "date" | "month" | "year";

  const { Option } = Select;

  const [type, setType] = useState<PickerType>("date");

  const PickerWithType = ({
    type,
    onChange,
  }: {
    type: PickerType;
    onChange: any;
  }) => {
    const formattedValue = field.value
      ? dayjs(
          field.value,
          type === "date"
            ? "DD/MM/YYYY"
            : type === "month"
            ? "MM/YYYY"
            : type === "year"
            ? "YYYY"
            : ""
        )
      : null;
    if (type === "date") {
      return (
        <DatePicker
          onChange={onChange}
          format={"DD/MM/YYYY"}
          value={formattedValue}
          {...rest}
        />
      );
    }
    if (type === "month") {
      return (
        <DatePicker
          onChange={onChange}
          format={"MM/YYYY"}
          value={formattedValue}
          placeholder="Select month"
          picker={type}
          {...rest}
        />
      );
    }
    if (type === "year") {
      return (
        <DatePicker
          picker={type}
          value={formattedValue}
          onChange={onChange}
          {...rest}
        />
      );
    }
    return <></>;
  };

  const handleOnChange = (value: any) => {
    const formatValue = value.format(
      type === "date"
        ? "DD/MM/YYYY"
        : type === "month"
        ? "MM/YYYY"
        : type === "year"
        ? "YYYY"
        : ""
    );
    const changeEvent = {
      target: {
        name: field.name,
        value: formatValue || "",
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "40%" }}>
            <Select
              value={type}
              onChange={(value) => {
                setType(value);
                const changeEvent = {
                  target: {
                    name: field.name,
                    value: "",
                  },
                };
                field.onChange(changeEvent);
              }}
              size={size || "small"}
            >
              <Option value="date">Date</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
          </div>
          <div style={{ width: "60%", marginLeft: "3px" }}>
            <PickerWithType type={type} onChange={handleOnChange || onChange} />
          </div>
        </div>
      </div>
    </>
  );
};
