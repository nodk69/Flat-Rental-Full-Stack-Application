import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BuildingOfficeIcon, HomeIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/Navbar";
import SidebarProgress from "../components/SidebarProgress"; 

export default function BasicDetails() {
  const [propertyType, setPropertyType] = useState("Residential");
  const [listingType, setListingType] = useState("Rent");
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  //Progress tracking
  useEffect(() => {
    localStorage.setItem("progress", "Basic Details");
  }, []);

  const cityList = [
    "Madhapur", "Gachibowli", "Kondapur", "Manikonda", "Kukatpally",
    "Nallagandla", "Bachupally", "Tellapur", "Nizampet", "Miyapur",
    "Begumpet", "Himayatnagar", "Attapur", "Sainikpuri", "Alkapoor Township"
  ];

  const handleCityChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setSelectedIndex(-1);

    if (value.trim() === "") {
      setFilteredCities([]);
    } else {
      const lowerValue = value.toLowerCase();
      const filtered = cityList
        .filter((c) => c.toLowerCase().includes(lowerValue))
        .sort((a, b) => {
          if (a.toLowerCase().startsWith(lowerValue) && !b.toLowerCase().startsWith(lowerValue)) return -1;
          if (!a.toLowerCase().startsWith(lowerValue) && b.toLowerCase().startsWith(lowerValue)) return 1;
          return a.localeCompare(b);
        });

      setFilteredCities(filtered);
    }
  };

  const handleSelectCity = (selectedCity) => {
    setCity(selectedCity);
    setFilteredCities([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (filteredCities.length === 0) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredCities.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      handleSelectCity(filteredCities[selectedIndex]);
    } else if (e.key === "Escape") {
      setFilteredCities([]);
      setSelectedIndex(-1);
    }
  };

  const handleNext = () => {
    const basicDetails = { propertyType, listingType, city };
    localStorage.setItem("basicDetails", JSON.stringify(basicDetails));
    localStorage.setItem("progress", "Property Details"); 
    navigate("/owner/property-details"); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress /> 

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Add Basic Details</h2>

            {/* Property Type Selection */}
            <div>
              <label className="block font-medium">Property Type</label>
              <div className="mt-2 flex space-x-4">
                {[
                  { name: "Residential", icon: <HomeIcon className="w-5 h-5 inline-block mr-2" /> },
                  { name: "Commercial", icon: <BuildingOfficeIcon className="w-5 h-5 inline-block mr-2" /> },
                ].map(({ name, icon }) => (
                  <button
                    key={name}
                    className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all duration-200 ${
                      propertyType === name
                        ? "bg-purple-500 text-white shadow-lg scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => {
                      setPropertyType(name);
                      setListingType("Rent");
                    }}
                  >
                    {icon} {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Looking to */}
            <div className="mt-4">
              <label className="block font-medium">Looking to</label>
              <div className="mt-2 flex space-x-4">
                {["Rent", "Sell"]
                  .concat(propertyType === "Residential" ? ["PG/Co-living"] : [])
                  .map((option) => (
                    <button
                      key={option}
                      className={`px-4 py-2 rounded-md transition-all duration-200 ${
                        listingType === option
                          ? "bg-purple-500 text-white shadow-lg scale-105"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setListingType(option)}
                    >
                      {option}
                    </button>
                  ))}
              </div>
            </div>

            {/* City Input with Autocomplete & Keyboard Navigation */}
            <div className="mt-4 relative city-dropdown">
              <label className="block font-medium">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Search City"
                value={city}
                onChange={handleCityChange}
                onKeyDown={handleKeyDown}
              />
              {/* Dropdown for city suggestions */}
              {filteredCities.length > 0 && (
                <ul className="absolute w-full bg-white border mt-1 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredCities.map((c, index) => (
                    <li
                      key={c}
                      className={`p-2 cursor-pointer transition-all ${
                        selectedIndex === index
                          ? "bg-purple-500 text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handleSelectCity(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-green-500 text-white py-2 rounded-md transition-all hover:bg-green-600 hover:scale-105 shadow-md"
            >
              Next, add property details
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
