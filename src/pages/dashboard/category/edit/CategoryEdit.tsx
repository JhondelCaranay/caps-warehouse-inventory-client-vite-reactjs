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
    data: category,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoryQuery("categoryList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data && categoryId ? data.entities[categoryId] : undefined,
    }),
  });

  if (isSuccess && !category) {
    return <div className={styles.notFound}>Brand not found</div>;
  }

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    content = <div className={styles.errorMsg}>Something went wrong, please try again</div>;
  }

  if (isSuccess && category) {
    content = <EditCategoryForm category={category} />;
  }

  return (
    <div className={styles.categoryEdit}>
      <div className={styles.left}>{content}</div>
    </div>
  );
};
export default CategoryEdit;
