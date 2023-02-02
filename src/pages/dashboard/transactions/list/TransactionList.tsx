import styles from "./TransactionList.module.scss";
import { TransactionDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";

const TransactionList = () => {
  useTitle("Spedi: Transaction List");
  return (
    <div className={styles.transactionList}>
      <TransactionDataTable />
    </div>
  );
};
export default TransactionList;
