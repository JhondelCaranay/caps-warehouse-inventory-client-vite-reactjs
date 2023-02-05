import styles from "./ProjectEdit.module.scss";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User } from "../../../../types";
import { EditProjectForm, EngineerProfile, ProjectTable } from "../../../../components";

const ProjectEdit = () => {
  useTitle("Spedi: Project Edit");
  const { projectId } = useParams();

  const {
    data: projects = { entities: {}, ids: [] },
    error: errorProjects,
    isLoading: isLoadingProjects,
    isSuccess: isSuccessProjects,
    isError: isErrorProjects,
  } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: users = { entities: {}, ids: [] },
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useGetUsersQuery("userList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const selectedProject = useMemo(
    () => projects?.entities[String(projectId)] as Project,
    [projectId, projects]
  );

  const previousProject = useMemo(
    () =>
      projects?.ids
        .map((id) => projects?.entities[id] as Project)
        .filter((project) => project.userId === selectedProject?.userId)
        .slice(0, 5),
    [projects, selectedProject]
  );

  const engineers = useMemo(
    () =>
      users?.ids
        .map((id) => users?.entities[id] as User)
        .filter((user) => user.role === ROLES.ENGINEER),
    [users]
  );

  const isLoading = isLoadingProjects || isLoadingUsers;
  const isSuccess = isSuccessProjects || isSuccessUsers;
  const isError = isErrorProjects || isErrorUsers;

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(errorProjects || errorUsers);
    content = <div className={styles.errorMsg}>Something went wrong, please try again</div>;
  }

  if (isSuccess) {
    content = (
      <>
        <div className={styles["section-1"]}>
          <EditProjectForm project={selectedProject} users={engineers} />
          <EngineerProfile user={selectedProject?.User} />
        </div>
        {Boolean(previousProject.length) && (
          <div className={styles["section-2"]}>
            <h1 className="title">Engineer Previous Projects</h1>
            <ProjectTable projects={previousProject} />
          </div>
        )}
      </>
    );
  }

  return <div className={styles.projectEdit}>{content}</div>;
};
export default ProjectEdit;
