import { Button, Stack } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import ProjectDataTable from "../../../../components/dashboard/datatable/project/ProjectDataTable";
import useTitle from "../../../../hooks/useTitle";
import { Project } from "../../../../types";
import "./projectList.scss";

const ProjectList = () => {
  useTitle("Spedi: Project List");

  const {
    data: projects,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProjectsQuery("projectList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const isLoadingData = isLoading;
  const isSuccessData = isSuccess;
  const isErrorData = isError;

  const projectList = useMemo(() => {
    return projects ? projects.ids.map((id: EntityId) => projects.entities[id] as Project) : [];
  }, [projects]);

  return (
    <div className="projectList">
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/projects/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create Project
            </Button>
          </Link>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      <ProjectDataTable
        projects={projectList}
        isLoading={isLoadingData}
        isSuccess={isSuccessData}
        isError={isErrorData}
        error={error}
      />
    </div>
  );
};
export default ProjectList;
