import { apiSlice } from "../../api/apiSlice";

export interface ChartType {
  month: string;
  transactions: number;
  items: number;
}

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatsChart: builder.query<ChartType[], string>({
      query: (arg) => ({
        url: "/api/stats/chart",
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "STAT", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetStatsChartQuery } = statsApiSlice;
