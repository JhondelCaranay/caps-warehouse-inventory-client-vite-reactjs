import { Button, Stack } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridColumnVisibilityModel,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Item } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { itemColumns, ITEM_ALL_COLUMNS, ITEM_MOBILE_COLUMNS } from "./ItemColumns";
import "./itemDataTable.scss";

const ItemDataTable = () => {
  const { windowSize } = useWindowSize();
  const navigate = useNavigate();

  const {
    data: items,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetItemsQuery("itemList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const handleEdit = (id: string) => {
    navigate(`/dash/items/edit/${id}`);
  };

  const [columnVisible, setColumnVisible] = useState<GridColumnVisibilityModel>(ITEM_ALL_COLUMNS);
  useEffect(() => {
    const newColumns = windowSize > 640 ? ITEM_ALL_COLUMNS : ITEM_MOBILE_COLUMNS;
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
    const { ids, entities } = items;
    const itemList = ids.map((id) => entities[id] as Item);

    content = (
      <>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Link to="/dash/items/new" style={{ textDecoration: "none" }}>
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
          rows={itemList}
          columns={itemColumns.concat(actionColumn)} // columns - tabel header columns
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

  return <div className="itemDataTable">{content}</div>;
};
export default ItemDataTable;
