import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import styles from "./CategoryDetail.module.scss";
import { ErrorMessage, Loading } from "../../../../components";

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
