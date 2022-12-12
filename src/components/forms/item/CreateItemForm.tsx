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
import DebugControl from "../../formik/DebugControl";
import InputControl from "../../formik/InputControl";
import TestAreaControl from "../../formik/TestAreaControl";
import { SelectControl } from "../../formik/SelectControl";


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

								{/* <DebugControl values={formik.values} /> */}

								<div className="row">
									<div className="left">
										<InputControl
											label="Item Name"
											name="name"
											type="text"
											placeholder="Item name"
											isError={Boolean(formik.touched.name && formik.errors.name)}
										/>

										<div className="row">
											<div className="left">
												<InputControl
													label="Price"
													name="price"
													type="number"
													isError={Boolean(formik.touched.price && formik.errors.price)}
												/>
											</div>
											<div className="right">
												<InputControl
													label="Quantity"
													name="quantity"
													type="number"
													isError={Boolean(formik.touched.quantity && formik.errors.quantity)}
												/>
											</div>
										</div>

										<TestAreaControl
											label="Description"
											name="description"
											type="text"
											placeholder="Description"
											isError={Boolean(formik.touched.description && formik.errors.description)}
										/>

										<InputControl
											label="Model"
											name="model"
											type="text"
											placeholder="Model"
											isError={Boolean(formik.touched.model && formik.errors.model)}
										/>

										<SelectControl
											label="UNIT"
											name="unit"
											isError={Boolean(formik.touched.unit && formik.errors.unit)}
										>
											<>
												{Object.keys(UNIT).map((key) => (
													<option key={key} value={key}>{Capitalize(key)}</option>
												))}
											</>
										</SelectControl>

										<SelectControl
											label="Brand"
											name="brandId"
											isError={Boolean(formik.touched.brandId && formik.errors.brandId)}
										>
											<>
												{brands?.map((brand) => (
													<option key={brand.id} value={brand.id}>
														{brand.name}
													</option>
												))}
											</>
										</SelectControl>

										<SelectControl
											label="Category"
											name="categoryId"
											isError={Boolean(formik.touched.categoryId && formik.errors.categoryId)}
										>
											<>
												{category?.map((cat) => (
													<option key={cat.id} value={cat.id}>
														{cat.name}
													</option>
												))}
											</>
										</SelectControl>
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
