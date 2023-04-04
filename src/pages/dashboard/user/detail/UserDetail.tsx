import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../../../app/services/user/userApiSlice";
import { Capitalize } from "../../../../config/utils/functions";
import styles from "./UserDetail.module.scss";
import moment from "moment";
import noImage from "../../../../assets/img/noimage.png";
import { ErrorMessage, Loading, ProjectTable } from "../../../../components";
import { ROLES } from "../../../../types";
import { useGetProjectsByEngineerIdQuery } from "../../../../app/services/project/projectApiSlice";

const UserDetail = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const {
    data: user,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetUserQuery(userId as string, {
    refetchOnMountOrArgChange: true,
    skip: !userId,
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
    <div className={styles.userDetail}>
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
export default UserDetail;
