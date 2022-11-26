import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import TransactionTable from "../../components/table/TransactionTable";
import Widget from "../../components/widget/Widget";
import "./dashHome.scss";

const DashHome = () => {
	return (
		<div className="dashHome">
			<div className="widgets">
				<Widget type="user" />
				<Widget type="product" />
				<Widget type="project" />
				<Widget type="transaction" />
			</div>
			<div className="charts">
				<Featured />
				<Chart title="Last 6 Months Data Chart" aspect={2 / 1} />
			</div>
			<div className="listContainer">
				<div className="listTitle">Latest Transactions</div>
				<TransactionTable />
			</div>
		</div>
	);
};
export default DashHome;
