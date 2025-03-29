import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResult from "./SearchResult";
import FeaturedProperties from "../components/FeaturedProperties";

const SearchBar = () => {
  const telanganaCities = [
    "Madhapur", "Gachibowli", "Kondapur", "Manikonda", "Kukatpally",
    "Nallagandla", "Bachupally", "Tellapur", "Nizampet", "Miyapur",
    "Begumpet", "Himayatnagar", "Attapur", "Sainikpuri", "Alkapoor Township"
  ];

  const defaultSearch = {
    location: "",
    bhk: "",
    furnishingStatus: "",
    listedBy: "",
    propertyType: "",
    rentAmount: "",
  };

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(defaultSearch);
  const [resultData, setResultData] = useState({ flats: [], filters: {} });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const dropdownRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  //Populate state from URL on first mount
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const restoredFilters = {
      location: params.location || "",
      bhk: params.bhk || "",
      furnishingStatus: params.furnishingStatus || "",
      listedBy: params.listedBy || "",
      propertyType: params.propertyType || "",
      rentAmount: params.rentAmount || "",
    };
    setSearch(restoredFilters);
  }, []);

  //Sync state to URL whenever it changes
  useEffect(() => {
    const filtered = Object.entries(search).filter(([_, v]) => v !== "");
    const queryObject = Object.fromEntries(filtered);
    setSearchParams(queryObject);
  }, [search]);

  // Fetch filtered data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredSearch = Object.fromEntries(
          Object.entries(search).filter(([_, value]) => value !== "")
        );

        // Convert BHK to integer if present
        const bhkValue = filteredSearch.bhk ? `${filteredSearch.bhk}BHK` : null; //Ensuring BHK is sent as a string

        // Map frontend filter names to backend parameter names
        const backendParams = {
          city: filteredSearch.location || null,
          // locality: filteredSearch.location || null,
          // bhk: filteredSearch.bhk || null,
          bhk: bhkValue,
          minRent: filteredSearch.rentAmount ? 0 : null, // Ensure minRent is 0 if maxRent is provided
          maxRent: filteredSearch.rentAmount || null,
          furnishType: filteredSearch.furnishingStatus || null,
          propertyType: filteredSearch.propertyType || null,
          listedBy: filteredSearch.listedBy || null,
        };        

        console.log("Filters being sent to API:", backendParams); 

        const response = await axios.get("http://localhost:8080/flats/search", {
          params: backendParams,
          withCredentials: true, 
        });

        setResultData({
          flats: response.data,
          filters: filteredSearch,
        });

        setFiltersApplied(true);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    const isAnyFilterApplied = Object.values(search).some((value) => value !== "");

    if (isAnyFilterApplied) {
      fetchData();
    } else {
      setResultData({ flats: [], filters: {} });
      setFiltersApplied(false);
    }
  }, [search]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [name]: name === "bhk" || name === "rentAmount" ? (value ? parseInt(value, 10) : "") : value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4">
        {/* Location Dropdown */}
        <div className="relative flex-grow" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 border rounded-lg w-full text-left flex justify-between items-center"
          >
            {search.location || "Select Location"}
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded-lg shadow-lg">
              <li
                onClick={() => {
                  setSearch((prev) => ({ ...prev, location: "" }));
                  setIsOpen(false);
                }}
                className="p-2 cursor-pointer hover:bg-gray-100 font-semibold text-gray-600"
              >
                Select Location
              </li>

              {telanganaCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSearch((prev) => ({ ...prev, location: city }));
                    setIsOpen(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Other Dropdowns */}
        {[
          {
            name: "bhk",
            options: [
              { value: "", label: "BHK Type" },
              { value: "1", label: "1 BHK" },
              { value: "2", label: "2 BHK" },
              { value: "3", label: "3 BHK" },
              { value: "4", label: "4 BHK" },
            ],
          },
          {
            name: "rentAmount",
            options: [
              { value: "", label: "Price Range" },
              { value: "10000", label: "₹0 - ₹10,000" },
              { value: "20000", label: "₹10,001 - ₹20,000" },
              { value: "50000", label: "₹20,001 - ₹50,000" },
              { value: "60000", label: "₹50,000+" },
            ],
          },
          {
            name: "furnishingStatus",
            options: [
              { value: "", label: "Furnishing Status" },
              { value: "Fully Furnished", label: "Fully Furnished" },
              { value: "Semi Furnished", label: "Semi-Furnished" },
              { value: "Unfurnished", label: "Unfurnished" },
            ],
          },
          {
            name: "listedBy",
            options: [
              { value: "", label: "Listed By" },
              { value: "LandLord", label: "Owner" },
              { value: "Broker", label: "Broker" },
              { value: "Builder", label: "Builder" },
            ],
          },
          {
            name: "propertyType",
            options: [
              { value: "", label: "Property Type" },
              { value: "Apartment", label: "Apartment" },
              { value: "House", label: "House/Villa" },
              { value: "PG", label: "PG/Hostel" },
              { value: "Commercial", label: "Commercial Space" },
              { value: "Land", label: "Land/Plot" },
              { value: "Warehouse", label: "Warehouse" },
              { value: "Studio", label: "Studio" },
            ],
          },
        ].map(({ name, options }) => (
          <select
            key={name}
            name={name}
            value={search[name] || ""}
            onChange={handleChange}
            className="p-2 border rounded-lg flex-grow max-h-48 overflow-y-auto"
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Render result */}
      {filtersApplied ? (
        <SearchResult filters={resultData.filters} flats={resultData.flats} />
      ) : (
        <FeaturedProperties />
      )}
    </div>
  );
};

export default SearchBar;