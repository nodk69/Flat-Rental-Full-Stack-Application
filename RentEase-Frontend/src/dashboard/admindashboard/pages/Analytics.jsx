import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chart from "../components/Chart";
import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import { HomeIcon, UsersIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";

const Analytics = () => {
  const chartData = [
    { name: "Jan", value: 100 },
    { name: "Feb", value: 120 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 180 },
    { name: "May", value: 240 },
  ];

  const stats = [
    { title: "Total Listings", value: 350, icon: <HomeIcon className="w-6 h-6 text-purple-600" /> },
    { title: "Verified Properties", value: 220, icon: <ShieldCheckIcon className="w-6 h-6 text-purple-600" /> },
    { title: "Active Users", value: 1_500, icon: <UsersIcon className="w-6 h-6 text-purple-600" /> },
  ];

  const recentActivities = [
    { user: "Alice Johnson", action: "Added a new property", date: "2024-04-01" },
    { user: "Bob Williams", action: "Verified a property", date: "2024-03-30" },
    { user: "Emma Davis", action: "Updated property details", date: "2024-03-29" },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Analytics</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Property Statistics</h2>
            <Chart data={chartData} />
          </div>

          {/* Recent Activity Table */}
          <RecentActivity activities={recentActivities} />
        </main>
      </div>
    </div>
  );
};

export default Analytics;
