import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { PickerLocale } from "antd/es/date-picker/generatePicker";
import en from "antd/es/date-picker/locale/en_US";
import dayjs from "dayjs";
import { FieldProps } from "formik";
import moment from "moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import MaskedTextInput from "react-text-mask";

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
  disabled,
  ...rest
}) => {
  type PickerType = "date" | "month" | "year";

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
        t("chuNhat"),
        t("thu2"),
        t("thu3"),
        t("thu4"),
        t("thu5"),
        t("thu6"),
        t("thu7"),
      ],
    },
  };

  const formattedValue = field.value ? dayjs(field.value, "DD-MM-YYYY") : null;

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          <span className="font-semibold"> {label || ""}</span>
          {isRequired && <span className="text-red-500 font-bold"> *</span>}
        </span>
        <div>
          <div
            className="flex datePicker-wrapper-custom w-full"
            style={
              errors[field.name] && touched[field.name]
                ? { border: "1px solid #ff4d4f" }
                : { border: "1px solid #d9d9d9" }
            }
          >
            <div className="w-10/12" style={{ height: "23px" }}>
              <MaskedTextInput
                {...field}
                className={
                  !disabled ? "input-date-picker" : "input-date-picker-disabled"
                }
                autoComplete="off"
                type="text"
                value={field.value}
                disabled={disabled}
                mask={[
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  "-",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value;
                  const changeEvent = {
                    target: {
                      name: field.name,
                      value: value.startsWith("0")
                        ? value
                        : moment(value, "DD-MM-YYYY").isValid()
                        ? value
                        : "",
                    },
                  };
                  field.onChange(changeEvent);
                }}
              />
            </div>
            <div
              className="w-2/12 flex justify-center items-center"
              style={disabled ? { backgroundColor: "rgba(0, 0, 0, 0.04)" } : {}}
            >
              <CalendarOutlined
                onClick={() => {
                  if (disabled) return;
                  setOpenCalender(!openCalender);
                }}
                style={
                  errors[field.name] && touched[field.name]
                    ? {
                        color: "#ff4d4f",
                        cursor: disabled ? "not-allowed" : "",
                      }
                    : { cursor: disabled ? "not-allowed" : "" }
                }
              />
            </div>
            <DatePicker
              id="xxx"
              className="datePicker-custom"
              onChange={(value: any) => {
                const formatValue =
                  (value && value.format("DD-MM-YYYY")) || null;
                const changeEvent = {
                  target: {
                    name: field.name,
                    value: formatValue || "",
                  },
                };
                field.onChange(changeEvent);
              }}
              format={"DD-MM-YYYY"}
              value={
                dayjs(formattedValue, "DD-MM-YYYY").isValid()
                  ? formattedValue
                  : null
              }
              picker={"date"}
              open={openCalender}
              locale={localeCustom}
              onOpenChange={() => {
                setOpenCalender(!openCalender);
              }}
            />
          </div>
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
