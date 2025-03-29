import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, PhoneIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import SidebarProgress from "../components/SidebarProgress";
import Navbar from "../components/Navbar";

export default function Verify() {
  const [visitDate, setVisitDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    const verificationData = { visitDate, phoneNumber };
    localStorage.setItem("verification", JSON.stringify(verificationData));
    navigate("/owner/preview"); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex">
      <SidebarProgress step={6} />

        <main className="flex-1 p-10">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Verify Your Property</h2>

            {/* How It Works */}
            <div className="bg-gray-100 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-center text-gray-800">How It Works</h3>
              <div className="flex justify-between items-center text-center mt-4">
                <div>
                  <img src="/visit-icon.png" alt="Visit Property" className="w-12 h-12 mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">Visit the property</p>
                </div>
                <span className="text-xl">➡</span>
                <div>
                  <img src="/link-icon.png" alt="Open Link" className="w-12 h-12 mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">Open link shared on phone</p>
                </div>
                <span className="text-xl">➡</span>
                <div>
                  <img src="/photo-upload.png" alt="Submit Photos" className="w-12 h-12 mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">Click photos & submit</p>
                </div>
              </div>
              <a href="#" className="text-purple-600 underline text-sm text-center block mt-4">
                Why should you verify?
              </a>
            </div>

            {/* Verification Options */}
            <div className="grid grid-cols-2 gap-6">
              {/* Visit Property Option */}
              <div className="border p-6 rounded-lg bg-gray-50 shadow-sm">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-600" /> I will visit the property
                </h3>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md mt-3 text-gray-700"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </div>

              {/* Share Link Option */}
              <div className="border p-6 rounded-lg bg-gray-50 shadow-sm">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-gray-600" /> Share link with someone else
                </h3>
                <input
                  type="tel"
                  className="w-full p-2 border rounded-md mt-3 text-gray-700"
                  placeholder="Enter Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white text-lg rounded-md font-semibold transition hover:bg-green-600"
              >
                <CheckCircleIcon className="w-5 h-5 text-white" />
                Continue to Preview
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
