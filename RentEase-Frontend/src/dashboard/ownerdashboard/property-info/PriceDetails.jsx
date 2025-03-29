import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDaysIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

export default function PriceDetails() {
  const [monthlyRent, setMonthlyRent] = useState(localStorage.getItem("monthlyRent") || "");
  const [availableFrom, setAvailableFrom] = useState(localStorage.getItem("availableFrom") || "");
  const [securityDeposit, setSecurityDeposit] = useState(localStorage.getItem("securityDeposit") || "None");
  const navigate = useNavigate();

  //Update Progress on Page Load
  useEffect(() => {
    localStorage.setItem("progress", "Price Details");
  }, []);

  // Handle Next Button Click
  const handleNext = () => {
    const priceDetails = { monthlyRent, availableFrom, securityDeposit };
    localStorage.setItem("priceDetails", JSON.stringify(priceDetails));
    localStorage.setItem("progress", "Property Pictures"); 
    navigate("/owner/photos");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress step={2} /> 

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Add Price Details</h2>

            {/* Monthly Rent Input */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Monthly Rent</label>
              <div className="flex items-center border rounded-md p-3 mt-2">
                <CurrencyDollarIcon className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="number"
                  className="w-full text-lg outline-none"
                  placeholder="Enter monthly rent"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                />
              </div>
            </div>

            {/* Available From Date Picker */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Available From</label>
              <div className="flex items-center border rounded-md p-3 mt-2">
                <CalendarDaysIcon className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="date"
                  className="w-full text-lg outline-none"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </div>
            </div>

            {/* Security Deposit Selection */}
            <div className="mb-6">
              <label className="block font-medium text-gray-600">Security Deposit</label>
              <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                {["None", "1 month", "2 month", "Custom"].map((option) => (
                  <button
                    key={option}
                    className={`px-6 py-3 rounded-lg text-lg transition-all duration-200 ${
                      securityDeposit === option
                        ? "bg-purple-500 text-white shadow-md scale-105"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md"
                    }`}
                    onClick={() => setSecurityDeposit(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-green-500 text-white py-3 rounded-md transition-all hover:bg-green-600 hover:scale-105 shadow-md text-lg font-semibold"
            >
              Next, Add Property Pictures
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
