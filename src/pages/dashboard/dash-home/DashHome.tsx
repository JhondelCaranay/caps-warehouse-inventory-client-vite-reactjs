import styles from "./DashHome.module.scss";
import { Chart, Featured, Widget } from "../../../components";
import { useWindowSize } from "../../../hooks";

const DashHome = () => {
  const { windowSize } = useWindowSize();
  return (
    <div className={styles.dashHome}>
      <div className={styles.widgets}>
        <Widget type="user" />
        <Widget type="product" />
        <Widget type="project" />
        <Widget type="transaction" />
      </div>
      <div className={styles.charts}>
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
