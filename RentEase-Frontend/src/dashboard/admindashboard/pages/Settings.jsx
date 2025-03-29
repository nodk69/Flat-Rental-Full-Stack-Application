import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { 
  GeneralSettings, 
  UserRoles, 
  SecuritySettings, 
  NotificationSettings, 
  PaymentSettings, 
  BackupSettings 
} from "../components/settingtabs";

import { 
  Cog6ToothIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  BellIcon,
  CreditCardIcon,
  ArchiveBoxIcon 
} from "@heroicons/react/24/solid";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General Settings", icon: <Cog6ToothIcon className="w-5 h-5" /> },
    { id: "userRoles", label: "User & Roles", icon: <UserGroupIcon className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <BellIcon className="w-5 h-5" /> },
    { id: "payments", label: "Payments", icon: <CreditCardIcon className="w-5 h-5" /> },
    { id: "backup", label: "Backup & Logs", icon: <ArchiveBoxIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Admin Settings</h1>

          {/* Tabs Navigation */}
          <div className="flex space-x-4 border-b pb-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 ${
                  activeTab === tab.id ? "border-purple-600 text-purple-600" : "border-transparent text-gray-600 hover:text-purple-500"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          <div className="bg-white p-6 shadow-md rounded-lg">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "userRoles" && <UserRoles />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "payments" && <PaymentSettings />}
            {activeTab === "backup" && <BackupSettings />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
