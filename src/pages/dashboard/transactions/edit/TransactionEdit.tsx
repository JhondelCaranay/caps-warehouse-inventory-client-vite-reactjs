import { EditTransactionForm } from "../../../../components";
import styles from "./TransactionEdit.module.scss";

const TransactionEdit = () => {
  return (
    <div className={styles.transactionEdit}>
      <EditTransactionForm />
    </div>
  );
};
export default TransactionEdit;
