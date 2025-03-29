import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetFlatByIdQuery, useUpdateFlatMutation } from "../../../apis/ownerApi";
import Navbar from "./Navbar";
import {
  PencilSquareIcon,
  CheckIcon,
  XMarkIcon,
  MapPinIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  DocumentCheckIcon,
  ArchiveBoxIcon,
  TruckIcon,
  ClockIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const FlatDetails = () => {
  const { id } = useParams();
  const { data: flat, isLoading, error } = useGetFlatByIdQuery(id);
  const [updateFlat] = useUpdateFlatMutation();
  const [editMode, setEditMode] = useState(false);
  const [updatedFlat, setUpdatedFlat] = useState({});

  if (isLoading) return <div className="text-center text-lg font-semibold py-10">Loading property details...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
  if (!flat) return <div className="text-center text-gray-500 py-10">Property not found.</div>;

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedFlat({
      ...updatedFlat,
      [e.target.name]: e.target.value,
    });
  };

  //Save updated flat details
  const handleUpdate = async () => {
    try {
      await updateFlat({ id, flatDTO: updatedFlat });
      setEditMode(false);
    } catch (error) {
      console.error("Error updating flat:", error);
    }
  };

  //Mapping labels to Hero Icons dynamically
  const propertyDetails = [
    { label: "Location", value: `${flat.locality}, ${flat.city}`, icon: MapPinIcon },
    { label: "Property Type", value: `${flat.bhk} BHK | ${flat.propertyType}`, icon: HomeIcon },
    { label: "Listing Type", value: flat.listingType, icon: ClipboardDocumentCheckIcon },
    { label: "Furnishing", value: flat.furnishType, icon: BuildingOfficeIcon },
    { label: "Available From", value: flat.availableFrom, icon: CalendarIcon },
    { label: "Rent", value: `₹${flat.monthlyRent}`, icon: CurrencyRupeeIcon },
    { label: "Security Deposit", value: `₹${flat.securityDeposit}`, icon: ShieldCheckIcon },
    { label: "Age of Property", value: `${flat.ageOfProperty} years`, icon: ClockIcon },
    { label: "Bathrooms", value: flat.bathroom, icon: ArchiveBoxIcon },
    { label: "Balconies", value: flat.balcony, icon: ArchiveBoxIcon },
    { label: "Covered Parking", value: flat.coveredParking, icon: TruckIcon },
    { label: "Open Parking", value: flat.openParking, icon: TruckIcon },
    { label: "Description", value: flat.propertyDescription, icon: DocumentCheckIcon },
    { label: "Contact", value: `${flat.ownerName} (${flat.phoneNumber})`, icon: PhoneIcon },
    { label: "Listed By", value: flat.listedBy, icon: ArrowPathIcon },
    { label: "Visit Date", value: flat.visitDate, icon: CalendarIcon },
    { label: "Status", value: flat.status, icon: ShieldCheckIcon },
    // { label: "Owner ID", value: flat.ownerId, icon: UserIcon },
    { label: "Legal Documents", value: flat.selectedLegal?.join(", ") || "N/A", icon: DocumentCheckIcon },
    { label: "Amenities", value: flat.selectedAmenities?.join(", ") || "N/A", icon: InformationCircleIcon },
    { label: "Furnishings", value: flat.selectedFlatFurnishings?.join(", ") || "N/A", icon: BuildingOfficeIcon },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
        {/* Edit Button */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{flat.bhk} BHK {flat.propertyType}</h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {editMode ? (
              <>
                <XMarkIcon className="w-5 h-5" /> Cancel Edit
              </>
            ) : (
              <>
                <PencilSquareIcon className="w-5 h-5" /> Edit Property
              </>
            )}
          </button>
        </div>

        {/* Property Images */}
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg mb-6">
          <img
            src={flat.imageUrls?.[0] || "/images/default-property.jpg"}
            alt="Property"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-2xl" />
          <div className="absolute bottom-6 left-6 text-white">
            <p className="text-xl font-medium">₹{flat.monthlyRent} / month</p>
          </div>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
          {propertyDetails.map(({ label, value, icon: Icon }, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
                {editMode ? (
                  <input
                    type="text"
                    name={label.toLowerCase().replace(/[^a-z]/g, "")}
                    value={updatedFlat[label] || value}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md text-gray-700"
                  />
                ) : (
                  <p className="text-gray-600">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Update Button */}
        {editMode && (
          <button
            onClick={handleUpdate}
            className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <CheckIcon className="w-5 h-5" /> Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default FlatDetails;
