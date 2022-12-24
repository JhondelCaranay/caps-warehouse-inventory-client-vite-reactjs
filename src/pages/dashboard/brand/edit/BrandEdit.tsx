import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import EditBrandForm from "../../../../components/forms/brand/edit/EditBrandForm";
import useTitle from "../../../../hooks/useTitle";
import { Brand } from "../../../../types";
import "./brandEdit.scss";

const BrandEdit = () => {
  useTitle("Spedi: Brand Edit");
  const { brandId } = useParams();

  const {
    data: brands = { entities: {}, ids: [] },
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBrandsQuery("brandList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const brand = useMemo(() => {
    return brands.entities[String(brandId)] as Brand;
  }, [brands, brandId]);

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className="loading">
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    content = <div className="errorMsg">Something went wrong, please try again</div>;
  }

  if (isSuccess) {
    content = (
      <div className="section-1">
        <EditBrandForm brand={brand} />
      </div>
    );
  }

  return <div className="brandEdit">{content}</div>;
};
export default BrandEdit;
