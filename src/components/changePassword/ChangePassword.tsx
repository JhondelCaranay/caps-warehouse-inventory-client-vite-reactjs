import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import styles from "./ChangePassword.module.scss";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import { TextError } from "../formik";
import { useUpdateUserPasswordMutation } from "../../app/services/user/userApiSlice";
import { toast } from "react-toastify";
import ErrorList from "../toast/ErrorList";
import { User } from "../../types";

type ChangePasswordFormValues = {
  newPassword: string;
  confirmNewPassword: string;
};

const initialValues: ChangePasswordFormValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
  confirmNewPassword: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.newPassword === value;
    }),
});

const ChangePassword = ({ user }: { user: User }) => {
  const [ChangePassword, { isLoading }] = useUpdateUserPasswordMutation();

  const onSubmit = async (
    values: ChangePasswordFormValues,
    submitProps: FormikHelpers<ChangePasswordFormValues>
  ) => {
    //sleep for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await ChangePassword({
        password: values.newPassword,
      }).unwrap();

      toast.success("Password changed successfully");
      submitProps.resetForm();
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.changePassword}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isLoading || formik.isSubmitting ? (
                <PulseLoader color={"white"} />
              ) : (
                <span>Change</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Change your password</h1>

                <div className={styles.formGroup}>
                  <label htmlFor="newPassword">New Password</label>
                  <Field
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="new password"
                    className={`${styles.input} ${
                      Boolean(formik.touched.newPassword && formik.errors.newPassword)
                        ? styles.error
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component={(props) => <TextError {...props} styles={styles.textError} />}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="confirmNewPassword">Confirm Password</label>
                  <Field
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="confirm password"
                    className={`${styles.input} ${
                      Boolean(formik.touched.confirmNewPassword && formik.errors.confirmNewPassword)
                        ? styles.error
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="confirmNewPassword"
                    component={(props) => <TextError {...props} styles={styles.textError} />}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={formik.isSubmitting}>
                  {buttonText}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ChangePassword;
