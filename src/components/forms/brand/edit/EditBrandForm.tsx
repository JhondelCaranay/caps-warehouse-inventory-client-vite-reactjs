import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "../../../../app/services/brand/brandApiSlice";
import { BrandForm } from "../../../../types";
import DebugControl from "../../../formik/DebugControl";
import InputControl from "../../../formik/InputControl";
import ErrorList from "../../../toast/ErrorList";
import { initialValues, validationSchema } from "./EditBrandSchema";
import "./editBrandForm.scss";
import { useEffect, useState } from "react";

const EditBrandForm = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [updateBrand, { isLoading: isBrandUpdating }] = useUpdateBrandMutation();

  const {
    data: brands,
    isLoading: isLoadingBrands,
    isSuccess: isSuccessBrands,
  } = useGetBrandsQuery("brandList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: entities[String(brandId)],
      };
    },
  });

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (brands) {
      setFormValues((prev) => ({
        ...prev,
        id: brands.id,
        name: brands.name,
      }));
    }
  }, [brands]);

  const onSubmit = async (values: BrandForm, submitProps: FormikHelpers<BrandForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await updateBrand({
        id: values.id,
        name: values.name,
      }).unwrap();
      console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

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

  if (isLoadingBrands) {
    content = (
      <div className="loading">
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isSuccessBrands) {
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
              isBrandUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className="title">Edit Brand</h1>
                {/* <DebugControl values={formik.values} /> */}
                <div className="row">
                  <div className="left">
                    <InputControl
                      label="Brand Name"
                      name="name"
                      type="text"
                      placeholder="Brand Name"
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

  return <div className="editBrandForm">{content}</div>;
};
export default EditBrandForm;
