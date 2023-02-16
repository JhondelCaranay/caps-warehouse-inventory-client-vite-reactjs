import { useNavigate, useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import { EditItemForm } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Brand, Category } from "../../../../types";
import styles from "./ItemEdit.module.scss";

const ItemEdit = () => {
  useTitle("Spedi: Item Edit");
  const { itemId } = useParams();
  const navigate = useNavigate();

  const {
    data: item,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetItemsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data && itemId ? data.entities[itemId] : undefined,
    }),
  });

  const { data: brands } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Brand) : [],
    }),
  });

  const { data: categories } = useGetCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Category) : [],
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
    content = <div className={styles.errorMsg}>Failed to load data. Please try again</div>;
  }

  if (isSuccess && !item) {
    content = (
      <div className={styles.notFound}>
        Project not found. <span onClick={() => navigate(-1)}>Please go back</span>
      </div>
    );
  }

  if (isSuccess && item) {
    content = <EditItemForm item={item} brands={brands} categories={categories} />;
  }

  return (
    <div className={styles.itemEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default ItemEdit;
