import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import EditCategoryForm from "../../../../components/forms/category/edit/EditCategoryForm";
import useTitle from "../../../../hooks/useTitle";
import { Category } from "../../../../types";
import "./categoryEdit.scss";

const CategoryEdit = () => {
  useTitle("Spedi: Category Edit");
  const { categoryId } = useParams();

  const {
    data: categories = { entities: {}, ids: [] },
    isLoading,
    isSuccess,
    isError,
    error: errorCategory,
  } = useGetCategoryQuery("categoryList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const category = useMemo(() => {
    return categories.entities[String(categoryId)] as Category;
  }, [categories, categoryId]);

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className="loading">
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(errorCategory);
    content = <div className="errorMsg">Something went wrong, please try again</div>;
  }

  if (isSuccess) {
    content = (
      <div className="section-1">
        <EditCategoryForm category={category} />
      </div>
    );
  }

  return <div className="categoryEdit">{content}</div>;
};
export default CategoryEdit;
