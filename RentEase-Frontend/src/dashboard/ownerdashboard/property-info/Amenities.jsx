import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, BuildingOfficeIcon, HomeIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

export default function Amenities() {
  const [selectedFlatFurnishings, setSelectedFlatFurnishings] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const navigate = useNavigate();

  //Update progress on page load
  useEffect(() => {
    localStorage.setItem("progress", "Amenities");
  }, []);

  // List of Flat Furnishings
  const flatFurnishings = [
    "Dining Table", "Washing Machine", "Sofa", "Microwave", "Stove",
    "Fridge", "Water Purifier", "Gas Pipeline", "AC", "Bed",
    "TV", "Cupboard", "Geyser"
  ];

  // List of Society Amenities
  const amenitiesList = [
    "Lift", "CCTV", "Gym", "Garden", "Kids Area",
    "Sports", "Swimming Pool", "Intercom", "Gated Community", "Club House",
    "Community Hall", "Regular Water Supply", "Power Backup", "Pet Allowed"
  ];

  // Handle Selection for Furnishings & Amenities
  const toggleSelection = (item, stateSetter, state) => {
    if (state.includes(item)) {
      stateSetter(state.filter((i) => i !== item));
    } else {
      stateSetter([...state, item]);
    }
  };

  // Handle Continue Button Click
  const handleContinue = () => {
    localStorage.setItem("selectedFlatFurnishings", JSON.stringify(selectedFlatFurnishings));
    localStorage.setItem("selectedAmenities", JSON.stringify(selectedAmenities));
    localStorage.setItem("progress", "Verify");
    navigate("/owner/verify");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress step={5} />

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Add Amenities</h2>

            {/* Flat Furnishings */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Flat Furnishings</h3>
              <div className="grid grid-cols-3 gap-4">
                {flatFurnishings.map((item) => (
                  <button
                    key={item}
                    className={`p-4 rounded-lg border text-lg flex justify-between items-center transition ${
                      selectedFlatFurnishings.includes(item)
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleSelection(item, setSelectedFlatFurnishings, selectedFlatFurnishings)}
                  >
                    {item} {selectedFlatFurnishings.includes(item) && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Society Amenities */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Society Amenities</h3>
              <div className="grid grid-cols-3 gap-4">
                {amenitiesList.map((amenity) => (
                  <button
                    key={amenity}
                    className={`p-4 rounded-lg border text-lg flex justify-between items-center transition ${
                      selectedAmenities.includes(amenity)
                        ? "bg-purple-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => toggleSelection(amenity, setSelectedAmenities, selectedAmenities)}
                  >
                    {amenity} {selectedAmenities.includes(amenity) && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-green-600 hover:scale-105 shadow-md"
            >
              Continue to Verification
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
