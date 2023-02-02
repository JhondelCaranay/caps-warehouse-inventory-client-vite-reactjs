import styles from "./TransactionNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateTransactionForm } from "../../../../components";

const TransactionNew = () => {
  useTitle("Spedi: Transaction Create");

  return (
    <div className={styles.transactionNew}>
      <CreateTransactionForm />
    </div>
  );
};
export default TransactionNew;
