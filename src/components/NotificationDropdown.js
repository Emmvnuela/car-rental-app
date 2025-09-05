// components/NotificationDropdown.js
import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NotificationDropdown = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      const token = localStorage.getItem('token');  // Récupération correcte du token

      if (!user || !token) {
        console.warn("🔐 Aucun token trouvé !");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/notifications/${user.id}/unread-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUnreadCount(res.data.unreadCount);
      } catch (err) {
        console.error("❌ Erreur récupération notifications non lues", err);
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <div
      onClick={() => navigate('/notifications')}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '30px',
        minHeight: '30px',
        cursor: 'pointer'
      }}
    >
      <Bell size={22} color="#FFFFFF" />
      {unreadCount > 0 && (
        <span style={{
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: 'red',
          color: 'white',
          fontSize: '12px',
          borderRadius: '50%',
          padding: '2px 6px',
        }}>
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationDropdown;
