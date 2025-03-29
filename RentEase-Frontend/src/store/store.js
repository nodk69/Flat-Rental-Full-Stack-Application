import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../store/slices/adminSlice";
import notificationReducer from "../store/slices/notificationSlice";
import ownerReducer from "../store/slices/ownerSlice";
import { adminApi } from "../apis/adminApi";
import { notificationApi } from "../apis/notificationApi";
import { ownerApi } from "../apis/ownerApi";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    notifications: notificationReducer,
    owner: ownerReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminApi.middleware,
      notificationApi.middleware,
      ownerApi.middleware
    ),
});
