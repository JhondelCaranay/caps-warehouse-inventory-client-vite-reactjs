import { apiSlice } from "../../api/apiSlice";

export type TotalsType = {
  totalTransactions: number;
  totalItems: number;
  totalProjects: number;
  totalUsers: number;
};

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatsTotal: builder.query<TotalsType, string>({
      query: (arg) => ({
        url: "/api/stats/totals",
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "STAT", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetStatsTotalQuery } = statsApiSlice;
