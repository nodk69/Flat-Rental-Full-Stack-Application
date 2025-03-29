import { NavLink } from "react-router-dom";
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  UsersIcon, 
  ChartBarIcon, 
  CogIcon, 
  ClipboardDocumentListIcon, 
  ExclamationTriangleIcon 
} from "@heroicons/react/24/solid";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-xl font-bold mb-6">🏠 Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <HomeIcon className="w-5 h-5" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/properties"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <BuildingOfficeIcon className="w-5 h-5" /> Manage Properties
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/users"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <UsersIcon className="w-5 h-5" /> User Management
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/verifications"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <ClipboardDocumentListIcon className="w-5 h-5" /> Verifications
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/reports"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <ExclamationTriangleIcon className="w-5 h-5" /> Reports & Complaints
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/analytics"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <ChartBarIcon className="w-5 h-5" /> Analytics
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/admin/settings"
              className={({ isActive }) => `flex items-center gap-3 p-3 rounded-md transition duration-300 ${
                isActive ? "bg-purple-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <CogIcon className="w-5 h-5" /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
