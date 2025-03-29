import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StatCard from "./StatCard";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Navbar />
        <h1 className="text-2xl font-semibold mt-4">Welcome, Admin</h1>
        
        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard title="Total Properties" value="1200" />
          <StatCard title="Users Registered" value="500" />
          <StatCard title="Pending Verifications" value="15" />
          <StatCard title="Revenue" value="$12,000" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
