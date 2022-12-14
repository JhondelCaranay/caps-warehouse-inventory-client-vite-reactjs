import { GridColDef } from "@mui/x-data-grid";
import { User } from "../../../../types";
import noImage from "../../../../assets/img/noimage.png";
import { Capitalize } from "../../../../config/utils/functions";

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
        <div className="cellWithImg">
          <img className="cellImg" src={avatarUrl ? avatarUrl : noImage} alt="avatar" />
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
      return <div className={`cellWithStatus ${status}`}>{Capitalize(status)}</div>;
    },
    valueGetter: (params: { row: User }) => {
      const { status } = params.row;
      return Capitalize(status);
    },
  },
];
