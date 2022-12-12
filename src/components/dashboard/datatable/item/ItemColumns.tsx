import { GridColDef } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import { Item } from "../../../../types";
import { Capitalize } from "../../../../config/utils/functions";

export const ITEM_MOBILE_COLUMNS = {
	__check__: false,
	id: false,
	name: true,
	Category: false,
	Brand: false,
	unit: false,
	quantity: false,
	description: false,
};

export const ITEM_ALL_COLUMNS = {
	__check__: false,
	id: false,
	name: true,
	Category: true,
	Brand: false,
	unit: true,
	quantity: true,
};

export const itemColumns: GridColDef[] = [
	{ field: "__check__", hide: true, sortable: false, filterable: false, width: 0 },
	{ field: "id", headerName: "ID", width: 350, type: "string", hide: true },
	{
		field: "Item",
		headerName: "Item Name",
		hideable: false,
		width: 300,
		renderCell: (params: { row: Item }) => {
			const { name, pictureUrl } = params.row;
			return (
				<div className="cellWithImg">
					<img
						className="cellImg"
						src={pictureUrl ? pictureUrl : noImage}
						alt="avatar"
					/>
					{Capitalize(name)}
				</div>
			);
		},
		valueGetter: (params: { row: Item }) => {
			const { name } = params.row;
			return Capitalize(name);
		},
	},
	{
		field: "Category",
		headerName: "Category",
		width: 300,
		renderCell: (params: { row: Item }) => {
			const { name } = params.row.Category;
			const category = Capitalize(name);
			return <div>{category}</div>;
		},
		valueGetter: (params: { row: Item }) => {
			const { name } = params.row.Category;
			const category = Capitalize(name);
			return category;
		},
	},
	{
		field: "Brand",
		headerName: "Brand",
		width: 300,
		renderCell: (params: { row: Item }) => {
			const { name } = params.row.Brand;
			const brand = Capitalize(name);
			return <div>{brand}</div>;
		},
		valueGetter: (params: { row: Item }) => {
			const { name } = params.row.Brand;
			const brand = Capitalize(name);
			return brand;
		},
	},
	{ field: "unit", headerName: "Unit", width: 150, type: "string" },
	{ field: "quantity", headerName: "Quantity", width: 150, type: "number" },
];
