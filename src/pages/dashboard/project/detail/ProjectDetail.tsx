import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetTransactionsByProjectIdQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { TransactionTable } from "../../../../components";
import { Transaction } from "../../../../types";
import styles from "./ProjectDetail.module.scss";

const ProjectDetail = () => {
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
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[projectId as string],
    }),
    skip: !projectId,
  });

  const { data: transactions, isLoading: isTransactionLoading } =
    useGetTransactionsByProjectIdQuery(projectId as string, {
      refetchOnMountOrArgChange: true,
      selectFromResult: ({ data, ...result }) => ({
        ...result,
        data: data ? (data.ids.map((id) => data.entities[id]) as Transaction[]) : [],
      }),
      skip: !projectId,
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
        <div
          className={styles.editButton}
          onClick={() => navigate(`/dash/projects/edit/${project.id}`)}
        >
          Edit
        </div>
      </>
    );
  }
  return (
    <div className={styles.projectDetail}>
      <div className={styles.wrapper}>{content}</div>
      <div className={styles.transactionTable}>
        <h1 className={styles.title}>Transactions</h1>
        {isTransactionLoading ? (
          <div className={styles.loading}>
            <PulseLoader color={"#4e90d2"} />
          </div>
        ) : (
          <TransactionTable transactions={transactions} />
        )}
      </div>
    </div>
  );
};
export default ProjectDetail;
