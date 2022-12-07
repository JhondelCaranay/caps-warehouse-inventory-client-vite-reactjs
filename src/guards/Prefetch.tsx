import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { itemsApiSlice } from "../app/services/item/itemApiSlice";
import { transactionsApiSlice } from "../app/services/transaction/transactionApiSlice";
import { categoryApiSlice } from "../app/services/category/categoryApiSlice";
import { store } from "../app/store";

const Prefetch = () => {
	useEffect(() => {
		store.dispatch(
			transactionsApiSlice.util.prefetch("getTransactions", "transactionList", {
				force: true,
			})
		);
		store.dispatch(itemsApiSlice.util.prefetch("getItems", "itemList", { force: true }));
		store.dispatch(
			categoryApiSlice.util.prefetch("getCategory", "categoryList", { force: true })
		);
	}, []);

	return <Outlet />;
};
export default Prefetch;
