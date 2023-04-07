import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { BrandDataTable, ErrorMessage, Loading } from "../../../../components";
import { useTitle } from "../../../../hooks";
import styles from "./BrandList.module.scss";

const BrandList = () => {
  useTitle("Spedi: Brand List");

  const {
    data: brands,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetBrandsQuery(undefined, {
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
    content = <BrandDataTable brands={brands} />;
  }

  return (
    <div className={styles.brandList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/brands/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Item
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
export default BrandList;
