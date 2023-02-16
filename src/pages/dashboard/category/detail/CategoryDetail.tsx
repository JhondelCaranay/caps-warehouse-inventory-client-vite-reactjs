import styles from "./CategoryDetail.module.scss";

const CategoryDetail = () => {
  return (
    <div className={styles.categoryDetail}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Category</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>Welding Machine</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Created:</span>
            <span className={styles.itemValue}>NA</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Updated:</span>
            <span className={styles.itemValue}>NA</span>
          </div>
        </div>
        <div className={styles.backButton}>Back</div>
        <div className={styles.editButton}>Edit</div>
      </div>
    </div>
  );
};
export default CategoryDetail;
