import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetTransactionsQuery } from "../../../../app/services/transaction/transactionApiSlice";
import useWindowSize from "../../../../hooks/useWindowSize";
import { CustomPagination } from "../../../datagrid-pagination/CustomPagination";
import PulseLoader from "react-spinners/PulseLoader";
import "./transactionDataTable.scss";
import { Transaction } from "../../../../types";
import noImage from "../../../../assets/img/noimage.png";
const TransactionDataTable = () => {
	const { windowSize } = useWindowSize();

	const {
		data: transactions,
		error,
		isLoading,
		isSuccess,
		isError,
	} = useGetTransactionsQuery("transactionList", {
		pollingInterval: 60000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});
	console.log("🚀 ~ file: TransactionDataTable.tsx:27 ~ TransactionDataTable ~ error", error);

	const handleDelete = (id: number) => {
		console.log({ id });
		// setData(data.filter((item) => item.id !== id));
	};

	let content: JSX.Element | null = null;

	if (isLoading) {
		content = <PulseLoader color={"#FFF"} />;
	}

	if (isError) {
		content = <p className="errmsg">error</p>;
	}

	if (isSuccess) {
		const { ids, entities } = transactions;
		const transactionList = ids.map((id) => entities[id] as Transaction);

		content = (
			<div className="datatable">
				<DataGrid
					className="datagrid"
					rows={transactionList}
					columns={columns} // columns - tabel header columns
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
	}

	return content;
};
export default TransactionDataTable;

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 230, type: "string", hide: true },
	{
		field: "Item",
		headerName: "Item Name",
		hideable: false,
		width: 230,
		renderCell: (params) => {
			return (
				<div className="cellWithImg">
					<img
						className="cellImg"
						src={params.row.img ? params.row.img : noImage}
						alt="avatar"
					/>
					{params.row.Item.name}
				</div>
			);
		},
		valueGetter: (params) => {
			return params.row.Item.name;
		},
	},
	{
		field: "User",
		headerName: "Sender Name",
		hideable: false,
		width: 230,
		renderCell: (params: { row: Transaction }) => {
			const avatar = params.row.User.Profile.avatarUrl
				? params.row.User.Profile.avatarUrl
				: noImage;

			return (
				<div className="cellWithImg">
					<img className="cellImg" src={avatar} alt="avatar" />
					{params.row.User.Profile.first_name} {params.row.User.Profile.last_name}
				</div>
			);
		},
		valueGetter: (params) => {
			return params.row.User.Profile.first_name + " " + params.row.User.Profile.last_name;
		},
	},
	{
		field: "Project",
		headerName: "Project Name",
		hideable: false,
		width: 200,
		renderCell: (params: { row: Transaction }) => {
			return <div>{params.row.Project.name}</div>;
		},
		valueGetter: (params) => {
			return params.row.Project.name;
		},
	},
	{
		field: "active",
		headerName: "Status",
		hideable: false,
		width: 200,
		renderCell: (params: { row: Transaction }) => {
			return (
				<div className={`cellWithStatus ${params.row.action}`}>
					{params.row.action.replace("_", " ")}
				</div>
			);
		},
	},
	{ field: "quantity", headerName: "Quantity", width: 120, type: "number" },
	{ field: "remarks", headerName: "Remarks", width: 150, type: "string" },
	{
		field: "actions",
		headerName: "Action",
		hideable: false,
		width: 120,
		renderCell: (params) => {
			return (
				<div className="cellAction">
					<Link to="/dash/transactions/1" style={{ textDecoration: "none" }}>
						<div className="viewButton">View</div>
					</Link>
					{/* <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
                        Delete
                    </div> */}
				</div>
			);
		},
		sortable: false,
	},
];
