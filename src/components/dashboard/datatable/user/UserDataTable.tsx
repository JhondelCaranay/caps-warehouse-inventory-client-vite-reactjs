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

type UserDataTableProps = {
  users: User[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
};

const UserDataTable = ({ users, isLoading, isSuccess, isError, error }: UserDataTableProps) => {
  const { windowSize } = useWindowSize();
  const { role } = useAuth();

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
            <Link className="viewButton" to="/dash" style={{ textDecoration: "none" }}>
              View
            </Link>
            {
              // if user is admin or user is editing his own profile
              role === ROLES.SUPER_ADMIN ? (
                <Link to="/dash" className="editButton" style={{ textDecoration: "none" }}>
                  Edit
                </Link>
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
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    content = (
      <div className="loading">
        <PulseLoader color={"#4e90d2"} />
        <h1 className="error">Failed to load data</h1>
      </div>
    );
  }

  if (isSuccess) {
    content = (
      <DataGrid
        className="datagrid"
        rows={users}
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
    );
  }

  return <div className="userDataTable">{content}</div>;
};
export default UserDataTable;
