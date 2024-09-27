import { Select, SelectProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorMessage, FieldProps } from "formik";
import { useEffect, useState } from "react";
import httpMethod, { URL } from "../config/httpMethod";
import { useTranslation } from "react-i18next";
import i18n from "../i18n/i18n";

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
  allowClear?: boolean;
}

export const SelectCustom: React.FC<SelectCustomProps> = ({
  field,
  form,
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
  const { name, value } = field;
  const { errors, touched } = form;
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("translation");

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
        value: value ? value : "",
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span className="text-red-500">*</span>}
        </span>
        <Select
          {...rest}
          placeholder={placeholder}
          allowClear={allowClear || false}
          disabled={disabled}
          size={size ? size : "small"}
          options={options}
          loading={loading}
          onChange={onChange || handleOnChange}
          value={field.value}
          style={style}
          status={errors[field.name] && touched[name] ? "error" : ""}
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
