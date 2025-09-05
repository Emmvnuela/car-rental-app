import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (!loggedInUser) {
    // Pas connecté, redirige vers login
    return <Navigate to="/login" replace />;
  }

  if (role && loggedInUser.role !== role) {
    // Mauvais rôle, redirige vers page adaptée
    if (loggedInUser.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    else return <Navigate to="/dashboard" replace />;
  }

  // Tout est ok, affiche l’enfant
  return children;
}

export default ProtectedRoute;
