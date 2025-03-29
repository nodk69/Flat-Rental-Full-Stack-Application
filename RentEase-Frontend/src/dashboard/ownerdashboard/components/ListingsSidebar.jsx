import { useState } from "react";

const ListingsSidebar = ({ onCategoryChange }) => {
  const [selected, setSelected] = useState("buy");

  const handleCategoryChange = (category) => {
    setSelected(category);
    onCategoryChange(category);
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-lg font-bold mb-2">Show</h2>
      <div className="flex flex-col space-y-2 mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="propertyType"
            checked={selected === "buy"}
            onChange={() => handleCategoryChange("buy")}
          />
          <span>Residential Properties</span>
        </label>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name="propertyType"
            checked={selected === "commercial"}
            onChange={() => handleCategoryChange("commercial")}
          />
          <span>Commercial Properties</span>
        </label>
      </div>
      <h3 className="text-sm font-bold mb-2">Sub-Category</h3>
      <ul className="space-y-2">
        <li className="text-purple-700 cursor-pointer">Buy (0)</li>
        <li className="text-gray-600 cursor-pointer">Rent (0)</li>
        <li className="text-gray-600 cursor-pointer">PG (0)</li>
      </ul>
    </div>
  );
};

export default ListingsSidebar;
