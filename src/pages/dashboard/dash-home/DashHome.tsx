import Chart from "../../../components/dashboard/chart/Chart";
import Featured from "../../../components/dashboard/featured/Featured";
import TransactionTable from "../../../components/dashboard/table/TransactionTable";
import Widget from "../../../components/dashboard/widget/Widget";
import "./dashHome.scss";
import useWindowSize from "../../../hooks/useWindowSize";

const DashHome = () => {
  const { windowSize } = useWindowSize();
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
        {windowSize > 645 && <Chart title="Last 6 Months Data Chart" aspect={2 / 1} />}
      </div>
      {/* <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <TransactionTable />
      </div> */}
    </div>
  );
};
export default DashHome;
