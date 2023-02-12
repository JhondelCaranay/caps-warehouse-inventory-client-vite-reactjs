import styles from "./UserList.module.scss";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import { useTitle } from "../../../../hooks";
import { User } from "../../../../types";
import { UserDataTable } from "../../../../components";
import { PulseLoader } from "react-spinners";

const UserList = () => {
  useTitle("Spedi: User List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetUsersQuery("userList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    selectFromResult: ({ data, ...result }) => ({
      ...result,
      data: data ? data.ids.map((id) => data.entities[id] as User) : [],
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
  } else if (isSuccess) {
    content = <UserDataTable users={users} />;
  }

  return (
    <div className={styles.userList}>
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" spacing={1}>
          <Link to="/dash/users/new" style={{ textDecoration: "none" }}>
            <Button size="small" variant="outlined">
              Create User
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

export default UserList;
