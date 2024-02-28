import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "../user/userSlice";
const studentApiSlice = createApi({
  reducerPath: "studentApiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "user/register",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => {
        return response.data;
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "user/login",
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
          studentApiSlice.endpoints.getMe.useQuery();
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getMe: builder.query({
      query: () => ({
        url: "user/getMe",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          console.log("hello");
          console.log(data);
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetMeQuery } =
  studentApiSlice;

export default studentApiSlice;
