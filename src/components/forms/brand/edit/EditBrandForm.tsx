import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useUpdateBrandMutation } from "../../../../app/services/brand/brandApiSlice";
import { Brand, BrandForm } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import styles from "./EditBrandForm.module.scss";
import { useEffect, useState } from "react";
import { DebugControl, TextError } from "../../../formik";

type EditBrandFormProps = {
  brand: Brand;
};

const EditBrandForm = ({ brand }: EditBrandFormProps) => {
  const navigate = useNavigate();

  const [updateBrand, { isLoading: isBrandUpdating }] = useUpdateBrandMutation();

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (brand) {
      setFormValues((prev) => ({
        ...prev,
        id: brand.id,
        name: brand.name,
      }));
    }
  }, [brand]);

  const onSubmit = async (values: BrandForm, submitProps: FormikHelpers<BrandForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await updateBrand({
        id: values.id,
        name: values.name,
      }).unwrap();
      // console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

      toast.success("Brand created successfully");
      submitProps.resetForm();
      navigate("/dash/brands");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element = <></>;

  if (brand) {
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
              isBrandUpdating || formik.isSubmitting ? (
                <PulseLoader color={"#1976d2"} />
              ) : (
                <span>Edit</span>
              );

            return (
              <Form>
                <h1 className="title">Edit Brand</h1>

                {/* BRAND NAME INPUT*/}
                <div className={styles.formGroup}>
                  <label htmlFor="name">Brand Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Brand Name"
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

  return <div className={styles.editBrandForm}>{content}</div>;
};
export default EditBrandForm;

export const initialValues: BrandForm = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
