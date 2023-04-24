import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoriesQuery } from "../../../../app/services/category/categoryApiSlice";
import { CategoryDataTable, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Category } from "../../../../types";
import styles from "./CategoryList.module.scss";

const CategoryList = () => {
  useTitle("Spedi: Category List");

  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetCategoriesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }
  if (isSuccess) {
    content = <CategoryDataTable categories={categories} />;
  }

  return (
    <div className={styles.categoryList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/category/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Category
            </Button>
          </Link>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      {content}
    </div>
  );
};
export default CategoryList;
