import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { ErrorMessage, Loading, ProjectDataTable } from "../../../../components";
import useTitle from "../../../../hooks/useTitle";
import styles from "./ProjectList.module.scss";

const ProjectList = () => {
  useTitle("Spedi: Project List");

  const {
    data: projects,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProjectsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }
  if (isSuccess) {
    content = <ProjectDataTable projects={projects} />;
  }

  return (
    <div className={styles.projectList}>
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
      {content}
    </div>
  );
};
export default ProjectList;
