import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const FeaturedProperties = () => {
  const { featuredProperties } = useContext(AppContext);

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Featured Properties
        </h2>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              {/* Image */}
              <img
                src={property.image_url}
                alt={property.description}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                {/* Price with Badge */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold text-gray-800">
                    {property.price}
                  </span>
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                    Featured
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mb-4">
                  {property.description}
                </p>

                {/* Call-to-Action Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;