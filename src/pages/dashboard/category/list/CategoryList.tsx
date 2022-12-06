import CategoryDataTable from "../../../../components/dashboard/datatable/category/CategoryDataTable";
import useTitle from "../../../../hooks/useTitle";

const CategoryList = () => {
	useTitle("Spedi: Category List");

	return (
		<div className="categoryList">
			<CategoryDataTable />
		</div>
	);
};
export default CategoryList;
