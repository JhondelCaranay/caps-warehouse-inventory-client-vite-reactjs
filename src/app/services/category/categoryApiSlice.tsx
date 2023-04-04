import { Category } from "../../../types";
import { apiSlice } from "../../api/apiSlice";
import { CategoryForm } from "../../../types/formik.type";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], string | void>({
      query: () => ({
        url: "/api/category",
      }),

      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Category", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Category" as const, id })),
          ];
        } else return [{ type: "Category", id: "LIST" }];
      },
    }),
    getCategory: builder.query<Category, string>({
      query: (id) => ({
        url: `/api/category/${id}`,
      }),
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
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;
