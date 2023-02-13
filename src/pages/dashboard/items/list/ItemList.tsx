import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { ItemDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Item } from "../../../../types";
import styles from "./ItemList.module.scss";

const ItemList = () => {
  useTitle("Spedi: Item List");

  const {
    data: items,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetItemsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.ids.map((id) => data?.entities[id] as Item),
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
    console.error(error);
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
        <h1 className={styles.error}>Failed to load data</h1>
      </div>
    );
  } else if (isSuccess && items) {
    content = <ItemDataTable items={items} />;
  }

  return (
    <div className={styles.itemList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/items/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Item
            </Button>
          </Link>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      {content}
    </div>
  );
};
export default ItemList;
