import { useState } from "react";
import {
  useGetProjectsByEngineerIdQuery,
  useGetProjectsQuery,
} from "../../../../app/services/project/projectApiSlice";
import { useGetUserEngineersQuery } from "../../../../app/services/user/userApiSlice";
import {
  CreateProjectForm,
  EngineerProfile,
  ErrorMessage,
  Loading,
  ProjectTable,
} from "../../../../components";
import useTitle from "../../../../hooks/useTitle";
import { Project } from "../../../../types";
import styles from "./ProjectNew.module.scss";

const ProjectNew = () => {
  useTitle("Spedi: Project Create");
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserEngineersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: projects } = useGetProjectsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: previousProject } = useGetProjectsByEngineerIdQuery(selectedId as string, {
    refetchOnMountOrArgChange: true,
    skip: !selectedId,
  });

  const selectedEngineer = users?.find((user) => user.id === selectedId);

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }

  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
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
          {previousProject ? <ProjectTable projects={previousProject} /> : <Loading />}
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
