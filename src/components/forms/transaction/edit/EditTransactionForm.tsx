import styles from "./EditTransactionForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

import { useUpdateTransactionMutation } from "../../../../app/services/transaction/transactionApiSlice";
import { Capitalize } from "../../../../config/utils/functions";
import { Item, Project, Transaction, TransactionForm, TRANSACTION_STATUS } from "../../../../types";
import ErrorList from "../../../toast/ErrorList";

import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

export const initialValues: TransactionForm = {
  quantity: 0,
  remarks: "",
  status: "",
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
  status: Yup.string().required("Required"),
  release_slip_num: Yup.string().required("Required"),
  materials_issuance_num: Yup.string().required("Required"),
  gate_pass_num: Yup.string().required("Required"),
  senderId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  receiverId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  itemId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  projectId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});

type EditTransactionFormProps = {
  transaction: Transaction;
  projects: Project[];
  items: Item[];
};

const EditTransactionForm = ({ transaction, projects, items }: EditTransactionFormProps) => {
  const navigate = useNavigate();
  // const { id } = useAuth();

  const [updateTransaction, { isLoading: isTransactionUpdating }] = useUpdateTransactionMutation();
  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (transaction) {
      setFormValues((prev) => ({
        ...prev,
        id: transaction.id,
        quantity: transaction.quantity,
        remarks: transaction.remarks || "",
        status: transaction.status as TRANSACTION_STATUS,
        release_slip_num: transaction.release_slip_num || "",
        materials_issuance_num: transaction.materials_issuance_num || "",
        gate_pass_num: transaction.gate_pass_num || "",
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        itemId: transaction.itemId,
        projectId: transaction.projectId,
      }));
    }
  }, [transaction]);

  const onSubmit = async (values: TransactionForm, submitProps: FormikHelpers<TransactionForm>) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      await updateTransaction({
        id: values.id,
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

      toast.success("Transaction updated successfully");
      submitProps.resetForm();
      navigate("/dash/transactions");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.editTransactionForm}>
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
              <span>Edit</span>
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
              <h1 className={styles.title}>Edit Transaction</h1>

              <div className={styles.row}>
                {/* LEFT  */}
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
                      disabled
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
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
                      disabled
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
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
                        Boolean(formik.touched.remarks && formik.errors.remarks) ? styles.error : ""
                      }`}
                    />
                    <ErrorMessage
                      name="remarks"
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>
                </div>

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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
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
                      component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                    />
                  </div>

                  {/* SELECT STATUS  */}
                  <div className={styles.formGroup}>
                    <label htmlFor="status">Status</label>
                    <Field
                      id="status"
                      name="status"
                      as="select"
                      className={`${styles.input} ${
                        Boolean(formik.touched.status && formik.errors.status) ? styles.error : ""
                      }`}
                    >
                      {Object.keys(TRANSACTION_STATUS).map((key) => (
                        <option key={key} value={key}>
                          {Capitalize(key)}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="status"
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
};
export default EditTransactionForm;
