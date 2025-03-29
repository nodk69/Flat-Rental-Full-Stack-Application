import React from "react";
import { useGetOwnerByIdQuery } from "../api/ownerApi";
import DeleteOwner from "../components/DeleteOwner";

const OwnerProfilePage = ({ ownerId }) => {
  const { data: owner, isLoading, error } = useGetOwnerByIdQuery(ownerId);

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">{owner.name}</h2>
      <p>Email: {owner.email}</p>
      <p>Phone: {owner.phone}</p>

      <div className="mt-4">
        <DeleteOwner ownerId={owner.id} />
      </div>
    </div>
  );
};

export default OwnerProfilePage;
