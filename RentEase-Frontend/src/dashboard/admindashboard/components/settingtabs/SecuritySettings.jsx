import { useState } from "react";

const SecuritySettings = () => {
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Security</h2>

      {/* Enable 2FA */}
      <label className="block font-medium">Enable Two-Factor Authentication (2FA)</label>
      <input
        type="checkbox"
        className="mt-2"
        checked={twoFA}
        onChange={() => setTwoFA(!twoFA)}
      />

      {/* API Key Management */}
      <label className="block mt-4 font-medium">Manage API Keys</label>
      <button className="mt-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
        View API Keys
      </button>
    </div>
  );
};

export default SecuritySettings;
