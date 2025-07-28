// 📁 src/pages/NotificationsPage.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { 
  Trash2, 
  CheckCircle, 
  Bell, 
  BellRing, 
  Sparkles, 
  AlertCircle,
  Clock,
  Check
} from 'lucide-react';

const styles = {
  container: {
    padding: '0',
    margin: '0',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0e1229ff 0%, #0a0331ff 25%, #1f2937 50%, #181341ff 75%, #081520ff 100%)',
    backgroundSize: '400% 400%',
    animation: 'gradientShift 15s ease infinite',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'radial-gradient(circle at 30% 70%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    position: 'relative',
  },
  headerGlow: {
    position: 'absolute',
    top: '-2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
    animation: 'pulse 3s ease-in-out infinite',
  },
  sparkleIcon: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    animation: 'sparkle 2s ease-in-out infinite',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    margin: '0 0 0.5rem 0',
    textShadow: '0 4px 20px rgba(0,0,0,0.3)',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    fontWeight: '400',
    position: 'relative',
    zIndex: 2,
    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
  },
  notificationsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  notificationCard: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  notificationCardUnread: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(29, 78, 216, 0.1) 100%)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
  },
  notificationCardHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
  notificationIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notificationIconUnread: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
  },
  notificationIconRead: {
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  notificationContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  notificationMessage: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    lineHeight: '1.4',
    margin: '0',
  },
  notificationTime: {
    fontSize: '0.875rem',
    color: 'rgba(255, 255, 255, 0.6)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
  },
  notificationActions: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  actionButton: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backdropFilter: 'blur(10px)',
  },
  markAsReadButton: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  markAsReadButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
  },
  deleteButton: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
  },
  deleteButtonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(239, 68, 68, 0.4)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  emptyStateIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emptyStateTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 0.5rem 0',
  },
  emptyStateMessage: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: '0',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: '4rem 2rem',
    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  loginPromptIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem',
    color: 'white',
  },
  loginPromptTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#ef4444',
    margin: '0 0 0.5rem 0',
  },
  loginPromptMessage: {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
  },
  floatingElements: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    zIndex: '0',
  },
  floatingIcon: {
    position: 'absolute',
    color: 'rgba(255, 255, 255, 0.03)',
    animation: 'float 10s ease-in-out infinite',
  },
  floatingIcon1: {
    top: '15%',
    left: '8%',
    animationDelay: '0s',
  },
  floatingIcon2: {
    top: '25%',
    right: '12%',
    animationDelay: '3s',
  },
  floatingIcon3: {
    bottom: '20%',
    left: '10%',
    animationDelay: '6s',
  },
  floatingIcon4: {
    bottom: '30%',
    right: '8%',
    animationDelay: '1.5s',
  },
};

// Animations CSS
const cssAnimations = `
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(3deg); }
    66% { transform: translateY(-10px) rotate(-2deg); }
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.6; transform: scale(1) rotate(0deg); }
    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
  }
  
  @keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    } else {
      console.warn('Utilisateur non connecté.');
    }
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get(`/notifications/${user.id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des notifications :', err);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error('Erreur lors de la lecture :', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Il y a quelques minutes';
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)} heure${Math.floor(diffInHours) > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  if (!user) {
    return (
      <>
        <style>{cssAnimations}</style>
        <div style={styles.container}>
          <div style={styles.backgroundOverlay}></div>
          
          {/* Éléments flottants décoratifs */}
          <div style={styles.floatingElements}>
            <Bell size={100} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
            <BellRing size={80} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
            <AlertCircle size={90} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
            <Check size={70} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
          </div>

          <div style={styles.content}>
            <div style={styles.loginPrompt}>
              <div style={styles.loginPromptIcon}>
                <AlertCircle size={40} />
              </div>
              <h2 style={styles.loginPromptTitle}>Accès non autorisé</h2>
              <p style={styles.loginPromptMessage}>
                Vous devez être connecté pour accéder à vos notifications.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{cssAnimations}</style>
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        
        {/* Éléments flottants décoratifs */}
        <div style={styles.floatingElements}>
          <Bell size={100} style={{...styles.floatingIcon, ...styles.floatingIcon1}} />
          <BellRing size={80} style={{...styles.floatingIcon, ...styles.floatingIcon2}} />
          <AlertCircle size={90} style={{...styles.floatingIcon, ...styles.floatingIcon3}} />
          <Check size={70} style={{...styles.floatingIcon, ...styles.floatingIcon4}} />
        </div>

        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.headerGlow}></div>
            <Sparkles size={28} style={styles.sparkleIcon} />
            <h1 style={styles.title}>
              <BellRing size={48} />
              Notifications
            </h1>
            <p style={styles.subtitle}>
              Restez informé de toutes vos activités
            </p>
          </div>

          <div style={styles.notificationsContainer}>
            {notifications.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyStateIcon}>
                  <Bell size={40} />
                </div>
                <h3 style={styles.emptyStateTitle}>Aucune notification</h3>
                <p style={styles.emptyStateMessage}>
                  Vous n'avez aucune notification pour le moment. Revenez plus tard !
                </p>
              </div>
            ) : (
              notifications.map((notif, index) => (
                <div
                  key={notif.id}
                  style={{
                    ...styles.notificationCard,
                    ...(notif.is_read ? {} : styles.notificationCardUnread),
                    ...(hoveredCard === notif.id ? styles.notificationCardHover : {}),
                    animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={() => setHoveredCard(notif.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    style={{
                      ...styles.notificationIcon,
                      ...(notif.is_read ? styles.notificationIconRead : styles.notificationIconUnread)
                    }}
                  >
                    {notif.is_read ? <Check size={24} /> : <BellRing size={24} />}
                  </div>

                  <div style={styles.notificationContent}>
                    <p style={styles.notificationMessage}>
                      {notif.message}
                    </p>
                    <div style={styles.notificationTime}>
                      <Clock size={14} />
                      {formatDate(notif.created_at)}
                    </div>
                  </div>

                  <div style={styles.notificationActions}>
                    {!notif.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        style={{
                          ...styles.actionButton,
                          ...styles.markAsReadButton,
                          ...(hoveredButton === `read-${notif.id}` ? styles.markAsReadButtonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton(`read-${notif.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                        title="Marquer comme lu"
                      >
                        <CheckCircle size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      style={{
                        ...styles.actionButton,
                        ...styles.deleteButton,
                        ...(hoveredButton === `delete-${notif.id}` ? styles.deleteButtonHover : {})
                      }}
                      onMouseEnter={() => setHoveredButton(`delete-${notif.id}`)}
                      onMouseLeave={() => setHoveredButton(null)}
                      title="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationsPage;