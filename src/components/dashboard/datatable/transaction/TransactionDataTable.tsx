import "./transactionDataTable.scss";
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridToolbar } from "@mui/x-data-grid";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGetTransactionsQuery } from "../../../../app/services/transaction/transactionApiSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import PulseLoader from "react-spinners/PulseLoader";
import { Transaction } from "../../../../types";
import {
  transactionColumns,
  TRANSACTION_ALL_COLUMNS,
  TRANSACTION_MOBILE_COLUMNS,
} from "./TransactionColumns";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

const TransactionDataTable = () => {
  const { windowSize } = useWindowSize();
  const navigate = useNavigate();

  const {
    data: transactions,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetTransactionsQuery("transactionList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

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
          <div className="cellAction">
            {/* <Link to="/dash/transactions/1" style={{ textDecoration: "none" }}>
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
    if (Object.values(error)[0] === 401) {
      return <Navigate to="/login" replace />;
    }

    content = (
      <div className="loading">
        <PulseLoader color={"#000000"} />
        <h1 className="error">Failed to load data</h1>
      </div>
    );
  }

  if (isSuccess) {
    const { ids, entities } = transactions;
    const transactionList = ids.map((id) => entities[id] as Transaction);

    content = (
      <>
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" spacing={1}>
            <Link to="/dash/transactions/new" style={{ textDecoration: "none" }}>
              <Button size="small" variant="outlined">
                Create Transaction
              </Button>
            </Link>
            <Button size="small" variant="outlined" onClick={refetch}>
              Refresh
            </Button>
          </Stack>
        </Stack>
        <DataGrid
          className="datagrid"
          rows={transactionList}
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
      </>
    );
  }

  return <div className="transactionDataTable">{content}</div>;
};
export default TransactionDataTable;
