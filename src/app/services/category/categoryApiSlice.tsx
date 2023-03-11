import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { Category } from "../../../types";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";
import { CategoryForm } from "../../../types/formik.type";

const categoryAdapter = createEntityAdapter<Category>({
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

const initialState = categoryAdapter.getInitialState({});

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<Category>, string | void>({
      query: () => ({
        url: "/api/category",
        // validateStatus: (response, result) => {
        // 	// validate the response status
        // 	return response.status === 200 && !result.IsError;
        // },
      }),
      // keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
      transformResponse: (response: Category[], meta, arg) => {
        // transform the response data, use for sorting, filtering, etc.
        return categoryAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => {
        // provide tags for the query, use for invalidating the query
        if (result?.ids) {
          return [
            { type: "Category", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Category" as const, id })),
          ];
        } else return [{ type: "Category", id: "LIST" }];
      },
    }),
    getCategory: builder.query<EntityState<Category>, string>({
      query: (id) => ({
        url: `/api/category/${id}`,
      }),
      transformResponse: (response: Category, meta, arg) => {
        return categoryAdapter.upsertOne(initialState, response);
      },
      providesTags: (result, error, arg) => {
        return [{ type: "Category", id: arg }];
      },
    }),
    addNewCategory: builder.mutation<Category, CategoryForm>({
      query: (data) => ({
        url: "/api/category",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation<Category, CategoryForm>({
      query: ({ id, ...data }) => ({
        url: `/api/category/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Category", id: arg.id }];
      },
    }),
    // deleteCategory: builder.mutation({
    // 	query: ({ id }) => ({
    // 		url: `/api/category/${id}`,
    // 		method: "DELETE",
    // 	}),
    // 	invalidateTags: (result, error, arg) => {
    // 		return [{ type: "Category", id: arg.id }];
    // 	},
    // }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
  // useDeleteCategoryMutation,
} = categoryApiSlice;

// returns the query result object
export const selectCategoryResult = categoryApiSlice.endpoints.getCategories.select();

// create memoized selector
const selectCategoryData = createSelector(
  selectCategoryResult,
  (categoryResult) => categoryResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using  destructuring
export const {
  selectAll: selectAllCategory,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  // Pass in a selector that returns the category slice of state
} = categoryAdapter.getSelectors<RootState>((state) => selectCategoryData(state) ?? initialState);
