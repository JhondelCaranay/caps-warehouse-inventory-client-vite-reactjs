import { useState } from "react";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import { CreateProjectForm, EngineerProfile, ProjectTable } from "../../../../components";
import { selectUserById } from "../../../../app/services/user/userApiSlice";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User, USER_STATUS } from "../../../../types";
import styles from "./ProjectNew.module.scss";
import { RootState } from "../../../../app/store";

const ProjectNew = () => {
  useTitle("Spedi: Project Create");
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data
        ? data.ids
            .map((id) => data.entities[id] as User)
            .filter((user) => user.role === ROLES.ENGINEER && user.status === USER_STATUS.ACTIVE)
        : [],
    }),
  });

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data
        ? data.ids
            .map((id) => data.entities[id] as Project)
            .filter((project) => project.User.id === selectedId)
        : [],
    }),
  });

  const selectedEngineer = useSelector((state: RootState) => selectUserById(state, selectedId));

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    content = <div className={styles.errorMsg}>Failed to load data. Please try again</div>;
  }

  if (isSuccess && users) {
    content = (
      <>
        <div className={styles.top}>
          <CreateProjectForm users={users} setSelectedId={setSelectedId} />
          <EngineerProfile user={selectedEngineer} />
        </div>

        <div className={styles.bottom}>
          <h1 className={styles.title}>Engineer Previous Projects</h1>
          <ProjectTable projects={projects} />
        </div>
      </>
    );
  }

  return (
    <div className={styles.projectNew}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default ProjectNew;
