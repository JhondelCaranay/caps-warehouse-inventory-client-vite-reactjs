import styles from "./ItemNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateItemForm } from "../../../../components";

const ItemNew = () => {
  useTitle("Spedi: Item Create");

  return (
    <div className={styles.itemNew}>
      <CreateItemForm />
    </div>
  );
};
export default ItemNew;
