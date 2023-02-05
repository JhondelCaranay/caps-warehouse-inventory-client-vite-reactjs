import { EditItemForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./ItemEdit.module.scss";

const ItemEdit = () => {
  useTitle("Spedi: Item Edit");

  return (
    <div className={styles.itemEdit}>
      <EditItemForm />
    </div>
  );
};
export default ItemEdit;
