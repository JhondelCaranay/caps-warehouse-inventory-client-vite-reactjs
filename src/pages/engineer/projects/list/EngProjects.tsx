import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { PulseLoader } from "react-spinners";
import { useGetMyProjectsQuery } from "../../../../app/services/project/projectApiSlice";
import { ErrorMessage, Loading, MyProjectDataTable } from "../../../../components";
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
