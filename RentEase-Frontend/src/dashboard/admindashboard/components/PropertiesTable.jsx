import { useState } from "react";

const PropertiesTable = () => {
  const [properties] = useState([
    { id: 1, name: "Luxury Villa", owner: "John Doe", status: "Pending" },
    { id: 2, name: "City Apartment", owner: "Jane Smith", status: "Verified" },
  ]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Manage Properties</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-3">ID</th>
            <th className="p-3">Property</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b">
              <td className="p-3">{property.id}</td>
              <td className="p-3">{property.name}</td>
              <td className="p-3">{property.owner}</td>
              <td className={`p-3 ${property.status === "Verified" ? "text-green-500" : "text-red-500"}`}>
                {property.status}
              </td>
              <td className="p-3">
                <button className="bg-blue-500 text-white px-3 py-1 rounded-md">Verify</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesTable;
