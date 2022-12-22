import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Category } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { categoryColumns, CATEGORY_ALL_COLUMNS, CATEGORY_MOBILE_COLUMNS } from "./categoryColumns";
import "./categoryDataTable.scss";

type BrandDataTableProps = {
  categories: Category[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

const CategoryDataTable = ({ categories, isLoading, isSuccess, isError }: BrandDataTableProps) => {
  const { windowSize } = useWindowSize();

  const [columnVisible, setColumnVisible] =
    useState<GridColumnVisibilityModel>(CATEGORY_ALL_COLUMNS);

  useEffect(() => {
    const newColumns = windowSize > 640 ? CATEGORY_ALL_COLUMNS : CATEGORY_MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [windowSize]);

  // this column will be use by other data
  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: { row: Category }) => {
        return (
          <div className="cellAction">
            <Link className="viewButton" to="/dash" style={{ textDecoration: "none" }}>
              View
            </Link>
            <Link
              className="editButton"
              to={`/dash/category/edit/${params.row.id}`}
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

  if (isSuccess && Boolean(categories.length)) {
    content = (
      <DataGrid
        className="datagrid"
        rows={categories}
        columns={categoryColumns.concat(actionColumn)} // columns - tabel header columns
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

  return <div className="categoryDataTable">{content}</div>;
};
export default CategoryDataTable;
