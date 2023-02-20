import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandQuery } from "../../../../app/services/brand/brandApiSlice";
import styles from "./BrandDetail.module.scss";

const BrandDetail = () => {
  const navigate = useNavigate();
  const { brandId } = useParams();

  const {
    data: brand,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetBrandQuery(brandId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[brandId as string],
    }),
    skip: !brandId,
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

  if (isSuccess && brand) {
    content = (
      <>
        <div className={styles.title}>Brand</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>{brand.name}</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Created:</span>
            <span className={styles.itemValue}>
              {moment(brand.createdAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Updated:</span>
            <span className={styles.itemValue}>
              {moment(brand.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
            </span>
          </div>
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        <div
          className={styles.editButton}
          onClick={() => navigate(`/dash/brands/edit/${brand.id}`)}
        >
          Edit
        </div>
      </>
    );
  }

  return (
    <div className={styles.brandDetail}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default BrandDetail;
