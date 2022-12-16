import * as Yup from "yup";
import { CategoryForm } from "../../../../types/formik.type";

export const initialValues: CategoryForm = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
