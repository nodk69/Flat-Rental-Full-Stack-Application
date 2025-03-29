import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./dashboard/tenantdashboard/pages/Home";
import About from "./dashboard/tenantdashboard/pages/About";
import Contact from "./dashboard/tenantdashboard/pages/Contact";
import FAQ from "./dashboard/tenantdashboard/pages/FAQ";
import { AppProvider } from "./dashboard/tenantdashboard/context/AppContext";
import "./App.css";
import SignUp from "./signup/SignUp";
import Login from "./signup/Login";
import PropertyDetails from "./dashboard/tenantdashboard/components/PropertyDetails";
import OAuth2RedirectHandler from "./Oauth2/OAuth2RedirectHandler";
import AdminRoutes from "./routes/AdminRoutes";
import OwnerRoutes from "./routes/OwnerRoutes";
import TenantRoutes from "./routes/TenantRoutes";
import RoleSelection from "./Oauth2/RoleSelection";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 text-gray-800">
          <Routes>

            {/* Tenant Routes */}
            <Route path="/tenant/*" element={<TenantRoutes />} />

            {/* Owner Routes */}
            <Route path="/owner/*" element={<OwnerRoutes />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />

            {/* Tenant Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/property/:id" element={<PropertyDetails />} />

            {/* Authentication Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />

          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
