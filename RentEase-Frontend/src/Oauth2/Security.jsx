// Security.jsx
import React from "react";

const googleLogin = (role) => {
  window.location.href = `http://localhost:8080/oauth2/authorization/google?role=${role}`;
};

const Security = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Welcome to Property Rental Application
      </h2>
      <div className="space-x-4">
        <button
          onClick={() => googleLogin("tenant")}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
        >
          Login as Tenant with Google
        </button>
        <button
          onClick={() => googleLogin("landlord")}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow"
        >
          Login as Landlord with Google
        </button>
      </div>
    </div>
  );
};

export default Security;
