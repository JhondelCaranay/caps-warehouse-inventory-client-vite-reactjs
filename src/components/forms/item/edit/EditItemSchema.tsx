import * as Yup from "yup";
import { ItemForm } from "../../../../types";
export const initialValues: ItemForm = {
  name: "",
  description: "",
  model: "",
  unit: "",
  quantity: 1,
  price: 1,
  pictureUrl: "",
  brandId: "",
  categoryId: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  model: Yup.string(),
  unit: Yup.string().required("Required"),
  quantity: Yup.number().required("Required").integer("Must be an integer"),
  price: Yup.number().required("Required"),
  pictureUrl: Yup.mixed().test("type", "Only .jpg, .jpeg, .png, files are accepted", (value) => {
    if (value) {
      console.log("🚀 ~ file: CreateItemSchema.tsx:29 ~ value", value);
      return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
    } else {
      return true;
    }
  }),
  brandId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  categoryId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});
