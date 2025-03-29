import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetFlatByIdQuery } from "../../../apis/ownerApi";
import Header from "./Header";
import {
  MapPinIcon,
  HomeIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  ShieldCheckIcon,
  ClockIcon,
  ArchiveBoxIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useNotifyViewFlatMutation, useNotifySaveFlatMutation } from "../../../apis/notificationApi";

const FlatDetails = () => {
  const { id } = useParams();
  const { data: flat, isLoading, error } = useGetFlatByIdQuery(id);
  const [notifyViewFlat] = useNotifyViewFlatMutation();
  const [notifySaveFlat] = useNotifySaveFlatMutation();

  //Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);

    if (flat?.id) {
      notifyViewFlat({ flatId: flat.id })
        .unwrap()
        .then(() => console.log("Owner notified about property view"))
        .catch((err) => console.error("Notification error:", err));
    }
  }, [flat, notifyViewFlat]);

  if (isLoading) return <div className="text-center text-lg font-semibold py-10">Loading property details...</div>;
  if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
  if (!flat) return <div className="text-center text-gray-500 py-10">Property not found.</div>;

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
    { label: "Description", value: flat.propertyDescription, icon: InformationCircleIcon },
    { label: "Contact", value: `${flat.ownerName} (${flat.phoneNumber})`, icon: PhoneIcon },
    { label: "Listed By", value: flat.listedBy, icon: UserIcon },
    { label: "Visit Date", value: flat.visitDate, icon: CalendarIcon },
    { label: "Status", value: flat.status, icon: ShieldCheckIcon },
    { label: "Legal Documents", value: flat.selectedLegal?.join(", ") || "N/A", icon: InformationCircleIcon },
    { label: "Amenities", value: flat.selectedAmenities?.join(", ") || "N/A", icon: InformationCircleIcon },
    { label: "Furnishings", value: flat.selectedFlatFurnishings?.join(", ") || "N/A", icon: BuildingOfficeIcon },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="max-w-6xl mx-auto p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold">{flat.bhk} BHK {flat.propertyType}</h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-lg">
          {propertyDetails.map(({ label, value, icon: Icon }, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon className="w-6 h-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
                <p className="text-gray-600">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
            📞 Contact Owner
          </button>
          <div className="flex gap-3 w-full sm:w-auto justify-end">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition shadow-sm"
              onClick={() =>
                notifySaveFlat({ flatId: flat.id })
                  .unwrap()
                  .then(() => console.log("Flat saved successfully"))
                  .catch((err) => console.error("Save error:", err))
              }
            >
              💾 Save
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition shadow-sm">
              🔄 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatDetails;
