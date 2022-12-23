import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectProjectById,
  useGetProjectsQuery,
} from "../../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import { RootState } from "../../../../app/store";
import EngineerProfile from "../../../../components/dashboard/engineer-profile/EngineerProfile";
import ProjectTable from "../../../../components/dashboard/project-table/ProjectTable";
import CreateProjectForm from "../../../../components/forms/project/create/CreateProjectForm";
import useTitle from "../../../../hooks/useTitle";
import { Project, ROLES, User, USER_STATUS } from "../../../../types";
import "./projectNew.scss";

const ProjectNew = () => {
  useTitle("Spedi: Project Create");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    data: projects,
    isLoading: isLoadingProject,
    isSuccess: isSuccessProject,
    isError: isErrorProject,
    error: errorProject,
  } = useGetProjectsQuery("projectList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        data: ids
          .map((id) => entities[id] as Project)
          .filter((project) => project.userId === selectedId)
          .slice(0, 5),
      };
    },
  });

  const {
    data: users,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("userList", {
    refetchOnMountOrArgChange: true,
    selectFromResult: (result) => {
      const { entities, ids } = result?.data || { entities: {}, ids: [] };
      return {
        ...result,
        // get only Engineer and active user
        data: ids
          .map((id) => entities[id] as User)
          .filter((user) => user.role === ROLES.ENGINEER && user.status === USER_STATUS.ACTIVE),
      };
    },
  });

  const selectedEngineer = useMemo(() => {
    return users?.find((user) => user.id === selectedId);
  }, [users, selectedId]);

  const isLoading = isLoadingUser || isLoadingProject;
  const isSuccess = isSuccessUser && isSuccessProject;
  const isError = isErrorUser || isErrorProject;

  if (isError) {
    console.log(errorUser || errorProject);
    return <div>Something went wrong</div>;
  }

  return (
    <div className="projectNew">
      <div className="section-1">
        <CreateProjectForm
          users={users}
          isLoading={isLoading}
          isSuccess={isSuccess}
          setSelectedId={setSelectedId}
        />
        {selectedId && <EngineerProfile user={selectedEngineer} />}
      </div>

      {selectedId && Boolean(projects.length) && (
        <div className="section-2">
          <h1 className="title">Engineer Previous Projects</h1>
          <ProjectTable projects={projects} />
        </div>
      )}
    </div>
  );
};
export default ProjectNew;
