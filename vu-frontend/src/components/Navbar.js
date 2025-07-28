import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LogOut,
  Home,
  Car,
  History,
  User,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let user = null;
  try {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) user = JSON.parse(userData);
  } catch (err) {
    console.error('Erreur parsing localStorage :', err);
    localStorage.removeItem('loggedInUser');
  }

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
    window.location.reload();
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const renderLink = (to, label, icon, key) => (
    <motion.div
      key={key}
      variants={linkVariants}
      className="nav-link-wrapper"
    >
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `nav-link-modern ${isActive ? 'active' : ''}`
        }
        onClick={closeMenu}
      >
        <motion.div 
          className="nav-link-content"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.div>
        <span className="nav-link-text">{label}</span>
      </NavLink>
    </motion.div>
  );

  return (
    <header className="header-modern">
      <div className="container-modern">
        {/* Logo Section */}
        <motion.div 
          className="logo-section"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="logo-container">
            <img src={logo} alt="ʋu logo" className="logo-image" />
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          className={`nav-modern ${menuOpen ? 'active' : ''}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Liens visibles uniquement pour USER et AGENT */}
          {(!user || (user.role !== 'agent' && user.role !== 'admin')) && (
            <>
              {renderLink('/', 'Accueil', <Home size={20} />)}
              {renderLink('/cars', 'Voitures', <Car size={20} />)}
            </>
          )}

          {user?.role === 'user' && (
            <>
              {renderLink('/historique', 'Historique', <History size={20} />)}
              {renderLink('/dashboard', 'Mon Dashboard', <User size={20} />)}
            </>
          )}

          {user?.role === 'agent' &&
            renderLink('/agent-dashboard', 'Mon Dashboard', <LayoutDashboard size={20} />)}

          {user?.role === 'admin' && (
            <>
              {renderLink('/', 'Accueil', <Home size={20} />)}
              {renderLink('/admin-cars', 'Voitures', <Car size={20} />)}
              {renderLink('/admin-dashboard', 'Admin Dashboard', <ShieldCheck size={20} />)}
            </>
          )}
        </motion.nav>
        
        {/* Auth Actions */}
        <motion.div 
          className="auth-actions-modern"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {user ? (
            <>
              {/* Notifications */}
              <motion.div
                className="notification-container"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <NotificationDropdown />
              </motion.div>

              {/* Nom utilisateur */}
              <motion.div 
                className="user-info"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="user-avatar">
                  <User size={18} />
                </div>
                <span className="user-name">{user.name}</span>
              </motion.div>

              {/* Bouton de déconnexion */}
              <motion.button
                className="logout-btn"
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: '#ff6b6b',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                transition={{ duration: 0.2 }}
              >
                <LogOut size={18} />
                <span>Déconnexion</span>
              </motion.button>
            </>
          ) : (
            <div className="auth-buttons">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/login" className="btn-modern btn-outline-modern" onClick={closeMenu}>
                  Connexion
                </NavLink>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NavLink to="/register" className="btn-modern btn-primary-modern" onClick={closeMenu}>
                  Inscription
                </NavLink>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        .header-modern {
          background: linear-gradient(135deg, #0f1946ff 0%, #0f1946ff 100%);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0;
        }

        .container-modern {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 80px;
          gap: 2rem;
        }

        .logo-section {
          flex-shrink: 0;
        }

        .logo-container {
          display: flex;
          align-items: center;
          padding: 0.5rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo-image {
          height: 60px;
          width: auto;
          filter: brightness(1.1);
        }

        .nav-modern {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          flex: 1;
          justify-content: center;
        }

        .nav-link-wrapper {
          position: relative;
        }

        .nav-link-modern {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.25rem;
          border-radius: 12px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .nav-link-modern::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .nav-link-modern:hover::before {
          left: 100%;
        }

        .nav-link-modern:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .nav-link-modern.active {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .nav-link-content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-link-text {
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .auth-actions-modern {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-shrink: 0;
        }

        .notification-container {
          position: relative;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-container:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          cursor: pointer;
        }

        .user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.01em;
        }

        .logout-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 12px;
          background: rgba(255, 107, 107, 0.9);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn:hover {
          transform: translateY(-2px);
        }

        .auth-buttons {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .btn-modern {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid;
          backdrop-filter: blur(10px);
          letter-spacing: 0.01em;
        }

        .btn-outline-modern {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .btn-outline-modern:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .btn-primary-modern {
          background: rgba(255, 255, 255, 0.9);
          color: #667eea;
          border-color: rgba(255, 255, 255, 0.9);
        }

        .btn-primary-modern:hover {
          background: white;
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .container-modern {
            padding: 0 1rem;
            min-height: 70px;
          }
          
          .logo-image {
            height: 50px;
          }
          
          .nav-modern {
            gap: 0.25rem;
          }
          
          .nav-link-modern {
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
          }
          
          .auth-actions-modern {
            gap: 0.5rem;
          }
          
          .btn-modern {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;