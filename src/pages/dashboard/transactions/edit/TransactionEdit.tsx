import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetTransactionsQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { EditTransactionForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Item, Project } from "../../../../types";
import styles from "./TransactionEdit.module.scss";

const TransactionEdit = () => {
  useTitle("Spedi: Transaction Edit");
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const {
    data: transaction,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTransactionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data && transactionId ? data.entities[transactionId] : undefined,
    }),
  });

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Project) : [],
    }),
  });

  const { data: items } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Item) : [],
    }),
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
    content = <div className={styles.errorMsg}>Failed to load data. Please try again</div>;
  }

  if (isSuccess && !transaction) {
    content = (
      <div className={styles.notFound}>
        Transaction not found. <span onClick={() => navigate(-1)}>Please go back</span>
      </div>
    );
  }

  if (isSuccess && transaction) {
    content = <EditTransactionForm transaction={transaction} projects={projects} items={items} />;
  }

  return (
    <div className={styles.transactionEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default TransactionEdit;
