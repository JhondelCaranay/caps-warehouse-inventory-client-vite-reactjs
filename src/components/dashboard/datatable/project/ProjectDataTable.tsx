import "./projectDataTable.scss";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Project } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { projectColumns, PROJECT_ALL_COLUMNS, PROJECT_MOBILE_COLUMNS } from "./projectColumns";

type ProjectDataTableProps = {
  projects: Project[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
};

const ProjectDataTable = ({
  projects,
  isLoading,
  isSuccess,
  isError,
  error,
}: ProjectDataTableProps) => {
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
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link className="viewButton" to="/dash" style={{ textDecoration: "none" }}>
              View
            </Link>
            <Link
              className="editButton"
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

  let content: JSX.Element | null = null;

  if (isLoading) {
    console.log("🚀 ~ file: TransactionDataTable.tsx:82 ~ TransactionDataTable ~ isError", error);
    content = (
      <div className="loading">
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="loading">
        <PulseLoader color={"#1976d2"} />
        <h1 className="error">Failed to load data</h1>
      </div>
    );
  }

  if (isSuccess && Boolean(projects.length)) {
    content = (
      <DataGrid
        className="datagrid"
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
    );
  }

  return <div className="projectDataTable">{content}</div>;
};
export default ProjectDataTable;
