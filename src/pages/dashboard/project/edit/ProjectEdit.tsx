import styles from "./ProjectEdit.module.scss";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import {
  useGetProjectQuery,
  useGetProjectsByEngineerIdQuery,
} from "../../../../app/services/project/projectApiSlice";
import { useGetUserEngineersQuery } from "../../../../app/services/user/userApiSlice";
import useTitle from "../../../../hooks/useTitle";
import {
  EditProjectForm,
  EngineerProfile,
  ErrorMessage,
  Loading,
  ProjectTable,
} from "../../../../components";

const ProjectEdit = () => {
  useTitle("Spedi: Project Edit");
  const { projectId } = useParams();

  const {
    data: project,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectQuery(projectId as string, {
    refetchOnMountOrArgChange: true,
    skip: !projectId,
  });

  const { data: previousProject } = useGetProjectsByEngineerIdQuery(project?.userId as string, {
    refetchOnMountOrArgChange: true,
    skip: !project?.userId,
  });

  const { data: engineers } = useGetUserEngineersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && project && engineers) {
    content = (
      <>
        <div className={styles.top}>
          <EditProjectForm project={project} users={engineers} />
          <EngineerProfile user={project?.User} />
        </div>
        <div className={styles.bottom}>
          <h1 className="title">Engineer Previous Projects</h1>
          {previousProject ? <ProjectTable projects={previousProject} /> : <Loading />}
        </div>
      </>
    );
  }

  return (
    <div className={styles.projectEdit}>
      <div className={styles.wrapper}>{content}</div>
    </div>
  );
};
export default ProjectEdit;
