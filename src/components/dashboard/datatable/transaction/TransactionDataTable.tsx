import styles from "./TransactionDataTable.module.scss";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import { Transaction } from "../../../../types";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../../../hooks";
import { Capitalize } from "../../../../config/utils/functions";
import noImage from "../../../../assets/img/noimage.png";

type TransactionDataTableProps = {
  transactions: Transaction[];
};

const TransactionDataTable = ({ transactions }: TransactionDataTableProps) => {
  const { windowSize } = useWindowSize();
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    // console.log(id);
    // console.debug("Edit", id);
    navigate(`/dash/transactions/edit/${id}`);
  };

  const [columnVisible, setColumnVisible] =
    useState<GridColumnVisibilityModel>(TRANSACTION_ALL_COLUMNS);

  useEffect(() => {
    const newColumns = windowSize > 640 ? TRANSACTION_ALL_COLUMNS : TRANSACTION_MOBILE_COLUMNS;
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
            <Link to="/dash/transactions/1" style={{ textDecoration: "none" }}>
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
      // hideable: false,
    },
  ];

  return (
    <div className={styles.transactionDataTable}>
      <DataGrid
        className={styles.datagrid}
        rows={transactions}
        columns={transactionColumns.concat(actionColumn)} // columns - tabel header columns
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
export default TransactionDataTable;

export const TRANSACTION_MOBILE_COLUMNS = {
  __check__: false,
  id: false,
  Item: true,
  // User: true,
  UserSender: false,
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
  UserSender: false,
  UserReciever: false,
  Project: true,
  status: true,
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
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={pictureUrl ? pictureUrl : noImage} alt="avatar" />
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
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={avatar} alt="avatar" />
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
        <div className={styles.cellWithImg}>
          <img className={styles.cellImg} src={avatar} alt="avatar" />
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
      return (
        <div className={`${styles.cellWithStatus} ${styles[status]}`}>{Capitalize(status)}</div>
      );
    },
    valueGetter: (params: { row: Transaction }) => {
      const { status } = params.row;
      return Capitalize(status);
    },
  },
  { field: "quantity", headerName: "Quantity", width: 180, type: "number" },
  { field: "remarks", headerName: "Remarks", width: 180, type: "string" },
];
