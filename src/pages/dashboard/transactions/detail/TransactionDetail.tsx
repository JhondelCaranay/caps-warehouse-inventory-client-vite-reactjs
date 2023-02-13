import styles from "./TransactionDetail.module.scss";

const img_link =
  "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXRlbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60";

const img_eng =
  "https://images.unsplash.com/photo-1570470836811-78ef04bb23d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZW5naW5lZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1600&q=60";

const img_dev =
  "https://images.unsplash.com/photo-1607970420862-385a245239a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fGRldmVsb3BlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60";

const TransactionDetail = () => {
  return (
    <div className={styles.transactionDetail}>
      <div className={styles.top}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.title}>Item</div>
          <div className={styles.information}>
            {/* IMAGE */}
            <img className={styles.itemImg} src={img_link} alt="" />

            <h1 className={styles.itemTitle}>Welding Machine</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Category:</span>
              <span className={styles.itemValue}>Mechanical Equipment</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Brand:</span>
              <span className={styles.itemValue}>Vespa</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Unit:</span>
              <span className={styles.itemValue}>UNIT</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Quantity:</span>
              <span className={styles.itemValue}>1</span>
            </div>
          </div>
        </div>

        {/* CENTER */}
        <div className={styles.center}>
          <div className={styles.title}>Sender</div>
          <div className={styles.information}>
            {/* IMAGE */}
            <img className={styles.itemImg} src={img_dev} alt="" />

            <h1 className={styles.itemTitle}>Jane Doe</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Email:</span>
              <span className={styles.itemValue}>janedoe@gmail.com</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Phone:</span>
              <span className={styles.itemValue}>+1 2345 67 89</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Address:</span>
              <span className={styles.itemValue}>Elton St. 234 Garden Yd. NewYork</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Position:</span>
              <span className={styles.itemValue}>Admin</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.title}>Reciever</div>

          <div className={styles.information}>
            {/* IMAGE */}
            <img className={styles.itemImg} src={img_eng} alt="" />

            <h1 className={styles.itemTitle}>Jane Doe</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Email:</span>
              <span className={styles.itemValue}>janedoe@gmail.com</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Phone:</span>
              <span className={styles.itemValue}>+1 2345 67 89</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Address:</span>
              <span className={styles.itemValue}>Elton St. 234 Garden Yd. NewYork</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Position:</span>
              <span className={styles.itemValue}>Engineer</span>
            </div>
          </div>

          <hr />

          <div className={styles.subtitle}>Project</div>

          <div className={styles.information}>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Project names:</span>
              <span className={styles.itemValue}>Dom dom yes yes</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Address:</span>
              <span className={styles.itemValue}>Elton St. 234 Garden Yd. NewYork</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.title}>Status</div>

        <div className={styles.items}>
          <div className={`${styles.item} ${styles["WAITING"]}`}>
            <div className={styles.value}>Waiting</div>
          </div>
          <div className={`${styles.item} ${styles[""]}`}>
            <div className={styles.value}>On Delivery</div>
          </div>
          <div className={`${styles.item} ${styles[""]}`}>
            <div className={styles.value}>Confirmed Recieve</div>
          </div>
          <div className={`${styles.item} ${styles[""]}`}>
            <div className={styles.value}>On Return</div>
          </div>
          <div className={`${styles.item} ${styles[""]}`}>
            <div className={styles.value}>Confirmed Returned</div>
          </div>
          <div className={`${styles.item} ${styles["CANCELLED"]}`}>
            <div className={styles.value}>Cancelled</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransactionDetail;
