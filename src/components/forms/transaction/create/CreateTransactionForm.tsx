import styles from "./CreateTransactionForm.module.scss";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { Item, Project, TransactionForm, TRANSACTION_STATUS } from "../../../../types";
import { toast } from "react-toastify";
import ErrorList from "../../../toast/ErrorList";
import { PulseLoader } from "react-spinners";
import { Button } from "@mui/material";
import { useAddNewTransactionMutation } from "../../../../app/services/transaction/transactionApiSlice";
import { useAuth } from "../../../../hooks";
import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

export const initialValues: TransactionForm = {
  quantity: 1,
  remarks: "",
  status: TRANSACTION_STATUS.ON_DELIVERY,
  release_slip_num: "",
  materials_issuance_num: "",
  gate_pass_num: "",
  senderId: "",
  receiverId: "",
  itemId: "",
  projectId: "",
};

export const validationSchema = Yup.object().shape({
  quantity: Yup.number().required("Required").positive().integer(),
  remarks: Yup.string(),
  status: Yup.string(),
  release_slip_num: Yup.string().required("Required"),
  materials_issuance_num: Yup.string().required("Required"),
  gate_pass_num: Yup.string().required("Required"),
  senderId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  receiverId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  itemId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  projectId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});

const CreateTransactionForm = () => {
  const navigate = useNavigate();
  const { id } = useAuth();

  const [addNewTransaction, { isLoading: isTransactionUpdating }] = useAddNewTransactionMutation();

  const {
    data: projects,
    isLoading: isLoadingProjects,
    isSuccess: isSuccessProjects,
  } = useGetProjectsQuery("projectList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: ids.map((id) => entities[id] as Project),
      };
    },
  });

  const {
    data: items,
    isLoading: isLoadingItems,
    isSuccess: isSuccessItems,
  } = useGetItemsQuery("itemList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: ids.map((id) => entities[id] as Item),
      };
    },
  });

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      senderId: id,
    }));
  }, []);

  const onSubmit = async (values: TransactionForm, submitProps: FormikHelpers<TransactionForm>) => {
    console.log("🚀 ~ file: CreateTransactionForm.tsx:65 ~ CreateTransactionForm ~ values", values);
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await addNewTransaction({
        quantity: values.quantity,
        remarks: values.remarks || null,
        status: values.status,
        release_slip_num: values.release_slip_num,
        materials_issuance_num: values.materials_issuance_num,
        gate_pass_num: values.gate_pass_num,
        senderId: values.senderId,
        receiverId: values.receiverId,
        itemId: values.itemId,
        projectId: values.projectId,
      }).unwrap();
      console.log(
        "🚀 ~ file: CreateTransactionForm.tsx:86 ~ CreateTransactionForm ~ result",
        result
      );

      toast.success("Transaction created successfully");
      submitProps.resetForm();
      navigate("/dash/transactions");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element = <></>;

  if (isLoadingItems || isLoadingProjects) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isSuccessItems && isSuccessProjects) {
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
              isTransactionUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Create</span>
              );

            const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
              const projectId = e.target.value;
              const userId = projects?.find((project) => project.id === projectId)?.userId;
              formik.setFieldTouched("projectId", true);
              formik.setFieldValue("receiverId", userId || "");
              formik.setFieldValue("projectId", projectId || ""); // this must be last
            };

            return (
              <Form>
                <h1 className={styles.title}>Create Transaction</h1>

                <div className={styles.row}>
                  {/* LEFT */}
                  <div className={styles.left}>
                    {/* SELECT ITEM  */}
                    <div className={styles.formGroup}>
                      <label htmlFor="itemId">Item</label>
                      <Field
                        id="itemId"
                        name="itemId"
                        as="select"
                        className={`${styles.input} ${
                          Boolean(formik.touched.itemId && formik.errors.itemId) ? styles.error : ""
                        }`}
                      >
                        <option value="">Select Item</option>
                        {items?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="itemId"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* QUANTITY INPUT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="quantity">Quantity</label>
                      <Field
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
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

                    {/* SELECT PROJECT  */}
                    <div className={styles.formGroup}>
                      <label htmlFor="projectId">Project</label>
                      <Field
                        id="projectId"
                        name="projectId"
                        as="select"
                        className={`${styles.input} ${
                          Boolean(formik.touched.projectId && formik.errors.projectId)
                            ? styles.error
                            : ""
                        }`}
                        onChange={handleProjectChange}
                      >
                        <option value="">Select Project</option>
                        {projects?.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="projectId"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* REMARKS TEXT AREA */}
                    <div className={styles.formGroup}>
                      <label htmlFor="remarks">Remarks</label>
                      <Field
                        id="remarks"
                        name="remarks"
                        as="textarea"
                        rows="4"
                        className={`${styles.input} ${
                          Boolean(formik.touched.remarks && formik.errors.remarks)
                            ? styles.error
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="remarks"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className={styles.right}>
                    {/* RELEASE SLIP INPUT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="release_slip_num">Release Slip #</label>
                      <Field
                        id="release_slip_num"
                        name="release_slip_num"
                        type="text"
                        placeholder="#"
                        className={`${styles.input} ${
                          Boolean(formik.touched.release_slip_num && formik.errors.release_slip_num)
                            ? styles.error
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="release_slip_num"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* MATERIAL ISSUANCE SLIP INPUT*/}
                    <div className={styles.formGroup}>
                      <label htmlFor="materials_issuance_num">Materials Issuance #</label>
                      <Field
                        id="materials_issuance_num"
                        name="materials_issuance_num"
                        type="text"
                        placeholder="#"
                        className={`${styles.input} ${
                          Boolean(
                            formik.touched.materials_issuance_num &&
                              formik.errors.materials_issuance_num
                          )
                            ? styles.error
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="materials_issuance_num"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    {/* GATE PASS SLIP INPUT */}
                    <div className={styles.formGroup}>
                      <label htmlFor="gate_pass_num">Gate Pass #</label>
                      <Field
                        id="gate_pass_num"
                        name="gate_pass_num"
                        type="text"
                        placeholder="#"
                        className={`${styles.input} ${
                          Boolean(formik.touched.gate_pass_num && formik.errors.gate_pass_num)
                            ? styles.error
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name="gate_pass_num"
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

  return <div className={styles.createTransactionForm}>{content}</div>;
};
export default CreateTransactionForm;
