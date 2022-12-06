import { GridColDef } from "@mui/x-data-grid";

export const userColumns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 70, type: "number" },
	{
		field: "username",
		headerName: "User",
		width: 350,
		renderCell: (params) => {
			return (
				<div className="cellWithImg">
					<img className="cellImg" src={params.row.img} alt="avatar" />
					{params.row.username}
				</div>
			);
		},
	},
	{
		field: "email",
		headerName: "Email",
		width: 230,
	},
	{
		field: "age",
		headerName: "Age",
		type: "number",
		width: 120,
	},
	{
		field: "status",
		headerName: "Status",
		width: 120,
		renderCell: (params) => {
			return <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>;
		},
	},
];
