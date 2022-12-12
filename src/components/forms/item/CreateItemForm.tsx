import { AddAPhoto, RemoveCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewItemMutation } from "../../../app/services/item/itemApiSlice";
import { Brand, Category, ItemCreateForm, UNIT } from "../../../types";
import TextError from "../../formik/TextError";
import ErrorList from "../../toast/ErrorList";
import "./CreateItemForm.scss";
import { initialValues, validationSchema } from "./CreateItemSchema";
import { v4 } from "uuid";
import { storage } from "../../../config/firebase";
import { useGetBrandsQuery } from "../../../app/services/brand/brandApiSlice";
import { useGetCategoryQuery } from "../../../app/services/category/categoryApiSlice";
import { Capitalize } from "../../../config/utils/functions";
import { useNavigate } from "react-router-dom";


const CreateItemForm = () => {
	const navigate = useNavigate();

	const [addNewItem, { isLoading: isItemUpdating }] =
		useAddNewItemMutation();

	const {
		data: brands,
		isLoading: isLoadingBrands,
		isSuccess: isSuccessBrands,
	} = useGetBrandsQuery("brandList", {
		refetchOnMountOrArgChange: true,
		selectFromResult: (result) => {
			return {
				...result,
				data: result.data?.ids.map((id) => result.data?.entities[id] as Brand),
			};
		},
	});

	const {
		data: category,
		isLoading: isLoadingCategory,
		isSuccess: isSuccessCategory,
	} = useGetCategoryQuery("categoryList", {
		refetchOnMountOrArgChange: true,
		selectFromResult: (result) => {
			return {
				...result,
				data: result.data?.ids.map((id) => result.data?.entities[id] as Category),
			};
		},
	});


	const onSubmit = async (
		values: ItemCreateForm,
		submitProps: FormikHelpers<ItemCreateForm>
	) => {
		//sleep for 1 seconds
		// await new Promise((resolve) => setTimeout(resolve, 1000));
		// alert(JSON.stringify(values, null, 2));

		try {
			let url = "";
			if (values.pictureUrl) {
				const file = values.pictureUrl;
				const storageRef = ref(storage, `caps/image/${file.name + v4()}`);
				const snapshot = await uploadBytes(storageRef, file);
				url = await getDownloadURL(snapshot.ref);
			}
			const result = await addNewItem({
				name: values.name,
				description: values.description || null,
				model: values.model || null,
				unit: values.unit,
				quantity: values.quantity,
				price: values.price,
				pictureUrl: url || null,
				brandId: values.brandId,
				categoryId: values.categoryId,
			}).unwrap();
			console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result)

			toast.success("Item created successfully");
			submitProps.resetForm();
			navigate("/dash/items");
		} catch (err: any) {
			if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
			else if (err.error) toast.error(err.error);
			else toast.error("Something went wrong, our team is working on it");
		}
		submitProps.setSubmitting(false);
	};


	let content: JSX.Element | null = null;

	if (isLoadingBrands || isLoadingCategory) {
		content = (
			<div className="loading">
				<PulseLoader color={"#000000"} />
			</div>
		);
	}

	if (isSuccessBrands && isSuccessCategory) {
		content = (
			<div className="container">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
					enableReinitialize
				>
					{(formik) => {
						const buttonText = (isItemUpdating || formik.isSubmitting) ? (
							<PulseLoader color={"#FFF"} />
						) : (
							<span>Create</span>
						);


						return (
							<Form>
								<h1 className="title">Create Item</h1>
								<div className="formGroup">
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
										<p>Display only for Development</p>
										{JSON.stringify(formik.values, null, 2)}
									</pre>
								</div>

								<div className="row">
									<div className="left">


										<div className="formGroup">
											<label htmlFor="name">Item Name</label>
											<Field
												name="name"
												type="text"
												id="name"
												className={
													formik.touched.name &&
														formik.errors.name
														? "input error"
														: "input"
												}
												autoComplete="off"
												min="1"
											/>
											<ErrorMessage
												name="name"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="row">
											<div className="left">
												<div className="formGroup">
													<label htmlFor="price">Price</label>
													<Field
														name="price"
														type="number"
														className={
															formik.touched.price &&
																formik.errors.price
																? "input error"
																: "input"
														}
														min="1"
													/>
													<ErrorMessage
														name="price"
														component={(props) => <TextError {...props} />}
													/>
												</div>
											</div>
											<div className="right">
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
														min="1"
													/>
													<ErrorMessage
														name="quantity"
														component={(props) => <TextError {...props} />}
													/>
												</div>
											</div>
										</div>

										<div className="formGroup">
											<label htmlFor="description">Description</label>
											<Field
												name="description"
												as="textarea"
												rows="4"
												placeholder="Description"
												className={
													formik.touched.description && formik.errors.description
														? "input error"
														: "input"
												}
											/>
											<ErrorMessage
												name="description"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="model">Model</label>
											<Field
												name="model"
												type="text"
												id="model"
												className={
													formik.touched.model &&
														formik.errors.model
														? "input error"
														: "input"
												}
												autoComplete="off"
												min="1"
											/>
											<ErrorMessage
												name="model"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="unit">UNIT</label>
											<Field
												name="unit"
												as="select"
												className={
													formik.touched.unit && formik.errors.unit
														? "input error"
														: "input"
												}
											>
												<option value="">Select UNIT</option>
												{
													Object.keys(UNIT).map((key) => (
														<option key={key} value={key}>{Capitalize(key)}</option>
													))
												}
											</Field>
											<ErrorMessage
												name="unit"
												component={(props) => <TextError {...props} />}
											/>
										</div>



										<div className="formGroup">
											<label htmlFor="brandId">Brand</label>
											<Field
												name="brandId"
												as="select"
												className={
													formik.touched.brandId && formik.errors.brandId
														? "input error"
														: "input"
												}
											>
												<option value="">Select Brand</option>
												{brands?.map((brand) => (
													<option key={brand.id} value={brand.id}>
														{brand.name}
													</option>
												))}
											</Field>
											<ErrorMessage
												name="brandId"
												component={(props) => <TextError {...props} />}
											/>
										</div>

										<div className="formGroup">
											<label htmlFor="categoryId">Category</label>
											<Field
												name="categoryId"
												as="select"
												className={
													formik.touched.categoryId && formik.errors.categoryId
														? "input error"
														: "input"
												}
											>
												<option value="">Select Category</option>
												{
													category?.map((cat) => (
														<option key={cat.id} value={cat.id}>
															{cat.name}
														</option>
													))
												}
											</Field>
											<ErrorMessage
												name="categoryId"
												component={(props) => <TextError {...props} />}
											/>
										</div>
									</div>

									<div className="right">
										<div className="formGroup">
											<p>Picture</p>
											<div className={
												formik.touched.pictureUrl && formik.errors.pictureUrl
													? "add-photo error"
													: "add-photo"
											}>
												<div className="controls">
													<label htmlFor="pictureUrl">
														<AddAPhoto className="icons" fontSize="large"
															onClick={(e) => formik.setFieldTouched("pictureUrl", true)}
														/>
													</label>
													<RemoveCircle className="icons" fontSize="large" onClick={(e) => {
														formik.setFieldValue("pictureUrl", null);
													}} />
												</div>
												{formik.values.pictureUrl && (
													<div className="preview">
														<img
															style={{
																display: formik.errors.pictureUrl ? "none" : "block"
															}}
															src={URL.createObjectURL(formik.values.pictureUrl)}
															alt="preview"
														/>
													</div>
												)}
											</div>
											<Field
												name="pictureUrl"
												id="pictureUrl"
												type="file"
												accept="image/png, image/gif, image/jpeg"
												className={
													formik.touched.pictureUrl && formik.errors.pictureUrl
														? "input error"
														: "input"
												}
												value={""}
												onChange={(event: any) => {
													formik.setFieldValue(
														"pictureUrl",
														event.currentTarget.files[0]
													);
												}}
											/>
											<ErrorMessage
												name="pictureUrl"
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
			</div >
		)
	}



	return <div className="createItemForm">{content}</div>;
};
export default CreateItemForm;
