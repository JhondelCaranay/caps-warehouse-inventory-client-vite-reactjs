import styles from "./ItemNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateItemForm } from "../../../../components";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { useGetCategoriesQuery } from "../../../../app/services/category/categoryApiSlice";
import { Brand, Category } from "../../../../types";

const ItemNew = () => {
  useTitle("Spedi: Item Create");

  const { data: brands } = useGetBrandsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Brand) : [],
    }),
  });

  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Category) : [],
    }),
  });

  return (
    <div className={styles.itemNew}>
      <div className={styles.wrapper}>
        <CreateItemForm brands={brands} categories={categories} />
      </div>
    </div>
  );
};
export default ItemNew;
