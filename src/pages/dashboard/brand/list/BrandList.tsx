import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import { BrandDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Brand } from "../../../../types";
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
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as Brand) : [],
    }),
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  } else if (isError) {
    console.error(error);
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
        <h1 className={styles.error}>Failed to load data</h1>
      </div>
    );
  } else if (isSuccess) {
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
