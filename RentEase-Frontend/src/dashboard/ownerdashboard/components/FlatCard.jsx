import React, { useState } from "react";
import { useUpdateFlatStatusMutation, useDeleteFlatMutation } from "../../../apis/ownerApi";
import { useNavigate } from "react-router-dom";

const FlatCard = ({ flat, onFlatDeleted }) => {
  const [updateFlatStatus] = useUpdateFlatStatusMutation();
  const [deleteFlat] = useDeleteFlatMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const handleStatusUpdate = async () => {
    try {
      const newStatus = flat.status === "AVAILABLE" ? "OCCUPIED" : "AVAILABLE";
      await updateFlatStatus({ flatId: flat.id, status: newStatus });
    } catch (error) {
      console.error("Error updating flat status:", error);
    }
  };

  const handleDeleteFlat = async () => {
    try {
      await deleteFlat(flat.id); //Pass only the ID
      setShowDeleteModal(false); //Close modal after deletion
      onFlatDeleted(); //Refresh flat list after deletion
    } catch (error) {
      console.error("Error deleting flat:", error);
    }
  };

  return (
    <>
      {/* Flat Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
        {/* Image */}
        <img
          src={flat.imageUrls?.[0] || "/images/default-property.jpg"}
          alt={flat.propertyDescription || "Property image"}
          className="w-full h-56 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          {/* Price & Status */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-2xl font-bold text-gray-800">₹{flat.monthlyRent}</span>
            <span className={`px-3 py-1 text-white text-sm font-semibold rounded-full ${flat.status === "AVAILABLE" ? "bg-green-500" : "bg-red-500"}`}>
              {flat.status}
            </span>
          </div>

          {/* Property Details */}
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{flat.propertyType} - {flat.bhk}</h3>
          <p className="text-gray-600 text-sm"><strong>📍 Location:</strong> {flat.locality}, {flat.city}</p>
          <p className="text-gray-600 text-sm"><strong>🛋 Furnishing:</strong> {flat.furnishType}</p>
          <p className="text-gray-600 text-sm"><strong>👤 Listed By:</strong> {flat.listedBy}</p>
          <p className="text-gray-600 text-sm"><strong>📞 Contact:</strong> {flat.phoneNumber || "N/A"}</p>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col space-y-2">
            <button
              onClick={() => navigate(`/owner/flats/${flat.id}`)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              View Details
            </button>
            <button
              onClick={handleStatusUpdate}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              {flat.status === "AVAILABLE" ? "Mark as Occupied" : "Mark as Available"}
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-amber-300 p-6 rounded-lg shadow-xl border border-gray-300 w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this property? This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFlat}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default FlatCard;
