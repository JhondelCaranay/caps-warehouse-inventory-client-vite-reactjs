import { useParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetCategoriesQuery } from "../../../../app/services/category/categoryApiSlice";
import { useGetItemQuery } from "../../../../app/services/item/itemApiSlice";
import { EditItemForm, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./ItemEdit.module.scss";

const ItemEdit = () => {
  useTitle("Spedi: Item Edit");
  const { itemId } = useParams();

  const {
    data: item,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetItemQuery(itemId as string, {
    refetchOnMountOrArgChange: true,
    skip: !itemId,
  });

  const { data: brands } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && item && brands && categories) {
    content = <EditItemForm item={item} brands={brands} categories={categories} />;
  }

  return (
    <div className={styles.itemEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default ItemEdit;
