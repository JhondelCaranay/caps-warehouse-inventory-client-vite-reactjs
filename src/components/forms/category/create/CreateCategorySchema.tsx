import * as Yup from "yup";
import { CategoryCreateForm } from "../../../../types";

export const initialValues: CategoryCreateForm = {
    name: "",
};

export const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
});
