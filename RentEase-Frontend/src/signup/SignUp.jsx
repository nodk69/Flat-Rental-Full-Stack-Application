import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa"; // GitHub & Password Icons

const SignUp = () => {
  const navigate = useNavigate();

  const initialFormState = {
    email: "",
    password: "",
    confirmPassword: "",
    role: "TENANT", // Default role selection
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedRole, setSelectedRole] = useState("TENANT"); // Track selected role separately
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  //Clear form data on mount (prevents auto-fill)
  useEffect(() => {
    setFormData(initialFormState);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "confirmPassword") {
      setPasswordMismatch(value !== formData.password);
    }
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    console.log("Selected role:", role); //Debug 
    setFormData({ ...formData, role }); //Update role in form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordMismatch) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...formData, role: selectedRole }), //Pass correct role
      });

      if (response.ok) {
        setFormData(initialFormState); //Clear form after successful signup
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Signup failed. Try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1E293B]">
      <div className="bg-[#334155] p-10 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Role Selection Toggle */}
        <div className="flex bg-[#475569] rounded-lg p-1 mb-6">
          {["TENANT", "OWNER", "ADMIN"].map((role) => (
            <button
              key={role}
              className={`w-1/3 py-3 rounded-md font-semibold text-sm transition ${
                selectedRole === role ? "bg-teal-400 text-white" : "text-gray-300 hover:text-white"
              }`}
              onClick={() => handleRoleSelection(role)}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Error Display */}
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
          <div>
            <label className="text-gray-300 block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="new-email"
              className="w-full p-3 rounded-lg bg-[#475569] text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter email"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <label className="text-gray-300 block mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full p-3 rounded-lg bg-[#475569] text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-12 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password Input with Toggle */}
          <div className="relative">
            <label className="text-gray-300 block mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full p-3 rounded-lg bg-[#475569] text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Re-enter password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-12 text-gray-400 hover:text-gray-200"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Password Mismatch Warning */}
          {passwordMismatch && <p className="text-red-400 text-sm mt-1">Passwords do not match.</p>}

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading || passwordMismatch}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-teal-400 hover:bg-teal-500"
            }`}
          >
            {loading ? "Processing..." : "Sign Up"}
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
      </div>
    </div>
  );
};

export default SignUp;
