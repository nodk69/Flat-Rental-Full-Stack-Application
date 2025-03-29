import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeModernIcon, BuildingOfficeIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

const PropertyDetails = () => {
  const navigate = useNavigate();

  // State for form fields
  const [propertyType, setPropertyType] = useState("");
  const [locality, setLocality] = useState("");
  const [bhk, setBhk] = useState("");
  const [furnishType, setFurnishType] = useState("");

  // Options
  const propertyTypes = [
    { name: "Apartment", icon: <HomeModernIcon className="w-5 h-5 inline-block mr-2" /> },
    { name: "Independent Floor", icon: <BuildingOfficeIcon className="w-5 h-5 inline-block mr-2" /> },
    { name: "Independent House", icon: <HomeModernIcon className="w-5 h-5 inline-block mr-2" /> },
    { name: "Villa", icon: <BuildingOfficeIcon className="w-5 h-5 inline-block mr-2" /> },
    { name: "Farm House", icon: <HomeModernIcon className="w-5 h-5 inline-block mr-2" /> },
  ];
  const bhkOptions = ["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "3+ BHK"];
  const furnishOptions = ["Fully Furnished", "Semi Furnished", "Unfurnished"];

  //Update Progress on Page Load
  useEffect(() => {
    localStorage.setItem("progress", "Property Details");
  }, []);

  // Handle Next Button Click
  const handleNext = () => {
    const propertyData = { propertyType, locality, bhk, furnishType };
    localStorage.setItem("propertyDetails", JSON.stringify(propertyData));
    localStorage.setItem("progress", "Price Details");
    navigate("/owner/price");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress step={1} /> 

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Add Property Details</h2>

            {/* Property Type Selection */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2 font-medium">Property Type</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {propertyTypes.map(({ name, icon }) => (
                  <button
                    key={name}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                      propertyType === name
                        ? "bg-purple-500 text-white shadow-md scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setPropertyType(name)}
                  >
                    {icon} {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Locality Input */}
            <div className="mb-6">
              <label className="text-gray-600 font-medium">Locality</label>
              <input
                type="text"
                placeholder="Enter locality"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full p-3 border rounded-md mt-2 focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* BHK Selection */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2 font-medium">BHK</p>
              <div className="grid grid-cols-3 gap-4">
                {bhkOptions.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      bhk === option
                        ? "bg-purple-500 text-white shadow-md scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setBhk(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Furnish Type */}
            <div className="mb-6">
              <p className="text-gray-600 mb-2 font-medium">Furnish Type</p>
              <div className="flex space-x-4">
                {furnishOptions.map((option) => (
                  <button
                    key={option}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      furnishType === option
                        ? "bg-purple-500 text-white shadow-md scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setFurnishType(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-green-500 text-white py-3 rounded-md transition-all hover:bg-green-600 hover:scale-105 shadow-md"
            >
              Next, add price details
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PropertyDetails;
