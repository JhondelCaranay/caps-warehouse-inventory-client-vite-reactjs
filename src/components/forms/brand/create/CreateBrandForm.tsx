import styles from "./CreateBrandForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewBrandMutation } from "../../../../app/services/brand/brandApiSlice";
import { BrandForm } from "../../../../types";
import { DebugControl, TextError } from "../../../formik";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";

const CreateBrandForm = () => {
  const navigate = useNavigate();
  const [addNewBrand, { isLoading: isBrandUpdating }] = useAddNewBrandMutation();

  const onSubmit = async (values: BrandForm, submitProps: FormikHelpers<BrandForm>) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await addNewBrand({
        name: values.name,
      }).unwrap();

      toast.success("Brand created successfully");
      submitProps.resetForm();
      navigate("/dash/brands");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.createBrandForm}>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isBrandUpdating || formik.isSubmitting ? (
                <PulseLoader color={"#1976d2"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Create Brand</h1>

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
                    component={(props) => <TextError {...props} styles={styles.textError} />}
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
    </div>
  );
};
export default CreateBrandForm;

export const initialValues: BrandForm = {
  name: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});
