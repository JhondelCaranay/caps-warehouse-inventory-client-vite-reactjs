import { ErrorMessage, Field } from "formik"
import TextError from "./TextError";

type InputProps = {
    label: string;
    name: string;
    placeholder?: string;
    isError: boolean;
    [x: string]: any;
};

const InputControl = ({ label, name, placeholder, isError, ...rest }: InputProps) => {
    return (
        <div className="formGroup">
            <label htmlFor={name}>{label}</label>
            <Field
                id={name}
                name={name}
                type="text"
                placeholder={placeholder}
                className={isError ? "input error" : "input"}
                autoComplete="off"
                {...rest}
            />
            <ErrorMessage
                name={name}
                component={(props) => <TextError {...props} />}
            />
        </div>
    )
}
export default InputControl