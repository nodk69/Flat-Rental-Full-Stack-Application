import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Notifications from "../components/Notifications";
import Packages from "../components/Packages";
import Footer from "../components/Footer";

const OwnerDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow container mx-auto p-6 space-y-8">
        {/* Hero Section */}
        <Hero />

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Notifications Section */}
          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notifications</h2>
            <Notifications />
          </div>

          {/* Packages Section */}
          <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Packages</h2>
            <Packages />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
