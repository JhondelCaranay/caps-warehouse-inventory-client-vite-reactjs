import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import styles from "./CategoryDetail.module.scss";

const CategoryDetail = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const {
    data: category,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetCategoryQuery(categoryId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[categoryId as string],
    }),
    skip: !categoryId,
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
    content = (
      <div className={styles.errorMsg}>
        Failed to load data. Please try again or <span onClick={() => navigate(-1)}>Go back</span>
      </div>
    );
  }

  if (isSuccess && category) {
    content = (
      <>
        <div className={styles.title}>Category</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>{category.name}</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Created:</span>
            <span className={styles.itemValue}>
              {moment(category.createdAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Updated:</span>
            <span className={styles.itemValue}>
              {moment(category.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        <div
          className={styles.editButton}
          onClick={() => navigate(`/dash/category/edit/${category.id}`)}
        >
          Edit
        </div>
      </>
    );
  }

  return (
    <div className={styles.categoryDetail}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default CategoryDetail;
