import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewCategoryMutation } from "../../../../app/services/category/categoryApiSlice";
import { CategoryForm } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import "./createCategoryForm.scss";
import { initialValues, validationSchema } from "./CreateCategorySchema";

const CreateCategoryForm = () => {
  const navigate = useNavigate();
  const [addNewCategory, { isLoading: isCategoryUpdating }] = useAddNewCategoryMutation();

  const onSubmit = async (
    values: CategoryForm,
    submitProps: FormikHelpers<CategoryForm>
  ) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await addNewCategory({
        name: values.name,
      }).unwrap();
      console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

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

  let content: JSX.Element | null = null;

  content = (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          const buttonText =
            isCategoryUpdating || formik.isSubmitting ? (
              <PulseLoader color={"black"} />
            ) : (
              <span>Create</span>
            );

          return (
            <Form>
              <h1 className="title">Create Category</h1>
              {/* <DebugControl values={formik.values} /> */}
              <div className="row">
                <div className="left">
                  <InputControl
                    label="Category Name"
                    name="name"
                    type="text"
                    placeholder="Category Name"
                    isError={Boolean(formik.touched.name && formik.errors.name)}
                  />
                </div>

                <div className="right"></div>
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

  return <div className="createCategoryForm">{content}</div>;
};
export default CreateCategoryForm;
