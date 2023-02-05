import styles from "./ItemDataTable.module.scss";
import { Button, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import { useGetItemsQuery } from "../../../../app/services/item/itemApiSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Item } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";

import noImage from "../../../../assets/img/noimage.png";
import { Capitalize } from "../../../../config/utils/functions";

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
          <div className={styles.cellAction}>
            <Link to="/dash" style={{ textDecoration: "none" }}>
              <div className={styles.viewButton}>View</div>
            </Link>
            <div className={styles.editButton} onClick={() => handleEdit(params.row.id)}>
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

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#000000"} />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#000000"} />
        <h1 className={styles.error}>Failed to load data</h1>
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
          className={styles.datagrid}
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

  return <div className={styles.itemDataTable}>{content}</div>;
};
export default ItemDataTable;

export const ITEM_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  Category: false,
  Brand: false,
  unit: false,
  quantity: false,
  description: false,
};

export const ITEM_ALL_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  Category: true,
  Brand: false,
  unit: true,
  quantity: true,
};

export const itemColumns: GridColDef[] = [
  { field: "__check__", hide: true, sortable: false, filterable: false, width: 0 },
  { field: "id", headerName: "ID", width: 350, type: "string", hide: true },
  {
    field: "Item",
    headerName: "Item Name",
    hideable: false,
    width: 300,
    renderCell: (params: { row: Item }) => {
      const { name, pictureUrl } = params.row;
      return (
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={pictureUrl ? pictureUrl : noImage} alt="avatar" />
          {Capitalize(name)}
        </div>
      );
    },
    valueGetter: (params: { row: Item }) => {
      const { name } = params.row;
      return Capitalize(name);
    },
  },
  {
    field: "Category",
    headerName: "Category",
    width: 300,
    renderCell: (params: { row: Item }) => {
      const { name } = params.row.Category;
      const category = Capitalize(name);
      return <div>{category}</div>;
    },
    valueGetter: (params: { row: Item }) => {
      const { name } = params.row.Category;
      const category = Capitalize(name);
      return category;
    },
  },
  {
    field: "Brand",
    headerName: "Brand",
    width: 300,
    renderCell: (params: { row: Item }) => {
      const { name } = params.row.Brand;
      const brand = Capitalize(name);
      return <div>{brand}</div>;
    },
    valueGetter: (params: { row: Item }) => {
      const { name } = params.row.Brand;
      const brand = Capitalize(name);
      return brand;
    },
  },
  { field: "unit", headerName: "Unit", width: 150, type: "string" },
  { field: "quantity", headerName: "Quantity", width: 150, type: "number" },
];
