import { Select, SelectProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AxiosError, AxiosResponse } from "axios";
import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import httpMethod, { URL } from "../services/httpMethod";
import i18n from "../i18n/i18n";

export interface SelectCustomProps
  extends FieldProps,
    Omit<SelectProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  style?: React.CSSProperties;
  maDanhMuc: string;
  listGiaTri?: string[];
  allowClear?: boolean;
}

export const SelectDanhMucByMa: React.FC<SelectCustomProps> = ({
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
  maDanhMuc,
  listGiaTri,
  style,
  ...rest
}) => {
  const { errors, touched } = form;
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation("translation");

  useEffect(() => {
    setLoading(true);
    httpMethod
      .get(`${URL}/danh-muc/${maDanhMuc}`)
      .then((res: AxiosResponse) => {
        if (!listGiaTri) {
          setOptions(
            res.data.data.map((item: any) => ({
              value: item.giaTri,
              label: item.ten || item.moTa,
            }))
          );
        } else {
          const filteredData = res.data.data.filter((item: any) =>
            listGiaTri.includes(item.giaTri)
          );
          setOptions(
            filteredData.map((item: any) => ({
              value: item.giaTri,
              label: item.ten || item.moTa,
            }))
          );
        }
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
          status={errors[field.name] && touched[field.name] ? "error" : ""}
        />
        <div>
          {errors[field.name] && touched[field.name] && (
            <span className="validate-error text-red-500 text-xs italic">
              {errors[field.name] as string}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
