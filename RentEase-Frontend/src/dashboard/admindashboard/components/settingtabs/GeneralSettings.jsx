import { useState } from "react";

const GeneralSettings = () => {
  const [siteName, setSiteName] = useState("RentEase");
  const [language, setLanguage] = useState("English");

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">General Settings</h2>

      {/* Site Name */}
      <label className="block font-medium">Site Name</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-purple-500"
        value={siteName}
        onChange={(e) => setSiteName(e.target.value)}
      />

      {/* Default Language */}
      <label className="block mt-4 font-medium">Default Language</label>
      <select
        className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-purple-500"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Spanish</option>
      </select>

      {/* Save Button */}
      <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
        Save Changes
      </button>
    </div>
  );
};

export default GeneralSettings;
