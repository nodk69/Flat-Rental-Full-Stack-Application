import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/admin",
    credentials: "include", //Session persistence
  }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (adminData) => ({
        url: "/register",
        method: "POST",
        body: adminData,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getAdminById: builder.query({
      query: (id) => `/admin/${id}`,
    }),
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getAllFlats: builder.query({
      query: () => "/flats",
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),
    disableFlat: builder.mutation({
      query: (flatId) => ({
        url: `/flats/${flatId}/disable`,
        method: "PUT",
      }),
    }),
    getAllBookings: builder.query({
      query: () => "/bookings",
    }),
    generateReports: builder.query({
      query: () => "/reports",
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useGetAdminByIdQuery,
  useGetAllUsersQuery,
  useGetAllFlatsQuery,
  useDeleteUserMutation,
  useDisableFlatMutation,
  useGetAllBookingsQuery,
  useGenerateReportsQuery,
} = adminApi;
