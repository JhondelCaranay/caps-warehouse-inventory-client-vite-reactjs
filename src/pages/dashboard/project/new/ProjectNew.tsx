import { createSelector } from "@reduxjs/toolkit";
import { result } from "lodash";
import { useMemo, useState } from "react";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import EngineerProfile from "../../../../components/dashboard/engineer-profile/EngineerProfile";
import ProjectTable from "../../../../components/dashboard/project-table/ProjectTable";
import CreateProjectForm from "../../../../components/forms/project/create/CreateProjectForm";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User, USER_STATUS } from "../../../../types";
import "./projectNew.scss";

const ProjectNew = () => {
  useTitle("Spedi: Project Create");
  const [selectedId, setSelectedId] = useState<string>("");

  const {
    data: projects = { entities: {}, ids: [] },
    isLoading: isLoadingProject,
    isSuccess: isSuccessProject,
    isError: isErrorProject,
    error: errorProject,
  } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const {
    data: users = { entities: {}, ids: [] },
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("userList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const userList = useMemo(
    () =>
      users?.ids
        .map((id) => users?.entities[id] as User)
        .filter((user) => user.role === ROLES.ENGINEER && user.status === USER_STATUS.ACTIVE),
    [users]
  );

  const projectList = useMemo(
    () =>
      projects?.ids
        .map((id) => projects?.entities[id] as Project)
        .filter((project) => project.userId === selectedId)
        .slice(0, 5),
    [projects, selectedId]
  );

  const selectedEngineer = useMemo(() => {
    return users?.entities[selectedId] as User;
  }, [users, selectedId]);

  const isLoading = isLoadingUser || isLoadingProject;
  const isSuccess = isSuccessUser && isSuccessProject;
  const isError = isErrorUser || isErrorProject;

  if (isError) {
    console.error(errorUser || errorProject);
    return <div>Something went wrong</div>;
  }

  return (
    <div className="projectNew">
      <div className="section-1">
        <CreateProjectForm
          users={userList}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setSelectedId={setSelectedId}
        />
        {selectedEngineer && <EngineerProfile user={selectedEngineer} />}
      </div>

      {Boolean(projectList.length) && (
        <div className="section-2">
          <h1 className="title">Engineer Previous Projects</h1>
          <ProjectTable projects={projectList} />
        </div>
      )}
    </div>
  );
};
export default ProjectNew;
