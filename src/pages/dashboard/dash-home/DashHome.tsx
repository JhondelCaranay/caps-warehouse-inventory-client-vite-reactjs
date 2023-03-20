import styles from "./DashHome.module.scss";
import { Chart, Featured, Widget } from "../../../components";
import { useWindowSize } from "../../../hooks";
import { useGetStatsTotalQuery } from "../../../app/services/stats/statTotalApiSlice";
import { useGetStatsChartQuery } from "../../../app/services/stats/statChartApiSlice";
import {
  TransactionTotalsType,
  useGetStatsTransactionTotalQuery,
} from "../../../app/services/stats/statsTransactionTotal";

export type TotalsType = {
  totalTransactions: number;
  totalItems: number;
  totalProjects: number;
  totalUsers: number;
};

const DashHome = () => {
  const { windowSize } = useWindowSize();

  // const data: TotalsType = {
  //   totalTransactions: 2,
  //   totalItems: 55,
  //   totalProjects: 2,
  //   totalUsers: 4,
  // };

  const { data: totals } = useGetStatsTotalQuery("totals", {
    refetchOnMountOrArgChange: true,
  });

  const { data: chart } = useGetStatsChartQuery("chart", {
    refetchOnMountOrArgChange: true,
  });

  const { data: transactionTotal } = useGetStatsTransactionTotalQuery("transactionTotal", {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className={styles.dashHome}>
      <div className={styles.widgets}>
        <Widget type="user" amount={totals?.totalUsers || 0} />
        <Widget type="item" amount={totals?.totalItems || 0} />
        <Widget type="project" amount={totals?.totalProjects || 0} />
        <Widget type="transaction" amount={totals?.totalTransactions || 0} />
      </div>
      <div className={styles.charts}>
        <Featured data={transactionTotal as TransactionTotalsType} />
        {windowSize > 645 && (
          <Chart title="Last 6 Months Data Chart" data={chart || []} aspect={2 / 1} />
        )}
      </div>
      {/* <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <TransactionTable />
      </div> */}
    </div>
  );
};
export default DashHome;
