import "./datatable.scss";
import { DataGrid, GridToolbar, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userRows } from "../../../datatableSource";
import { userColumns } from "./userColumns";
import { CustomPagination } from "../../datagrid-pagination/CustomPagination";
import useWindowSize from "../../../hooks/useWindowSize";

const DataTable = () => {
  // only get 20 users in userRows
  const [data, setData] = useState(userRows.slice(0, 20));
  const { windowSize } = useWindowSize();
  // const { columnVisibilityModel, setColumnVisibilityModel, windowSize } =
  // 	useColumnVisibilityModel();

  const handleDelete = (id: number) => {
    console.log({ id });
    setData(data.filter((item) => item.id !== id));
  };

  // this column will be use by other data
  const actionColumn: GridColDef[] = [
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/dash/users/1" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link> */}
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
      sortable: false,
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data} // rows - data
        columns={userColumns.concat(actionColumn)} // columns - tabel header columns
        // columnVisibilityModel={columnVisibilityModel} // columnVisibilityModel - show/hide columns
        // onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)} // onColumnVisibilityModelChange - show/hide columns
        pageSize={10} // pageSize - number of rows per page
        rowsPerPageOptions={[10]} // rowsPerPageOptions - array of numbers of rows per page
        // pagination // pagination - default is true , no need to add this because i use custom pagination
        checkboxSelection={windowSize > 640 ? true : false} // checkboxSelection - default is false - enable checkbox selection
        disableSelectionOnClick // disableSelectionOnClick - default is false - disable selection on click
        components={{
          Toolbar: GridToolbar, // GridToolbar - toolbar component on top of the table
          // Toolbar: CustomToolbar,
          Pagination: CustomPagination, // CustomPagination - custom pagination
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }, // debounceMs - delay time for quick filter
            printOptions: { disableToolbarButton: true }, // disableToolbarButton - default is false - disable print button
            //csvOptions: { disableToolbarButton: true }, // disableToolbarButton - default is false - disable csv button
          },
        }}
      />
    </div>
  );
};
export default DataTable;

// function CustomToolbar() {
// 	return (
// 		<GridToolbarContainer>
// 			<GridToolbarColumnsButton />
// 			<GridToolbarFilterButton />
// 			<GridToolbarDensitySelector />
// 			{/* <GridToolbarExport /> */}
// 		</GridToolbarContainer>
// 	);
// }
