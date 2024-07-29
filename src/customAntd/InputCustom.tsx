import { Input, InputProps } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { ErrorMessage, FieldProps } from "formik";

export interface InputCustomProps extends FieldProps, Omit<InputProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
  size?: SizeType;
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
  ...rest
}) => {
  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <Input
          {...field}
          {...rest}
          placeholder={placeholder}
          allowClear={allowClear}
          disabled={disabled}
          size={size ? size : "small"}
          autoComplete="off"
          style={{}}
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
