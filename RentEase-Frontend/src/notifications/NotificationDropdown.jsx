import { useGetUserNotificationsQuery, useMarkNotificationAsReadMutation } from "../apis/notificationApi";
import { Bell, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { markNotificationAsReadLocal } from "../store/slices/notificationSlice";

const NotificationDropdown = ({ closeDropdown }) => {
  const { data: notifications = [] } = useGetUserNotificationsQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    dispatch(markNotificationAsReadLocal(id)); //Instantly update local state
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-2xl p-4 z-50 border border-gray-200 transition-all duration-300 ease-in-out animate-fadeIn"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <XCircle
          className="text-gray-400 cursor-pointer hover:text-red-500 transition"
          size={20}
          onClick={closeDropdown}
        />
      </div>

      {/* Notification List */}
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-6">No new notifications</p>
      ) : (
        <ul className="max-h-64 overflow-y-auto custom-scrollbar">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-3 flex items-start gap-3 border-b last:border-none cursor-pointer rounded-md transition-all ${
                notification.isRead ? "bg-gray-100 text-gray-500" : "hover:bg-gray-100"
              }`}
              onClick={() => handleMarkAsRead(notification.id)}
            >
              <Bell className="text-blue-500" size={20} />
              <div className="flex-1">
                <p className="text-gray-700 text-sm">{notification.message}</p>
                <span className="text-xs text-gray-400">{new Date(notification.timestamp).toLocaleString()}</span>
              </div>
              <CheckCircle
                className={`text-green-500 ${notification.isRead ? "opacity-50" : ""}`}
                size={18}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationDropdown;
