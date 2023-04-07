import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetTransactionsByProjectIdQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { ErrorMessage, Loading, TransactionTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Project, Transaction } from "../../../../types";
import styles from "./EngProjectDetail.module.scss";

const EngProjectDetail = () => {
  useTitle("Spedi: Project Detail");
  const navigate = useNavigate();
  const { projectId } = useParams();

  const {
    data: project,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetProjectQuery(projectId as string, {
    refetchOnMountOrArgChange: true,
    skip: !projectId,
  });

  const { data: transactions, isLoading: isTransactionLoading } =
    useGetTransactionsByProjectIdQuery(projectId as string, {
      refetchOnMountOrArgChange: true,
      skip: !projectId,
    });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && project) {
    content = (
      <>
        <div className={styles.title}>Project</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>{project.name}</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Address</span>
            <span className={styles.itemValue}>{project.address}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Assigned Engineer</span>
            <span className={styles.itemValue}>
              {project.User.Profile.first_name} {project.User.Profile.last_name}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Project Status</span>
            <span className={`${styles.itemValue} ${styles["ONGOING"]}`}>{"Ongoing"}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Created:</span>
            <span className={styles.itemValue}>
              {moment(project.createdAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Updated:</span>
            <span className={styles.itemValue}>
              {moment(project.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        {/* <div
          className={styles.editButton}
          onClick={() => navigate(`/dash/projects/edit/${project.id}`)}
        >
          Edit
        </div> */}
      </>
    );
  }
  return (
    <div className={styles.engProjectDetail}>
      <div className={styles.wrapper}>{content}</div>
      <div className={styles.transactionTable}>
        <h1 className={styles.title}>Transactions</h1>
        {transactions ? <TransactionTable transactions={transactions} /> : <Loading />}
      </div>
    </div>
  );
};
export default EngProjectDetail;
