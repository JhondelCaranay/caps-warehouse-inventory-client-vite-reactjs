import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import styles from "./EngItemDetail.module.scss";
import noImage from "../../../../assets/img/noimage.png";
import moment from "moment";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { useGetBrandQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetItemQuery } from "../../../../app/services/item/itemApiSlice";

const EngItemDetail = () => {
  const navigate = useNavigate();
  const { itemId } = useParams();

  const {
    data: item,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetItemQuery(itemId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[itemId as string],
    }),
    skip: !itemId,
  });

  const { data: category } = useGetCategoryQuery(item?.categoryId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[item?.categoryId as string],
    }),
    skip: !item?.categoryId,
  });

  const { data: brand } = useGetBrandQuery(item?.brandId as string, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.entities[item?.brandId as string],
    }),
    skip: !item?.brandId,
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

  if (isSuccess && item && category && brand) {
    console.log(item);

    content = (
      <>
        <div className={styles.title}>Item</div>
        <div className={styles.information}>
          {/* IMAGE */}
          <img className={styles.itemImg} src={item.pictureUrl || noImage} alt="" />

          <div className={styles.details}>
            <h1 className={styles.itemTitle}>{item.name}</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Price:</span>
              <span className={styles.itemValue}>{item.price || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Quantity :</span>
              <span className={styles.itemValue}>{item.quantity}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Category:</span>
              <span className={styles.itemValue}>{category.name || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Brand:</span>
              <span className={styles.itemValue}>{brand.name || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Model:</span>
              <span className={styles.itemValue}>{item.model || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Unit:</span>
              <span className={styles.itemValue}>{item.unit}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Created:</span>
              <span className={styles.itemValue}>
                {moment(item.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Updated:</span>
              <span className={styles.itemValue}>
                {moment(item.updatedAt).format("ddd YYYY-MM-DD hh:mm a")}
              </span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Description:</span>
              <span className={styles.itemValue}>{item.description || "N/A"}</span>
            </div>
          </div>
        </div>

        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        {/* <div className={styles.editButton} onClick={() => navigate(`/dash/items/edit/${item.id}`)}>
          Edit
        </div> */}
      </>
    );
  }

  return (
    <div className={styles.itemDetail}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default EngItemDetail;
