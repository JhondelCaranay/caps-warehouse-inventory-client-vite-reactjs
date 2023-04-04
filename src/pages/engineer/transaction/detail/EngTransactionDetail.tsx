import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  useGetTransactionQuery,
  useUpdateTransactionStatusMutation,
} from "../../../../app/services/transaction/transactionApiSlice";
import styles from "./EngTransactionDetail.module.scss";
import noImage from "../../../../assets/img/noimage.png";
import { useTitle } from "../../../../hooks";
import { Item, Transaction, TransactionForm, TRANSACTION_STATUS } from "../../../../types";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { TextError } from "../../../../components/formik";
import ErrorList from "../../../../components/toast/ErrorList";
import * as Yup from "yup";
import { useState } from "react";
import { Loading } from "../../../../components";
import { ErrorMessage as ErrorMsg } from "../../../../components";
const EngTransactionDetail = () => {
  useTitle("Spedi: Transaction Detail");
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [modal, setmodal] = useState<boolean>(false);

  const {
    data: transaction,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTransactionQuery(transactionId as string, {
    refetchOnMountOrArgChange: true,
    skip: !transactionId,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMsg message={"Failed to load data"} />;
  }

  if (isSuccess && transaction) {
    content = (
      <>
        <div className={styles.top}>
          {/* LEFT */}
          <div className={styles.left}>
            <div className={styles.title}>Item</div>
            <div className={styles.information}>
              {/* IMAGE */}
              <img className={styles.itemImg} src={transaction.Item.pictureUrl || noImage} alt="" />

              <h1 className={styles.itemTitle}>{transaction.Item.name}</h1>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Category:</span>
                <span className={styles.itemValue}>{transaction.Item.Category.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Brand:</span>
                <span className={styles.itemValue}>{transaction.Item.Brand.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Unit:</span>
                <span className={styles.itemValue}>{transaction.Item.unit}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Requested item(s):</span>
                <span className={styles.itemValue}>{transaction.quantity}</span>
              </div>
              {/* <div className={styles.detailItem}>
                <span className={styles.itemKey}>Total:</span>
                <span className={styles.itemValue}>
                  {transaction.Item.price} X {transaction.quantity} ={" "}
                  {transaction.Item.price * transaction.quantity}
                </span>
              </div> */}
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Material slip:</span>
                <span className={styles.itemValue}>
                  {transaction.materials_issuance_num || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Release slip:</span>
                <span className={styles.itemValue}>{transaction.release_slip_num || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Gate pass:</span>
                <span className={styles.itemValue}>{transaction.gate_pass_num || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Return slip:</span>
                <span className={styles.itemValue}>{transaction.return_slip_num || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Remarks:</span>
                <span className={styles.itemValue}>{transaction.remarks || "N/A"}</span>
              </div>
            </div>

            <div
              className={styles.viewButton}
              onClick={() => navigate(`/me/items/${transaction.Item.id}`)}
            >
              view item
            </div>
          </div>

          {/* CENTER */}
          {transaction.Sender ? (
            <div className={styles.center}>
              <div className={styles.title}>Sender</div>
              <div className={styles.information}>
                <img
                  className={styles.itemImg}
                  src={transaction.Sender.Profile.avatarUrl || noImage}
                  alt=""
                />

                <h1 className={styles.itemTitle}>
                  {transaction.Sender.Profile.first_name} {transaction.Sender.Profile.last_name}
                </h1>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Email:</span>
                  <span className={styles.itemValue}>{transaction.Sender.email}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>contact:</span>
                  <span className={styles.itemValue}>
                    {transaction.Sender.Profile.contact || "N/A"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Address:</span>
                  <span className={styles.itemValue}>
                    {transaction.Sender.Profile.address || "N/A"}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.itemKey}>Position:</span>
                  <span className={styles.itemValue}>
                    {transaction.Sender.Profile.position || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ) : null}

          {/* RIGHT */}
          <div className={styles.right}>
            <div className={styles.title}>You</div>

            <div className={styles.information}>
              {/* IMAGE */}
              <img
                className={styles.itemImg}
                src={transaction.Receiver.Profile.avatarUrl || noImage}
                alt=""
              />

              <h1 className={styles.itemTitle}>
                {transaction.Receiver.Profile.first_name} {transaction.Receiver.Profile.last_name}
              </h1>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Email:</span>
                <span className={styles.itemValue}>{transaction.Receiver.email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Phone:</span>
                <span className={styles.itemValue}>
                  {transaction.Receiver.Profile.contact || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Address:</span>
                <span className={styles.itemValue}>
                  {transaction.Receiver.Profile.address || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Position:</span>
                <span className={styles.itemValue}>
                  {transaction.Receiver.Profile.position || "N/A"}
                </span>
              </div>
            </div>

            <hr />

            <div className={styles.subtitle}>Project</div>

            <div className={styles.information}>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Project name:</span>
                <span className={styles.itemValue}>{transaction.Project.name}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Address:</span>
                <span className={styles.itemValue}>{transaction.Project.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.title}>Status </div>

          <div className={styles.items}>
            <div
              className={`${styles.item} ${
                transaction.status === "WAITING" ? styles["ACTIVE"] : null
              }`}
            >
              <div className={styles.value}>Waiting</div>
            </div>
            <div
              className={`${styles.item} ${
                transaction.status === "ON_DELIVERY" ? styles["ACTIVE"] : null
              }`}
            >
              <div className={styles.value}>On Delivery</div>
            </div>
            <div
              className={`${styles.item} ${
                transaction.status === "CONFIRMED_RECEIVED" ? styles[transaction.status] : null
              }`}
            >
              <div className={styles.value}>Confirmed Recieve</div>
            </div>
            <div
              className={`${styles.item} ${
                transaction.status === "ON_RETURN" ? styles["ACTIVE"] : null
              }`}
            >
              <div className={styles.value}>On Return</div>
            </div>
            <div
              className={`${styles.item} ${
                transaction.status === "CONFIRMED_RETURNED" ? styles["ACTIVE"] : null
              }`}
            >
              <div className={styles.value}>Confirmed Returned</div>
            </div>

            {/* <div className={`${styles.item} ${styles["CANCELLED"]}`}>
              <div className={styles.value}>Cancelled</div>
            </div> */}
          </div>

          {transaction.status === "ON_DELIVERY" && (
            <div className={styles.updateCategoryButton} onClick={() => setmodal(true)}>
              {transaction.status === "ON_DELIVERY" && "Confirm recieved item"}
            </div>
          )}
          {transaction.status === "CONFIRMED_RECEIVED" && (
            <div className={styles.updateCategoryButton} onClick={() => setmodal(true)}>
              {transaction.status === "CONFIRMED_RECEIVED" && "Return item"}
            </div>
          )}
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
      </>
    );
  }

  return (
    <div className={styles.EngTransactionDetail}>
      <div className={styles.wrapper}>{content}</div>
      {modal && transaction ? (
        <ConfirmModal setmodal={setmodal} item={transaction.Item} transaction={transaction} />
      ) : null}
    </div>
  );
};
export default EngTransactionDetail;

export const initialValues: TransactionForm = {
  status: TRANSACTION_STATUS.ON_DELIVERY,
  remarks: "",
};

export const validationSchema = Yup.object().shape({
  status: Yup.string(),
  remarks: Yup.string(),
});

type ConfirmModalProps = {
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
  item: Item;
  transaction: Transaction;
};

// const TRANSACTION_STATUSs: {
//   WAITING: "WAITING";
//   ON_PROCESS: "ON_PROCESS";
//   ON_DELIVERY: "ON_DELIVERY";
//   CONFIRMED_RECEIVED: "CONFIRMED_RECEIVED";
//   ON_RETURN: "ON_RETURN";
//   CONFIRMED_RETURNED: "CONFIRMED_RETURNED";
// };

const ConfirmModal = ({ setmodal, item, transaction }: ConfirmModalProps) => {
  const [useUpdateTransaction, { isLoading: isTransactionUpdating }] =
    useUpdateTransactionStatusMutation();

  const onSubmit = async (values: TransactionForm, submitProps: FormikHelpers<TransactionForm>) => {
    let status = transaction.status;
    if (status === TRANSACTION_STATUS.ON_DELIVERY) {
      status = TRANSACTION_STATUS.CONFIRMED_RECEIVED;
    } else if (status === TRANSACTION_STATUS.CONFIRMED_RECEIVED) {
      status = TRANSACTION_STATUS.ON_RETURN;
    }

    try {
      const res = await useUpdateTransaction({
        id: transaction.id,
        status: status,
        remarks: values.remarks || undefined,
      }).unwrap();
      toast.success("Transaction updated successfully");
      // console.log(res);
      submitProps.resetForm();
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
    setmodal(false);
  };

  return (
    <div
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) setmodal(false);
      }}
    >
      <div className={styles.modalContent}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <div className={styles.modalTitle}>
                  {transaction.status === TRANSACTION_STATUS.ON_DELIVERY
                    ? "Confirm recieved item"
                    : "Return item"}
                </div>
                <div className={styles.modalBody}>
                  <div className={styles.modalItem}>
                    <span className={styles.modalKey}>Item:</span>
                    <span className={styles.modalValue}>{item.name}</span>

                    <div className={styles.group}>
                      <span className={styles.modalKey}>
                        Remarks <small>(optional)</small>
                      </span>
                      <Field
                        as="textarea"
                        id="remarks"
                        name="remarks"
                        rows={3}
                        className={styles.remarks}
                      />
                      <ErrorMessage
                        name="remarks"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.modalFooter}>
                  <button
                    type="submit"
                    className={styles.modalButton}
                    disabled={formik.isSubmitting}
                  >
                    {isTransactionUpdating || formik.isSubmitting ? (
                      <PulseLoader color={"#1976d2"} />
                    ) : (
                      <span>Create</span>
                    )}
                  </button>
                  <div
                    className={styles.modalButton}
                    onClick={() => {
                      formik.resetForm();
                      setmodal(false);
                    }}
                  >
                    No
                  </div>
                </div>
                {/* DEBUGER */}
                {/* {import.meta.env.VITE_NODE_ENV === "development" && (
                  <DebugControl values={formik.values} />
                )} */}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
