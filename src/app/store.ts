import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

const isDevMode = import.meta.env.VITE_NODE_ENV === "production" ? false : true;

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: isDevMode,
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
