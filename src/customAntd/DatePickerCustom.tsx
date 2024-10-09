import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, Input, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { PickerLocale } from "antd/es/date-picker/generatePicker";
import en from "antd/es/date-picker/locale/en_US";
import dayjs from "dayjs";
import { FieldProps } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export interface DatePickerCustomProps
  extends FieldProps,
    Omit<DatePickerProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
}
export const DatepickerCustom: React.FC<DatePickerCustomProps> = ({
  form: { touched, errors, resetForm, values, initialValues, setFieldValue },
  field,
  isRequired,
  label,
  styleWrapper,
  size,
  onChange,
  ...rest
}) => {
  type PickerType = "date" | "month" | "year";

  const [type, setType] = useState<PickerType>("date");

  const { t } = useTranslation(["translation"]);

  const [openCalender, setOpenCalender] = useState<boolean>(false);

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

  const regexNgayThangNam = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

  const regexThangNam = /^(0[1-9]|1[0-2])-\d{4}$/;

  const regexNam = /^(18\d{2}|19\d{2}|20\d{2}|21\d{2})$/;

  const formattedValue = field.value
    ? dayjs(
        field.value,
        type === "date"
          ? "DD-MM-YYYY"
          : type === "month"
          ? "MM-YYYY"
          : type === "year"
          ? "YYYY"
          : ""
      )
    : null;

  useEffect(() => {
    if (values === initialValues) {
      setType("date");
    }
  }, [values]);

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          <span className="font-semibold"> {label || ""}</span>
          {isRequired && <span className="text-red-500 font-bold"> *</span>}
        </span>
        <div>
          <Input
            autoComplete="off"
            {...field}
            allowClear={true}
            onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (
                type === "date" &&
                !regexNgayThangNam.test(event.target.value)
              ) {
                setFieldValue(field.name, "");
              }
            }}
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              let value = event.target.value;
              if (type === "date") {
                if (value.length < 5 && value.length > 2) {
                  value = value.slice(0, 2) + "-" + value.slice(2);
                }
                if (value.length === 5) {
                  value = value.slice(0, 5) + "-" + value.slice(5, 9);
                }
                if (value.length > 10) {
                  return;
                }
              }
              if (type === "month") {
                if (value.length === 3) {
                  value = value.slice(0, 2) + "-" + value.slice(2);
                }
                if (value.length > 7) {
                  return;
                }
              }
              if (type === "year") {
                if (value.length > 4) return;
              }
              const changeEvent = {
                target: {
                  name: field.name,
                  value: value.startsWith("0")
                    ? value
                    : moment(
                        value,
                        type === "date"
                          ? "DD-MM-YYYY"
                          : type === "month"
                          ? "MM-YYYY"
                          : type === "year"
                          ? "YYYY"
                          : ""
                      ).isValid()
                    ? value
                    : "",
                },
              };
              field.onChange(changeEvent);
            }}
            addonAfter={
              <>
                <CalendarOutlined
                  onClick={() => {
                    setOpenCalender(!openCalender);
                  }}
                />
                <DatePicker
                  id="xxx"
                  className="datePicker-custom"
                  onChange={(value: any) => {
                    const formatValue =
                      (value &&
                        value.format(
                          type === "date"
                            ? "DD-MM-YYYY"
                            : type === "month"
                            ? "MM-YYYY"
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
                  }}
                  format={
                    type === "date"
                      ? "DD-MM-YYYY"
                      : type === "month"
                      ? "MM-YYYY"
                      : type === "year"
                      ? "YYYY"
                      : ""
                  }
                  value={
                    dayjs(
                      formattedValue,
                      type === "date"
                        ? "DD-MM-YYYY"
                        : type === "month"
                        ? "MM-YYYY"
                        : type === "year"
                        ? "YYYY"
                        : ""
                    ).isValid()
                      ? formattedValue
                      : null
                  }
                  picker={type}
                  open={openCalender}
                  locale={localeCustom}
                  onOpenChange={() => {
                    setOpenCalender(!openCalender);
                  }}
                />
              </>
            }
            status={errors[field.name] && touched[field.name] ? "error" : ""}
          />
          {errors[field.name] && touched[field.name] && (
            <div className="validate-error text-red-500 text-xs italic">
              {errors[field.name] as string}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
