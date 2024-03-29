import { Tokens, User, UserCreateForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/api/users",
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "User" as const, id })),
            { type: "User", id: "LIST" },
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    getUserEngineers: builder.query<User[], void>({
      query: () => ({
        url: "/api/users/engineer",
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            ...result.map(({ id }) => ({ type: "User" as const, id })),
            { type: "User", id: "LIST" },
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    getUser: builder.query<User, string>({
      query: (id) => ({
        url: `/api/users/${id}`,
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "User", id: arg }];
      },
    }),
    getMyProfile: builder.query<User, string | void>({
      query: () => ({
        url: `/api/users/me`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: "User", id: result.id }];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation<User, UserCreateForm>({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUserPassword: builder.mutation<User, { password: string }>({
      query: (data) => ({
        url: `/api/users/change-password`,
        method: "PATCH",
        body: {
          password: data.password,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "User", id: result?.id }];
      },
    }),
    forGotPassword: builder.mutation<User, { email: string }>({
      query: (data) => ({
        url: `/api/auth/forgot-password`,
        method: "POST",
        body: {
          email: data.email,
        },
      }),
    }),
    resetCode: builder.mutation<Tokens, { email: string; code: string }>({
      query: (data) => ({
        url: `/api/auth/reset-code`,
        method: "POST",
        body: {
          email: data.email,
          code: data.code,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserEngineersQuery,
  useGetUserQuery,
  useGetMyProfileQuery,
  useAddNewUserMutation,
  useUpdateUserPasswordMutation,
  useForGotPasswordMutation,
  useResetCodeMutation,
} = usersApiSlice;

// const usersAdapter = createEntityAdapter<User>({
//   // selectId: (user) => user.id,
//   // put completed in buttom
//   // sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
//   // sort by completed and createdAt
//   // sortComparer: (a, b) => {
//   // 	if (a.completed === b.completed) {
//   // 		return a.createdAt > b.createdAt ? -1 : 1;
//   // 	} else {
//   // 		return a.completed ? 1 : -1;
//   // 	}
//   // },
// });

// const initialState = usersAdapter.getInitialState({});

// export const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getUsers: builder.query<EntityState<User>, string | void>({
//       query: () => ({
//         url: "/api/users",
//         // validateStatus: (response, result) => {
//         // 	// validate the response status
//         // 	return response.status === 200 && !result.IsError;
//         // },
//       }),
//       // keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
//       transformResponse: (response: User[], meta, arg) => {
//         // transform the response data, use for sorting, filtering, etc.
//         return usersAdapter.setAll(initialState, response);
//       },
//       providesTags: (result, error, arg) => {
//         // provide tags for the query, use for invalidating the query
//         if (result?.ids) {
//           return [
//             { type: "User", id: "LIST" },
//             ...result.ids.map((id) => ({ type: "User" as const, id })),
//           ];
//         } else return [{ type: "User", id: "LIST" }];
//       },
//     }),
//     getUser: builder.query<EntityState<User>, string>({
//       query: (id) => ({
//         url: `/api/users/${id}`,
//       }),
//       transformResponse: (response: User, meta, arg) => {
//         return usersAdapter.upsertOne(initialState, response);
//       },
//       providesTags: (result, error, arg) => {
//         return [{ type: "User", id: arg }];
//       },
//     }),
//     getMyProfile: builder.query<EntityState<User>, string>({
//       query: () => ({
//         url: `/api/users/me`,
//       }),
//       transformResponse: (response: User, meta, arg) => {
//         return usersAdapter.upsertOne(initialState, response);
//       },
//       providesTags: (result, error, arg) => {
//         return [{ type: "User", id: arg }];
//       },
//     }),
//     addNewUser: builder.mutation<User, UserCreateForm>({
//       query: (data) => ({
//         url: "/api/users",
//         method: "POST",
//         body: {
//           ...data,
//         },
//       }),
//       invalidatesTags: [{ type: "User", id: "LIST" }],
//     }),
//     // updateUser: builder.mutation({
//     // 	query: (data) => ({
//     // 		url: `/api/users/${data.id}`,
//     // 		method: "PATCH",
//     // 		body: {
//     // 			...data,
//     // 		},
//     // 	}),
//     // 	invalidateTags: (result, error, arg) => {
//     // 		return [{ type: "User", id: arg.id }];
//     // 	},
//     // }),
//     // deleteUser: builder.mutation({
//     // 	query: ({ id }) => ({
//     // 		url: `/api/users/${id}`,
//     // 		method: "DELETE",
//     // 	}),
//     // 	invalidateTags: (result, error, arg) => {
//     // 		return [{ type: "User", id: arg.id }];
//     // 	},
//     // }),
//   }),
// });

// export const {
//   useGetUsersQuery,
//   useGetUserQuery,
//   useGetMyProfileQuery,
//   useAddNewUserMutation,
//   // useUpdateUserMutation,
//   // useDeleteUserMutation,
// } = usersApiSlice;

// // returns the query result object
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// // create memoized selector
// const selectUsersData = createSelector(
//   selectUsersResult,
//   (usersResult) => usersResult.data // normalized state object with ids and entities
// );

// // getSelectors creates these selectors and we rename them with aliases using  destructuring
// export const {
//   selectAll: selectAllUsers,
//   selectById: selectUserById,
//   selectIds: selectUserIds,
//   // Pass in a selector that returns the users slice of state
// } = usersAdapter.getSelectors<RootState>((state) => selectUsersData(state) ?? initialState);
