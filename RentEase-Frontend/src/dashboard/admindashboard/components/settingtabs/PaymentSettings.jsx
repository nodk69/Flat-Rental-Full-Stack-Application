const PaymentSettings = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Payment Settings</h2>
      <p className="text-gray-600">Manage payment gateways and subscriptions.</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
        Configure Payments
      </button>
    </div>
  );
};

export default PaymentSettings;
