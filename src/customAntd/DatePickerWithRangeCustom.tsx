import { DatePicker, DatePickerProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { FieldProps } from "formik";

export interface DatePickerCustomProps
  extends FieldProps,
    Omit<DatePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
}
export const DatePickerWithRangeCustom: React.FC<DatePickerCustomProps> = ({
  form: { errors, touched },
  field,
  isRequired,
  label,
  styleWrapper,
  size,
  ...rest
}) => {
  const { RangePicker } = DatePicker;

  const disabled7DaysDate: DatePickerProps["disabledDate"] = (
    current,
    { from }
  ) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= 7;
    }
    return false;
  };

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <div style={{ width: "100%", display: "flex" }}>
          <RangePicker
            picker="date"
            disabledDate={disabled7DaysDate}
            id={{
              start: "startInput",
              end: "endInput",
            }}
            onFocus={(_, info) => {
              console.log("Focus:", info.range);
            }}
            onBlur={(_, info) => {
              console.log("Blur:", info.range);
            }}
          />
        </div>
      </div>
    </>
  );
};
