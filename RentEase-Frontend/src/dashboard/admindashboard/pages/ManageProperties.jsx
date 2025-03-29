import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const ManageProperties = () => {
  const columns = ["ID", "Title", "Location", "Status", "Actions"];
  const properties = [
    { id: 1, title: "Luxury Apartment", location: "New York", status: "Verified" },
    { id: 2, title: "Villa with Pool", location: "California", status: "Pending" },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Manage Properties</h1>
          <Table columns={columns} data={properties} />
        </main>
      </div>
    </div>
  );
};

export default ManageProperties;
