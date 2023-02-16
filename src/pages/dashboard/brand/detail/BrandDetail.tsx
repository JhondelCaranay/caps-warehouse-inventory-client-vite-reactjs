import { useNavigate } from "react-router-dom";
import styles from "./BrandDetail.module.scss";

const BrandDetail = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.brandDetail}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Brand</div>
        <div className={styles.information}>
          <h1 className={styles.itemTitle}>VESPA</h1>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Created:</span>
            <span className={styles.itemValue}>NA</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.itemKey}>Updated:</span>
            <span className={styles.itemValue}>NA</span>
          </div>
        </div>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        <div
          className={styles.editButton}
          onClick={() => navigate("/dash/brands/edit/25185d57-216a-429d-87b7-738c7ea96672")}
        >
          Edit
        </div>
      </div>
    </div>
  );
};
export default BrandDetail;
