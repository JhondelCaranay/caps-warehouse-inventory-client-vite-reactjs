import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetTransactionQuery } from "../../../../app/services/transaction/transactionApiSlice";
import styles from "./EngTransactionDetail.module.scss";
import noImage from "../../../../assets/img/noimage.png";

const EngTransactionDetail = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();

  const {
    data: transaction,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetTransactionQuery(transactionId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[transactionId as string],
    }),
    skip: !transactionId,
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

  if (isSuccess && transaction) {
    console.log(transaction);

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
                <span className={styles.itemKey}>Item Price:</span>
                <span className={styles.itemValue}>{transaction.Item.price}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Requested item(s):</span>
                <span className={styles.itemValue}>{transaction.quantity}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.itemKey}>Total:</span>
                <span className={styles.itemValue}>
                  {transaction.Item.price} X {transaction.quantity} ={" "}
                  {transaction.Item.price * transaction.quantity}
                </span>
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className={styles.center}>
            <div className={styles.title}>Send by</div>
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
          <div className={styles.title}>Status {transaction.status}</div>

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
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        {/* <div
          className={styles.editButton}
          onClick={() => navigate(`/dash/transactions/edit/${transaction.id}`)}
        >
          Edit
        </div> */}
      </>
    );
  }

  return (
    <div className={styles.EngTransactionDetail}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default EngTransactionDetail;
