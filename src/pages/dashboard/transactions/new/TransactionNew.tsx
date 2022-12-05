import { ErrorMessage, Field, Form, Formik, FormikHelpers, validateYupSchema } from "formik";
import { useMemo } from "react";
import "./transactionNew.scss";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TransactionCreateForm, TRANSACTION_STATUS } from "../../../../types";
import useTitle from "../../../../hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorList from "../../../../components/toast/ErrorList";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../../hooks/useAuth";
import TextError from "../../../../components/formik/TextError";

const TransactionNew = () => {
	useTitle("Spedi: Transaction Create");
	const navigate = useNavigate();
	const authUser = useAuth();

	const initialValues = useMemo<TransactionCreateForm>(() => {
		return {
			quantity: "",
			remarks: "",
			status: TRANSACTION_STATUS.WAITING,
			release_slip_num: "",
			materials_issuance_num: "",
			gate_pass_num: "",
			userId: "",
			itemId: "",
			projectId: "",
		};
	}, []);

	const validationSchema = useMemo(() => {
		return Yup.object().shape({
			quantity: Yup.number().required(),
			remarks: Yup.string().required(),
			status: Yup.string().required(),
			release_slip_num: Yup.string().required(),
			materials_issuance_num: Yup.string().required(),
			gate_pass_num: Yup.string().required(),
			userId: Yup.string().required(),
			itemId: Yup.string().required(),
			projectId: Yup.string().required(),
		});
	}, []);

	const onSubmit = async (
		values: TransactionCreateForm,
		submitProps: FormikHelpers<TransactionCreateForm>
	) => {
		//sleep for 1 seconds
		await new Promise((resolve) => setTimeout(resolve, 1000));
		alert(JSON.stringify(values, null, 2));

		try {
			toast.success("Transaction created successfully");
			// submitProps.resetForm();
			// navigate("/dash");
		} catch (err: any) {
			if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
			else if (err.error) toast.error(err.error);
			else toast.error("Something went wrong, our team is working on it");

			// submitProps.setFieldValue("password", "");
			// submitProps.setFieldTouched("password", false);
		}
		submitProps.setSubmitting(false);
	};

	return (
		<div className="transactionNew">
			<div className="container">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{(formik) => {
						const buttonText = formik.isSubmitting ? (
							<PulseLoader color={"#FFF"} />
						) : (
							<span>Create</span>
						);

						return (
							<Form action="">
								<h1 className="title">Create Transaction</h1>
								<div className="formGroup">
									<Field
										name="remarks"
										type="text"
										placeholder="Remarks"
										className={
											formik.touched.remarks && formik.errors.remarks
												? "input error"
												: "input"
										}
										autoComplete="off"
									/>
									<ErrorMessage
										name="remarks"
										component={(props) => <TextError {...props} />}
									/>
								</div>

								<div className="formGroup">
									<button
										type="submit"
										className="submit-btn"
										disabled={!formik.isValid || formik.isSubmitting}
									>
										{buttonText}
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
};
export default TransactionNew;
