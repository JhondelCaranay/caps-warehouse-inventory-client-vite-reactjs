import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookie from "js-cookie";
import { Tokens } from "../../types";
import { logOut, setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  // credentials: "include", // credentials: 'same-origin' | 'include' | 'omit'
  // credentials: - include: always send cookies, even for cross-origin requests
  prepareHeaders: (headers, { getState, endpoint }: { getState: Function; endpoint: string }) => {
    // const access_token: string = getState().auth.access_token;
    const access_token = Cookie.get("access_token"); // this temporary solution, use PersistLogin in the future
    const refresh_token = Cookie.get("refresh_token");

    if (refresh_token && endpoint === "refresh") {
      headers.set("authorization", `Bearer ${refresh_token}`);
    } else if (access_token) {
      headers.set("authorization", `Bearer ${access_token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}
  let result = await baseQuery(args, api, extraOptions);
  // console.log("🚀 ~ file: apiSlice.ts:37 ~ result", result);

  // If you want, handle other status codes, too
  if (result.error && result.error.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        method: "POST",
        url: "/api/auth/refresh",
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );
    // console.log("🚀 ~ file: apiSlice.ts:56 ~ refreshResult", refreshResult);

    if (refreshResult.data) {
      const { access_token, refresh_token } = refreshResult.data as Tokens;
      api.dispatch(
        setCredentials({
          access_token: access_token,
          refresh_token: refresh_token,
        })
      );
      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());

      // if (refreshResult?.error?.status === 401) {

      // }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  // reducerPath: "api", // reducerPath - The name of the reducer to use for this API. Defaults to the name of the slice is "api"
  // baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  // baseQuery,
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Transaction", "Item", "Category", "Brand", "Project", "STAT"],
  endpoints: (builder) => ({}),
});
