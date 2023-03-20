import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styles from "./EngItemDetail.module.scss";
import noImage from "../../../../assets/img/noimage.png";
import moment from "moment";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { useGetBrandQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetItemQuery } from "../../../../app/services/item/itemApiSlice";
import { useAuth, useTitle } from "../../../../hooks";
import { useEffect, useState } from "react";
import { Item, Project, TransactionForm, TRANSACTION_STATUS, User } from "../../../../types";
import { useAddNewTransactionMutation } from "../../../../app/services/transaction/transactionApiSlice";
import ErrorList from "../../../../components/toast/ErrorList";
import { toast } from "react-toastify";
import { useGetMyProfileQuery } from "../../../../app/services/user/userApiSlice";
import { useGetMyProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { DebugControl, TextError } from "../../../../components/formik";

const EngItemDetail = () => {
  useTitle("Spedi: Item Detail");
  const [modal, setmodal] = useState<boolean>(false);
  const { id } = useAuth();
  const navigate = useNavigate();
  const { itemId } = useParams();

  const { data: user } = useGetMyProfileQuery(id as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[id as string] as User,
    }),
    skip: !id,
  });

  const { data: projects } = useGetMyProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.ids.map((id) => data?.entities[id]) as Project[],
    }),
  });

  const {
    data: item,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetItemQuery(itemId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[itemId as string],
    }),
    skip: !itemId,
  });

  const { data: category } = useGetCategoryQuery(item?.categoryId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[item?.categoryId as string],
    }),
    skip: !item?.categoryId,
  });

  const { data: brand } = useGetBrandQuery(item?.brandId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[item?.brandId as string],
    }),
    skip: !item?.brandId,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    content = (
      <div className={styles.errorMsg}>
        Failed to load data. Please try again or <span onClick={() => navigate(-1)}>Go back</span>
      </div>
    );
  }

  if (isSuccess && item && category && brand) {
    content = (
      <>
        <div className={styles.title}>Item</div>
        <div className={styles.information}>
          {/* IMAGE */}
          <img className={styles.itemImg} src={item.pictureUrl || noImage} alt="" />

          <div className={styles.details}>
            <h1 className={styles.itemTitle}>{item.name}</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Price:</span>
              <span className={styles.itemValue}>{item.price || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Quantity:</span>

              {item.quantity === 0 ? (
                <span className={styles.outofstock}>out of stock</span>
              ) : (
                <span className={styles.itemValue}>{item.quantity}</span>
              )}
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Category:</span>
              <span className={styles.itemValue}>{category.name || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Brand:</span>
              <span className={styles.itemValue}>{brand.name || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Model:</span>
              <span className={styles.itemValue}>{item.model || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Unit:</span>
              <span className={styles.itemValue}>{item.unit}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Created:</span>
              <span className={styles.itemValue}>
                {moment(item.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Updated:</span>
              <span className={styles.itemValue}>
                {moment(item.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Description:</span>
              <span className={styles.itemValue}>{item.description || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        <button
          className={styles.requestButton}
          disabled={item.quantity === 0}
          onClick={() => setmodal(true)}
        >
          Request
        </button>
      </>
    );
  }

  return (
    <div className={styles.itemDetail}>
      <div className={styles.wrapper}>{content}</div>
      {modal && item && user ? (
        <Modal item={item} setmodal={setmodal} user={user} projects={projects} />
      ) : null}
    </div>
  );
};
export default EngItemDetail;

export const initialValues: TransactionForm = {
  quantity: 1,
  status: TRANSACTION_STATUS.WAITING,
  receiverId: "",
  itemId: "",
  projectId: "",
  remarks: "",
};

export const validationSchema = Yup.object().shape({
  quantity: Yup.number().required("Required").positive().integer(),
  status: Yup.string(),
  receiverId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  itemId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  projectId: Yup.string().required("Required").uuid("Must be a valid UUID"),
  remarks: Yup.string(),
});

type ModalProps = {
  item: Item;
  setmodal: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  projects: Project[];
};

const Modal = ({ item, setmodal, user, projects }: ModalProps) => {
  // const [quantity, setQuantity] = useState<number>(1);
  // const [selectedProject, setSelectedProject] = useState<string>("");
  const navigate = useNavigate();

  const [addNewTransaction, { isLoading: isTransactionUpdating }] = useAddNewTransactionMutation();

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      receiverId: user.id,
      itemId: item.id,
    }));
  }, []);

  const onSubmit = async (values: TransactionForm, submitProps: FormikHelpers<TransactionForm>) => {
    try {
      const res = await addNewTransaction({
        quantity: values.quantity,
        status: TRANSACTION_STATUS.WAITING,
        projectId: values.projectId,
        receiverId: user.id,
        itemId: item.id,
        remarks: values.remarks || undefined,
      }).unwrap();
      toast.success("Request sent successfully");
      console.log("res is " + res.id);

      navigate(`/me/transactions/${res.id}`);
      submitProps.resetForm();
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
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
          initialValues={formValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form>
                <div className={styles.modalTitle}>Request Item</div>
                <div className={styles.modalBody}>
                  <div className={styles.modalItem}>
                    <span className={styles.modalKey}>Item:</span>
                    <span className={styles.modalValue}>{item?.name}</span>

                    <div className={styles.group}>
                      <span className={styles.modalKey}>Quantity:</span>
                      <Field
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        max={item.quantity}
                        className={styles.modalInput}
                      />
                      <ErrorMessage
                        name="quantity"
                        component={(props) => (
                          <TextError {...props} styles={styles["text-error"]} />
                        )}
                      />
                    </div>

                    <div className={styles.group}>
                      <span className={styles.modalKey}>My Projects:</span>
                      <Field
                        id="projectId"
                        name="projectId"
                        as="select"
                        className={styles.modalInput}
                      >
                        <option value="">Select Item</option>
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
                    <div className={styles.group}>
                      <span className={styles.modalKey}>Remarks:</span>
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
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Confirm
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
