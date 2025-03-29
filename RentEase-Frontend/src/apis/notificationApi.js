import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:8080/notification";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({

    //Notify owner when tenant views a flat
    notifyViewFlat: builder.mutation({
      query: (flatId) => ({
        url: `/${flatId}/view`,
        method: "POST",
      }),
    }),

    //Notify owner when a tenant saves a property
    notifySaveFlat: builder.mutation({
      query: (flatId) => ({
        url: `/${flatId}/save`,
        method: "POST",
      }),
    }),

    //Create a new notification
    createNotification: builder.mutation({
      query: ({ message, ownerId }) => ({
        url: "/create",
        method: "POST",
        body: { message, ownerId },
      }),
    }),

    //Get all notifications for the logged-in user
    getUserNotifications: builder.query({
      query: () => "/user",
    }),

    //Get unread notifications
    getUnreadNotifications: builder.query({
      query: () => "/unread",
    }),

    //Mark a specific notification as read
    markNotificationAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/mark-as-read/${notificationId}`,
        method: "PATCH",
      }),
    }),

    //Mark all notifications as read
    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "/mark-all-as-read",
        method: "POST",
      }),
    }),

    //Delete a specific notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/delete/${notificationId}`,
        method: "DELETE",
      }),
    }),

    //Delete all notifications
    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/delete-all",
        method: "DELETE",
      }),
    }),
  }),
});

//Export hooks
export const {
  useNotifyViewFlatMutation,
  useNotifySaveFlatMutation,
  useCreateNotificationMutation,
  useGetUserNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
} = notificationApi;
