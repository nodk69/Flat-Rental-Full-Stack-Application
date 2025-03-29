import { createSlice } from "@reduxjs/toolkit";
import { ownerApi } from "../../apis/ownerApi";

const ownerSlice = createSlice({
  name: "owner",
  initialState: {
    flats: [],
    bookings: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(ownerApi.endpoints.getFlatsByOwner.matchFulfilled, (state, action) => {
        state.flats = action.payload;
      })
      .addMatcher(ownerApi.endpoints.getBookingRequestsByOwner.matchFulfilled, (state, action) => {
        state.bookings = action.payload;
      });
  },
});

export default ownerSlice.reducer;
