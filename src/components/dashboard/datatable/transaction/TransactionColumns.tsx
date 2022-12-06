import { GridColDef } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import { Transaction } from "../../../../types";
import _ from "lodash";

export const TRANSACTION_MOBILE_COLUMNS = {
	__check__: false,
	id: false,
	Item: true,
	User: true,
	Project: true,
	status: false,
	quantity: false,
	remarks: false,
};

export const TRANSACTION_ALL_COLUMNS = {
	__check__: false,
	id: false,
	Item: true,
	User: true,
	Project: true,
	status: true,
	quantity: true,
	remarks: true,
};

export const transactionColumns: GridColDef[] = [
	{ field: "__check__", width: 0, sortable: false, filterable: false },
	{ field: "id", headerName: "ID", width: 230, type: "string" },
	{
		field: "Item",
		headerName: "Item Name",
		width: 230,
		hideable: false,
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
		width: 230,
		hideable: false,
		renderCell: (params: { row: Transaction }) => {
			const avatar = params.row.User.Profile.avatarUrl
				? params.row.User.Profile.avatarUrl
				: noImage;

			const fullName = _.startCase(
				`${params.row.User.Profile.first_name} ${params.row.User.Profile.last_name}`
			);

			return (
				<div className="cellWithImg">
					<img className="cellImg" src={avatar} alt="avatar" />
					{fullName}
				</div>
			);
		},
		valueGetter: (params: { row: Transaction }) => {
			const fullName = _.startCase(
				`${params.row.User.Profile.first_name} ${params.row.User.Profile.last_name}`
			);
			return fullName;
		},
	},
	{
		field: "Project",
		headerName: "Project Name",
		width: 230,
		hideable: false,
		renderCell: (params: { row: Transaction }) => {
			return <div>{params.row.Project.name}</div>;
		},
		valueGetter: (params) => {
			return params.row.Project.name;
		},
	},
	{
		field: "status",
		headerName: "Status",
		width: 180,
		renderCell: (params: { row: Transaction }) => {
			const status = _.startCase(_.toLower(params.row.status));
			return <div className={`cellWithStatus ${params.row.status}`}>{status}</div>;
		},
		valueGetter: (params: { row: Transaction }) => {
			const status = _.startCase(_.toLower(params.row.status));
			return status;
		},
	},
	{ field: "quantity", headerName: "Quantity", width: 150, type: "number" },
	{ field: "remarks", headerName: "Remarks", width: 150, type: "string" },
];
