import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/StatCard";
import Chart from "../components/Chart";
import { HomeIcon, UsersIcon, BuildingOfficeIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Properties", value: 150, icon: <BuildingOfficeIcon className="w-6 h-6 text-purple-600" /> },
    { title: "Total Users", value: 1_200, icon: <UsersIcon className="w-6 h-6 text-purple-600" /> },
    { title: "Pending Verifications", value: 18, icon: <ShieldCheckIcon className="w-6 h-6 text-purple-600" /> },
  ];

  const chartData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 65 },
    { name: "May", value: 90 },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold text-gray-700 mb-6">Admin Dashboard</h1>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}
          </div>
          <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Property Statistics</h2>
            <Chart data={chartData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
