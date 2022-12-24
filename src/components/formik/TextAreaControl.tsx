import { ErrorMessage, Field } from "formik";
import TextError from "./TextError";

type TextAreaControlProps = {
  label: string;
  name: string;
  placeholder?: string;
  isError: boolean;
  [x: string]: any;
};

const TextAreaControl = ({ label, name, placeholder, isError, ...rest }: TextAreaControlProps) => {
  return (
    <div className="formGroup">
      <label htmlFor={name}>{label}</label>
      <Field
        id={name}
        name={name}
        as="textarea"
        rows="4"
        placeholder={placeholder}
        className={isError ? "input error" : "input"}
        {...rest}
      />
      <ErrorMessage name={name} component={(props) => <TextError {...props} />} />
    </div>
  );
};
export default TextAreaControl;
