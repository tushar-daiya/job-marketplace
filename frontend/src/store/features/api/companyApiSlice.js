import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyApiSlice = createApi({
  reducerPath: "companyApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "company/register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "company/login",
        method: "POST",
        body,
        credentials: "include",
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          companyApiSlice.endpoints.getMe.useQuery();
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: "company/getMe",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } =
  companyApiSlice;

export default companyApiSlice;
