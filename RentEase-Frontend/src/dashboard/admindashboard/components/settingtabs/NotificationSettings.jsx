import { useState } from "react";

const NotificationSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>

      {/* Email Alerts */}
      <label className="block font-medium">Receive Email Alerts</label>
      <input
        type="checkbox"
        className="mt-2"
        checked={emailAlerts}
        onChange={() => setEmailAlerts(!emailAlerts)}
      />

      {/* SMS Alerts */}
      <label className="block mt-4 font-medium">Receive SMS Alerts</label>
      <input
        type="checkbox"
        className="mt-2"
        checked={smsAlerts}
        onChange={() => setSmsAlerts(!smsAlerts)}
      />
    </div>
  );
};

export default NotificationSettings;
