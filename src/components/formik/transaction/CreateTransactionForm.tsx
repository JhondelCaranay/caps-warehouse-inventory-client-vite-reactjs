import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../../../app/services/item/itemApiSlice";
import { useGetProjectsQuery } from "../../../app/services/project/projectApiSlice";
import useAuth from "../../../hooks/useAuth";
import { Item, Project, TransactionCreateForm } from "../../../types";
import "./CreateTransactionForm.scss";
import { initialValues, validationSchema } from "./CreateTransactionSchema";
import { toast } from "react-toastify";
import ErrorList from "../../toast/ErrorList";
import { PulseLoader } from "react-spinners";
import TextError from "../TextError";
import { Button } from "@mui/material";
import { useAddNewTransactionMutation } from "../../../app/services/transaction/transactionApiSlice";

const CreateTransactionForm = () => {
	const navigate = useNavigate();
	const { id } = useAuth();

	const [addNewTransaction, { isLoading: isTransactionUpdating }] =
		useAddNewTransactionMutation();

	const {
		data: projects,
		isLoading: isLoadingProjects,
		isSuccess: isSuccessProjects,
	} = useGetProjectsQuery("projectList", {
		refetchOnMountOrArgChange: true,
		selectFromResult: (result) => {
			return {
				...result,
				data: result.data?.ids.map((id) => result.data?.entities[id] as Project),
			};
		},
	});

	const {
		data: items,
		isLoading: isLoadingItems,
		isSuccess: isSuccessItems,
	} = useGetItemsQuery("itemList", {
		refetchOnMountOrArgChange: true,
		selectFromResult: (result) => {
			return {
				...result,
				data: result.data?.ids.map((id) => result.data?.entities[id] as Item),
			};
		},
	});

	const [formValues, setFormValues] = useState(initialValues);

	useEffect(() => {
		setFormValues((prev) => ({
			...prev,
			senderId: id,
		}));
	}, []);

	const onSubmit = async (
		values: TransactionCreateForm,
		submitProps: FormikHelpers<TransactionCreateForm>
	) => {
		console.log(
			"🚀 ~ file: CreateTransactionForm.tsx:65 ~ CreateTransactionForm ~ values",
			values
		);
		//sleep for 1 seconds
		// await new Promise((resolve) => setTimeout(resolve, 1000));
		// alert(JSON.stringify(values, null, 2));

		try {
			const result = await addNewTransaction({
				quantity: values.quantity,
				remarks: values.remarks || null,
				status: values.status,
				release_slip_num: values.release_slip_num,
				materials_issuance_num: values.materials_issuance_num,
				gate_pass_num: values.gate_pass_num,
				senderId: values.senderId,
				receiverId: values.receiverId,
				itemId: values.itemId,
				projectId: values.projectId,
			}).unwrap();

			toast.success("Transaction created successfully");
			submitProps.resetForm();
			navigate("/dash/transactions");
		} catch (err: any) {
			if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
			else if (err.error) toast.error(err.error);
			else toast.error("Something went wrong, our team is working on it");
		}
		submitProps.setSubmitting(false);
	};

	let content: JSX.Element | null = null;

	if (isLoadingItems || isLoadingProjects) {
		content = (
			<div className="loading">
				<PulseLoader color={"#000000"} />
			</div>
		);
	}

	if (isSuccessItems && isSuccessProjects) {
		content = (
			<div className="container">
				<Formik
					initialValues={formValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{(formik) => {
						const buttonText =
							isTransactionUpdating || formik.isSubmitting ? (
								<PulseLoader color={"#FFF"} />
							) : (
								<span>Create</span>
							);

						const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
							const projectId = e.target.value;
							const userId = projects?.find(
								(project) => project.id === projectId
							)?.userId;
							formik.setFieldValue("projectId", projectId || "");
							formik.setFieldValue("receiverId", userId || "");
						};

						return (
							<Form>
								<h1 className="title">Create Transaction</h1>
								{/* <div className="formGroup">
									<pre
										style={{
											// vs code theme night owl
											backgroundColor: "#011627",
											color: "#d6deeb",
											padding: "4px",
											borderRadius: "5px",
											fontSize: "14px",
											whiteSpace: "pre-wrap",
										}}
									>
										{JSON.stringify(formik.values, null, 2)}
									</pre>
								</div> */}

								<div className="row">
									<div className="left">
										<div className="formGroup">
											<label htmlFor="itemId">Item</label>
											<Field
												name="itemId"
												as="select"
												placeholder="ItemId"
												className={
													formik.touched.itemId && formik.errors.itemId
														? "input error"
														: "input"
												}
												autoComplete="off"
											>
												<option value="">Select Item</option>
												{items?.map((item) => (
													<option key={item.id} value={item.id}>
														{item.name}
													</option>
												))}
											</Field>
											<ErrorMessage
												name="itemId"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="quantity">Quantity</label>
											<Field
												name="quantity"
												type="number"
												className={
													formik.touched.quantity &&
													formik.errors.quantity
														? "input error"
														: "input"
												}
												autoComplete="off"
												min="1"
											/>
											<ErrorMessage
												name="quantity"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="projectId">Projects</label>
											<Field
												name="projectId"
												as="select"
												className={
													formik.touched.projectId &&
													formik.errors.projectId
														? "input error"
														: "input"
												}
												autoComplete="off"
												onChange={handleProjectChange}
											>
												<option value="">Select Project</option>
												{projects?.map((project) => (
													<option key={project.id} value={project.id}>
														{project.name}
													</option>
												))}
											</Field>
											<ErrorMessage
												name="projectId"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="remarks">Remarks</label>
											<Field
												name="remarks"
												as="textarea"
												rows="4"
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
									</div>

									<div className="right">
										<div className="formGroup">
											<label htmlFor="release_slip_num">Release Slip #</label>
											<Field
												name="release_slip_num"
												type="text"
												placeholder=" #"
												className={
													formik.touched.release_slip_num &&
													formik.errors.release_slip_num
														? "input error"
														: "input"
												}
												autoComplete="off"
											/>
											<ErrorMessage
												name="release_slip_num"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="materials_issuance_num">
												Materials Issuance #
											</label>
											<Field
												name="materials_issuance_num"
												type="text"
												placeholder=" #"
												className={
													formik.touched.materials_issuance_num &&
													formik.errors.materials_issuance_num
														? "input error"
														: "input"
												}
												autoComplete="off"
											/>
											<ErrorMessage
												name="materials_issuance_num"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="gate_pass_num">Gate Pass #</label>
											<Field
												name="gate_pass_num"
												type="text"
												placeholder=" #"
												className={
													formik.touched.gate_pass_num &&
													formik.errors.gate_pass_num
														? "input error"
														: "input"
												}
												autoComplete="off"
											/>
											<ErrorMessage
												name="gate_pass_num"
												component={(props) => <TextError {...props} />}
											/>
										</div>
									</div>
								</div>

								<div className="formGroup">
									<Button
										type="submit"
										size="small"
										variant="outlined"
										disabled={!formik.isValid || formik.isSubmitting}
									>
										{buttonText}
									</Button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		);
	}

	return <div className="createTransactionForm">{content}</div>;
};
export default CreateTransactionForm;
