import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDashboard from "../dashboard/admindashboard/pages/AdminDashboard";
import ReportsComplaints from "../dashboard/admindashboard/pages/ReportsComplaints";
import Analytics from "../dashboard/admindashboard/pages/Analytics";
import Settings from "../dashboard/admindashboard/pages/Settings";
import UserManagement from "../dashboard/admindashboard/pages/UserManagement";
import VerificationRequests from "../dashboard/admindashboard/pages/VerificationRequests";
import ManageProperties from "../dashboard/admindashboard/pages/ManageProperties";

function AdminRoutes() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
          headers: {
            "Accept": "application/json",
          },
        });

        if (response.status === 401) {
          console.warn("User not authenticated, redirecting to login...");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log("🔍 Auth Check Response:", data);

        if (data.authenticated && (data.role === "ADMIN" || data.role === "ROLE_ADMIN")) {
          setIsAuthenticated(true);
          setRole("ADMIN");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <p className="text-center">Checking authentication...</p>;

  if (!isAuthenticated || role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return (
  <Routes location={location}>
    <Route path="/dashboard" element={<AdminDashboard />} /> {/* ✅ FIXED PATH */}
    <Route path="/reports" element={<ReportsComplaints />} />
    <Route path="/analytics" element={<Analytics />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/users" element={<UserManagement />} />
    <Route path="/verifications" element={<VerificationRequests />} />
    <Route path="/properties" element={<ManageProperties />} />
  </Routes>
);

}

export default AdminRoutes;
