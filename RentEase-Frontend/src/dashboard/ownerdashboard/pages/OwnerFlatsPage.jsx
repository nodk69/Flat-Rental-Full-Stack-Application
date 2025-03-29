import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FlatCard from "../components/FlatCard";
import { useGetFlatsByOwnerQuery } from "../../../apis/ownerApi";

const OwnerFlatsPage = () => {
  const { data: flats, isLoading, error, refetch } = useGetFlatsByOwnerQuery();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            {flats?.length > 0 ? "Your Listed Properties" : "No Listings Found"}
          </h2>

          <div className="bg-white p-8 shadow-lg rounded-lg">
            {isLoading ? (
              <p className="text-center text-gray-600">Loading flats...</p>
            ) : error ? (
              <p className="text-center text-red-500">
                You have not uploaded any property {error.message}
              </p>
            ) : flats && flats.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                {flats.map((flat) => (
                  <FlatCard key={flat.id} flat={flat} onFlatDeleted={refetch} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/images/no-listings.svg"
                  alt="No listings"
                  className="w-40 mb-4"
                />
                <p className="text-gray-600">No listings found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OwnerFlatsPage;
