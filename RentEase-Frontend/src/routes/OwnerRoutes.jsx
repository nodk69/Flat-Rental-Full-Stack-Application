import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Dashboard from "../dashboard/ownerdashboard/pages/OwnerDashboard";
import BasicDetails from "../dashboard/ownerdashboard/property-info/BasicDetails";
import PropertyDetails from "../dashboard/ownerdashboard/property-info/PropertyDetails";
import PriceDetails from "../dashboard/ownerdashboard/property-info/PriceDetails";
import PropertyPictures from "../dashboard/ownerdashboard/property-info/PropertyPictures";
import AdvancedDetails from "../dashboard/ownerdashboard/property-info/AdvancedDetails";
import Amenities from "../dashboard/ownerdashboard/property-info/Amenities";
import Verify from "../dashboard/ownerdashboard/property-info/Verify";
import Preview from "../dashboard/ownerdashboard/property-info/Preview";
import SubmissionSuccess from "../dashboard/ownerdashboard/property-info/SubmissionSuccess";
import OwnerFlatsPage from "../dashboard/ownerdashboard/pages/OwnerFLatsPage";
import FlatDetails from "../dashboard/ownerdashboard/components/FlatDetails";

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 },
};

function OwnerRoutes() {
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
          headers: { Accept: "application/json" },
        });

        if (response.status === 401) {
          console.warn("User not authenticated, redirecting to login...");
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response format (not JSON)");
        }

        const data = await response.json();
        console.log("🔍 Auth Check Response:", data);
        if (data.authenticated && data.role) {
          const normalizedRole = data.role.replace("ROLE_", ""); //Normalize role
          setIsAuthenticated(true);
          setRole(normalizedRole);
        } else {
          console.warn("⚠️ Role missing in response!");
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

  if (!isAuthenticated || role !== "OWNER") {
    return <Navigate to="/login" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} {...pageTransition}>
        <Routes location={location}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/listings" element={<OwnerFlatsPage />} />
          <Route path="/new-property" element={<BasicDetails />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/price" element={<PriceDetails />} />
          <Route path="/photos" element={<PropertyPictures />} />
          <Route path="/details" element={<AdvancedDetails />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/success" element={<SubmissionSuccess />} />
          <Route path="/flats" element={<OwnerFlatsPage />} />
          <Route path="/flats/:id" element={<FlatDetails />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default OwnerRoutes;
