import { Select, SelectProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorMessage, FieldProps } from "formik";
import { useEffect, useState } from "react";
import httpMethod, { URL } from "../config/httpMethod";

export interface SelectCustomProps
  extends FieldProps,
    Omit<SelectProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  api: string;
}

export const SelectDonViCustom: React.FC<SelectCustomProps> = ({
  field,
  form: { errors, touched },
  isRequired,
  label,
  styleWrapper,
  placeholder,
  disabled,
  allowClear,
  size,
  api,
  ...rest
}) => {
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    httpMethod
      .post(`${URL}/${api}`)
      .then((res: AxiosResponse) => {
        setOptions(
          res.data.data.map((item: any) => ({
            value: item.id || item.ma || item.giaTri,
            label: item.tenDonVi,
          }))
        );
      })
      .catch((error: AxiosError) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [api]);

  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <Select
          {...rest}
          showSearch
          placeholder={placeholder}
          allowClear={allowClear || true}
          disabled={disabled}
          size={size ? size : "small"}
          options={options}
          loading={loading}
          filterOption={(input, option) =>
            ((option?.label as string) ?? ("" as string))
              .toLowerCase()
              .includes(input.toLowerCase())
          }
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
