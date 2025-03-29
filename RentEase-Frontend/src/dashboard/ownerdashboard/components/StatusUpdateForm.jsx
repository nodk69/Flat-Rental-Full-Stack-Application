import React, { useState } from 'react';
import { useUpdateBookingStatusMutation } from '../api/ownerApi';

const StatusUpdateForm = ({ bookingId }) => {
  const [status, setStatus] = useState('');
  const [updateStatus] = useUpdateBookingStatusMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStatus({ bookingId, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Select Status</option>
        <option value="APPROVED">Approved</option>
        <option value="REJECTED">Rejected</option>
      </select>
      <button type="submit">Update Status</button>
    </form>
  );
};

export default StatusUpdateForm;
