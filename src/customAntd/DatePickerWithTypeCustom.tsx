import { DatePicker, DatePickerProps, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import dayjs from "dayjs";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import en from "antd/es/date-picker/locale/en_US";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

export interface DatePickerCustomProps
  extends FieldProps,
    Omit<DatePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
}
export const DatePickerWithTypeCustom: React.FC<DatePickerCustomProps> = ({
  form: { touched, errors, resetForm, values, initialValues },
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

  const { t } = useTranslation(["translation"]);

  const localeCustom: PickerLocale = {
    ...en,
    lang: {
      ...en.lang,
      today: t("homNay"),
      shortMonths: [
        t("thang1"),
        t("thang2"),
        t("thang3"),
        t("thang4"),
        t("thang5"),
        t("thang6"),
        t("thang7"),
        t("thang8"),
        t("thang9"),
        t("thang10"),
        t("thang11"),
        t("thang12"),
      ],
      shortWeekDays: [
        t("thu2"),
        t("thu3"),
        t("thu3"),
        t("thu4"),
        t("thu5"),
        t("thu6"),
        t("thu7"),
        t("chuNhat"),
      ],
    },
  };

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
          placeholder={t("chonNgay")}
          locale={localeCustom}
        />
      );
    }
    if (type === "month") {
      return (
        <DatePicker
          onChange={onChange}
          format={"MM/YYYY"}
          value={formattedValue}
          picker={type}
          {...rest}
          placeholder={t("chonThang")}
        />
      );
    }
    if (type === "year") {
      return (
        <DatePicker
          picker={type}
          value={formattedValue}
          onChange={onChange}
          placeholder={t("chonNam")}
          {...rest}
        />
      );
    }
    return <></>;
  };

  useEffect(() => {
    if (values === initialValues) {
      setType("date");
    }
  }, [values]);

  const handleOnChange = (value: any) => {
    const formatValue =
      (value &&
        value.format(
          type === "date"
            ? "DD/MM/YYYY"
            : type === "month"
            ? "MM/YYYY"
            : type === "year"
            ? "YYYY"
            : ""
        )) ||
      null;
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
              <Option value="date">{t("ngay")}</Option>
              <Option value="month">{t("thang")}</Option>
              <Option value="year">{t("nam")}</Option>
            </Select>
          </div>
          <div style={{ width: "60%", marginLeft: "3px" }}>
            <PickerWithType type={type} onChange={onChange || handleOnChange} />
          </div>
        </div>
      </div>
    </>
  );
};
