import styles from "./EditCategoryForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useUpdateCategoryMutation } from "../../../../app/services/category/categoryApiSlice";
import { CategoryForm } from "../../../../types/formik.type";
import ErrorList from "../../../toast/ErrorList";
import { Category } from "../../../../types";
import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

type EditCategoryFormProps = {
  category: Category;
};

const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const navigate = useNavigate();

  const [updateCategory, { isLoading: isCategoryUpdating }] = useUpdateCategoryMutation();

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (category) {
      setFormValues((prev) => ({
        ...prev,
        id: category.id,
        name: category.name,
      }));
    }
  }, [category]);

  const onSubmit = async (values: CategoryForm, submitProps: FormikHelpers<CategoryForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await updateCategory({
        id: values.id,
        name: values.name,
      }).unwrap();
      // console.log("🚀 ~ file: EditCategoryForm.tsx:51 ~ onSubmit ~ result", result)

      toast.success("Category edited successfully");
      submitProps.resetForm();
      navigate("/dash/category");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element = <></>;

  if (category) {
    content = (
      <div className={styles.container}>
        <Formik
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isCategoryUpdating || formik.isSubmitting ? (
                <PulseLoader color={"#1976d2"} />
              ) : (
                <span>Edit</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Edit Category</h1>

                {/* CATEGORY NAME INPUT*/}
                <div className={styles.formGroup}>
                  <label htmlFor="name">Category Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Category Name"
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

  return <div className={styles.editCategoryForm}>{content}</div>;
};
export default EditCategoryForm;

export const initialValues: CategoryForm = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
