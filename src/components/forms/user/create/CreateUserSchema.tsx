import * as Yup from "yup";
import { UserCreateForm, USER_STATUS } from "../../../../types";
export const initialValues: UserCreateForm = {
  first_name: "",
  last_name: "",
  email: "",
  position: "",
  address: "",
  contact: "",
  avatarUrl: "",
  status: USER_STATUS.ACTIVE,
  role: "",
};

export const validationSchema = Yup.object({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email address"),
  position: Yup.string().required("Required"),
  address: Yup.string(),
  contact: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
  avatarUrl: Yup.mixed().test("type", "Only .jpg, .jpeg, .png, files are accepted", (value) => {
    if (value) {
      return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
    } else {
      return true;
    }
  }),
  status: Yup.string(),
  role: Yup.string().required("Required"),
});
