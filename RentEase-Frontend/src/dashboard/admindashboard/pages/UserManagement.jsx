import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Table from "../components/Table";

const UserManagement = () => {
  const columns = ["ID", "Name", "Email", "Role", "Actions"];
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Owner" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Tenant" },
  ];

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">User Management</h1>
          <Table columns={columns} data={users} />
        </main>
      </div>
    </div>
  );
};

export default UserManagement;
