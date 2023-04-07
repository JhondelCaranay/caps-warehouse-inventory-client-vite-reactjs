import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetTransactionQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { EditTransactionForm, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";
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
  } = useGetTransactionQuery(transactionId as string, {
    refetchOnMountOrArgChange: true,
    skip: !transactionId,
  });

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: items } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && transaction && projects && items) {
    content = <EditTransactionForm transaction={transaction} projects={projects} items={items} />;
  }

  return (
    <div className={styles.transactionEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default TransactionEdit;
