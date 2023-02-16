import styles from "./ItemDetail.module.scss";

const img_link =
  "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aXRlbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60";

const ItemDetail = () => {
  return (
    <div className={styles.itemDetail}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Item</div>
        <div className={styles.information}>
          {/* IMAGE */}
          <img className={styles.itemImg} src={img_link} alt="" />

          <div className={styles.details}>
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
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Created:</span>
              <span className={styles.itemValue}>NA</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Updated:</span>
              <span className={styles.itemValue}>NA</span>
            </div>
          </div>
        </div>

        <div className={styles.backButton}>Back</div>
        <div className={styles.editButton}>Edit</div>
      </div>
    </div>
  );
};
export default ItemDetail;
