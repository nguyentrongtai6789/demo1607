import { DatePicker, DatePickerProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface RangePickerCustomProps
  extends FieldProps,
    Omit<RangePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
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
  rangeTime,
  ...rest
}) => {
  const { RangePicker } = DatePicker;

  const { name } = field;

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
    const changeEvent = {
      target: {
        name: name,
        value: [formatValue1, formatValue2],
      },
    };
    field.onChange(changeEvent);
  };

  const [value, setValue] = useState<(dayjs.Dayjs | null)[]>([null, null]);

  const { t } = useTranslation("translation");

  useEffect(() => {
    const value = getFieldMeta(name).value as string[];
    if (!value) {
      return;
    }
    const value1 = value[0];
    const value2 = value[1];
    if (value1 && value2) {
      const formatValue1 =
        typeof value1 === "string" ? dayjs(value1, "DD/MM/YYYY") : null;
      const formatValue2 =
        typeof value2 === "string" ? dayjs(value2, "DD/MM/YYYY") : null;
      setValue([formatValue1, formatValue2]);
    } else {
      setValue([null, null]);
    }
  }, [getFieldMeta(name).value]);

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span className="text-red-500">*</span>}
        </span>
        <RangePicker
          {...rest}
          picker="date"
          onChange={handleOnChange || onChange}
          disabledDate={disabledDate}
          value={[value[0], value[1]]}
          format={"DD/MM/YYYY"}
          placeholder={[t("tuNgay"), t("denNgay")]}
          id={{
            start: "startInput",
            end: "endInput",
          }}
          status={errors[name] && touched[name] ? "error" : ""}
        />
        <div>
          {errors[name] && touched[name] && (
            <span className="validate-error text-red-500 text-xs italic">
              {errors[name] as string}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
