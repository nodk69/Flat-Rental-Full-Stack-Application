const ListingsTips = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold">⚠️ Pro tip:</h3>
        <p className="text-gray-600">
          Be cautious of any suspicious calls posing as public services asking
          for money transfers.
        </p>
        <a href="#" className="text-blue-500 hover:underline">
          Know More →
        </a>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold">📤 Upload property</h3>
        <p className="text-gray-600">
          100% complete listing with specific details about rooms gets you more
          leads.
        </p>
        <a href="#" className="text-blue-500 hover:underline">
          Add Property →
        </a>
      </div>
      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-bold">📊 Property Value Calculator</h3>
        <p className="text-gray-600">
          Calculate the right value of your property.
        </p>
        <a href="#" className="text-blue-500 hover:underline">
          Estimate Price →
        </a>
      </div>
    </div>
  );
};

export default ListingsTips;
