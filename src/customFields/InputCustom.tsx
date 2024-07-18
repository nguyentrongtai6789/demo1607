import { Input, InputProps } from "antd";
import { ErrorMessage, FieldProps } from "formik";

export interface InputCustomProps extends FieldProps, Omit<InputProps, "form"> {
  isRequired?: boolean;
  label?: string;
  styleWrapper?: React.CSSProperties;
}

export const InputCustom: React.FC<InputCustomProps> = ({
  field,
  form: { errors, touched },
  isRequired,
  label,
  styleWrapper,
  ...rest
}) => {
  return (
    <>
      <div style={styleWrapper || { marginBottom: "5px" }}>
        <span>
          {label || ""} {isRequired && <span style={{ color: "red" }}>*</span>}
        </span>
        <Input {...field} {...rest} />
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
