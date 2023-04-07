import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.scss";
import moment from "moment";
import noImage from "../../assets/img/noimage.png";
import { ROLES } from "../../types";
import { Capitalize } from "../../config/utils/functions";
import { ErrorMessage, Loading, ProjectTable } from "../../components";
import { useGetProjectsByEngineerIdQuery } from "../../app/services/project/projectApiSlice";
import { useGetMyProfileQuery } from "../../app/services/user/userApiSlice";

const UserProfile = () => {
  const navigate = useNavigate();

  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // useGetProjectsByEngineerIdQuery
  const { data: projects, isLoading: isProjectLoading } = useGetProjectsByEngineerIdQuery(
    user?.id as string,
    {
      refetchOnMountOrArgChange: true,
      skip: !user?.id,
    }
  );

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && user) {
    content = (
      <>
        <div className={styles.title}>User</div>
        <div className={styles.information}>
          {/* IMAGE */}
          <img className={styles.itemImg} src={user.Profile.avatarUrl || noImage} alt="" />

          <div className={styles.details}>
            <h1 className={styles.itemTitle}>
              {user.Profile.first_name} {user.Profile.last_name}
            </h1>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Email :</span>
              <span className={styles.itemValue}>{user.email}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Contact Number :</span>
              <span className={styles.itemValue}>{user.Profile.contact || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Adress :</span>
              <span className={styles.itemValue}> {user.Profile.address || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Position</span>
              <span className={styles.itemValue}> {user.Profile.position || "N/A"}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>System Privilege :</span>
              <span className={styles.itemValue}>{Capitalize(user.role)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>User Status:</span>
              <span className={`${styles.itemValue} ${styles[user.status]}`}>
                {Capitalize(user.status)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.itemKey}>Join :</span>
              <span className={styles.itemValue}>
                {moment(user.createdAt).format("ddd YYYY-MM-DD hh:mm a")}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.backButton} onClick={() => navigate(-1)}>
          Back
        </div>
        {/* <div className={styles.editButton} onClick={() => alert("under development")}>
          Edit
        </div> */}
      </>
    );
  }

  return (
    <div className={styles.userProfile}>
      <div className={styles.wrapper}>{content}</div>
      {user?.role == ROLES.ENGINEER && (
        <div className={styles.projectTable}>
          <h1 className={styles.title}>Projects</h1>
          {isProjectLoading || !projects ? <Loading /> : <ProjectTable projects={projects} />}
        </div>
      )}
    </div>
  );
};
export default UserProfile;
