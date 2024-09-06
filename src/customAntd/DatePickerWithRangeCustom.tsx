import { DatePicker, DatePickerProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RangePickerProps } from "antd/es/date-picker";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export interface RangePickerCustomProps
  extends FieldProps,
    Omit<RangePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  fieldName1: string;
  fieldName2: string;
}
export const DatePickerWithRangeCustom: React.FC<RangePickerCustomProps> = ({
  form: { errors, touched, setFieldValue, values, getFieldMeta },
  field,
  isRequired,
  label,
  styleWrapper,
  size,
  onChange,
  fieldName1,
  fieldName2,
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

  const handleOnChange = (value: any) => {
    const formatValue1 = (value && value[0].format("DD/MM/YYYY")) || null;
    const formatValue2 = (value && value[1].format("DD/MM/YYYY")) || null;
    const changeEvent1 = {
      target: {
        name: fieldName1,
        value: formatValue1,
      },
    };
    const changeEvent2 = {
      target: {
        name: fieldName2,
        value: formatValue2,
      },
    };
    field.onChange(changeEvent1);
    field.onChange(changeEvent2);
  };

  const [value, setValue] = useState<(dayjs.Dayjs | null)[]>([null, null]);

  const { t } = useTranslation();

  useEffect(() => {
    const value1 = getFieldMeta(fieldName1).value;
    const value2 = getFieldMeta(fieldName2).value;
    const formatValue1 =
      typeof value1 === "string" ? dayjs(value1, "DD/MM/YYYY") : null;
    const formatValue2 =
      typeof value2 === "string" ? dayjs(value2, "DD/MM/YYYY") : null;
    setValue([formatValue1, formatValue2]);
  }, [getFieldMeta(fieldName1).value, getFieldMeta(fieldName2).value]);

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <div style={{ width: "100%", display: "flex" }}>
          <RangePicker
            {...rest}
            picker="date"
            onChange={onChange || handleOnChange}
            disabledDate={disabled7DaysDate}
            value={[value[0], value[1]]}
            format={"DD/MM/YYYY"}
            placeholder={[t("fromDate"), t("toDate")]}
            id={{
              start: "startInput",
              end: "endInput",
            }}
          />
        </div>
      </div>
    </>
  );
};
