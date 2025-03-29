const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4">
      <div className="text-purple-600">{icon}</div>
      <div>
        <h3 className="text-gray-600">{title}</h3>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
