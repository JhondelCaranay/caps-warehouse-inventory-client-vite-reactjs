import TransactionDataTable from "../../../../components/dashboard/datatable/transaction/TransactionDataTable";
import useTitle from "../../../../hooks/useTitle";
import "./transactionList.scss";

const TransactionList = () => {
  useTitle("Spedi: Transaction List");
  return (
    <div className="transactionList">
      <TransactionDataTable />
    </div>
  );
};
export default TransactionList;
