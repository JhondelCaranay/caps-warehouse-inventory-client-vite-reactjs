import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_BASE_URL,
	// credentials: "include", // credentials: 'same-origin' | 'include' | 'omit'
	// credentials: - include: always send cookies, even for cross-origin requests
	prepareHeaders: (headers, { getState }: { getState: Function }) => {
		const access_token: string = getState().auth.access_token;

		if (access_token) {
			headers.set("authorization", `Bearer ${access_token}`);
		}

		return headers;
	},
});

export const apiSlice = createApi({
	// reducerPath: "api", // reducerPath - The name of the reducer to use for this API. Defaults to the name of the slice is "api"
	// baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
	baseQuery,
	// baseQuery: baseQueryWithReauth,
	tagTypes: ["User"],
	endpoints: (builder) => ({}),
});
