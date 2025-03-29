import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../signup/UserContext";
import ProfileDropdown from "../../../signup/ProfileDropDown";
import NotificationIcon from "../../../notifications/NotificationIcon";

const Navbar = () => {
  const { user } = useContext(UserContext); //Get user from context

  return (
    <nav className="bg-purple-500 p-4 text-white flex items-center justify-between shadow-md rounded-b-lg">
      {/* Logo (Left) */}
      <div className="text-xl font-bold">
        <NavLink to="/owner/dashboard">🏠 RentEase</NavLink>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex-1 flex justify-center items-center gap-8">
        <NavLink 
          to="/owner/dashboard" 
          className={({ isActive }) => `px-4 py-2 rounded-md transition ${isActive ? "bg-purple-700" : "hover:bg-purple-600"}`}>
          Dashboard
        </NavLink>
        <NavLink 
          to="/owner/listings" 
          className={({ isActive }) => `px-4 py-2 rounded-md transition ${isActive ? "bg-purple-700" : "hover:bg-purple-600"}`}>
          Flats
        </NavLink>
      </div>

      {/* Right Section: Add Property, Notifications, Profile */}
      <div className="flex items-center gap-6">
        <NavLink 
          to="/owner/new-property"
          className="bg-green-400 hover:bg-green-500 text-white font-semibold px-5 py-2 rounded-lg flex items-center gap-2 shadow-md transition hover:scale-105"
        >
          <span className="text-lg">➕</span> Add Property
        </NavLink>

        {/* Notifications Icon */}
        <NotificationIcon/>

        {/* Profile Dropdown (only show if user is logged in) */}
        {<ProfileDropdown />}
      </div>
    </nav>
  );
};

export default Navbar;
