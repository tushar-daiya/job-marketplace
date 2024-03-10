import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../user/userSlice";
const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/auth" }),
  endpoints: (builder) => ({
    registerStudent: builder.mutation({
      query: (body) => ({
        url: "/student/register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    registerCompany: builder.mutation({
      query: (body) => ({
        url: "/company/register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    loginStudent: builder.mutation({
      query: (body) => ({
        url: "/student/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    loginCompany: builder.mutation({
      query: (body) => ({
        url: "/company/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    logoutStudent: builder.mutation({
      query: () => ({
        url: "/student/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    logoutCompany: builder.mutation({
      query: () => ({
        url: "/company/logout",
        method: "GET",
        credentials: "include",
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/getMe",
        method: "GET",
        credentials: "include",
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
      transformResponse: (response) => {
        return response.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterStudentMutation,
  useRegisterCompanyMutation,
  useLoginStudentMutation,
  useLoginCompanyMutation,
  useLogoutStudentMutation,
  useLogoutCompanyMutation,
  useGetMeQuery,
} = authApiSlice;

export default authApiSlice;
