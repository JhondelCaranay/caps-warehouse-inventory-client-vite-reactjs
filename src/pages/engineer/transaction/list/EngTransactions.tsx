import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useGetMyTransactionsQuery } from "../../../../app/services/transaction/transactionApiSlice";
import { ErrorMessage, Loading, MyTransactionDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./EngTransaction.module.scss";

const EngTransactions = () => {
  useTitle("Spedi: Transaction List");

  const {
    data: transactions,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetMyTransactionsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }
  if (isSuccess) {
    content = <MyTransactionDataTable transactions={transactions} />;
  }

  return (
    <div className={styles.EngTransactionList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      {content}
    </div>
  );
};
export default EngTransactions;
