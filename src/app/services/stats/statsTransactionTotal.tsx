import { apiSlice } from "../../api/apiSlice";

export interface TransactionTotalsType {
  totalTransactionToday: number;
  totalTransactionThisWeek: number;
  totalTransactionThisMonth: number;
  percentageChange: number;
}

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatsTransactionTotal: builder.query<TransactionTotalsType, string>({
      query: (arg) => ({
        url: "/api/stats/transaction/totals",
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "STAT", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetStatsTransactionTotalQuery } = statsApiSlice;
