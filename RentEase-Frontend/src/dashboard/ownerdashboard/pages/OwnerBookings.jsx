import React from 'react';
import { useGetBookingRequestsByOwnerQuery } from '../api/ownerApi';
import BookingCard from './BookingCard';

const OwnerBookings = ({ ownerId }) => {
  const { data: bookings, isLoading, error } = useGetBookingRequestsByOwnerQuery(ownerId);

  if (isLoading) return <div>Loading bookings...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default OwnerBookings;
