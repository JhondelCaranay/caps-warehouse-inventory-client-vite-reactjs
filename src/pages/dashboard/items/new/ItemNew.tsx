import styles from "./ItemNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateItemForm, Loading } from "../../../../components";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetCategoriesQuery } from "../../../../app/services/category/categoryApiSlice";

const ItemNew = () => {
  useTitle("Spedi: Item Create");

  const { data: brands } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles.itemNew}>
      <div className={styles.wrapper}>
        {brands && categories ? (
          <CreateItemForm brands={brands} categories={categories} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default ItemNew;
