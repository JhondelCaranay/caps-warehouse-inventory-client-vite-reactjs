import { Item, ItemForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";

export const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query<Item[], string | void>({
      query: () => ({
        url: "/api/items",
      }),

      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Item", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Item" as const, id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    getItemsByFilters: builder.query<Item[], string | void>({
      query: (filters) => ({
        url: `/api/items?${filters}`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Item", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Item" as const, id })),
          ];
        } else return [{ type: "Item", id: "LIST" }];
      },
    }),
    getItem: builder.query<Item, string>({
      query: (id) => ({
        url: `/api/items/${id}`,
      }),
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
} = itemsApiSlice;
