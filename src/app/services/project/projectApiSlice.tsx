import { EntityState } from "@reduxjs/toolkit";
import { Project, ProjectForm } from "../../../types";
import { apiSlice } from "../../api/apiSlice";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProjects: builder.query<Project[], string | void>({
      query: () => ({
        url: "/api/projects/my-projects",
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Project", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Project" as const, id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),
    getProjectsByEngineerId: builder.query<Project[], string | void>({
      query: (engineerId) => ({
        url: `/api/projects/engineer/${engineerId}`,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Project", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Project" as const, id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),
    getProjects: builder.query<Project[], string | void>({
      query: () => ({
        url: "/api/projects",
      }),

      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Project", id: "LIST" },
            ...result.map(({ id }) => ({ type: "Project" as const, id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),

    getProject: builder.query<Project, string>({
      query: (id) => ({
        url: `/api/projects/${id}`,
      }),

      providesTags: (result, error, arg) => {
        return [{ type: "Project", id: arg }];
      },
    }),
    addNewProject: builder.mutation<Project, ProjectForm>({
      query: (data) => ({
        url: "/api/projects",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation<Project, ProjectForm>({
      query: ({ id, ...data }) => ({
        url: `/api/projects/${id}`,
        method: "PATCH",
        body: {
          ...data,
        },
      }),
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Project", id: arg.id }];
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetMyProjectsQuery,
  useGetProjectsByEngineerIdQuery,
  useGetProjectQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
} = projectsApiSlice;
