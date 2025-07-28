// Fichier : components/NotificationBell.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bell } from 'lucide-react';

const NotificationBell = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = async () => {
    const res = await axios.get(`/api/notifications/user/${userId}`);
    setNotifications(res.data);
  };

  const markAsRead = async (id) => {
    await axios.put(`/api/notifications/${id}/read`);
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(!showDropdown)}>
        <Bell className="text-gray-700" />
        {notifications.some(n => !n.is_read) && <span className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></span>}
      </button>
      {showDropdown && (
        <div className="absolute right-0 bg-white shadow-md mt-2 w-64 rounded-xl p-2 z-50">
          {notifications.length === 0 ? (
            <p className="text-center text-sm">Aucune notification</p>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className={`p-2 text-sm border-b ${notif.is_read ? 'text-gray-400' : 'text-black font-semibold'}`}
                onClick={() => markAsRead(notif.id)}>
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;