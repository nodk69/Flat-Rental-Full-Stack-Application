import React from 'react';
import { useGetOwnerByIdQuery } from '../api/ownerApi';

const OwnerProfile = ({ ownerId }) => {
  const { data: owner, isLoading, error } = useGetOwnerByIdQuery(ownerId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{owner.name}</h2>
      <p>Email: {owner.email}</p>
      <p>Phone: {owner.phone}</p>
    </div>
  );
};

export default OwnerProfile;
