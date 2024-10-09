import { Input, InputProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { FieldProps } from "formik";

export interface InputCustomProps extends FieldProps, Omit<InputProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
  type?: string;
  styleInput?: React.CSSProperties;
}

export const InputCustom: React.FC<InputCustomProps> = ({
  field,
  form: { errors, touched },
  isRequired,
  label,
  styleWrapper,
  placeholder,
  disabled,
  allowClear,
  size,
  type,
  styleInput,
  ...rest
}) => {
  if (type === "password") {
    return (
      <>
        <div style={styleWrapper || { marginBottom: "5px" }}>
          <span>
            {label || ""}{" "}
            {isRequired && <span className="text-red-500">*</span>}
          </span>
          <Input.Password
            {...field}
            {...rest}
            placeholder={placeholder}
            allowClear={allowClear}
            disabled={disabled}
            size={size ? size : "small"}
            style={styleInput}
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
  }
  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          <span className="font-semibold"> {label || ""}</span>{" "}
          {isRequired && <span className="text-red-500">*</span>}
        </span>
        <Input
          {...field}
          {...rest}
          placeholder={placeholder}
          allowClear={allowClear}
          disabled={disabled}
          size={size ? size : "small"}
          style={styleInput}
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
