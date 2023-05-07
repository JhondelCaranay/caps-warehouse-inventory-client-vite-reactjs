import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { ErrorMessage, ItemDataTable, Loading } from "../../../../components";
import { useAuth, useTitle } from "../../../../hooks";
import styles from "./ItemList.module.scss";
import { ROLES } from "../../../../types";

const ItemList = () => {
  useTitle("Spedi: Item List");
  const { role } = useAuth();
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
    content = <ItemDataTable items={items} />;
  }
  return (
    <div className={styles.itemList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          {role === ROLES.WAREHOUSE_CONTROLLER && (
            <Link to="/dash/items/new" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined">
                Create Item
              </Button>
            </Link>
          )}
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
