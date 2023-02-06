import { CreateBrandForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./BrandNew.module.scss";

const BrandNew = () => {
  useTitle("Spedi: Brand Create");

  return (
    <div className={styles.brandNew}>
      <div className={styles["section-1"]}>
        <CreateBrandForm />
      </div>
    </div>
  );
};
export default BrandNew;
