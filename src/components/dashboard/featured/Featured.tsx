import { MoreVert } from "@mui/icons-material";
import styles from "./Featured.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TransactionTotalsType } from "../../../app/services/stats/statsTransactionTotal";

type FeaturedProps = {
  data: TransactionTotalsType;
};

const Featured = ({ data }: FeaturedProps) => {
  let percentage = data?.percentageChange || 0;

  return (
    <div className={styles.featured}>
      <div className={styles.top}>
        <h1 className={styles.title}>Total Transactions</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className={styles.bottom}>
        <div className={styles.featuredChart}>
          <CircularProgressbar value={percentage} text={`${percentage}%`} strokeWidth={5} />
        </div>
        <p className={styles.title}>Transactions made today</p>
        <p className={styles.amount}>{data?.totalTransactionToday || 0}</p>
        <p className={styles.desc}>Previous transactions processing.</p>
        <div className={styles.summary}>
          {/* <div className="item">
						<div className="itemTitle">Target</div>
						<div className="itemResult negative">
							<KeyboardArrowDown fontSize="small" />
							<div className="resultAmount">12</div>
						</div>
					</div> */}
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Week</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              {/* <KeyboardArrowUpOutlined fontSize="small" /> */}
              <div className={styles.resultAmount}>{data?.totalTransactionThisWeek || 0}</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Month</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              {/* <KeyboardArrowUpOutlined fontSize="small" /> */}
              <div className={styles.resultAmount}>{data?.totalTransactionThisMonth || 0}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
