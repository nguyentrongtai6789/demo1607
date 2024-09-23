import { DatePicker, DatePickerProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RangePickerProps } from "antd/es/date-picker";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface RangePickerCustomProps
  extends FieldProps,
    Omit<RangePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  fieldName1: string;
  fieldName2: string;
  rangeTime: string;
}
export const DatePickerWithRangeCustom: React.FC<RangePickerCustomProps> = ({
  form,
  field,
  isRequired,
  label,
  styleWrapper,
  size,
  onChange,
  fieldName1,
  fieldName2,
  rangeTime,
  ...rest
}) => {
  const { RangePicker } = DatePicker;

  const { errors, touched, setFieldValue, values, getFieldMeta } = form;

  const disabledDate: DatePickerProps["disabledDate"] = (current, { from }) => {
    if (from) {
      return Math.abs(current.diff(from, "days")) >= Number(rangeTime);
    }
    return false;
  };

  const handleOnChange = (value: any) => {
    const formatValue1 = (value && value[0].format("DD/MM/YYYY")) || "";
    const formatValue2 = (value && value[1].format("DD/MM/YYYY")) || "";
    console.log(formatValue1, formatValue2);
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

  useEffect(() => {
    const value1 = getFieldMeta(fieldName1).value;
    console.log(value1);
    console.log("thay đổi errors");
    console.log(errors[fieldName1]);
    console.log(errors[fieldName2]);
    console.log(touched[fieldName1]);
    console.log(touched[fieldName2]);
  }, [
    errors[fieldName1],
    errors[fieldName2],
    touched[fieldName1],
    touched[fieldName2],
  ]);

  const [value, setValue] = useState<(dayjs.Dayjs | null)[]>([null, null]);

  const { t } = useTranslation("datePicker");

  useEffect(() => {
    const value1 = getFieldMeta(fieldName1).value;
    const value2 = getFieldMeta(fieldName2).value;
    if (value1 && value2) {
      const formatValue1 =
        typeof value1 === "string" ? dayjs(value1, "DD/MM/YYYY") : null;
      const formatValue2 =
        typeof value2 === "string" ? dayjs(value2, "DD/MM/YYYY") : null;
      setValue([formatValue1, formatValue2]);
    } else {
      setValue([null, null]);
    }
  }, [getFieldMeta(fieldName1).value, getFieldMeta(fieldName2).value]);

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <RangePicker
          {...rest}
          picker="date"
          onChange={onChange || handleOnChange}
          disabledDate={disabledDate}
          value={[value[0], value[1]]}
          format={"DD/MM/YYYY"}
          placeholder={[t("fromDate"), t("toDate")]}
          id={{
            start: "startInput",
            end: "endInput",
          }}
          status={errors[fieldName1] && touched[fieldName1] ? "error" : ""}
        />
        <div>
          {errors[fieldName1] && (
            <span
              style={{ fontStyle: "italic", color: "red", fontSize: "12px" }}
            >
              {errors[fieldName1] as string}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
