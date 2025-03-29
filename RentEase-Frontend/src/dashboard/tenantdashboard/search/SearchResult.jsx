import React from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ flats, filters }) => {
  console.log("Flats Data:", flats); //Debugging

  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          {flats?.length > 0 ? "Search Results" : "No Results Found"}
        </h2>

        {flats.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No flats found matching your criteria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {flats.map((flat) => (
              <div key={flat.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
                
                {/*Image Section */}
                <div className="relative">
                  <img
                    src={
                      Array.isArray(flat.imageUrls) && flat.imageUrls.length > 0
                        ? flat.imageUrls[0] //Use first image from array
                        : "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
                    }
                    alt="Flat"
                    className="w-full h-56 object-cover"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 text-sm font-semibold rounded-full ${
                    flat.status === "AVAILABLE" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}>
                    {flat.status === "AVAILABLE" ? "Available" : "Not Available"}
                  </span>
                </div>

                {/*Property Details */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-gray-800">
                      ₹{flat.monthlyRent?.toLocaleString() || "N/A"}
                    </span>
                    <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                      {flat.furnishType || "Not Specified"} {/*Fixed: Correct field name */}
                    </span>
                  </div>

                  <p className="text-gray-700">
                    <span className="font-semibold">📍 Location:</span>{" "}
                    {flat.city || "Not specified"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">🏠 Type:</span>{" "}
                    {flat.bhk ? `${flat.bhk}` : "BHK N/A"} |{" "}
                    {flat.propertyType || "Type N/A"}
                  </p>

                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">📢 Listed By:</span>{" "}
                    {flat.listedBy || "Not specified"}
                  </p>

                  {/* Phone Number for Contact */}
                  <p className="text-gray-600 mt-1">
                    <span className="font-semibold">📞 Contact:</span>{" "}
                    {flat.phoneNumber ? flat.phoneNumber : "N/A"}
                  </p>

                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition duration-300 ease-in-out transform hover:scale-105 mt-5 shadow-md hover:shadow-lg"
                    onClick={() =>
                      navigate(`/property/${flat.id}`, { state: { property: flat } })
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
