import * as Yup from "yup";
import { BrandForm } from "../../../../types";

export const initialValues: BrandForm = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
