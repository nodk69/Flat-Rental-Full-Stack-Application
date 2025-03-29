import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ownerApi = createApi({
  reducerPath: "ownerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    /** OWNER APIs **/

    //Get owner details by ID (Owner/Admin only)
    getOwnerById: builder.query({
      query: (id) => `owners/${id}`,
    }),

    //Get all owners (Admin only)
    getAllOwners: builder.query({
      query: () => "owners",
    }),

    //Update Owner Profile (Owner only)
    updateOwnerProfile: builder.mutation({
      query: ({ id, ownerDTO }) => ({
        url: `owners/${id}`,
        method: "PUT",
        body: ownerDTO,
      }),
    }),

    //Delete Owner (Admin only)
    deleteOwner: builder.mutation({
      query: (id) => ({
        url: `owners/${id}`,
        method: "DELETE",
      }),
    }),

    /** OWNER'S FLATS APIs **/

    //Get all flats posted by the owner
    getFlatsByOwner: builder.query({
      query: () => `flats/owner/flats`,
    }),

    // Get a flat by ID
    getFlatById: builder.query({
      query: (flatId) => `flats/${flatId}`,
    }),

    //Create a new flat (Owner only)
    createFlat: builder.mutation({
      query: (flatDTO) => ({
        url: "flats",
        method: "POST",
        body: flatDTO,
      }),
    }),

    // Update a flat (Owner only)
    updateFlat: builder.mutation({
      query: ({ id, flatDTO }) => ({
        url: `flats/${id}`,
        method: "PUT",
        body: flatDTO,
      }),
    }),

    //Update flat status(Owner/Admin)
    updateFlatStatus: builder.mutation({
      query: ({ flatId, status }) => ({
        url: `flats/${flatId}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // Delete a flat (Owner only)
    deleteFlat: builder.mutation({
      query: (id) => ({
        url: `flats/${id}`,
        method: "DELETE",
      }),
    }),

    /** OWNER'S BOOKING REQUESTS APIs **/

    //Get all booking requests received by an owner
    getBookingRequestsByOwner: builder.query({
      query: (ownerId) => `owners/${ownerId}/bookings`,
    }),

    // Update booking status (Owner/Admin)
    updateBookingStatus: builder.mutation({
      query: ({ bookingId, status }) => ({
        url: `bookings/${bookingId}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetOwnerByIdQuery,
  useGetAllOwnersQuery,
  useUpdateOwnerProfileMutation,
  useDeleteOwnerMutation,

  useGetFlatsByOwnerQuery,
  useGetFlatByIdQuery,
  useCreateFlatMutation,
  useUpdateFlatMutation,
  useUpdateFlatStatusMutation,
  useDeleteFlatMutation,

  useGetBookingRequestsByOwnerQuery,
  useUpdateBookingStatusMutation,
} = ownerApi;
