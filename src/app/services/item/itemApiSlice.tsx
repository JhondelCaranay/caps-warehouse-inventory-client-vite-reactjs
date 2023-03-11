import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { Item, ItemForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

const itemsAdapter = createEntityAdapter<Item>({
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

const initialState = itemsAdapter.getInitialState({});

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<EntityState<Item>, string | void>({
      query: () => ({
        url: "/api/items",
        // validateStatus: (response, result) => {
        // 	// validate the response status
        // 	return response.status === 200 && !result.IsError;
        // },
      }),
      // keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
      transformResponse: (response: Item[], meta, arg) => {
        // transform the response data, use for sorting, filtering, etc.
        return itemsAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => {
        // provide tags for the query, use for invalidating the query
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item" as const, id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    getItemsByFilters: builder.query<EntityState<Item>, string | void>({
      query: (filters) => ({
        url: `/api/items?${filters}`,
      }),
      transformResponse: (response: Item[], meta, arg) => {
        return itemsAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Item", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Item" as const, id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),

    getItem: builder.query<EntityState<Item>, string>({
      query: (id) => ({
        url: `/api/items/${id}`,
      }),
      transformResponse: (response: Item, meta, arg) => {
        return itemsAdapter.upsertOne(initialState, response);
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Item", id: arg }];
      },
    }),
    addNewItem: builder.mutation<Item, ItemForm>({
      query: (data) => ({
        url: "/api/items",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
    updateItem: builder.mutation<Item, ItemForm>({
      query: ({ id, ...data }) => ({
        url: `/api/items/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Item", id: arg.id }];
      },
    }),
    // deleteItem: builder.mutation({
    // 	query: ({ id }) => ({
    // 		url: `/api/items/${id}`,
    // 		method: "DELETE",
    // 	}),
    // 	invalidateTags: (result, error, arg) => {
    // 		return [{ type: "Item", id: arg.id }];
    // 	},
    // }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemsByFiltersQuery,
  useGetItemQuery,
  useAddNewItemMutation,
  useUpdateItemMutation,
  // useDeleteItemMutation,
} = itemsApiSlice;

// returns the query result object
export const selectItemsResult = itemsApiSlice.endpoints.getItems.select();

// create memoized selector
const selectItemsData = createSelector(
  selectItemsResult,
  (itemsResult) => itemsResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using  destructuring
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemIds,
  // Pass in a selector that returns the items slice of state
} = itemsAdapter.getSelectors<RootState>((state) => selectItemsData(state) ?? initialState);
