import { useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import EditCategoryForm from "../../../../components/forms/category/edit/EditCategoryForm";
import "./categoryEdit.scss";

const CategoryEdit = () => {
  const { categoryId } = useParams();

  const {
    data: category,
    isLoading: isLoadingCategory,
    isSuccess: isSuccessCategory,
  } = useGetCategoryQuery("categoryList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: entities[String(categoryId)],
      };
    },
  });

  const isLoading = isLoadingCategory;
  const isSuccess = isSuccessCategory;

  return (
    <div className="categoryEdit">
      <EditCategoryForm category={category} isLoading={isLoading} isSuccess={isSuccess} />
    </div>
  );
};
export default CategoryEdit;
