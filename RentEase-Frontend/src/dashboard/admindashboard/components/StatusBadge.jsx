const StatusBadge = ({ status }) => {
    const statusColors = {
      Pending: "bg-yellow-100 text-yellow-800",
      Resolved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
    };
  
    return (
      <span className={`px-3 py-1 text-sm rounded-md font-semibold ${statusColors[status]}`}>
        {status}
      </span>
    );
  };
  
  export default StatusBadge;
  