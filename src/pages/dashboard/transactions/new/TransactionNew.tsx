import "./transactionNew.scss";
import useTitle from "../../../../hooks/useTitle";
import CreateTransactionForm from "../../../../components/forms/transaction/create/CreateTransactionForm";

const TransactionNew = () => {
  useTitle("Spedi: Transaction Create");

  return (
    <div className="transactionNew">
      <CreateTransactionForm />
    </div>
  );
};
export default TransactionNew;
