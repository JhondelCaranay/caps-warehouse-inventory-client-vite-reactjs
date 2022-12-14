import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import moment from "moment";

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
