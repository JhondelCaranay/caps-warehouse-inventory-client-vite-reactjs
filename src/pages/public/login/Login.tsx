import { useNavigate } from "react-router-dom";
import { LoginFormValues, ROLES } from "../../../types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormikHelpers, Formik, Field, ErrorMessage, Form } from "formik";
import PulseLoader from "react-spinners/PulseLoader";
import TextError from "../../../components/formik/TextError";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../app/services/auth/authApiSlice";
import { setCredentials } from "../../../app/features/auth/authSlice";
import ErrorList from "../../../components/toast/ErrorList";
import jwtDecode from "jwt-decode";
import { UserAuth } from "../../../hooks/useAuth";
import { useTitle } from "../../../hooks";
import styles from "./Login.module.scss";
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email format"),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 6 characters")
    .max(30, "Must be at most 30 characters"),
});

const Login = () => {
  useTitle("Login");
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();

  const [Signin, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: LoginFormValues, submitProps: FormikHelpers<LoginFormValues>) => {
    //sleep for 1 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const { access_token, refresh_token } = await Signin({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setCredentials({ access_token, refresh_token }));

      toast.success("Login successful");
      submitProps.resetForm();

      const { role } = jwtDecode<UserAuth>(access_token);

      // navigate(from, { replace: true });

      if (role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN) navigate("/dash");
      else if (role === ROLES.WAREHOUSE_CONTROLLER) navigate("/dash/transactions");
      else if (role === ROLES.ENGINEER) navigate("/me");
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx ~ line 50 ~ Login ~ err", err);

      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");

      submitProps.setFieldValue("password", "");
      submitProps.setFieldTouched("password", false);
    }

    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.Login}>
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
                <PulseLoader color={"#FFF"} />
              ) : (
                <span>Log In</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Login</h1>
                <div className={styles.formGroup}>
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email"
                    className={`${styles.input} ${
                      Boolean(formik.touched.email && formik.errors.email) ? styles.error : ""
                    }`}
                    // autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>
                <div className={styles.formGroup}>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={`${styles.input} ${
                      Boolean(formik.touched.password && formik.errors.password) ? styles.error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  {buttonText}
                </button>
                <span className={styles.forgot} onClick={() => navigate("/forgot-password")}>
                  Forgot Password?
                </span>
                {/* <p className="register">
                  Don't have an account? <Link to="/register">Register</Link>
                </p> */}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default Login;

{
  /* <Field
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
/> */
}
