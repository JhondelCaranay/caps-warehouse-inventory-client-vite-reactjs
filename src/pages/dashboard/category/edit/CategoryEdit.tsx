import styles from "./CategoryEdit.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { EditCategoryForm } from "../../../../components";
import { useTitle } from "../../../../hooks";

const CategoryEdit = () => {
  useTitle("Spedi: Category Edit");
  const { categoryId } = useParams();
  const navigate = useNavigate();

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

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    content = <div className={styles.errorMsg}>Failed to load data. Please try again</div>;
  }

  if (isSuccess && !category) {
    content = (
      <div className={styles.notFound}>
        Category not found. <span onClick={() => navigate(-1)}>Please go back</span>
      </div>
    );
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
