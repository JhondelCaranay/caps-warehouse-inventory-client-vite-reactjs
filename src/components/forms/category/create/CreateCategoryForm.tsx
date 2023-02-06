import styles from "./CreateCategoryForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewCategoryMutation } from "../../../../app/services/category/categoryApiSlice";
import { CategoryForm } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const [addNewCategory, { isLoading: isCategoryUpdating }] = useAddNewCategoryMutation();

  const onSubmit = async (values: CategoryForm, submitProps: FormikHelpers<CategoryForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await addNewCategory({
        name: values.name,
      }).unwrap();
      // console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

      toast.success("Category created successfully");
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
            isCategoryUpdating || formik.isSubmitting ? (
              <PulseLoader color={"#1976d2"} />
            ) : (
              <span>Create</span>
            );

          return (
            <Form>
              <h1 className={styles.title}>Create Category</h1>
              {/* <DebugControl values={formik.values} /> */}

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

  return <div className={styles.createCategoryForm}>{content}</div>;
};

export default CreateCategoryForm;

export const initialValues: CategoryForm = {
  name: "",
  // image: "",
};
// const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  // only accept image files
  // image: Yup.mixed().test("type", "Only accept image files", (value) => {
  //   console.log("🚀 ~ file: CreateCategorySchema.tsx:14 ~ image:Yup.mixed ~ value", value);
  //   if (value) {
  //     return allowedTypes.includes(value.type);
  //   }
  //   return true;
  // }),
});
