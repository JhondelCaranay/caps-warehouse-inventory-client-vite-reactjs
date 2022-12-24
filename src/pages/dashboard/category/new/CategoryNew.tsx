import CreateCategoryForm from "../../../../components/forms/category/create/CreateCategoryForm";
import useTitle from "../../../../hooks/useTitle";
import "./categoryNew.scss";

const CategoryNew = () => {
  useTitle("Spedi: Category Create");
  return (
    <div className="categoryNew">
      <div className="section-1">
        <CreateCategoryForm />
      </div>
    </div>
  );
};
export default CategoryNew;
