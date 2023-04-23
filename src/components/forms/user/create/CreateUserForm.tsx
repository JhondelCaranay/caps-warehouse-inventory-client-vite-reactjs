import styles from "./CreateUserForm.module.scss";
import { AddAPhoto, RemoveCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useAddNewUserMutation } from "../../../../app/services/user/userApiSlice";
import { storage } from "../../../../config/firebase";
import { Capitalize } from "../../../../config/utils/functions";
import { ROLES, UserCreateForm, USER_STATUS } from "../../../../types";
import TextError from "../../../formik/TextError";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { DebugControl } from "../../../formik";
import { useAuth } from "../../../../hooks";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const { role: currentUserRole } = useAuth();

  const [addNewUser, { isLoading: isUserUpdating }] = useAddNewUserMutation();

  const onSubmit = async (values: UserCreateForm, submitProps: FormikHelpers<UserCreateForm>) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      let url = "";
      if (values.avatarUrl) {
        const file = values.avatarUrl;
        const storageRef = ref(storage, `caps/image/${file.name + v4()}`);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
      }

      const result = await addNewUser({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        position: values.position,
        role: values.role,
        status: values.status,
        contact: values.contact || null,
        address: values.address || null,
        avatarUrl: url || null,
      }).unwrap();
      console.log("🚀 ~ file: CreateUserForm.tsx:47 ~ onSubmit ~ result:", result);

      toast.success("User created successfully");
      submitProps.resetForm();
      navigate("/dash/users");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element = <></>;

  content = (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          const buttonText =
            isUserUpdating || formik.isSubmitting ? (
              <PulseLoader color={"#1976d2"} />
            ) : (
              <span>Create</span>
            );

          return (
            <Form>
              <h1 className={styles.title}>Create User</h1>
              {/* <DebugControl values={formik.values} /> */}
              <div className={styles.row}>
                {/* LEFT */}
                <div className={styles.left}>
                  {/* FIRSTNAME INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="first_name">
                      First Name <small>(required)</small>
                    </label>
                    <Field
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      className={`${styles.input} ${
                        Boolean(formik.touched.first_name && formik.errors.first_name)
                          ? styles.error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="first_name"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* LASTNAME INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="last_name">
                      Last Name <small>(required)</small>
                    </label>
                    <Field
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      className={`${styles.input} ${
                        Boolean(formik.touched.last_name && formik.errors.last_name)
                          ? styles.error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="last_name"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* EMAIL INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="email">
                      Email <small>(required)</small>
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Email"
                      className={`${styles.input} ${
                        Boolean(formik.touched.email && formik.errors.email) ? styles.error : ""
                      }`}
                    />
                    <ErrorMessage
                      name="email"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* EMAIL INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="position">
                      Position <small>(required)</small>
                    </label>
                    <Field
                      id="position"
                      name="position"
                      type="text"
                      placeholder="Position"
                      className={`${styles.input} ${
                        Boolean(formik.touched.position && formik.errors.position)
                          ? styles.error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="position"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* SELECT USER ROLE */}
                  <div className={styles.formGroup}>
                    <label htmlFor="role">
                      System Privilege <small>(required)</small>
                    </label>
                    <Field
                      id="role"
                      name="role"
                      as="select"
                      className={`${styles.input} ${
                        Boolean(formik.touched.role && formik.errors.role) ? styles.error : ""
                      }`}
                    >
                      <option value="">Select Role</option>
                      {/* {Object.keys(ROLES)
                        .filter((key) => key !== ROLES.SUPER_ADMIN)
                        .map((key) => (
                          <option key={key} value={key}>
                            {Capitalize(key)}
                          </option>
                        ))} */}

                      {/* if super admin show all roles */}
                      {currentUserRole === ROLES.SUPER_ADMIN &&
                        Object.keys(ROLES).map((key) => (
                          <option key={key} value={key}>
                            {Capitalize(key)}
                          </option>
                        ))}

                      {/* if admin show controller and engineer */}
                      {currentUserRole === ROLES.ADMIN &&
                        [ROLES.WAREHOUSE_CONTROLLER, ROLES.ENGINEER].map((key) => (
                          <option key={key} value={key}>
                            {Capitalize(key)}
                          </option>
                        ))}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* EMAIL INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="contact">
                      Contact <small>(optional)</small>
                    </label>
                    <Field
                      id="contact"
                      name="contact"
                      type="text"
                      placeholder="+631234567890"
                      className={`${styles.input} ${
                        Boolean(formik.touched.contact && formik.errors.contact) ? styles.error : ""
                      }`}
                    />
                    <ErrorMessage
                      name="contact"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>
                </div>

                {/* RIGHT */}
                <div className={styles.right}>
                  {/* ADDRESS TEXT AREA */}
                  <div className={styles.formGroup}>
                    <label htmlFor="address">
                      Address <small>(optional)</small>
                    </label>
                    <Field
                      id="address"
                      name="address"
                      as="textarea"
                      rows="4"
                      placeholder="Address"
                      className={`${styles.input} ${
                        Boolean(formik.touched.address && formik.errors.address) ? styles.error : ""
                      }`}
                    />
                    <ErrorMessage
                      name="address"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* USER PROFILE PICTURE FILE INPUT */}
                  <div className={styles.formGroup}>
                    <label>
                      Picture <small>(optional)</small>
                    </label>
                    <div
                      className={`${styles["add-photo"]} ${
                        Boolean(formik.touched.avatarUrl && formik.errors.avatarUrl)
                          ? styles.error
                          : ""
                      }`}
                    >
                      <div className={styles.controls}>
                        <label htmlFor="avatarUrl">
                          <AddAPhoto
                            className={styles.icons}
                            fontSize="large"
                            onClick={(e) => formik.setFieldTouched("avatarUrl", true)}
                          />
                        </label>
                        <RemoveCircle
                          className={styles.icons}
                          fontSize="large"
                          onClick={(e) => {
                            formik.setFieldValue("avatarUrl", null);
                          }}
                        />
                      </div>
                      {formik.values.avatarUrl && (
                        <div className={styles.preview}>
                          <img
                            style={{
                              display: formik.errors.avatarUrl ? "none" : "block",
                            }}
                            src={URL.createObjectURL(formik.values.avatarUrl)}
                            alt="preview"
                          />
                        </div>
                      )}
                    </div>
                    <Field
                      name="avatarUrl"
                      id="avatarUrl"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      className={`${styles.input} ${
                        Boolean(formik.touched.avatarUrl && formik.errors.avatarUrl)
                          ? styles.error
                          : ""
                      }`}
                      value={undefined}
                      onChange={(event: any) => {
                        formik.setFieldValue("avatarUrl", event.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="avatarUrl"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  disabled={formik.isSubmitting}
                >
                  {buttonText}
                </Button>
              </div>

              {/* DEBUGER */}
              {import.meta.env.VITE_NODE_ENV === "development" && (
                <DebugControl values={formik.values} />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );

  return <div className={styles.createUserForm}>{content}</div>;
};
export default CreateUserForm;

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

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("Required"),
  last_name: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email address"),
  position: Yup.string().required("Required"),
  address: Yup.string(),

  contact: Yup.string().matches(/^(?:\+63|0)\d{10}$/, "Must be only digits"),
  // contact: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
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
