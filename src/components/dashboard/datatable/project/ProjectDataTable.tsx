import styles from "./ProjectDataTable.module.scss";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Project } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import noImage from "../../../../assets/img/noimage.png";
import moment from "moment";
import { Capitalize } from "../../../../config/utils/functions";

type ProjectDataTableProps = {
  projects: Project[];
};

const ProjectDataTable = ({ projects }: ProjectDataTableProps) => {
  const { windowSize } = useWindowSize();

  const [columnVisible, setColumnVisible] =
    useState<GridColumnVisibilityModel>(PROJECT_ALL_COLUMNS);

  useEffect(() => {
    const newColumns = windowSize > 640 ? PROJECT_ALL_COLUMNS : PROJECT_MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [windowSize]);

  // this column will be use by other data
  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      disableExport: true,
      renderCell: (params) => {
        return (
          <div className={styles.cellAction}>
            <Link
              className={styles.viewButton}
              to={`/dash/projects/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              View
            </Link>
            <Link
              className={styles.editButton}
              to={`/dash/projects/edit/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              Edit
            </Link>
          </div>
        );
      },
      sortable: false,
      filterable: false,
      hideable: false,
    },
  ];

  return (
    <div className={styles.projectDataTable}>
      <DataGrid
        className={styles.datagrid}
        rows={projects}
        columns={projectColumns.concat(actionColumn)} // columns - tabel header columns
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
    </div>
  );
};

export default ProjectDataTable;

export const PROJECT_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  address: false,
  User: false,
  createdAt: false,
  updatedAt: false,
};

export const PROJECT_ALL_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  address: true,
  User: true,
  createdAt: false,
  updatedAt: false,
};

export const projectColumns: GridColDef[] = [
  { field: "__check__", sortable: false, filterable: false, width: 0 },
  { field: "id", headerName: "ID", width: 350, type: "string" },
  { field: "name", headerName: "Project Name", width: 300, type: "string", hideable: false },
  { field: "address", headerName: "Address", width: 300, type: "string" },
  {
    field: "User",
    headerName: "Assigned Engineer",
    width: 300,
    renderCell: (params: { row: Project }) => {
      const { first_name, last_name, avatarUrl } = params.row.User.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={avatarUrl ? avatarUrl : noImage} alt="avatar" />
          {fullName}
        </div>
      );
    },
    valueGetter: (params: { row: Project }) => {
      const { first_name, last_name } = params.row.User.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return fullName;
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    renderCell: (params: { row: Project }) => {
      const { status } = params.row;
      return (
        <div className={`${styles.cellWithStatus} ${styles[status]}`}>{Capitalize(status)}</div>
      );
    },
    valueGetter: (params: { row: Project }) => {
      const { status } = params.row;
      return Capitalize(status);
    },
  },
  {
    field: "createdAt",
    headerName: "Created",
    width: 300,
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return moment(params.value).format("ddd YYYY-MM-DD hh:mm a").toString();
    },
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 300,
    type: "date",
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return moment(params.value).format("ddd YYYY-MM-DD hh:mm a").toString();
    },
  },
];
