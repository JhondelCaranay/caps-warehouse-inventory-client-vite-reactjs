import { ErrorMessage, Field } from "formik"
import TextError from "./TextError";

type SelectControlProps = {
    label: string;
    name: string;
    children: JSX.Element;
    isError: boolean;
    [x: string]: any;
};
export const SelectControl = ({ label, name, isError, children, ...rest }: SelectControlProps) => {
    return (
        <div className="formGroup">
            <label htmlFor={name}>{label}</label>
            <Field
                id={name}
                name={name}
                as="select"
                className={isError ? "input error" : "input"}
                {...rest}
            >
                <option value="">Select {label}</option>
                {children}
            </Field>
            <ErrorMessage
                name={name}
                component={(props) => <TextError {...props} />}
            />
        </div>
    )
}