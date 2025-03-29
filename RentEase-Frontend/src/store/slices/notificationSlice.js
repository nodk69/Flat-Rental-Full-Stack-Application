import { createSlice } from "@reduxjs/toolkit";
import { notificationApi } from "../../apis/notificationApi";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    unreadCount: 0,
    notifications: [],
  },

  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markNotificationAsReadLocal: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
      state.unreadCount = state.notifications.filter(n => !n.isRead).length;
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(notificationApi.endpoints.getUnreadNotifications.matchFulfilled, (state, action) => {
        state.unreadCount = action.payload.length;
      })
      .addMatcher(notificationApi.endpoints.getUserNotifications.matchFulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addMatcher(notificationApi.endpoints.markNotificationAsRead.matchFulfilled, (state, action) => {
        state.notifications = state.notifications.map(n =>
          n.id === action.meta.arg ? { ...n, isRead: true } : n
        );
        state.unreadCount = state.notifications.filter(n => !n.isRead).length;
      })
      .addMatcher(notificationApi.endpoints.markAllNotificationsAsRead.matchFulfilled, (state) => {
        state.notifications = state.notifications.map(n => ({ ...n, isRead: true }));
        state.unreadCount = 0;
      })
      .addMatcher(notificationApi.endpoints.deleteNotification.matchFulfilled, (state, action) => {
        state.notifications = state.notifications.filter(n => n.id !== action.meta.arg);
      })
      .addMatcher(notificationApi.endpoints.deleteAllNotifications.matchFulfilled, (state) => {
        state.notifications = [];
        state.unreadCount = 0;
      });
  },
});

export const {
  addNotification,
  markNotificationAsReadLocal,
  removeNotification,
  clearNotifications
} = notificationSlice.actions;

export default notificationSlice.reducer;
