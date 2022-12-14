import { GridColDef, GridValueFormatterParams } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import moment from "moment";

import { Project } from "../../../../types";
import { Capitalize } from "../../../../config/utils/functions";

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
        <div className="cellWithImg">
          <img className="cellImg" src={avatarUrl ? avatarUrl : noImage} alt="avatar" />
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
