import styles from "./ProjectEdit.module.scss";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User, USER_STATUS } from "../../../../types";
import { EditProjectForm, EngineerProfile, ProjectTable } from "../../../../components";

const ProjectEdit = () => {
  useTitle("Spedi: Project Edit");
  const { projectId } = useParams();

  const {
    data: project,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data && projectId ? data.entities[projectId] : undefined,
    }),
  });

  const { data: previousProject } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data
        ? data.ids
            .map((id) => data.entities[id] as Project)
            .filter((p) => p.User.id === project?.User.id)
        : [],
    }),
  });

  const { data: engineers } = useGetUsersQuery(undefined, {
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
    content = <div className={styles.errorMsg}>Something went wrong, please try again</div>;
  }

  if (isSuccess && project) {
    content = <EditProjectForm project={project} users={engineers} />;
  }

  return (
    <div className={styles.projectEdit}>
      <div className={styles.top}>
        {content}
        <EngineerProfile user={project?.User} />
      </div>
      <div className={styles.bottom}>
        <h1 className="title">Engineer Previous Projects</h1>
        <ProjectTable projects={previousProject} />
      </div>
    </div>
  );
};
export default ProjectEdit;
