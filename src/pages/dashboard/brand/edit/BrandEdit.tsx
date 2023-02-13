import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { EditBrandForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./BrandEdit.module.scss";

const BrandEdit = () => {
  useTitle("Spedi: Brand Edit");
  const { brandId } = useParams();

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

  if (isSuccess && !brand) {
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
    console.error(error);
    content = <div className={styles.errorMsg}>Something went wrong, please try again</div>;
  }

  if (isSuccess && brand) {
    content = <EditBrandForm brand={brand} />;
  }

  return (
    <div className={styles.brandEdit}>
      <div className={styles.left}>{content}</div>
    </div>
  );
};
export default BrandEdit;
