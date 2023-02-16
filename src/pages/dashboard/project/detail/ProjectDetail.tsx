import styles from "./ProjectDetail.module.scss";

const ProjectDetail = () => {
  return (
    <div className={styles.projectDetail}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Project</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>Project name</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Address</span>
            <span className={styles.itemValue}>NA</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Assigned Engineer</span>
            <span className={styles.itemValue}>John Doe</span>
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
        <div className={styles.backButton}>Back</div>
        <div className={styles.editButton}>Edit</div>
      </div>
    </div>
  );
};
export default ProjectDetail;
