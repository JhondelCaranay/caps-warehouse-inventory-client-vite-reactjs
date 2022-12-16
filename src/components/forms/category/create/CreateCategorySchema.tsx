import * as Yup from "yup";
import { CategoryForm } from "../../../../types";

export const initialValues: CategoryForm = {
  name: "",
  // image: "",
};
const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  // only accept image files
  // image: Yup.mixed().test("type", "Only accept image files", (value) => {
  //   console.log("🚀 ~ file: CreateCategorySchema.tsx:14 ~ image:Yup.mixed ~ value", value);
  //   if (value) {
  //     return allowedTypes.includes(value.type);
  //   }
  //   return true;
  // }),
});
