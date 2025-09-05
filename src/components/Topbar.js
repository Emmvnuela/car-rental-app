// src/components/Topbar.jsx
import React from 'react';
import { Bell, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Topbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) user = JSON.parse(userData);
  } catch (err) {
    console.error('Erreur de parsing user :', err);
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div
      className="topbar"
      style={{
        background: '#fff',
        padding: '0.75rem 2rem',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Notifications */}
      <motion.div whileHover={{ scale: 1.1 }} style={{ cursor: 'pointer' }}>
        <Bell size={22} color="#555" />
      </motion.div>

      {/* Utilisateur connecté */}
      {user && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#f1f1f1',
            padding: '6px 12px',
            borderRadius: '20px',
          }}
        >
          <User size={18} />
          <span>{user.name}</span>
        </div>
      )}

      {/* Déconnexion */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: '#ff4d4d' }}
        onClick={handleLogout}
        className="btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: '#eee',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '20px',
          cursor: 'pointer',
        }}
      >
        <LogOut size={16} /> Déconnexion
      </motion.button>
    </div>
  );
}

export default Topbar;
