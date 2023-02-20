import styles from "./BrandDataTable.module.scss";
import {
  DataGrid,
  GridColDef,
  GridColumnVisibilityModel,
  GridToolbar,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import useWindowSize from "../../../../hooks/useWindowSize";
import { Brand } from "../../../../types";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import moment from "moment";

type BrandDataTableProps = {
  brands: Brand[];
};

const BrandDataTable = ({ brands }: BrandDataTableProps) => {
  const { windowSize } = useWindowSize();

  const [columnVisible, setColumnVisible] = useState<GridColumnVisibilityModel>(BRAND_ALL_COLUMNS);
  useEffect(() => {
    const newColumns = windowSize > 640 ? BRAND_ALL_COLUMNS : BRAND_MOBILE_COLUMNS;
    setColumnVisible(newColumns);
  }, [windowSize]);

  // this column will be use by other data
  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: { row: Brand }) => {
        return (
          <div className={styles.cellAction}>
            <Link
              className={styles.viewButton}
              to={`/dash/brands/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              View
            </Link>
            <Link
              className={styles.editButton}
              to={`/dash/brands/edit/${params.row.id}`}
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
    <div className={styles.brandDataTable}>
      <DataGrid
        className={styles.datagrid}
        rows={brands}
        columns={brandColumns.concat(actionColumn)} // columns - tabel header columns
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
export default BrandDataTable;

export const BRAND_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  createdAt: false,
  updatedAt: false,
};

export const BRAND_ALL_COLUMNS = {
  __check__: false,
  id: false,
  name: true,
  createdAt: true,
  updatedAt: true,
};

export const brandColumns: GridColDef[] = [
  { field: "__check__", sortable: false, filterable: false, width: 0 },
  { field: "id", headerName: "ID", width: 350, type: "string" },
  { field: "name", headerName: "Brand Name", width: 300, type: "string", hideable: false },
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
