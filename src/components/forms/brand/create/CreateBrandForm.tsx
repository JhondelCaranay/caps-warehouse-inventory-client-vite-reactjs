import "./createBrandForm.scss";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewBrandMutation } from "../../../../app/services/brand/brandApiSlice";
import { BrandForm } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import { initialValues, validationSchema } from "./CreateBrandSchema";

const CreateBrandForm = () => {
  const navigate = useNavigate();
  const [addNewBrand, { isLoading: isBrandUpdating }] = useAddNewBrandMutation();

  const onSubmit = async (values: BrandForm, submitProps: FormikHelpers<BrandForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await addNewBrand({
        name: values.name,
      }).unwrap();
      // console.log("🚀 ~ file: CreateBrandForm.tsx:26 ~ onSubmit ~ result", result)

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
            isBrandUpdating || formik.isSubmitting ? (
              <PulseLoader color={"#1976d2"} />
            ) : (
              <span>Create</span>
            );

          return (
            <Form>
              <h1 className="title">Create Brand</h1>
              {/* <DebugControl values={formik.values} /> */}

              <InputControl
                label="Brand Name"
                name="name"
                type="text"
                placeholder="Brand Name"
                isError={Boolean(formik.touched.name && formik.errors.name)}
              />

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

  return <div className="createBrandForm">{content}</div>;
};
export default CreateBrandForm;
