import styles from "./CategoryEdit.module.scss";
import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { EditCategoryForm, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";

const CategoryEdit = () => {
  useTitle("Spedi: Category Edit");
  const { categoryId } = useParams();

  const {
    data: category,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoryQuery(categoryId as string, {
    refetchOnMountOrArgChange: true,
    skip: !categoryId,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && category) {
    content = <EditCategoryForm category={category} />;
  }

  return (
    <div className={styles.categoryEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default CategoryEdit;
