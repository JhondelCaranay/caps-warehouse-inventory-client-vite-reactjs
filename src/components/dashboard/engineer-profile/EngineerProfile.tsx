import styles from "./EngineerProfile.module.scss";
import { User } from "../../../types";
import noImage from "./../../../assets/img/noimage.png";
import useWindowSize from "../../../hooks/useWindowSize";

type EngineerProfileProps = {
  user: User | undefined;
};

const EngineerProfile = ({ user }: EngineerProfileProps) => {
  const { windowSize } = useWindowSize();

  let content: JSX.Element = <></>;

  if (!user) {
    content = (
      <div className={styles.empty}>
        <p>Assign an engineer to see their profile</p>
      </div>
    );
  }

  if (user) {
    content = (
      <>
        <div className={styles.viewButton}>View</div>
        <div className={styles.editButton}>Edit</div>
        <div className={styles.item}>
          {windowSize > 768 && (
            <img
              src={user.Profile.avatarUrl ? user.Profile.avatarUrl : noImage}
              alt=""
              className={styles.itemImg}
            />
          )}

          <div className={styles.details}>
            <h1 className={styles.itemTitle}>
              {user.Profile.first_name + " " + user.Profile.last_name}
            </h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Email:</span>
              <span className={styles.itemValue}>{user.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Position:</span>
              <span className={styles.itemValue}>
                {user.Profile.position ? user.Profile.position : "N/A"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Phone:</span>
              <span className={styles.itemValue}>
                {user.Profile.contact ? "+" + user.Profile.contact : "N/A"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Address:</span>
              <span className={styles.itemValue}>
                {user.Profile.address ? "+" + user.Profile.address : "N/A"}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Country:</span>
              <span className={styles.itemValue}>USA</span>
            </div>
            <hr />

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Join:</span>
              <span className={styles.itemValue}>12/12/2020</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Status:</span>
              <span className={`itemValue ${user.status}`}>{user.status}</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Total Projects:</span>
              <span className={styles.itemValue}>10</span>
            </div>

            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Completed Projects:</span>
              <span className={styles.itemValue}>10</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.engineerProfile}>
      <h1 className={styles.title}>Engineer Profile</h1>
      {content}
    </div>
  );
};
export default EngineerProfile;
