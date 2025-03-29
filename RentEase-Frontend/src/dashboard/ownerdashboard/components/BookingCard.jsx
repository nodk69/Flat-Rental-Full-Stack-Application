import React, { useState } from 'react';
import { useUpdateBookingStatusMutation } from '../api/ownerApi';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BookingCard = ({ booking }) => {
  const [status, setStatus] = useState(booking.status);
  const [updateBookingStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const handleStatusChange = async (newStatus) => {
    try {
      await updateBookingStatus({ bookingId: booking.id, status: newStatus });
      setStatus(newStatus);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  return (
    <Card className="shadow-lg p-4 rounded-lg border">
      <CardHeader>
        <CardTitle>Booking ID: {booking.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Tenant:</strong> {booking.tenantName}</p>
        <p><strong>Flat ID:</strong> {booking.flatId}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
        <p><strong>Status:</strong> 
          <span className={`ml-2 px-2 py-1 rounded-md text-white ${status === "APPROVED" ? "bg-green-500" : status === "REJECTED" ? "bg-red-500" : "bg-gray-500"}`}>
            {status}
          </span>
        </p>

        {status === "PENDING" && (
          <div className="mt-4 flex gap-2">
            <Button 
              className="bg-green-500 hover:bg-green-600" 
              onClick={() => handleStatusChange("APPROVED")} 
              disabled={isLoading}
            >
              Approve
            </Button>
            <Button 
              className="bg-red-500 hover:bg-red-600" 
              onClick={() => handleStatusChange("REJECTED")} 
              disabled={isLoading}
            >
              Reject
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingCard;
