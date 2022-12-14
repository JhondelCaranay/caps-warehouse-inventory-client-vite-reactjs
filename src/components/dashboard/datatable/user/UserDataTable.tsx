import { Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { useGetUsersQuery } from "../../../../app/services/user/userApiSlice";
import useAuth from "../../../../hooks/useAuth";
import useWindowSize from "../../../../hooks/useWindowSize";
import { ROLES, User } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { userColumns, USER_ALL_COLUMNS, USER_MOBILE_COLUMNS } from "./userColumns";
import "./userDataTable.scss";

const UserDataTable = () => {
  const { windowSize } = useWindowSize();
  const { role, id } = useAuth();

  const {
    data: users,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetUsersQuery("userList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleEdit = (id: string) => {
    console.log(id);
    console.debug("Edit", id);
  };

  const [columnVisible, setColumnVisible] = useState<GridColumnVisibilityModel>(USER_ALL_COLUMNS);

  useEffect(() => {
    const newColumns = windowSize > 640 ? USER_ALL_COLUMNS : USER_MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [windowSize]);
  // this column will be use by other data
  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/dash" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            {
              // if user is admin or user is editing his own profile
              role === ROLES.SUPER_ADMIN ? (
                <div className="editButton" onClick={() => handleEdit(params.row.id)}>
                  Edit
                </div>
              ) : (
                <div className="editButton disable">Edit</div>
              )
            }
          </div>
        );
      },
      sortable: false,
      filterable: false,
      hideable: false,
    },
  ];

  const columns = useMemo(() => [...userColumns, ...actionColumn], [actionColumn]);

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = (
      <div className="loading">
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="loading">
        <PulseLoader color={"#000000"} />
        <h1 className="error">Failed to load data</h1>
      </div>
    );
  }

  if (isSuccess) {
    const { ids, entities } = users;
    // const userList = ids.map((id) => entities[id] as User);
    const userList = ids
      .filter((id) => entities[id]?.role !== ROLES.SUPER_ADMIN)
      .map((id) => entities[id] as User);

    content = (
      <>
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
        <DataGrid
          className="datagrid"
          rows={userList}
          // columns={userColumns.concat(actionColumn)} // columns - tabel header columns
          columns={columns} // columns - tabel header columns
          columnVisibilityModel={columnVisible}
          onColumnVisibilityModelChange={(newModel) => setColumnVisible(newModel)}
          pageSize={10} // pageSize - number of rows per page
          rowsPerPageOptions={[10]} // rowsPerPageOptions - array of numbers of rows per page
          checkboxSelection={windowSize > 640 ? true : false} // checkboxSelection - default is false - enable checkbox selection
          disableSelectionOnClick // disableSelectionOnClick - default is false - disable selection on click
          components={{
            Toolbar: GridToolbar, // GridToolbar - toolbar component on top of the table
            Pagination: CustomPagination, // CustomPagination - custom pagination
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }, // debounceMs - delay time for quick filter
              printOptions: { disableToolbarButton: true }, // disableToolbarButton - default is false - disable print button
            },
          }}
        />
      </>
    );
  }

  return <div className="userDataTable">{content}</div>;
};
export default UserDataTable;
