import { createSlice } from "@reduxjs/toolkit";
import { adminApi } from "../../apis/adminApi";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    flats: [],
    bookings: [],
    reports: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(adminApi.endpoints.getAllUsers.matchFulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addMatcher(adminApi.endpoints.getAllFlats.matchFulfilled, (state, action) => {
        state.flats = action.payload;
      })
      .addMatcher(adminApi.endpoints.getAllBookings.matchFulfilled, (state, action) => {
        state.bookings = action.payload;
      })
      .addMatcher(adminApi.endpoints.generateReports.matchFulfilled, (state, action) => {
        state.reports = action.payload;
      });
  },
});

export default adminSlice.reducer;
