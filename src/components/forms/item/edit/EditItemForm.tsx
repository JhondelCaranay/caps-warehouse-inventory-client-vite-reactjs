import styles from "./EditItemForm.module.scss";
import { AddAPhoto, Close, RemoveCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useUpdateItemMutation } from "../../../../app/services/item/itemApiSlice";
import { storage } from "../../../../config/firebase";
import { Capitalize } from "../../../../config/utils/functions";
import { Brand, Category, Item, ItemForm, UNIT } from "../../../../types";
import TextError from "../../../formik/TextError";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { DebugControl } from "../../../formik";

export const initialValues: ItemForm = {
  name: "",
  referalId: "",
  description: "",
  model: "",
  unit: "",
  quantity: 1,
  price: 1,
  pictureUrl: "",
  brandId: "",
  categoryId: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  referalId: Yup.string().required("Required"),
  description: Yup.string(),
  model: Yup.string(),
  unit: Yup.string().required("Required"),
  quantity: Yup.number().required("Required").integer("Must be an integer"),
  price: Yup.number().required("Required"),
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

type EditItemFormProps = {
  item: Item;
  brands: Brand[];
  categories: Category[];
};

const EditItemForm = ({ item, brands, categories }: EditItemFormProps) => {
  const navigate = useNavigate();

  const [updateItem, { isLoading: isItemUpdating }] = useUpdateItemMutation();

  const [formValues, setFormValues] = useState(initialValues);
  const [viewImage, setViewImage] = useState<boolean>(false);

  useEffect(() => {
    if (item) {
      setFormValues((prev) => ({
        ...prev,
        id: item.id,
        pictureUrlTemp: item.pictureUrl,
        name: item.name,
        referalId: item.referalId,
        description: item.description || "",
        model: item.model || "",
        unit: item.unit,
        quantity: item.quantity,
        price: item.price,
        brandId: item.brandId,
        categoryId: item.categoryId,
      }));
    }
  }, [item]);

  const onSubmit = async (values: ItemForm, submitProps: FormikHelpers<ItemForm>) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      let url = "";
      if (values.pictureUrl) {
        const file = values.pictureUrl;
        const storageRef = ref(storage, `caps/image/${file.name + v4()}`);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
      }
      await updateItem({
        id: values.id,
        name: values.name,
        referalId: values.referalId,
        description: values.description || null,
        model: values.model || null,
        unit: values.unit,
        quantity: values.quantity,
        price: values.price,
        pictureUrl: url || null,
        brandId: values.brandId,
        categoryId: values.categoryId,
      }).unwrap();

      toast.success("Item updated successfully");
      submitProps.resetForm();
      navigate("/dash/items");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.editItemForm}>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          const buttonText =
            isItemUpdating || formik.isSubmitting ? (
              <PulseLoader color={"#1976d2"} />
            ) : (
              <span>Edit</span>
            );

          if (formik.values.unit === UNIT.UNIT) {
            formik.values.quantity = 1;
          }

          return (
            <Form>
              <h1 className={styles.title}>Edit Item</h1>

              {/* <DebugControl values={formik.values} /> */}

              <div className={styles.row}>
                {/* LEFT */}
                <div className={styles.left}>
                  {/* ITEM NAME INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      Item Name <small>(required)</small>
                    </label>
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="name">
                      Item Referral Code <small>(required)</small>
                    </label>
                    <Field
                      id="referalId"
                      name="referalId"
                      type="text"
                      placeholder="Referral code"
                      className={`${styles.input} ${
                        Boolean(formik.touched.referalId && formik.errors.referalId)
                          ? styles.error
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* CHILD ROW */}
                  <div className={styles.row}>
                    {/* LEFT */}
                    <div className={styles.left}>
                      {/* PRICE INPUT */}
                      <div className={styles.formGroup}>
                        <label htmlFor="price">
                          Price <small>(required)</small>
                        </label>
                        <Field
                          id="price"
                          name="price"
                          type="number"
                          className={`${styles.input} ${
                            Boolean(formik.touched.price && formik.errors.price) ? styles.error : ""
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
                        <label htmlFor="quantity">
                          Quantity <small>(required)</small>
                        </label>
                        <Field
                          id="quantity"
                          name="quantity"
                          type="number"
                          max="99"
                          min="1"
                          className={`${styles.input} ${
                            Boolean(formik.touched.quantity && formik.errors.quantity)
                              ? styles.error
                              : ""
                          }`}
                          disabled={formik.values.unit === UNIT.UNIT}
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
                    <label htmlFor="description">
                      Description <small>(optional)</small>
                    </label>
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* ITEM MODEL INPUT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="model">
                      Model <small>(optional)</small>
                    </label>
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* SELECT ITEM UNIT */}
                  <div className={styles.formGroup}>
                    <label htmlFor="unit">
                      Unit <small>(required)</small>
                    </label>
                    <Field
                      id="unit"
                      name="unit"
                      as="select"
                      className={`${styles.input} ${
                        Boolean(formik.touched.unit && formik.errors.unit) ? styles.error : ""
                      }`}
                    >
                      <option value="">Select Unit </option>
                      {Object.keys(UNIT).map((key) => (
                        <option key={key} value={key}>
                          {Capitalize(key)}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="unit"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* SELECT ITEM BRAND */}
                  <div className={styles.formGroup}>
                    <label htmlFor="brandId">
                      Brand <small>(required)</small>
                    </label>
                    <Field
                      id="brandId"
                      name="brandId"
                      as="select"
                      className={`${styles.input} ${
                        Boolean(formik.touched.brandId && formik.errors.brandId) ? styles.error : ""
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* SELECT ITEM CATEGORY */}
                  <div className={styles.formGroup}>
                    <label htmlFor="categoryId">
                      Category <small>(required)</small>
                    </label>
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
                      {categories?.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="categoryId"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>
                </div>

                <div className={styles.right}>
                  {/* ITEM PICTURE FILE INPUT */}
                  <div className={styles.formGroup}>
                    <label>
                      Picture <small>(optional)</small>
                      {item?.pictureUrl && (
                        <span onClick={() => setViewImage(true)}>| Current Image</span>
                      )}
                    </label>
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
                      className={
                        formik.touched.pictureUrl && formik.errors.pictureUrl
                          ? "input error"
                          : "input"
                      }
                      value={undefined}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.currentTarget.files)
                          formik.setFieldValue("pictureUrl", e.currentTarget.files[0]);
                      }}
                    />
                    <ErrorMessage
                      name="pictureUrl"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <Button
                  type="submit"
                  size="small"
                  variant="outlined"
                  disabled={formik.isSubmitting}
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

      {viewImage && (
        <div className={styles["modal-image"]}>
          <div className={styles["modal-backdrop"]} onClick={(e) => setViewImage(false)}></div>
          <div className={styles.wrapper}>
            <img src={item?.pictureUrl} alt="" />
            <Close
              fontSize="large"
              className={styles["modal-close"]}
              onClick={() => setViewImage(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default EditItemForm;
