import React from "react";
import FlatCard from "./FlatCard";

const OwnerFlats = ({ flats, refetch }) => {
  if (!flats || flats.length === 0) {
    return <p className="text-center text-gray-600">No flats found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flats.map((flat) => (
        <FlatCard key={flat.id} flat={flat} onFlatDeleted={refetch} />
      ))}
    </div>
  );
};

export default OwnerFlats;
