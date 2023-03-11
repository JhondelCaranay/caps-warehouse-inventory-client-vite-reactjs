import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { PulseLoader } from "react-spinners";
import { useGetMyProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { MyProjectDataTable } from "../../../../components";
import { useTitle } from "../../../../hooks";
import { Project } from "../../../../types";
import styles from "./EngProjects.module.scss";

const EngProjects = () => {
  useTitle("Spedi: Project List");

  const {
    data: projects,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetMyProjectsQuery(undefined, {
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
    content = <MyProjectDataTable projects={projects} />;
  }

  return (
    <div className={styles.EngProjectList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Button size="small" variant="outlined" onClick={refetch}>
            Refresh
          </Button>
        </Stack>
      </Stack>
      {content}
    </div>
  );
};
export default EngProjects;
