import { Button, Stack } from "@mui/material";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import BrandDataTable from "../../../../components/dashboard/datatable/brand/BrandDataTable";
import useTitle from "../../../../hooks/useTitle";
import { Brand } from "../../../../types";
import "./brandList.scss";

const BrandList = () => {
  useTitle("Spedi: Brand List");

  const {
    data: brands,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetBrandsQuery("brandList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const isLoadingData = isLoading;
  const isSuccessData = isSuccess;
  const isErrorData = isError;

  const brandList = useMemo(() => {
    return brands ? brands.ids.map((id) => brands.entities[id] as Brand) : [];
  }, [brands]);

  return (
    <div className="brandList">
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
      <BrandDataTable
        brands={brandList}
        isLoadingData={isLoadingData}
        isSuccessData={isSuccessData}
        isErrorData={isErrorData}
      />
    </div>
  );
};
export default BrandList;
