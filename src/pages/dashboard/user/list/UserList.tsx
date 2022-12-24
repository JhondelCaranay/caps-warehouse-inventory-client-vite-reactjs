import { Button, Stack } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import UserDataTable from "../../../../components/dashboard/datatable/user/UserDataTable";
import useTitle from "../../../../hooks/useTitle";
import { User } from "../../../../types";
import "./userList.scss";
const UserList = () => {
  useTitle("Spedi: User List");

  const {
    data: users = { entities: {}, ids: [] },
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
  });

  const userList = useMemo(() => {
    return users ? users.ids.map((id: EntityId) => users.entities[id] as User) : [];
  }, [users]);

  return (
    <div className="userList">
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
      <UserDataTable
        users={userList}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
      />
    </div>
  );
};

export default UserList;
