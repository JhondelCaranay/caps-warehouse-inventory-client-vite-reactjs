import "./login.scss";
import useTitle from "../../../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import { LoginFormValues } from "../../../types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { FormikHelpers, Formik, Field, ErrorMessage, Form } from "formik";
import PulseLoader from "react-spinners/PulseLoader";
import TextError from "../../../components/formik/TextError";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../../app/services/auth/authApiSlice";
import { setCredentials } from "../../../app/features/auth/authSlice";
import ErrorList from "../../../components/toast/ErrorList";

const initialValues: LoginFormValues = {
	email: "",
	password: "",
};

const validationSchema = Yup.object({
	// email: Yup.string().required("Required").email("Invalid email format"),
	// password: Yup.string().required("Required"),
});

const Login = () => {
	useTitle("Login");
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [Signin, { isLoading }] = useLoginMutation();

	const onSubmit = async (
		values: LoginFormValues,
		submitProps: FormikHelpers<LoginFormValues>
	) => {
		//sleep for 2 seconds
		await new Promise((resolve) => setTimeout(resolve, 2000));
		// alert(JSON.stringify(values, null, 2));

		try {
			const { access_token, refresh_token } = await Signin({
				email: values.email,
				password: values.password,
			}).unwrap();
			dispatch(setCredentials({ access_token, refresh_token }));

			toast.success("Login successful");
			navigate("/dash");
		} catch (err: any) {
			// messsage is an array of errors
			toast.warn(<ErrorList messages={err?.data?.message} />);
			console.log("🚀 ~ file: Login.jsx ~ line 39 ~ handleSubmit ~ err", err.data.message);
		}

		submitProps.setSubmitting(false);
		submitProps.resetForm();
	};

	return (
		<div className="Login">
			<div className="wrapper">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{(formik) => {
						const inputClass =
							formik.touched.email && formik.errors.email ? "input error" : "input";

						const buttonText =
							isLoading || formik.isSubmitting ? (
								<PulseLoader color={"#FFF"} />
							) : (
								<span>Log In</span>
							);

						return (
							<Form>
								<h1 className="title">Login</h1>
								<div className="formGroup">
									<Field
										name="email"
										type="text"
										placeholder="Email"
										className={inputClass}
										autoComplete="off"
									/>
									<ErrorMessage
										name="email"
										component={(props) => <TextError {...props} />}
									/>
								</div>
								<div className="formGroup">
									<Field
										name="password"
										type="password"
										placeholder="Password"
										className={inputClass}
									/>
									<ErrorMessage
										name="password"
										component={(props) => <TextError {...props} />}
									/>
								</div>
								<button
									type="submit"
									className="submit-btn"
									disabled={!formik.isValid || formik.isSubmitting}
								>
									{buttonText}
								</button>
								<p
									className="forgot"
									onClick={() => alert("This feature is not yet implemented.")}
								>
									Forgot Password?
								</p>
								<p className="register">
									Don't have an account? <Link to="/register">Register</Link>
								</p>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default Login;
