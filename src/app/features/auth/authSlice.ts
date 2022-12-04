import { RootState } from "./../../store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
	access_token: string | null;
	refresh_token: string | null;
};

const initialState: AuthState = {
	access_token: null,
	refresh_token: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCredentials: (state, action: PayloadAction<AuthState>) => {
			const { access_token, refresh_token } = action.payload;
			// console.log("🚀 ~ file: authSlice.ts ~ line 21 ~ action", action.payload);
			state.access_token = access_token;
			state.refresh_token = refresh_token;
		},
		logOut: (state) => {
			state.access_token = null;
			state.refresh_token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectAccessToken = (state: RootState) => state.auth.access_token;
export const selectRefreshToken = (state: RootState) => state.auth.refresh_token;
