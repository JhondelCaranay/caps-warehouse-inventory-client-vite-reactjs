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
import TextError from "../../formik/TextError";
import { Button } from "@mui/material";
import { useAddNewTransactionMutation } from "../../../app/services/transaction/transactionApiSlice";
import { SelectControl } from "../../formik/SelectControl";
import InputControl from "../../formik/InputControl";
import TestAreaControl from "../../formik/TestAreaControl";

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
								{/* <DebugControl values={formik.values} /> */}

								<div className="row">
									<div className="left">

										<SelectControl
											label="Item"
											name="itemId"
											isError={Boolean(formik.touched.itemId && formik.errors.itemId)}
										>
											<>
												{items?.map((item) => (
													<option key={item.id} value={item.id}>
														{item.name}
													</option>
												))}
											</>
										</SelectControl>

										<InputControl
											label="Quantity"
											name="quantity"
											type="number"
											min="1"
											isError={Boolean(formik.touched.quantity && formik.errors.quantity)}
										/>

										<SelectControl
											label="Project"
											name="projectId"
											isError={Boolean(formik.touched.projectId && formik.errors.projectId)}
										>
											<>
												{projects?.map((project) => (
													<option key={project.id} value={project.id}>
														{project.name}
													</option>
												))}
											</>
										</SelectControl>

										<TestAreaControl
											label="Remarks"
											name="remarks"
											type="text"
											placeholder="Remarks"
											isError={Boolean(formik.touched.remarks && formik.errors.remarks)}
										/>
									</div>

									<div className="right">

										<InputControl
											label="Release Slip #"
											name="release_slip_num"
											type="text"
											placeholder="#"
											isError={Boolean(formik.touched.release_slip_num && formik.errors.release_slip_num)}
										/>

										<InputControl
											label="Materials Issuance #"
											name="materials_issuance_num"
											type="text"
											placeholder="#"
											isError={Boolean(formik.touched.materials_issuance_num && formik.errors.materials_issuance_num)}
										/>

										<InputControl
											label="Gate Pass #"
											name="gate_pass_num"
											type="text"
											placeholder="#"
											isError={Boolean(formik.touched.gate_pass_num && formik.errors.gate_pass_num)}
										/>

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
