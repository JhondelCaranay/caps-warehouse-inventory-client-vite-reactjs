import BrandDataTable from "../../../../components/dashboard/datatable/brand/BrandDataTable";
import useTitle from "../../../../hooks/useTitle";
import "./brandList.scss";

const BrandList = () => {
	useTitle("Spedi: Brand List");

	return (
		<div className="brandList">
			<BrandDataTable />
		</div>
	);
};
export default BrandList;
