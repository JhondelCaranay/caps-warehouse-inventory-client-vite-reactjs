import { Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetCategoryQuery } from "../../../../app/services/category/categoryApiSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Category } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { categoryColumns, CATEGORY_ALL_COLUMNS, CATEGORY_MOBILE_COLUMNS } from "./categoryColumns";

import "./categoryDataTable.scss";

const CategoryDataTable = () => {
  const { windowSize } = useWindowSize();
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetCategoryQuery("categoryList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleEdit = (id: string) => {
    navigate(`/dash/category/edit/${id}`);
  };

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
            {/* <Link to="/dash" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div className="editButton" onClick={() => handleEdit(params.row.id)}>
              Edit
            </div>
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
    const { ids, entities } = category;
    const categoryList = ids.map((id) => entities[id] as Category);

    content = (
      <>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Link to="/dash/category/new" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined">
                Create Item
              </Button>
            </Link>
            <Button size="small" variant="outlined" onClick={refetch}>
              Refresh
            </Button>
          </Stack>
        </Stack>
        <DataGrid
          className="datagrid"
          rows={categoryList}
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
      </>
    );
  }

  return <div className="categoryDataTable">{content}</div>;
};
export default CategoryDataTable;
