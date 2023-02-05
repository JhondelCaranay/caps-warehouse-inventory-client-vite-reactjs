import { ItemDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./ItemList.module.scss";

const ItemList = () => {
  useTitle("Spedi: Item List");

  return (
    <div className={styles.itemList}>
      <ItemDataTable />
    </div>
  );
};
export default ItemList;
