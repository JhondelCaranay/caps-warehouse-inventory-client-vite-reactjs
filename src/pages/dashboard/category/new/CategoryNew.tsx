import { CreateCategoryForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./CategoryNew.module.scss";

const CategoryNew = () => {
  useTitle("Spedi: Category Create");

  return (
    <div className={styles.categoryNew}>
      <div className={styles.wrapper}>
        <CreateCategoryForm />
      </div>
    </div>
  );
};
export default CategoryNew;
