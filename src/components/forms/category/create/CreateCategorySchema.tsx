import * as Yup from "yup";
import { CategoryForm } from "../../../../types";

export const initialValues: CategoryForm = {
  name: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});
