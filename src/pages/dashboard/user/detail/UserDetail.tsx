import { useNavigate } from "react-router-dom";
import styles from "./UserDetail.module.scss";
const img_eng =
  "https://images.unsplash.com/photo-1570470836811-78ef04bb23d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8ZW5naW5lZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=1600&q=60";

const UserDetail = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.userDetail}>
      <div className={styles.wrapper}>
        <div className={styles.title}>User</div>
        <div className={styles.information}>
          {/* IMAGE */}
          <img className={styles.itemImg} src={img_eng} alt="" />

          <div className={styles.details}>
            <h1 className={styles.itemTitle}>Jhon doe</h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Email :</span>
              <span className={styles.itemValue}>jhondoe@gmail.com</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Contact Number :</span>
              <span className={styles.itemValue}>NA</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Adress :</span>
              <span className={styles.itemValue}>NA</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Position</span>
              <span className={styles.itemValue}>NA</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>System Privilege :</span>
              <span className={styles.itemValue}>Admin</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>User Status:</span>
              <span className={`${styles.itemValue} ${styles["ACTIVE"]}`}>Active</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Join :</span>
              <span className={styles.itemValue}>NA</span>
            </div>
          </div>
        </div>

        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        <div className={styles.editButton} onClick={() => alert("under development")}>
          Edit
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
