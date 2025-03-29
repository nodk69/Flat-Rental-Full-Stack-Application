import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HomeModernIcon, CheckIcon, DocumentCheckIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

export default function AdvancedDetails() {
  const [ageOfProperty, setAgeOfProperty] = useState("");
  const [bathroom, setBathroom] = useState(1);
  const [balcony, setBalcony] = useState(0);
  const [coveredParking, setCoveredParking] = useState(0);
  const [openParking, setOpenParking] = useState(0);
  const [selectedLegal, setSelectedLegal] = useState([]);
  const [propertyDescription, setPropertyDescription] = useState("");
  const navigate = useNavigate();

  //Update progress on page load
  useEffect(() => {
    localStorage.setItem("progress", "Advanced Details");
  }, []);

  //Handle Selection 
  const toggleSelection = (option, stateSetter, state) => {
    stateSetter(state === option ? "" : option);
  };

  // Handle Multi-Selection 
  const toggleMultiSelection = (option, stateSetter, state) => {
    if (state.includes(option)) {
      stateSetter(state.filter((item) => item !== option));
    } else {
      stateSetter([...state, option]);
    }
  };

  //Handle Next Button Click
  const handleNext = () => {
    const advancedDetails = {
      ageOfProperty,
      bathroom,
      balcony,
      coveredParking,
      openParking,
      selectedLegal,
      propertyDescription,
    };

    localStorage.setItem("advancedDetails", JSON.stringify(advancedDetails));
    localStorage.setItem("progress", "Amenities");
    navigate("/owner/amenities");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress step={4} />

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Add Advanced Details</h2>

            {/* Age of Property */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Age of Property (in years)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-md mt-2 text-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Enter property age"
                value={ageOfProperty}
                onChange={(e) => setAgeOfProperty(e.target.value)}
              />
            </div>

            {/* Bathroom Selection */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Bathroom</label>
              <div className="flex space-x-4 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-lg text-lg transition flex items-center gap-2 ${
                      bathroom === num ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setBathroom(num)}
                  >
                    {num} {bathroom === num && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Balcony Selection */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Balcony</label>
              <div className="flex space-x-4 mt-2">
                {[0, 1, 2, 3].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-lg text-lg transition flex items-center gap-2 ${
                      balcony === num ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setBalcony(num)}
                  >
                    {num} {balcony === num && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Parking Selection */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Covered Parking</label>
              <div className="flex space-x-4 mt-2">
                {[0, 1, 2, 3, "3+"].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-lg text-lg transition flex items-center gap-2 ${
                      coveredParking === num ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setCoveredParking(num)}
                  >
                    {num} {coveredParking === num && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Legal Offers */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Legal Offers</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {[
                  { name: "Free Rental Agreement", icon: <DocumentCheckIcon className="w-5 h-5" /> },
                  { name: "Free Police Verification", icon: <HomeModernIcon className="w-5 h-5" /> },
                ].map(({ name, icon }) => (
                  <button
                    key={name}
                    className={`px-4 py-2 rounded-lg text-lg transition flex items-center gap-2 ${
                      selectedLegal.includes(name)
                        ? "bg-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => toggleMultiSelection(name, setSelectedLegal, selectedLegal)}
                  >
                    {icon} {name} {selectedLegal.includes(name) && <CheckIcon className="w-5 h-5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Description */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Property Description</label>
              <textarea
                className="w-full p-3 border rounded-md mt-2 text-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Tell us more about your property"
                value={propertyDescription}
                onChange={(e) => setPropertyDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-semibold transition hover:bg-green-600 hover:scale-105 shadow-md"
            >
              Next, Add Amenities
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
