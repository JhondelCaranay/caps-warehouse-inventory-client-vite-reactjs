import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { Brand, BrandCreateForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

const brandsAdapter = createEntityAdapter<Brand>({
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

const initialState = brandsAdapter.getInitialState({});

export const brandsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getBrands: builder.query<EntityState<Brand>, string | void>({
			query: () => ({
				url: "/api/brands",
				// validateStatus: (response, result) => {
				// 	// validate the response status
				// 	return response.status === 200 && !result.IsError;
				// },
			}),
			// keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
			transformResponse: (response: Brand[], meta, arg) => {
				// transform the response data, use for sorting, filtering, etc.
				return brandsAdapter.setAll(initialState, response);
			},
			providesTags: (result, error, arg) => {
				// provide tags for the query, use for invalidating the query
				if (result?.ids) {
					return [
						{ type: "Brand", id: "LIST" },
						...result.ids.map((id) => ({ type: "Brand" as const, id })),
					];
				} else return [{ type: "Brand", id: "LIST" }];
			},
		}),
		addNewBrand: builder.mutation<Brand, BrandCreateForm>({
			query: (data) => ({
				url: "/api/brands",
				method: "POST",
				body: {
					...data,
				},
			}),
			invalidatesTags: [{ type: "Brand", id: "LIST" }],
		}),
		// updateBrand: builder.mutation({
		// 	query: (data) => ({
		// 		url: `/api/brands/${data.id}`,
		// 		method: "PATCH",
		// 		body: {
		// 			...data,
		// 		},
		// 	}),
		// 	invalidateTags: (result, error, arg) => {
		// 		return [{ type: "Brand", id: arg.id }];
		// 	},
		// }),
		// deleteBrand: builder.mutation({
		// 	query: ({ id }) => ({
		// 		url: `/api/brands/${id}`,
		// 		method: "DELETE",
		// 	}),
		// 	invalidateTags: (result, error, arg) => {
		// 		return [{ type: "Brand", id: arg.id }];
		// 	},
		// }),
	}),
});

export const {
	useGetBrandsQuery,
	useAddNewBrandMutation,
	// useUpdateBrandMutation,
	// useDeleteBrandMutation,
} = brandsApiSlice;

// returns the query result object
export const selectBrandsResult = brandsApiSlice.endpoints.getBrands.select();

// create memoized selector
const selectBrandsData = createSelector(
	selectBrandsResult,
	(brandsResult) => brandsResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using  destructuring
export const {
	selectAll: selectAllBrands,
	selectById: selectBrandById,
	selectIds: selectBrandIds,
	// Pass in a selector that returns the brands slice of state
} = brandsAdapter.getSelectors<RootState>((state) => selectBrandsData(state) ?? initialState);
