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
  allowClear?: boolean;
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
  onChange,
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
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <Select
          {...rest}
          showSearch
          placeholder={placeholder}
          allowClear={allowClear || false}
          disabled={disabled}
          size={size ? size : "small"}
          options={options}
          loading={loading}
          onChange={onChange || handleOnChange}
          value={field.value}
          filterOption={(input, option) =>
            ((option?.label as string) ?? ("" as string))
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          status={errors[field.name] && touched[field.name] ? "error" : ""}
        />
        <div>
          {errors[field.name] && touched[field.name] && (
            <span
              style={{ fontStyle: "italic", color: "red", fontSize: "12px" }}
              className="validate-error"
            >
              {errors[field.name] as string}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
