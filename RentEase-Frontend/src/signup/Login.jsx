import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveRole } from "../utils/authUtils";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "TENANT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [redirectRole, setRedirectRole] = useState(null); //Track the role
  const navigate = useNavigate();

  //Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //Handle Login Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials. Please try again.");
      }

      const result = await response.json();
      console.log("Login Response:", result); //lOG RESPONSE

      if (!result.role) {
        throw new Error("Role not found in response.");
      }

      const normalizedRole = result.role.replace("ROLE_", "");
      console.log("Normalized Role:", normalizedRole); //CHECK ROLE
      saveRole(normalizedRole);

      setRedirectRole(normalizedRole); //Set role for redirection
    } catch (error) {
      console.error("🔺 Login Error:", error);
      setError(error.message);
    }

    setLoading(false);
  };

  //Redirect to the correct dashboard when `redirectRole` changes
  useEffect(() => {
    if (redirectRole) {
      console.log("🔹 Navigating to:", redirectRole);
      
      // Delay navigation slightly to ensure session loads
      setTimeout(() => {
        switch (redirectRole) {
          case "OWNER":
            navigate("/owner/dashboard", { replace: true });
            break;
          case "TENANT":
            navigate("/", { replace: true });
            break;
          case "ADMIN":
            navigate("/admin/dashboard", { replace: true });
            break;
          default:
            navigate("/login");
        }
      }, 500); // Small delay to allow session persistence
    }
  }, [redirectRole, navigate]);
  
  //Handle OAuth Login
  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E293B]">
      <div className="bg-[#334155] p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Login</h2>

        {/*Role Selection */}
        <div className="flex bg-[#475569] rounded-lg p-1 mb-6">
          {["TENANT", "OWNER", "ADMIN"].map((role) => (
            <button
              key={role}
              className={`w-1/3 py-3 rounded-md font-semibold text-sm transition ${
                formData.role === role ? "bg-teal-400 text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => setFormData({ ...formData, role })}
            >
              {role}
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-300 block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-[#475569] text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-gray-300 block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-[#475569] text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500"
            }`}
          >
            {loading ? "Processing..." : "Login"}
          </button>
        </form>

        {/* OAuth Login (Google + GitHub Inline) */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => handleOAuthLogin("google")}
            className="flex items-center justify-center w-1/2 bg-white text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-2xl mr-2" /> Google
          </button>
          <button
            onClick={() => handleOAuthLogin("github")}
            className="flex items-center justify-center w-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FaGithub className="text-2xl mr-2" /> GitHub
          </button>
        </div>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-teal-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
