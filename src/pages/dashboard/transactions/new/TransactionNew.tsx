import styles from "./TransactionNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateTransactionForm, Loading } from "../../../../components";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { Item, Project } from "../../../../types";

const TransactionNew = () => {
  useTitle("Spedi: Transaction Create");

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: items } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles.transactionNew}>
      <div className={styles.wrapper}>
        {projects && items ? (
          <CreateTransactionForm projects={projects} items={items} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default TransactionNew;
