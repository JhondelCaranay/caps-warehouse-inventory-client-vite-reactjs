import { toast } from "react-toastify";
import ErrorList from "../../../components/toast/ErrorList";
import { useTitle } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { TextError } from "../../../components/formik";
import styles from "./ForgotPassword.module.scss";
import * as Yup from "yup";
import { useForGotPasswordMutation } from "../../../app/services/user/userApiSlice";

type ForgotPassFormValues = {
  code: string;
  email: string;
};

const initialValues: ForgotPassFormValues = {
  code: "",
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email format"),
});

const ForgotPassword = () => {
  useTitle("forgot password");
  const navigate = useNavigate();

  const [SendEmail, { isLoading }] = useForGotPasswordMutation();

  const onSubmit = async (
    values: ForgotPassFormValues,
    submitProps: FormikHelpers<ForgotPassFormValues>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await SendEmail({ email: values.email });
      toast.success("Reset code is sent to your email");
      navigate("/reset-code?email=" + values.email, { replace: true });
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.forgotPassword}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <h1 className={styles.title}>Forgot Password</h1>
                <div className={styles.formGroup}>
                  <div className={styles.reset}>
                    <Field
                      name="email"
                      type="text"
                      placeholder="Your email"
                      className={`${styles.input} ${
                        Boolean(formik.touched.email && formik.errors.email) ? styles.error : ""
                      }`}
                      autoComplete="off"
                    />
                    <button
                      type="submit"
                      className={styles.sendcodeBtn}
                      disabled={formik.isSubmitting}
                    >
                      {isLoading || formik.isSubmitting ? (
                        <PulseLoader color={"#FFF"} />
                      ) : (
                        <span>Send</span>
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="email"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>
                {/* <div className={styles.formGroup}>
                  <Field
                    name="code"
                    type="text"
                    placeholder="Reset code"
                    className={`${styles.input} ${
                      Boolean(formik.touched.code && formik.errors.code) ? styles.error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="code"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>
                <button type="submit" className={styles.submitBtn}>
                  {buttonText}
                </button> */}
                <span
                  className={styles.forgot}
                  onClick={() => navigate("/login", { replace: true })}
                >
                  back to login
                </span>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ForgotPassword;
