import styles from "./TransactionNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateTransactionForm } from "../../../../components";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { Item, Project } from "../../../../types";

const TransactionNew = () => {
  useTitle("Spedi: Transaction Create");

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Project) : [],
    }),
  });

  const { data: items } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Item) : [],
    }),
  });

  return (
    <div className={styles.transactionNew}>
      <div className={styles.wrapper}>
        <CreateTransactionForm projects={projects} items={items} />
      </div>
    </div>
  );
};
export default TransactionNew;
