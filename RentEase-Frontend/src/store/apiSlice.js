import { adminApi } from "./api/adminApi";
import { notificationApi } from "./api/notificationApi";
import { ownerApi } from "./api/ownerApi";

export const apiSlice = {
  [adminApi.reducerPath]: adminApi.reducer,
  [notificationApi.reducerPath]: notificationApi.reducer,
  [ownerApi.reducerPath]: ownerApi.reducer,
};
