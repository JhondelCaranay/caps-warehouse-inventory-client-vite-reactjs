import { createEntityAdapter, createSelector, EntityState } from "@reduxjs/toolkit";
import { Project, ProjectCreateForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";
import { RootState } from "../../store";

const projectsAdapter = createEntityAdapter<Project>({
  // put completed in buttom
  // sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
  // sort by completed and createdAt
  // sortComparer: (a, b) => {
  // 	if (a.completed === b.completed) {
  // 		return a.createdAt > b.createdAt ? -1 : 1;
  // 	} else {
  // 		return a.completed ? 1 : -1;
  // 	}
  // },
});

const initialState = projectsAdapter.getInitialState({});

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<EntityState<Project>, string | void>({
      query: () => ({
        url: "/api/projects",
        // validateStatus: (response, result) => {
        // 	// validate the response status
        // 	return response.status === 200 && !result.IsError;
        // },
      }),
      // keepUnusedDataFor: import.meta.env.VITE_NODE_ENV === "development" ? 5 : 60, // keep unused data for 5 seconds for development, the defualt is 60 seconds
      transformResponse: (response: Project[], meta, arg) => {
        // transform the response data, use for sorting, filtering, etc.
        return projectsAdapter.setAll(initialState, response);
      },
      providesTags: (result, error, arg) => {
        // provide tags for the query, use for invalidating the query
        if (result?.ids) {
          return [
            { type: "Project", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Project" as const, id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),
    addNewProject: builder.mutation<Project, ProjectCreateForm>({
      query: (data) => ({
        url: "/api/projects",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    // updateProject: builder.mutation({
    // 	query: (data) => ({
    // 		url: `/api/projects/${data.id}`,
    // 		method: "PATCH",
    // 		body: {
    // 			...data,
    // 		},
    // 	}),
    // 	invalidateTags: (result, error, arg) => {
    // 		return [{ type: "Project", id: arg.id }];
    // 	},
    // }),
    // deleteProject: builder.mutation({
    // 	query: ({ id }) => ({
    // 		url: `/api/projects/${id}`,
    // 		method: "DELETE",
    // 	}),
    // 	invalidateTags: (result, error, arg) => {
    // 		return [{ type: "Project", id: arg.id }];
    // 	},
    // }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  // useUpdateProjectMutation,
  // useDeleteProjectMutation,
} = projectsApiSlice;

// returns the query result object
export const selectProjectsResult = projectsApiSlice.endpoints.getProjects.select();

// create memoized selector
const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult.data // normalized state object with ids and entities
);

// getSelectors creates these selectors and we rename them with aliases using  destructuring
export const {
  selectAll: selectAllProjects,
  selectById: selectProjectById,
  selectIds: selectProjectIds,
  // Pass in a selector that returns the projects slice of state
} = projectsAdapter.getSelectors<RootState>((state) => selectProjectsData(state) ?? initialState);
