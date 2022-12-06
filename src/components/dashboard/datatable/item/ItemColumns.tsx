import { GridColDef } from "@mui/x-data-grid";
import noImage from "../../../../assets/img/noimage.png";
import { Item } from "../../../../types";
import _ from "lodash";

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
		field: "name",
		headerName: "Item Name",
		hideable: false,
		width: 300,
		renderCell: (params: { row: Item }) => {
			return (
				<div className="cellWithImg">
					<img
						className="cellImg"
						src={params.row.pictureUrl ? params.row.pictureUrl : noImage}
						alt="avatar"
					/>
					{params.row.name}
				</div>
			);
		},
		valueGetter: (params: { row: Item }) => {
			return params.row.name;
		},
	},
	{
		field: "Category",
		headerName: "Category",
		width: 300,
		renderCell: (params: { row: Item }) => {
			const category = _.startCase(_.toLower(params.row.Category.name));
			return <div>{category}</div>;
		},
		valueGetter: (params: { row: Item }) => {
			const category = _.startCase(_.toLower(params.row.Category.name));
			return category;
		},
	},
	{
		field: "Brand",
		headerName: "Brand",
		width: 300,
		renderCell: (params: { row: Item }) => {
			const brand = _.startCase(_.toLower(params.row.Brand.name));
			return <div>{brand}</div>;
		},
		valueGetter: (params: { row: Item }) => {
			const brand = _.startCase(_.toLower(params.row.Brand.name));
			return brand;
		},
	},
	{ field: "unit", headerName: "Unit", width: 150, type: "string" },
	{ field: "quantity", headerName: "Quantity", width: 150, type: "number" },
];
