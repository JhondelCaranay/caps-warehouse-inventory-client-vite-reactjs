import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import EngineerProfile from "../../../../components/dashboard/engineer-profile/EngineerProfile";
import ProjectTable from "../../../../components/dashboard/project-table/ProjectTable";
import EditProjectForm from "../../../../components/forms/project/edit/EditProjectForm";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User } from "../../../../types";
import "./projectEdit.scss";

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
      <div className="loading">
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  }

  if (isError) {
    console.log(errorProjects || errorUsers);
    content = <div className="error">Something went wrong, please try again</div>;
  }

  if (isSuccess) {
    content = (
      <>
        <div className="section-1">
          <EditProjectForm project={selectedProject} users={engineers} />
          <EngineerProfile user={selectedProject?.User} />
        </div>
        {Boolean(previousProject.length) && (
          <div className="section-2">
            <h1 className="title">Engineer Previous Projects</h1>
            <ProjectTable projects={previousProject} />
          </div>
        )}
      </>
    );
  }

  return <div className="projectEdit">{content}</div>;
};
export default ProjectEdit;
