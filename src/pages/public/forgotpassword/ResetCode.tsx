import { toast } from "react-toastify";
import ErrorList from "../../../components/toast/ErrorList";
import { useTitle } from "../../../hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { TextError } from "../../../components/formik";
import styles from "./ResetCode.module.scss";
import * as Yup from "yup";
import { useResetCodeMutation } from "../../../app/services/user/userApiSlice";
import { useEffect } from "react";
import { UserAuth } from "../../../hooks/useAuth";
import jwtDecode from "jwt-decode";
import { setCredentials } from "../../../app/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ROLES } from "../../../types";

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

const ResetCode = () => {
  useTitle("forgot password");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [SendResetCode, { isLoading }] = useResetCodeMutation();

  const onSubmit = async (
    values: ForgotPassFormValues,
    submitProps: FormikHelpers<ForgotPassFormValues>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const { access_token, refresh_token } = await SendResetCode({
        email: values.email,
        code: values.code,
      }).unwrap();
      dispatch(setCredentials({ access_token, refresh_token }));
      toast.success("Reset code verified successfully");
      submitProps.resetForm();

      const { role } = jwtDecode<UserAuth>(access_token);

      if (role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN) navigate("/dash");
      else if (role === ROLES.WAREHOUSE_CONTROLLER) navigate("/dash/transactions");
      else if (role === ROLES.ENGINEER) navigate("/me");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  useEffect(() => {
    if (email) {
      initialValues.email = email;
    }
  }, [email]);

  return (
    <div className={styles.resetCode}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <h1 className={styles.title}>Forgot Password</h1>
                <div className={styles.formGroup}>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    disabled
                    className={`${styles.input} ${
                      Boolean(formik.touched.email && formik.errors.email) ? styles.error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>
                <div className={styles.formGroup}>
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
                  {isLoading || formik.isSubmitting ? (
                    <PulseLoader color={"#FFF"} />
                  ) : (
                    <span>Confirm</span>
                  )}
                </button>

                <div className={styles.navGroup}>
                  <span
                    className={styles.forgot}
                    onClick={() => navigate("/forgot-password", { replace: true })}
                  >
                    resend
                  </span>
                  <span
                    className={styles.forgot}
                    onClick={() => navigate("/login", { replace: true })}
                  >
                    back to login
                  </span>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default ResetCode;
