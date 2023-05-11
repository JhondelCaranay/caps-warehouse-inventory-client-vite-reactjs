import { apiSlice } from "./../../api/apiSlice";
import { Transaction, TransactionForm } from "../../../types";

export const transactionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], string | void>({
      query: () => ({
        url: "/api/transactions",
      }),

      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Transaction", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Transaction" as const, id })),
          ];
        } else return [{ type: "Transaction", id: "LIST" }];
      },
    }),
    getMyTransactions: builder.query<Transaction[], string | void>({
      query: () => ({
        url: "/api/transactions/my-transaction",
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Transaction", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Transaction" as const, id })),
          ];
        } else return [{ type: "Transaction", id: "LIST" }];
      },
    }),
    getTransactionsByProjectId: builder.query<Transaction[], string | void>({
      query: (id) => ({
        url: `/api/transactions/project/${id}`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Transaction", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Transaction" as const, id })),
          ];
        } else return [{ type: "Transaction", id: "LIST" }];
      },
    }),
    getTransactionsByItemId: builder.query<Transaction[], string | void>({
      query: (id) => ({
        url: `/api/transactions/item/${id}`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Transaction", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Transaction" as const, id })),
          ];
        } else return [{ type: "Transaction", id: "LIST" }];
      },
    }),
    getTransaction: builder.query<Transaction, string>({
      query: (id) => ({
        url: `/api/transactions/${id}`,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "Transaction", id: arg }];
      },
    }),
    addNewTransaction: builder.mutation<Transaction, TransactionForm>({
      query: (data) => ({
        url: "/api/transactions",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Transaction", id: "LIST" }],
    }),
    updateTransaction: builder.mutation<Transaction, TransactionForm>({
      query: ({ id, ...data }) => ({
        url: `/api/transactions/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Transaction", id: arg.id }];
      },
    }),
    updateTransactionStatus: builder.mutation<Transaction, TransactionForm>({
      query: ({ id, ...data }) => ({
        url: `/api/transactions/status/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Transaction", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetMyTransactionsQuery,
  useGetTransactionsByProjectIdQuery,
  useGetTransactionsByItemIdQuery,
  useGetTransactionQuery,
  useAddNewTransactionMutation,
  useUpdateTransactionMutation,
  useUpdateTransactionStatusMutation,
} = transactionsApiSlice;
