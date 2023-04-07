import styles from "./UserList.module.scss";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import { useTitle } from "../../../../hooks";
import { ErrorMessage, Loading, UserDataTable } from "../../../../components";
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
  } = useGetUsersQuery(undefined, {
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
