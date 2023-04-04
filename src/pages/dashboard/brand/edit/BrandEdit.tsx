import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandQuery } from "../../../../app/services/brand/brandApiSlice";
import { EditBrandForm, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./BrandEdit.module.scss";

const BrandEdit = () => {
  useTitle("Spedi: Brand Edit");
  const { brandId } = useParams();
  const navigate = useNavigate();

  const {
    data: brand,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetBrandQuery(brandId as string, {
    refetchOnMountOrArgChange: true,
    skip: !brandId,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
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
