import { useSearchParams, useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const handleRoleSelection = async (role) => {
    try {
      const response = await fetch("http://localhost:8080/auth/set-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, role }),
      });

      if (!response.ok) throw new Error("Failed to set role");

      navigate(`/oauth2/redirect?role=${role}`);
    } catch (error) {
      console.error("Role selection failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-6">Select Your Role</h2>
        
        {/* Role Selection Buttons */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleRoleSelection("TENANT")}
            className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Tenant
          </button>
          
          <button
            onClick={() => handleRoleSelection("OWNER")}
            className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Owner
          </button>
          
          <button
            onClick={() => handleRoleSelection("ADMIN")}
            className="w-full px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105 shadow-md"
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
