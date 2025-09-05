// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Car, History, User, ShieldCheck, LayoutDashboard
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const userData = localStorage.getItem('loggedInUser');
  let user = null;
  try {
    if (userData) user = JSON.parse(userData);
  } catch (err) {
    localStorage.removeItem('loggedInUser');
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>☰</button>
      <nav>
        {(!user || user.role !== 'agent') && (
          <>
            <NavLink to="/"><Home size={18} /> Accueil</NavLink>
            <NavLink to="/cars"><Car size={18} /> Voitures</NavLink>
          </>
        )}
        {user?.role === 'user' && (
          <>
            <NavLink to="/historique"><History size={18} /> Historique</NavLink>
            <NavLink to="/dashboard"><User size={18} /> Mon Dashboard</NavLink>
          </>
        )}
        {user?.role === 'agent' &&
          <NavLink to="/agent-dashboard"><LayoutDashboard size={18} /> Mon Dashboard</NavLink>}
        {user?.role === 'admin' &&
          <NavLink to="/admin-dashboard"><ShieldCheck size={18} /> Admin Dashboard</NavLink>}
      </nav>
    </aside>
  );
};

export default Sidebar;
