import { Auth, Tokens } from "../../../types";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { apiSlice } from "./../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<Tokens, Auth>({
			query: (credentials) => ({
				url: "/api/auth/signin",
				method: "POST",
				body: credentials,
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
					console.log(
						"🚀 ~ file: authApiSlice.js ~ line 22 ~ onQueryStarted ~ data",
						data
					);

					dispatch(logOut());

					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
					// dispatch(authApiSlice.util.resetApiState());
				} catch (error) {
					// console.log("🚀 ~ file: authApiSlice.js ~ line 30 ~ onQueryStarted ~ error", error)
					console.log(error);
				}
			},
		}),
		refresh: builder.mutation<Tokens, void>({
			query: () => ({
				url: "/api/auth/refresh",
				method: "GET",
				// headers: {
				//     'authorization': `Bearer ${localStorage.getItem('refreshToken')}`
				// }
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					console.log(data);
					const { access_token, refresh_token } = data;
					await dispatch(setCredentials({ access_token, refresh_token }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
