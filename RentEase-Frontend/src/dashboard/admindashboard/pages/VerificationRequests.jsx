import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const VerificationRequests = () => {
  const columns = ["ID", "Property", "Owner", "Status", "Actions"];
  
  //Just to check
  const requests = [
    { id: 1, property: "Luxury Apartment", owner: "Nadeem Kidwai", status: "Pending" },
    { id: 2, property: "Beach House", owner: "Kidwai", status: "Under Review" },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Verification Requests</h1>
          <Table columns={columns} data={requests} />
        </main>
      </div>
    </div>
  );
};

export default VerificationRequests;
