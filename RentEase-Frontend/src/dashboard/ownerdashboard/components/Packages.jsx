const Packages = () => {
    return (
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-lg font-bold">Boost your business with housing packages</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-bold">Free Plan</h3>
            <p className="text-sm text-gray-600">Includes 3 enquiries, low visibility, and 15 days listing expiry.</p>
          </div>
          <div className="p-4 bg-purple-100 rounded">
            <h3 className="font-bold">Premium Plan</h3>
            <p className="text-sm text-gray-600">Includes 30 contacts, high visibility, and 60 days listing expiry.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Packages;
  