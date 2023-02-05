import styles from "./CreateItemForm.module.scss";
import { AddAPhoto, RemoveCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewItemMutation } from "../../../../app/services/item/itemApiSlice";
import { Brand, Category, ItemForm, UNIT } from "../../../../types";
import TextError from "../../../formik/TextError";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { v4 } from "uuid";
import { storage } from "../../../../config/firebase";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { Capitalize } from "../../../../config/utils/functions";
import { useNavigate } from "react-router-dom";
import { DebugControl } from "../../../formik";

export const initialValues: ItemForm = {
  name: "",
  description: "",
  model: "",
  unit: "",
  quantity: 0,
  price: 0,
  pictureUrl: "",
  brandId: "",
  categoryId: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string(),
  model: Yup.string(),
  unit: Yup.string().required("Required"),
  quantity: Yup.number()
    .required("Required")
    .integer("Must be an integer")
    .min(1, "Must be a positive number"),
  price: Yup.number().required("Required").min(1, "Must be a positive number"),
  pictureUrl: Yup.mixed().test("type", "Only .jpg, .jpeg, .png, files are accepted", (value) => {
    if (value) {
      console.log("🚀 ~ file: CreateItemSchema.tsx:29 ~ value", value);
      return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
    } else {
      return true;
    }
  }),
  brandId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  categoryId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});

const CreateItemForm = () => {
  const navigate = useNavigate();

  const [addNewItem, { isLoading: isItemUpdating }] = useAddNewItemMutation();

  const {
    data: brands,
    isLoading: isLoadingBrands,
    isSuccess: isSuccessBrands,
  } = useGetBrandsQuery("brandList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: ids.map((id) => entities[id] as Brand),
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
      const { entities, ids } = result.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: ids.map((id) => entities[id] as Category),
      };
    },
  });

  const onSubmit = async (values: ItemForm, submitProps: FormikHelpers<ItemForm>) => {
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
      console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

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

  let content: JSX.Element = <></>;

  if (isLoadingBrands || isLoadingCategory) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isSuccessBrands && isSuccessCategory) {
    content = (
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isItemUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Create Item</h1>

                <div className={styles.row}>
                  {/* LEFT */}
                  <div className={styles.left}>
                    {/* ITEM NAME INPUT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="name">Item Name</label>
                      <Field
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Item name"
                        className={`${styles.input} ${
                          Boolean(formik.touched.name && formik.errors.name) ? styles.error : ""
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>
                    {/* CHILD ROW */}
                    <div className={styles.row}>
                      {/* LEFT */}
                      <div className={styles.left}>
                        {/* PRICE INPUT */}
                        <div className={styles.formGroup}>
                          <label htmlFor="price">Price</label>
                          <Field
                            id="price"
                            name="price"
                            type="number"
                            className={`${styles.input} ${
                              Boolean(formik.touched.price && formik.errors.price)
                                ? styles.error
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="price"
                            component={(props) => (
                              <TextError {...props} styles={styles["text-error"]} />
                            )}
                          />
                        </div>
                      </div>
                      {/* RIGHT */}
                      <div className={styles.right}>
                        {/*  QUANTITY INPUT */}
                        <div className={styles.formGroup}>
                          <label htmlFor="quantity">Quantity</label>
                          <Field
                            id="quantity"
                            name="quantity"
                            type="number"
                            max="50"
                            className={`${styles.input} ${
                              Boolean(formik.touched.quantity && formik.errors.quantity)
                                ? styles.error
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="quantity"
                            component={(props) => (
                              <TextError {...props} styles={styles["text-error"]} />
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    {/* DESCRIPTION TEXT AREA */}
                    <div className={styles.formGroup}>
                      <label htmlFor="description">Description</label>
                      <Field
                        id="description"
                        name="description"
                        as="textarea"
                        rows="4"
                        placeholder="Description"
                        className={`${styles.input} ${
                          Boolean(formik.touched.description && formik.errors.description)
                            ? styles.error
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="description"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* ITEM MODEL INPUT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="model">Model</label>
                      <Field
                        id="model"
                        name="model"
                        type="text"
                        placeholder="Model"
                        className={`${styles.input} ${
                          Boolean(formik.touched.model && formik.errors.model) ? styles.error : ""
                        }`}
                      />
                      <ErrorMessage
                        name="model"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* SELECT ITEM UNIT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="unit">Unit</label>
                      <Field
                        id="unit"
                        name="unit"
                        as="select"
                        className={`${styles.input} ${
                          Boolean(formik.touched.unit && formik.errors.unit) ? styles.error : ""
                        }`}
                      >
                        <option value="">Select Unit</option>
                        {Object.keys(UNIT).map((key) => (
                          <option key={key} value={key}>
                            {Capitalize(key)}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="unit"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* SELECT ITEM BRAND */}
                    <div className={styles.formGroup}>
                      <label htmlFor="brandId">Brand</label>
                      <Field
                        id="brandId"
                        name="brandId"
                        as="select"
                        className={`${styles.input} ${
                          Boolean(formik.touched.brandId && formik.errors.brandId)
                            ? styles.error
                            : ""
                        }`}
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
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* SELECT ITEM CATEGORY */}
                    <div className={styles.formGroup}>
                      <label htmlFor="categoryId">Category</label>
                      <Field
                        id="categoryId"
                        name="categoryId"
                        as="select"
                        className={`${styles.input} ${
                          Boolean(formik.touched.categoryId && formik.errors.categoryId)
                            ? styles.error
                            : ""
                        }`}
                      >
                        <option value="">Select Brand</option>
                        {category?.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className={styles.right}>
                    {/* ITEM PICTURE FILE INPUT */}
                    <div className={styles.formGroup}>
                      <p>Picture</p>
                      <div
                        className={`${styles["add-photo"]} ${
                          Boolean(formik.touched.pictureUrl && formik.errors.pictureUrl)
                            ? styles.error
                            : ""
                        }`}
                      >
                        <div className={styles.controls}>
                          <label htmlFor="pictureUrl">
                            <AddAPhoto
                              className={styles.icons}
                              fontSize="large"
                              onClick={(e) => formik.setFieldTouched("pictureUrl", true)}
                            />
                          </label>
                          <RemoveCircle
                            className={styles.icons}
                            fontSize="large"
                            onClick={(e) => {
                              formik.setFieldValue("pictureUrl", "");
                            }}
                          />
                        </div>
                        {formik.values.pictureUrl && (
                          <div className={styles.preview}>
                            <img
                              style={{
                                display: formik.errors.pictureUrl ? "none" : "block",
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
                        className={`${styles.input} ${
                          Boolean(formik.touched.pictureUrl && formik.errors.pictureUrl)
                            ? styles.error
                            : ""
                        }`}
                        value={undefined}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.currentTarget.files)
                            formik.setFieldValue("pictureUrl", e.currentTarget.files[0]);
                        }}
                      />
                      <ErrorMessage
                        name="pictureUrl"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {buttonText}
                  </Button>
                </div>

                {/* DEBUGER */}
                {import.meta.env.VITE_NODE_ENV === "development" && (
                  <DebugControl values={formik.values} />
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }

  return <div className={styles.createItemForm}>{content}</div>;
};
export default CreateItemForm;
