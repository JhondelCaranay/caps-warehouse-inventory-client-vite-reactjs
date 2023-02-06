import styles from "./UserDataTable.module.scss";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import useAuth from "../../../../hooks/useAuth";
import useWindowSize from "../../../../hooks/useWindowSize";
import { ROLES, User } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { Capitalize } from "../../../../config/utils/functions";
import noImage from "../../../../assets/img/noimage.png";

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
          <div className={styles.cellAction}>
            <Link className={styles.viewButton} to="/dash" style={{ textDecoration: "none" }}>
              View
            </Link>
            {
              // if user is admin or user is editing his own profile
              role === ROLES.SUPER_ADMIN ? (
                <Link to="/dash" className={styles.editButton} style={{ textDecoration: "none" }}>
                  Edit
                </Link>
              ) : (
                <div className={`${styles.editButton} ${styles.disable}`}>Edit</div>
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

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#4e90d2"} />
        <h1 className="error">Failed to load data</h1>
      </div>
    );
  }

  if (isSuccess) {
    content = (
      <DataGrid
        className={styles.datagrid}
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

  return <div className={styles.userDataTable}>{content}</div>;
};
export default UserDataTable;

export const USER_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
};

export const USER_ALL_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
};

export const userColumns: GridColDef[] = [
  { field: "__check__", sortable: false, filterable: false, width: 0 },
  { field: "id", headerName: "ID", width: 350, type: "string" },

  {
    field: "Full Name",
    headerName: "Full Name",
    width: 300,
    hideable: false,
    renderCell: (params: { row: User }) => {
      const { first_name, last_name, avatarUrl } = params.row.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={avatarUrl ? avatarUrl : noImage} alt="avatar" />
          {fullName}
        </div>
      );
    },
    valueGetter: (params: { row: User }) => {
      const { first_name, last_name } = params.row.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return fullName;
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 300,
    type: "string",
  },
  {
    field: "role",
    headerName: "Role",
    width: 180,
    type: "string",
    valueFormatter: (params: { value: string }) => {
      return Capitalize(params.value);
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params: { row: User }) => {
      const { status } = params.row;
      return (
        <div className={`${styles.cellWithStatus} ${styles[status]}`}>{Capitalize(status)}</div>
      );
    },
    valueGetter: (params: { row: User }) => {
      const { status } = params.row;
      return Capitalize(status);
    },
  },
];
