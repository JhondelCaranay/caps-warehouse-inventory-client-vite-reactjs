import "./transactionNew.scss";
import useTitle from "../../../../hooks/useTitle";

import CreateTransactionForm from "../../../../components/formik/transaction/CreateTransactionForm";

const TransactionNew = () => {
	useTitle("Spedi: Transaction Create");

	return (
		<div className="transactionNew">
			<CreateTransactionForm />
		</div>
	);
};
export default TransactionNew;
