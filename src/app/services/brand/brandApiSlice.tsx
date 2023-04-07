import { Brand, BrandForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";

export const brandsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], string | void>({
      query: () => ({
        url: "/api/brands",
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Brand", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Brand" as const, id })),
          ];
        } else return [{ type: "Brand", id: "LIST" }];
      },
    }),
    getBrand: builder.query<Brand, string>({
      query: (id) => ({
        url: `/api/brands/${id}`,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "Brand", id: arg }];
      },
    }),
    addNewBrand: builder.mutation<Brand, BrandForm>({
      query: (data) => ({
        url: "/api/brands",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Brand", id: "LIST" }],
    }),
    updateBrand: builder.mutation<Brand, BrandForm>({
      query: ({ id, ...data }) => ({
        url: `/api/brands/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Brand", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useAddNewBrandMutation,
  useUpdateBrandMutation,
} = brandsApiSlice;
