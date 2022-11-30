import { RootState } from "./../../store";
import { apiSlice } from "./../../api/apiSlice";
import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { Transaction } from "../../../types";

const transactionsAdapter = createEntityAdapter<Transaction>({
	// put completed in buttom
	// sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
	// sort by completed and createdAt
	// sortComparer: (a, b) => {
	// 	if (a.completed === b.completed) {
	// 		return a.createdAt > b.createdAt ? -1 : 1;
	// 	} else {
	// 		return a.completed ? 1 : -1;
	// 	}
	// },
});

const initialState = transactionsAdapter.getInitialState({});

export const transactionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTransactions: builder.query<EntityState<Transaction>, string | void>({
			query: () => ({
				url: "/api/transactions",
				// validateStatus: (response, result) => {
				// 	// validate the response status
				// 	return response.status === 200 && !result.IsError;
				// },
			}),
			// keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
			transformResponse: (response: Transaction[], meta, arg) => {
				// transform the response data, use for sorting, filtering, etc.
				return transactionsAdapter.setAll(initialState, response);
			},
			providesTags: (result, error, arg) => {
				// provide tags for the query, use for invalidating the query
				if (result?.ids) {
					return [
						{ type: "Transaction", id: "LIST" },
						...result.ids.map((id) => ({ type: "Transaction" as const, id })),
					];
				} else return [{ type: "Transaction", id: "LIST" }];
			},
		}),
		// addNewTransaction: builder.mutation({
		// 	query: (data) => ({
		// 		url: "/api/transactions",
		// 		method: "POST",
		// 		body: {
		// 			...data,
		// 		},
		// 	}),
		// 	invalidateTags: [{ type: "Transaction", id: "LIST" }],
		// }),
		// updateTransaction: builder.mutation({
		// 	query: (data) => ({
		// 		url: `/api/transactions/${data.id}`,
		// 		method: "PATCH",
		// 		body: {
		// 			...data,
		// 		},
		// 	}),
		// 	invalidateTags: (result, error, arg) => {
		// 		return [{ type: "Transaction", id: arg.id }];
		// 	},
		// }),
		// deleteTransaction: builder.mutation({
		// 	query: ({ id }) => ({
		// 		url: `/api/transactions/${id}`,
		// 		method: "DELETE",
		// 	}),
		// 	invalidateTags: (result, error, arg) => {
		// 		return [{ type: "Transaction", id: arg.id }];
		// 	},
		// }),
	}),
});

export const {
	useGetTransactionsQuery,
	// useAddNewTransactionMutation,
	// useUpdateTransactionMutation,
	// useDeleteTransactionMutation,
} = transactionsApiSlice;

// returns the query result object
export const selectTransactionsResult = transactionsApiSlice.endpoints.getTransactions.select();

// create memoized selector
const selectTransactionsData = createSelector(
	selectTransactionsResult,
	(transactionsResult) => transactionsResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using  destructuring
export const {
	selectAll: selectAllTransactions,
	selectById: selectTransactionById,
	selectIds: selectTransactionIds,
	// Pass in a selector that returns the transactions slice of state
} = transactionsAdapter.getSelectors<RootState>(
	(state) => selectTransactionsData(state) ?? initialState
);
