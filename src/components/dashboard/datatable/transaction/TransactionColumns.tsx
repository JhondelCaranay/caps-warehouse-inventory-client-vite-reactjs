import { GridColDef } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import { Transaction } from "../../../../types";
import { Capitalize } from "../../../../config/utils/functions";

export const TRANSACTION_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  Item: true,
  // User: true,
  UserSender: true,
  UserReciever: false,
  Project: true,
  status: false,
  quantity: false,
  remarks: false,
};

export const TRANSACTION_ALL_COLUMNS = {
  __check__: false,
  id: false,
  Item: true,
  // User: true,
  UserSender: true,
  UserReciever: false,
  Project: true,
  status: false,
  quantity: false,
  remarks: false,
};

export const transactionColumns: GridColDef[] = [
  { field: "__check__", width: 0, sortable: false, filterable: false },
  { field: "id", headerName: "ID", width: 350, type: "string" },
  {
    field: "Item",
    headerName: "Item Name",
    width: 300,
    hideable: false,
    renderCell: (params: { row: Transaction }) => {
      const { pictureUrl, name } = params.row.Item;
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={pictureUrl ? pictureUrl : noImage} alt="avatar" />
          {Capitalize(name)}
        </div>
      );
    },
    valueGetter: (params: { row: Transaction }) => {
      const { name } = params.row.Item;
      return Capitalize(name);
    },
  },
  {
    field: "UserSender",
    headerName: "Sender Name",
    width: 300,
    hideable: false,
    renderCell: (params: { row: Transaction }) => {
      const { first_name, last_name, avatarUrl } = params.row.Sender.Profile;
      const avatar = avatarUrl ? avatarUrl : noImage;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={avatar} alt="avatar" />
          {fullName}
        </div>
      );
    },
    valueGetter: (params: { row: Transaction }) => {
      const { first_name, last_name } = params.row.Sender.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return fullName;
    },
  },
  {
    field: "UserReciever",
    headerName: "Reciever Name",
    width: 300,
    renderCell: (params: { row: Transaction }) => {
      const { first_name, last_name, avatarUrl } = params.row.Receiver.Profile;
      const avatar = avatarUrl ? avatarUrl : noImage;
      const fullName = Capitalize(`${first_name} ${last_name}`);

      return (
        <div className="cellWithImg">
          <img className="cellImg" src={avatar} alt="avatar" />
          {fullName}
        </div>
      );
    },
    valueGetter: (params: { row: Transaction }) => {
      const { first_name, last_name } = params.row.Receiver.Profile;
      const fullName = Capitalize(`${first_name} ${last_name}`);
      return fullName;
    },
  },
  {
    field: "Project",
    headerName: "Project Name",
    width: 300,
    hideable: false,
    renderCell: (params: { row: Transaction }) => {
      const { name } = params.row.Project;
      return <div>{Capitalize(name)}</div>;
    },
    valueGetter: (params) => {
      const { name } = params.row.Project;
      return Capitalize(name);
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 180,
    renderCell: (params: { row: Transaction }) => {
      const { status } = params.row;
      return <div className={`cellWithStatus ${status}`}>{Capitalize(status)}</div>;
    },
    valueGetter: (params: { row: Transaction }) => {
      const { status } = params.row;
      return Capitalize(status);
    },
  },
  { field: "quantity", headerName: "Quantity", width: 180, type: "number" },
  { field: "remarks", headerName: "Remarks", width: 180, type: "string" },
];
