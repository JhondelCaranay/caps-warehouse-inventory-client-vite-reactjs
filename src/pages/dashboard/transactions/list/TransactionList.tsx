import styles from "./TransactionList.module.scss";
import { TransactionDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetTransactionsQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { Transaction } from "../../../../types";

const TransactionList = () => {
  useTitle("Spedi: Transaction List");

  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetTransactionsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Transaction) : [],
    }),
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  } else if (isError) {
    console.log(error);
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
        <h1 className={styles.error}>Failed to load data</h1>
      </div>
    );
  } else if (isSuccess) {
    content = <TransactionDataTable transactions={transactions} />;
  }

  return (
    <div className={styles.transactionList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          {/* <Link to="/dash/transactions/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Transaction
            </Button>
          </Link> */}
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      {content}
    </div>
  );
};
export default TransactionList;
