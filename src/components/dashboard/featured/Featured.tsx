import { KeyboardArrowUpOutlined, MoreVert } from "@mui/icons-material";
import styles from "./Featured.module.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Featured = () => {
  return (
    <div className={styles.featured}>
      <div className={styles.top}>
        <h1 className={styles.title}>Total Transactions</h1>
        <MoreVert fontSize="small" />
      </div>
      <div className={styles.bottom}>
        <div className={styles.featuredChart}>
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className={styles.title}>Transactions made today</p>
        <p className={styles.amount}>40</p>
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
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className={styles.resultAmount}>12</div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.itemTitle}>Last Month</div>
            <div className={`${styles.itemResult} ${styles.positive}`}>
              <KeyboardArrowUpOutlined fontSize="small" />
              <div className={styles.resultAmount}>12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Featured;
