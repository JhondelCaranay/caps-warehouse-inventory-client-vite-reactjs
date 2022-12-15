import * as Yup from "yup";
import { ProjectForm } from "../../../../types";

export const initialValues: ProjectForm = {
  name: "",
  address: "",
  userId: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  userId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});
