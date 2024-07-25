import {
  DatePicker,
  DatePickerProps,
  Select,
  TimePicker,
  TimePickerProps,
} from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { FieldProps } from "formik";
import { useState } from "react";

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
  ...rest
}) => {
  type PickerType = "time" | "date";

  const { Option } = Select;

  const [type, setType] = useState<PickerType>("date");

  const PickerWithType = ({
    type,
    onChange,
  }: {
    type: PickerType;
    onChange: TimePickerProps["onChange"] | DatePickerProps["onChange"];
  }) => {
    if (type === "time") return <TimePicker onChange={onChange} />;
    if (type === "date")
      return <DatePicker onChange={onChange} format={"DD/MM/YYYY"} {...rest} />;
    if (type === "month")
      return (
        <DatePicker
          onChange={onChange}
          format={"MM/YYYY"}
          {...rest}
          placeholder="Select month"
        />
      );
    return <DatePicker picker={type} onChange={onChange} {...rest} />;
  };
  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "40%" }}>
            <Select value={type} onChange={setType} size={size || "small"}>
              <Option value="date">Date</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
          </div>
          <div style={{ width: "60%", marginLeft: "3px" }}>
            <PickerWithType
              type={type}
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
