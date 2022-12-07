import { Signin, Tokens } from "../../../types";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { apiSlice } from "./../../api/apiSlice";
import Cookie from "js-cookie";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<Tokens, Signin>({
			query: (credentials) => ({
				url: "/api/auth/signin",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		sendLogout: builder.mutation<any, void>({
			query: () => ({
				url: "/api/auth/signout",
				method: "POST",
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log("🚀 ~ file: authApiSlice.ts:23 ~ onQueryStarted ~ data", data);

					dispatch(logOut());

					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
					// dispatch(authApiSlice.util.resetApiState());
				} catch (error) {
					console.log("🚀 ~ file: authApiSlice.ts:32 ~ onQueryStarted ~ error", error);
				}
			},
		}),
		refresh: builder.mutation<Tokens, void>({
			query: () => ({
				url: "/api/auth/refresh",
				method: "POST",
				headers: {
					authorization: `Bearer ${Cookie.get("refresh_token")}`,
				},
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;

					const { access_token, refresh_token } = data;

					dispatch(setCredentials({ access_token, refresh_token }));
				} catch (err) {
					console.log("🚀 ~ file: authApiSlice.ts:60 ~ onQueryStarted ~ err", err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
