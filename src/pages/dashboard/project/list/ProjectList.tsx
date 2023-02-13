import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { ProjectDataTable } from "../../../../components";
import useTitle from "../../../../hooks/useTitle";
import { Project } from "../../../../types";
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
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data?.ids.map((id) => data?.entities[id] as Project),
    }),
  });

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  } else if (isError) {
    console.error(error);
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
        <h1 className={styles.error}>Failed to load data</h1>
      </div>
    );
  } else if (isSuccess && projects) {
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
