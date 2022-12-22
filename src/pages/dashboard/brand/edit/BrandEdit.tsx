import { useParams } from "react-router-dom";
import { useGetBrandsQuery } from "../../../../app/services/brand/brandApiSlice";
import EditBrandForm from "../../../../components/forms/brand/edit/EditBrandForm";
import "./brandEdit.scss";

const BrandEdit = () => {
  const { brandId } = useParams();

  const {
    data: brand,
    isLoading: isLoadingBrand,
    isSuccess: isSuccessBrand,
  } = useGetBrandsQuery("brandList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: entities[String(brandId)] || null,
      };
    },
  });

  const isLoading = isLoadingBrand;
  const isSuccess = isSuccessBrand;

  return (
    <div className="brandEdit">
      <EditBrandForm brand={brand} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  );
};
export default BrandEdit;
