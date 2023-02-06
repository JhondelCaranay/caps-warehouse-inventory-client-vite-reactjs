import { Button, Stack } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import { CategoryDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Category } from "../../../../types";
import styles from "./CategoryList.module.scss";

const CategoryList = () => {
  useTitle("Spedi: Category List");

  const {
    data: categories = { entities: {}, ids: [] },
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetCategoryQuery("categoryList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const categoryList = useMemo(() => {
    return categories ? categories.ids.map((id) => categories.entities[id] as Category) : [];
  }, [categories]);

  return (
    <div className={styles.categoryList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/category/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Item
            </Button>
          </Link>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      <CategoryDataTable
        categories={categoryList}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
      />
    </div>
  );
};
export default CategoryList;
