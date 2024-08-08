import { Select, SelectProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorMessage, FieldProps } from "formik";
import { useEffect, useState } from "react";
import httpMethod, { URL } from "../config/httpMethod";
import { useTranslation } from "react-i18next";
import { languages, resources } from "../i18n/i18nFrontEnd";

export interface SelectCustomProps
  extends FieldProps,
    Omit<SelectProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  api: string;
  valueNeedOfOption?: "giaTri" | "id" | "ma";
  style?: React.CSSProperties;
}

export const SelectCustom: React.FC<SelectCustomProps> = ({
  field,
  form: { errors, touched },
  isRequired,
  label,
  styleWrapper,
  placeholder,
  disabled,
  allowClear,
  onChange,
  size,
  api,
  valueNeedOfOption,
  style,
  ...rest
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);
    httpMethod
      .get(`${URL}/${api}`)
      .then((res: AxiosResponse) => {
        setOptions(
          res.data.data.map((item: any) => ({
            value:
              valueNeedOfOption === "id"
                ? item.id
                : valueNeedOfOption === "giaTri"
                ? item.giaTri
                : item.ma,
            label: item.ten || item.moTa,
            // label: t(`${item.ten}` as keyof typeof resources.en.login),
          }))
        );
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [i18n.language]);

  const handleOnChange = (value: any) => {
    const changeEvent = {
      target: {
        name: field.name,
        value: value,
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
        <Select
          {...rest}
          placeholder={placeholder}
          allowClear={allowClear}
          disabled={disabled}
          size={size ? size : "small"}
          options={options}
          loading={loading}
          onChange={handleOnChange || onChange}
          value={field.value}
          style={style}
        />
        <div>
          {errors[field.name] && touched[field.name] && (
            <span
              style={{ fontStyle: "italic", color: "red", fontSize: "12px" }}
            >
              <ErrorMessage name={field.name || ""} />
            </span>
          )}
        </div>
      </div>
    </>
  );
};
