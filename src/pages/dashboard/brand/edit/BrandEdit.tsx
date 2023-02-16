import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { EditBrandForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./BrandEdit.module.scss";

const BrandEdit = () => {
  useTitle("Spedi: Brand Edit");
  const { brandId } = useParams();
  const navigate = useNavigate();

  const {
    data: brand,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBrandsQuery("brandList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data && brandId ? data.entities[brandId] : undefined,
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

  if (isSuccess && !brand) {
    content = (
      <div className={styles.notFound}>
        Brand not found. <span onClick={() => navigate(-1)}>Please go back</span>
      </div>
    );
  }

  if (isSuccess && brand) {
    content = <EditBrandForm brand={brand} />;
  }

  return (
    <div className={styles.brandEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default BrandEdit;
