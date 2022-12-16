import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../app/services/category/categoryApiSlice";
import { CategoryForm } from "../../../../types/formik.type";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import { initialValues, validationSchema } from "./EditCategorySchema";
import "./editCategoryForm.scss";

const EditCategoryForm = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [updateCategory, { isLoading: isCategoryUpdating }] = useUpdateCategoryMutation();

  const {
    data: category,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useGetCategoryQuery("categoryList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: entities[String(categoryId)],
      };
    },
  });

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
      console.log("🚀 ~ file: EditItemForm.tsx:49 ~ EditItemForm ~ result", result);

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

  let content: JSX.Element | null = null;

  if (isLoadingCategory) {
    content = (
      <div className="loading">
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isSuccessCategory) {
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
              isCategoryUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Edit</span>
              );

            return (
              <Form>
                <h1 className="title">Edit Category</h1>
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
  }

  return <div className="editCategoryForm">{content}</div>;
};
export default EditCategoryForm;
