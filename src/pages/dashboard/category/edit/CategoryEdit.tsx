import styles from "./CategoryEdit.module.scss";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { Category } from "../../../../types";
import { EditCategoryForm } from "../../../../components";
import { useTitle } from "../../../../hooks";

const CategoryEdit = () => {
  useTitle("Spedi: Category Edit");
  const { categoryId } = useParams();

  const {
    data: categories = { entities: {}, ids: [] },
    isLoading,
    isSuccess,
    isError,
    error: errorCategory,
  } = useGetCategoryQuery("categoryList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const category = useMemo(() => {
    return categories.entities[String(categoryId)] as Category;
  }, [categories, categoryId]);

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(errorCategory);
    content = <div className={styles.errorMsg}>Something went wrong, please try again</div>;
  }

  if (isSuccess) {
    content = (
      <div className={styles["section-1"]}>
        <EditCategoryForm category={category} />
      </div>
    );
  }

  return <div className={styles.categoryEdit}>{content}</div>;
};
export default CategoryEdit;
