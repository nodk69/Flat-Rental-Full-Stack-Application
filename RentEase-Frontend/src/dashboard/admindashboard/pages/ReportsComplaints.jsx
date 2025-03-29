import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import { TrashIcon, CheckIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ReportsComplaints = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const columns = ["ID", "User", "Issue", "Status", "Actions"];
  const reports = [
    { id: 1, user: "Alice Johnson", issue: "Fraudulent Listing", status: "Pending" },
    { id: 2, user: "Bob Williams", issue: "Misleading Photos", status: "Resolved" },
    { id: 3, user: "Charlie Brown", issue: "Fake Property", status: "Pending" },
  ];

  const handleResolve = (id) => alert(`Report ${id} marked as resolved.`);
  const handleDelete = (id) => alert(`Report ${id} deleted.`);

  // Filter reports based on search
  const filteredReports = reports.filter((report) =>
    report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.issue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Reports & Complaints</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Reports Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((col) => (
                    <th key={col} className="p-3 text-left">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{report.id}</td>
                    <td className="p-3">{report.user}</td>
                    <td className="p-3">{report.issue}</td>
                    <td className="p-3">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md text-sm"
                        onClick={() => handleResolve(report.id)}
                      >
                        <CheckIcon className="w-4 h-4" /> Resolve
                      </button>
                      <button
                        className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md text-sm"
                        onClick={() => handleDelete(report.id)}
                      >
                        <TrashIcon className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsComplaints;
