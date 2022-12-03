import { GridColumns } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import { Transaction } from "../../../../types";
import _ from "lodash";

export const transactionColumns: GridColumns = [
	{ field: "__check__", hide: true, sortable: false, filterable: false, width: 0 },
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
	{ field: "quantity", headerName: "Quantity", width: 120, type: "number" },
	{ field: "remarks", headerName: "Remarks", width: 150, type: "string", hide: true },
];
