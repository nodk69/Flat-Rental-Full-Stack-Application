import { FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetUnreadNotificationsQuery } from "../apis/notificationApi";
import NotificationDropdown from "./NotificationDropdown";
import webSocketService from "../notifications/WebSocketService";
import { addNotification } from "../store/slices/notificationSlice";

const NotificationIcon = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: unreadNotifications = [] } = useGetUnreadNotificationsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      webSocketService.connect(username);
      webSocketService.onNotification = (notification) => {
        dispatch(addNotification(notification));
      };
    }

    return () => {
      webSocketService.disconnect();
    };
  }, [username, dispatch]);

  return (
    <div className="relative">
      {/* Bell Icon with Unread Badge */}
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <FaBell className="text-2xl text-gray-700 hover:text-blue-500 transition-all duration-200" />
        {unreadNotifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
            {unreadNotifications.length}
          </span>
        )}
      </div>

      {/* Dropdown Notifications */}
      {isOpen && <NotificationDropdown closeDropdown={() => setIsOpen(false)} />}
    </div>
  );
};

export default NotificationIcon;
